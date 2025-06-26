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

// NUEVA RUTA para obtener ventas por cliente
router.get("/customer/:idCustomer", salesController.getSalesByCustomer);

export default router;