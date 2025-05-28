/*
    Campos:
    id_carros
    id_clientes
    Estado
*/

//Array de metodos (C R U D)
const salesController = {};
import salesModel from "../models/Sales.js";

// SELECT
salesController.getsales = async (req, res) => {
    const sales = await salesModel.find();
    res.json(sales);
};

// INSERT
salesController.createsales = async (req, res) => {
    const { idCustomer, sales } = req.body;
    const newSales = new salesModel({ idVehicle, idCustomer, state });
    await newSales.save();
    res.json({ message: "sales save" });
};

// DELETE
salesController.deletesales = async (req, res) => {
    const deletedSales = await salesModel.findByIdAndDelete(req.params.id);
    if (!deletedSales) {
        return res.status(404).json({ message: "order dont find" });
    }
    res.json({ message: "sales delete" });
};

// UPDATE
salesController.updatesales = async (req, res) => {
    // Solicito todos los valores
    const { idVehicle, idCustomer, state } = req.body;
    // Actualizo
    await salesModel.findByIdAndUpdate(
        req.params.id,
        {
            idVehicle, idCustomer, state
        },
        { new: true }
    );
    // muestro un mensaje que todo se actualizo
    res.json({ message: "sales update" });
};

export default salesController;