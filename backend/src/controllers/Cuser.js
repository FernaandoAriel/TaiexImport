const UserController = {};
import UserModel from "../models/User.js";

// SELECT - AGREGAR ESTE MÉTODO QUE FALTA
UserController.getusers = async (req, res) => {
    try {
        const users = await UserModel.find();
        res.json(users);
    } catch (error) {
        console.error("Error getting users:", error);
        res.status(500).json({ error: "Error al obtener usuarios" });
    }
};

// INSERT
UserController.createusers = async (req, res) => {
    const { firstName, lastName, email, password, profilePicture, privilages } =
        req.body;
    const newusers = new UserModel({
        firstName,
        lastName,
        email,
        password,
        profilePicture,
        privilages,
    });
    await newusers.save();
    res.json({ message: "user save" });
};

// DELETE
UserController.deleteusers = async (req, res) => {
    const deletedusers = await UserModel.findByIdAndDelete(req.params.id);
    if (!deletedusers) {
        return res.status(404).json({ message: "user dont find" });
    }
    res.json({ message: "user deleted" });
};

// UPDATE
UserController.updateusers = async (req, res) => {
    // Solicito todos los valores
    const { firstName, lastName, email, password, profilePicture, privilages } =
        req.body;
    // Actualizo
    await UserModel.findByIdAndUpdate(
        req.params.id,
        {
            firstName,
            lastName,
            email,
            password,
            profilePicture,
            privilages,
        },
        { new: true }
    );
    // muestro un mensaje que todo se actualizo
    res.json({ message: "user update" });
};

export default UserController;