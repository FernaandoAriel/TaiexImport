import express from "express";
const router = express.Router();
import salesController from "../controllers/Csales.js";
// Router() nos ayuda a colocar los metodos
// que tendra mi ruta


router.route("/")
    .get(salesController.getsales)
    .post(salesController.createsales);

router.route("/:id")
    .put(salesController.updatesales)
    .delete(salesController.deletesales);

export default router;