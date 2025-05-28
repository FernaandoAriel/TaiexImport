//Array de metodos (C R U D)
const brandController = {};
import brandModel from "../models/Brand.js";
import OrderModel from "../models/Order.js"; // Asegúrate de importar OrderModel
import CarModel from "../models/Vehicles.js"; // Necesitarás esto para el lookup
import { Types } from "mongoose"; // Para manejar ObjectId

// SELECT
brandController.getbrand = async (req, res) => {
    const brand = await brandModel.find();
    res.json(brand);
};

// INSERT
brandController.createbrand = async (req, res) => {
    const { brand } = req.body;
    const newbrand = new brandModel({ brand });
    await newbrand.save();
    res.json({ message: "brand save" });
};

// DELETE
brandController.deletebrand = async (req, res) => {
    const deletedbrand = await brandModel.findByIdAndDelete(req.params.id);
    if (!deletedbrand) {
        return res.status(404).json({ message: "brand dont find" });
    }
    res.json({ message: "brand deleted" });
};

// UPDATE
brandController.updatebrand = async (req, res) => {
    // Solicito todos los valores
    const { brand } = req.body;
    // Actualizo
    await brandModel.findByIdAndUpdate(
        req.params.id,
        {
            brand,
        },
        { new: true }
    );
    // muestro un mensaje que todo se actualizo
    res.json({ message: "brand update" });
};


brandController.getTopBrandAlternative = async (req, res) => {
    try {
        const result = await OrderModel.aggregate([
            // Separar cada objeto en el arreglo "order"
            { $unwind: "$order" },

            // Vincular con la colección de vehículos
            {
                $lookup: {
                    from: "vehicles", // Nombre real de tu colección de vehículos
                    localField: "order.idVehicle",
                    foreignField: "_id",
                    as: "vehicle"
                }
            },
            { $unwind: "$vehicle" },

            // Vincular con la colección de modelos
            {
                $lookup: {
                    from: "models", // Nombre real de tu colección de modelos
                    localField: "vehicle.idModel",
                    foreignField: "_id",
                    as: "model"
                }
            },
            { $unwind: "$model" },

            // Vincular con la colección de marcas
            {
                $lookup: {
                    from: "brands", // Nombre real de tu colección de marcas
                    localField: "model.idBrand",
                    foreignField: "_id",
                    as: "brand"
                }
            },
            { $unwind: "$brand" },

            // Agrupar por marca y contar
            {
                $group: {
                    _id: "$brand._id",
                    brandName: { $first: "$brand.brand" },
                    totalSales: { $sum: 1 }
                }
            },

            // Ordenar por cantidad de ventas
            { $sort: { totalSales: -1 } },

            // Obtener solo la más vendida
            { $limit: 1 }
        ]);

        // Si no hay resultados, responde con "Desconocida"
        if (result.length === 0) {
            return res.status(404).json({
                brandName: "Desconocida",
                totalSales: 0
            });
        }

        const topBrand = result[0];

        // Respuesta final con los nombres correctos
        res.json({
            brandName: topBrand.brandName,
            totalSales: topBrand.totalSales
        });

    } catch (error) {
        console.error("Error en getTopBrandAlternative:", error);
        res.status(500).json({
            message: "Error al obtener la marca más vendida",
            error: error.message
        });
    }
};



export default brandController;