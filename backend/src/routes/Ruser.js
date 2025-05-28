import express from "express";
const router = express.Router();
import usersController from "../controllers/Cuser.js";
// Router() nos ayuda a colocar los metodos
// que tendra mi ruta


router.route("/")
    .get(usersController.getusers)
    .post(usersController.createusers);

router.route("/:id")
    .put(usersController.updateusers)
    .delete(usersController.deleteusers);

export default router;