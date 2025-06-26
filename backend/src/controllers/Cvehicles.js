// Array de métodos (C R U D)
import vehiclesModel from "../models/Vehicles.js";
import brandModel from "../models/Brand.js";
import modelModel from "../models/Model.js";
import "../models/Bodywork.js";


const vehiclesController = {};

// SELECT
vehiclesController.getVehicles = async (req, res) => {
    try {
        const vehicles = await vehiclesModel.find()
            .populate({
                path: 'idModel',
                select: 'model idBrand',
                populate: {
                    path: 'idBrand',
                    select: 'brand'
                }
            })
            .populate({
                path: 'idBodyWork',
                select: 'bodyWork'
            })
            .select('year price carDetails equipment discount idModel idBodyWork imgVehicle');

        // Transformar los datos para incluir marca, modelo y bodyWork
        const transformedVehicles = vehicles.map(vehicle => {
            
            return {
                ...vehicle._doc,
                marca: vehicle.idModel?.idBrand?.brand || "Marca no disponible",
                modelo: vehicle.idModel?.model || "Modelo no disponible",
                bodyWork: vehicle.idBodyWork?.bodyWork || "Carrocería no disponible"
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

vehiclesController.getVehiclesByBrand = async (req, res) => {
    try {
        const { brand } = req.query;
        let query = {};
        if (brand) {
            const brandDoc = await brandModel.findOne({ brand: { $regex: new RegExp(`^${brand.trim()}$`, 'i') } });
            if (!brandDoc) return res.json([]);
            const models = await modelModel.find({ idBrand: brandDoc._id });
            const modelIds = models.map(m => m._id);
            if (modelIds.length === 0) return res.json([]);
            query = { idModel: { $in: modelIds } };
        }

        const vehicles = await vehiclesModel.find(query)
            .populate({
                path: 'idModel',
                select: 'model idBrand',
                populate: {
                    path: 'idBrand',
                    select: 'brand'
                }
            })
            .populate({
                path: 'idBodyWork',
                select: 'bodyWork'
            })
            .select('year price carDetails equipment discount idModel idBodyWork imgVehicle');

        res.json(vehicles); // <--- Solo esto
    } catch (error) {
        console.error("Error al obtener vehículos por marca:", error);
        res.json([]);
    }
};

// Obtener un vehículo por ID
vehiclesController.getVehicleById = async (req, res) => {
    try {
        const vehicle = await vehiclesModel.findById(req.params.id)
            .populate({
                path: 'idModel',
                select: 'model idBrand',
                populate: {
                    path: 'idBrand',
                    select: 'brand'
                }
            })
            .populate({
                path: 'idBodyWork',
                select: 'bodyWork'
            });
        if (!vehicle) return res.status(404).json({ error: "Vehículo no encontrado" });
        res.json(vehicle);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener el vehículo" });
    }
};



export default vehiclesController;