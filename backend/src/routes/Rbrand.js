import express from "express";

const router = express.Router();
import brandController from "../controllers/Cbrand.js";
// Router() nos ayuda a colocar los metodos
// que tendra mi ruta
router.get('/top-brand', brandController.getTopBrandAlternative); 

router.route("/")
    .get(brandController.getbrand)
    .post(brandController.createbrand);

router.route("/:id")
    .put(brandController.updatebrand)
    .delete(brandController.deletebrand);

export default router;