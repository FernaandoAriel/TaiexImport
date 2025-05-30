import express from "express";
const router = express.Router();
import salesController from "../controllers/Csales.js";

// Rutas existentes
router.route("/")
    .get(salesController.getsales)
    .post(salesController.createsales);

router.route("/:id")
    .put(salesController.updatesales)
    .delete(salesController.deletesales);

// NUEVA RUTA para obtener vehículos más vendidos
router.get("/top-vehicles", salesController.getTopVehicles);

export default router;