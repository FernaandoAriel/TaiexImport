/*
    Campos:
    idVehicle
    idCustomer
    favorite

    //solo el insert y el delete
        
*/

//Array de metodos (C R U D)
const likedController = {};
import likedModel from "../models/Liked.js";

// SELECT
likedController.getliked = async (req, res) => {
    const liked = await likedModel.find();
    res.json(liked);
};

// INSERT
likedController.createliked = async (req, res) => {
    const { idCustomer, favorite, idVehicle } = req.body;
    const newliked = new likedModel({
        idCustomer,
        favorite,
        idVehicle,
    });
    await newliked.save();
    res.json({ message: "liked save" });
};

// DELETE
likedController.deleteliked = async (req, res) => {
    const deletedliked = await likedModel.findByIdAndDelete(req.params.id);
    if (!deletedliked) {
        return res.status(404).json({ message: "liked dont find" });
    }
    res.json({ message: "liked deleted" });
};

export default likedController;