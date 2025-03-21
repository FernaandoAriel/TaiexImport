import express from "express";
const router = express.Router();
import orderController from "../controllers/Corder.js";
// Router() nos ayuda a colocar los metodos
// que tendra mi ruta


router.route("/")
  .get(orderController.getorder)
  .post(orderController.createorder);

router.route("/:id")
  .put(orderController.updateorder)
  .delete(orderController.deleteorder);

export default router;