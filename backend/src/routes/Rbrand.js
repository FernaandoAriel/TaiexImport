import express from "express";
import brandController from "../controllers/Cbrand.js";
// Router() nos ayuda a colocar los metodos
// que tendra mi ruta
const router = express.Router();

router
  .route("/")
  .get(brandController.getbrand)
  .post(brandController.createbrand);

router
  .route("/:id")
  .put(brandController.updatebrand)
  .delete(brandController.deletebrand);

export default router;
