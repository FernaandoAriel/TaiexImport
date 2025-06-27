import express from "express";
import registerCustomersController from "../controllers/CregisterCustomers.js";

const router = express.Router();

router.route("/").post(registerCustomersController.register);
router.route("/verifyCodeEmail").post(registerCustomersController.verifyCodeEmail);
router.route("/resendVerificationCode").post(registerCustomersController.resendVerificationCode);

export default router;