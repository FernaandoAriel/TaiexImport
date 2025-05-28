import express from "express";
const router = express.Router();
import usersController from "../controllers/Cuser.js";
// Router() nos ayuda a colocar los metodos
// que tendra mi ruta

// En tu archivo de rutas (routes/users.js)
router.get('/salespeople', async (req, res) => {
    try {
      const salespeople = await User.find({ role: 'empleado' }, 'firstName lastName');
      res.json(salespeople);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
router.route("/")
    .post(usersController.createusers);

router.route("/:id")
    .put(usersController.updateusers)
    .delete(usersController.deleteusers);

export default router;