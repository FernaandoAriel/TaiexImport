import express from "express";
import logoutController from "../controllers/Clogout.js";
const router = express.Router();

router.route("/").post(logoutController.logout);

export default router;