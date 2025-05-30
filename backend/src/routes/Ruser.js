
// ==========================================
// 2. CORREGIR LAS RUTAS DE USUARIOS (Ruser.js)

import express from "express";
const router = express.Router();
import usersController from "../controllers/Cuser.js";

// CORREGIR: Agregar la ruta GET que falta
router.route("/")
    .get(usersController.getusers)  // ESTA LÍNEA FALTABA
    .post(usersController.createusers);

router.route("/:id")
    .put(usersController.updateusers)
    .delete(usersController.deleteusers);

export default router;