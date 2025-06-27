import express from "express";
import contactForm from "../utils/ContactForm.js";

const router = express.Router();

router.post('/sendContact', contactForm.sendContactForm);

export default router;