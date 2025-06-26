import express from "express";
const router = express.Router();
import vehiclesController from "../controllers/Cvehicles.js";

// Definición de rutas
router.get("/", vehiclesController.getVehicles);
router.post("/", vehiclesController.createvehicles);
router.put("/:id", vehiclesController.updatevehicles);
router.delete("/:id", vehiclesController.deletevehicles);

router.get('/by-brand', vehiclesController.getVehiclesByBrand);

// NUEVA RUTA para obtener detalles de un vehículo por ID
router.get('/:id', vehiclesController.getVehicleById);

export default router;