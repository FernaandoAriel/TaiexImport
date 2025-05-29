// Array de métodos (C R U D)
const vehiclesController = {};
import vehiclesModel from "../models/Vehicles.js";

// SELECT
vehiclesController.getVehicles = async (req, res) => {
    try {
        // Usar el modelo importado correctamente
        const vehicles = await vehiclesModel.find()
            .populate({
                path: 'idModel',
                select: 'model idBrand',
                populate: {
                    path: 'idBrand',
                    select: 'brand'
                }
            })
            .select('year price carDetails equipment discount idModel');
        
        // Transformar los datos para incluir marca y modelo
        const transformedVehicles = vehicles.map(vehicle => {
            return {
                ...vehicle._doc,
                marca: vehicle.idModel?.idBrand?.brand || "Marca no disponible",
                modelo: vehicle.idModel?.model || "Modelo no disponible"
            };
        });
        
        res.json(transformedVehicles);
    } catch (error) {
        console.error("Error al obtener vehículos:", {
            message: error.message,
            stack: error.stack
        });
        res.status(500).json({ 
            error: "Error al cargar vehículos",
            details: error.message 
        });
    }
};

// INSERT
vehiclesController.createvehicles = async (req, res) => {
    try {
        const { idModel, year, price, carDetails, equipment, discount, imgVehicle } = req.body;
        const newvehicles = new vehiclesModel({
            idModel,
            year,
            price,
            carDetails,
            equipment,
            discount,
            imgVehicle,
        });
        await newvehicles.save();
        res.json({ message: "Vehículo guardado correctamente" });
    } catch (error) {
        console.error("Error al crear vehículo:", error);
        res.status(500).json({ error: "Error al crear vehículo" });
    }
};

// DELETE
vehiclesController.deletevehicles = async (req, res) => {
    try {
        const deletedvehicles = await vehiclesModel.findByIdAndDelete(req.params.id);
        if (!deletedvehicles) {
            return res.status(404).json({ message: "Vehículo no encontrado" });
        }
        res.json({ message: "Vehículo eliminado correctamente" });
    } catch (error) {
        console.error("Error al eliminar vehículo:", error);
        res.status(500).json({ error: "Error al eliminar vehículo" });
    }
};

// UPDATE
vehiclesController.updatevehicles = async (req, res) => {
    try {
        const { idModel, year, price, carDetails, equipment, discount, imgVehicle } = req.body;
        await vehiclesModel.findByIdAndUpdate(
            req.params.id,
            {
                idModel,
                year,
                price,
                carDetails,
                equipment,
                discount,
                imgVehicle,
            },
            { new: true }
        );
        res.json({ message: "Vehículo actualizado correctamente" });
    } catch (error) {
        console.error("Error al actualizar vehículo:", error);
        res.status(500).json({ error: "Error al actualizar vehículo" });
    }
};

export default vehiclesController;