import express from "express";

const router = express.Router();
import customersController from "../controllers/Ccustomers.js";
// Router() nos ayuda a colocar los metodos
// que tendra mi ruta

router.route("/")
    .get(customersController.getcustomers)
    .post(customersController.createcustomers);

router.route("/:id")
    .put(customersController.updatecustomers)
    .delete(customersController.deletecustomers);

export default router;