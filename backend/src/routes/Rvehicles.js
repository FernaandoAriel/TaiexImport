import express from "express";
const router = express.Router();
import vehiclesController from "../controllers/Cvehicles.js";
// Router() nos ayuda a colocar los metodos
// que tendra mi ruta

// En tu archivo de rutas (routes/vehicles.js)
router.get('/', async (req, res) => {
    try {
      const vehicles = await Vehicle.find({}, 'marca modelo year price');
      res.json(vehicles);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
router.route("/")
    .post(vehiclesController.createvehicles);

router.route("/:id")
    .put(vehiclesController.updatevehicles)
    .delete(vehiclesController.deletevehicles);

export default router;