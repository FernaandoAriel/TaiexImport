import express from "express";
const router = express.Router();
import vehiclesController from "../controllers/Cvehicles.js";

// Definición de rutas
router.get("/", vehiclesController.getVehicles);
router.post("/", vehiclesController.createvehicles);
router.put("/:id", vehiclesController.updatevehicles);
router.delete("/:id", vehiclesController.deletevehicles);



export default router;