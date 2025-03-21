import express from "express";
const router = express.Router();
import vehiclesController from "../controllers/Cvehicles.js";
// Router() nos ayuda a colocar los metodos
// que tendra mi ruta


router.route("/")
  .get(vehiclesController.getvehicles)
  .post(vehiclesController.createvehicles);

router.route("/:id")
  .put(vehiclesController.updatevehicles)
  .delete(vehiclesController.deletevehicles);

export default router;
