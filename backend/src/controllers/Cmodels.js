
/*
    Campos:
    idBrand
    model
    
*/

//Array de metodos (C R U D)
const modelsController = {};
import modelsModel from "../models/Model.js";

// SELECT
modelsController.getmodels = async (req, res) => {
    const models = await modelsModel.find();
    res.json(models);
};

// INSERT
modelsController.createmodels = async (req, res) => {
    const { idBrand, model } = req.body;
    const newmodels = new modelsModel({ idBrand, model });
    await newmodels.save();
    res.json({ message: "model save" });
};

// DELETE
modelsController.deletemodels = async (req, res) => {
    const deletedmodels = await modelsModel.findByIdAndDelete(req.params.id);
    if (!deletedmodels) {
        return res.status(404).json({ message: "model dont find" });
    }
    res.json({ message: "model deleted" });
};

// UPDATE
modelsController.updatemodels = async (req, res) => {
    // Solicito todos los valores
    const { idBrand, model } = req.body;
    // Actualizo
    await modelsModel.findByIdAndUpdate(
        req.params.id,
        {
            idBrand,
            model
        },
        { new: true }
    );
    // muestro un mensaje que todo se actualizo
    res.json({ message: "model update" });
};

export default modelsController;
