import express from "express";
import multer from "multer";
import customersController from "../controllers/Ccustomers.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.route("/")
    .get(customersController.getcustomers)
    .post(upload.single("profilePicture"), customersController.createcustomers);

router.route("/:id")
    .put(upload.single("profilePicture"), customersController.updatecustomers)
    .delete(customersController.deletecustomers);

export default router;