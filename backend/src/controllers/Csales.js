/*
    Campos:
    idVehicle (ObjectId)
    idCustomer (ObjectId)  
    Estado
*/

const salesController = {};
import salesModel from "../models/Sales.js";
import Vehicles from "../models/Vehicles.js";

// SELECT
// SELECT corregido
salesController.getsales = async (req, res) => {
    try {
        const sales = await salesModel.find()
            .populate({
                path: 'idCustomer',
                select: 'firstName lastName nombre apellido email telefono'
            })
            .populate({
                path: 'idVehicle',
                select: 'year price marca modelo', // Ahora tenemos estos campos virtuales
                model: Vehicles
            });
        
        res.json(sales);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Error al cargar ventas" });
    }
};

// INSERT - Usar nombres consistentes con el modelo
salesController.createsales = async (req, res) => {
    try {
        const { idVehicle, idCustomer, Estado } = req.body; // Usar nombres del modelo
        const newSales = new salesModel({ 
            idVehicle, 
            idCustomer, 
            Estado 
        });
        await newSales.save();
        res.json({ message: "Venta guardada correctamente" });
    } catch (error) {
        console.error("Error creating sale:", error);
        res.status(500).json({ error: "Error al crear venta" });
    }
};

// DELETE
salesController.deletesales = async (req, res) => {
    try {
        const deletedSales = await salesModel.findByIdAndDelete(req.params.id);
        if (!deletedSales) {
            return res.status(404).json({ message: "Venta no encontrada" });
        }
        res.json({ message: "Venta eliminada correctamente" });
    } catch (error) {
        console.error("Error deleting sale:", error);
        res.status(500).json({ error: "Error al eliminar venta" });
    }
};

// UPDATE - Usar nombres consistentes con el modelo
salesController.updatesales = async (req, res) => {
    try {
        const { idVehicle, idCustomer, Estado } = req.body; // Usar nombres del modelo
        const updatedSale = await salesModel.findByIdAndUpdate(
            req.params.id,
            { idVehicle, idCustomer, Estado },
            { new: true }
        );
        
        if (!updatedSale) {
            return res.status(404).json({ message: "Venta no encontrada" });
        }
        
        res.json({ message: "Venta actualizada correctamente" });
    } catch (error) {
        console.error("Error updating sale:", error);
        res.status(500).json({ error: "Error al actualizar venta" });
    }
};


// Agregar este método al salesController existente (Csales.js)

// GET TOP VEHICLES - Vehículos más vendidos
salesController.getTopVehicles = async (req, res) => {
    try {
        const topVehicles = await salesModel.aggregate([
            // Solo contar ventas completadas
            { $match: { Estado: "Completada" } },
            
            // Agrupar por vehículo y contar
            {
                $group: {
                    _id: "$idVehicle",
                    totalSales: { $sum: 1 }
                }
            },
            
            // Ordenar por más vendidos
            { $sort: { totalSales: -1 } },
            
            // Limitar a los top 10
            { $limit: 10 },
            
            // Hacer lookup para obtener información del vehículo
            {
                $lookup: {
                    from: "vehicles", // Nombre de la colección en MongoDB
                    localField: "_id",
                    foreignField: "_id",
                    as: "vehicleInfo"
                }
            },
            
            // Descomponer el array de vehículos
            { $unwind: "$vehicleInfo" },
            
            // Hacer lookup para obtener información del modelo
            {
                $lookup: {
                    from: "models", // Nombre de la colección de modelos
                    localField: "vehicleInfo.idModel",
                    foreignField: "_id",
                    as: "modelInfo"
                }
            },
            
            // Descomponer el array de modelos
            { $unwind: "$modelInfo" },
            
            // Hacer lookup para obtener información de la marca
            {
                $lookup: {
                    from: "brands", // Nombre de la colección de marcas
                    localField: "modelInfo.idBrand",
                    foreignField: "_id",
                    as: "brandInfo"
                }
            },
            
            // Descomponer el array de marcas
            { $unwind: "$brandInfo" },
            
            // Proyectar los datos que necesitamos
            {
                $project: {
                    _id: 1,
                    totalSales: 1,
                    vehicleName: {
                        $concat: [
                            "$brandInfo.brand",
                            " ",
                            "$modelInfo.model",
                            " ",
                            { $toString: "$vehicleInfo.year" }
                        ]
                    },
                    brand: "$brandInfo.brand",
                    model: "$modelInfo.model",
                    year: "$vehicleInfo.year",
                    price: "$vehicleInfo.price",
                    image: "$vehicleInfo.imgVehicle"
                }
            }
        ]);

        res.json(topVehicles);
    } catch (error) {
        console.error("Error getting top vehicles:", error);
        res.status(500).json({ 
            error: "Error al obtener vehículos más vendidos",
            details: error.message 
        });
    }
};

export default salesController;