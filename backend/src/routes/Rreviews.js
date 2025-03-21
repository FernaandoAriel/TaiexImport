import express from "express";
const router = express.Router();
import reviewsController from "../controllers/Creviews.js";
// Router() nos ayuda a colocar los metodos
// que tendra mi ruta

router.route("/")
  .get(reviewsController.getreviews)
  .post(reviewsController.createreviews);

router.route("/:id")
  .put(reviewsController.updatereviews)
  .delete(reviewsController.deletereviews);

export default router;