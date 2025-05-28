//Array de metodos (C R U D)
const brandController = {};
import brandModel from "../models/brand.js";

// SELECT
brandController.getbrand = async (req, res) => {
    const brand = await brandModel.find();
    res.json(brand);
};

// INSERT
brandController.createbrand = async (req, res) => {
    const { brand } = req.body;
    const newbrand = new brandModel({ brand });
    await newbrand.save();
    res.json({ message: "brand save" });
};

// DELETE
brandController.deletebrand = async (req, res) => {
    const deletedbrand = await brandModel.findByIdAndDelete(req.params.id);
    if (!deletedbrand) {
        return res.status(404).json({ message: "brand dont find" });
    }
    res.json({ message: "brand deleted" });
};

// UPDATE
brandController.updatebrand = async (req, res) => {
    // Solicito todos los valores
    const { brand } = req.body;
    // Actualizo
    await brandModel.findByIdAndUpdate(
        req.params.id,
        {
            brand,
        },
        { new: true }
    );
    // muestro un mensaje que todo se actualizo
    res.json({ message: "brand update" });
};

export default brandController;