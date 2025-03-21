import express from "express";
import usersController from "../controllers/Cusers.js";
// Router() nos ayuda a colocar los metodos
// que tendra mi ruta
const router = express.Router();

router
  .route("/")
  .get(usersController.getusers)
  .post(usersController.createusers);

router
  .route("/:id")
  .put(usersController.updateusers)
  .delete(usersController.deleteusers);

export default router;
