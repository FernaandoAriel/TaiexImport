import express from "express";
const router = express.Router();

import likedController from "../controllers/Cliked.js";
// Router() nos ayuda a colocar los metodos
// que tendra mi ruta


router.route("/")
  .get(likedController.getliked)
  .post(likedController.createliked);

router.route("/:id")
  
  .delete(likedController.deleteliked);

export default router;