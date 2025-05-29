//Array de metodos (C R U D)
const brandController = {};
import brandModel from "../models/Brand.js";
import SalesModel from "../models/Sales.js"; // Ajusta la ruta según tu estructura

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


brandController.getTopBrands = async (req, res) => {
    try {
        const result = await SalesModel.aggregate([
            // Filtramos solo ventas completadas
            { $match: { Estado: "Completada" } },
            
            // Vincular con la colección de vehículos
            {
                $lookup: {
                    from: "vehicles",  // Nombre real de la colección
                    localField: "idVehicle",
                    foreignField: "_id",
                    as: "vehicle"
                }
            },
            { $unwind: "$vehicle" },

            // Vincular con la colección de modelos
            {
                $lookup: {
                    from: "models",  // Nombre real de la colección
                    localField: "vehicle.idModel",
                    foreignField: "_id",
                    as: "model"
                }
            },
            { $unwind: "$model" },

            // Vincular con la colección de marcas
            {
                $lookup: {
                    from: "brands",  // Nombre real de la colección
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
                    brand: { $first: "$brand.brand" },
                    image: { $first: "$brand.image" },
                    salesCount: { $sum: 1 }
                }
            },

            // Ordenar por cantidad de ventas (de mayor a menor)
            { $sort: { salesCount: -1 } },

            // Limitar a 5 marcas
            { $limit: 5 }
        ]);

        res.json(result);
    } catch (error) {
        console.error("Error en getTopBrands:", error);
        res.status(500).json({
            message: "Error al obtener las marcas más vendidas",
            error: error.message
        });
    }
};



export default brandController;