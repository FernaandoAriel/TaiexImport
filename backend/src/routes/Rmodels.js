import express from "express";
const router = express.Router();

import modelsController from "../controllers/Cmodels.js";
// Router() nos ayuda a colocar los metodos
// que tendra mi ruta

router.route("/")
  .get(modelsController.getmodels)
  .post(modelsController.createmodels);

router.route("/:id")
  .put(modelsController.updatemodels)
  .delete(modelsController.deletemodels);

export default router;