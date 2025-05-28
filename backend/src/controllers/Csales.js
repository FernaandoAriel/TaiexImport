/*
    Campos:
    id_carros
    id_clientes
    Estado
*/

const salesController = {};
import salesModel from "../models/Sales.js";

// SELECT
// En tu controlador del backend
salesController.getsales = async (req, res) => {
    try {
      const sales = await salesModel.find()
        .populate('idCustomer', 'firsName lastName')
        .populate('idVehicle', 'year price');
      
      console.log("Datos que se enviarán:", JSON.stringify(sales, null, 2));
      res.json(sales);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Error al cargar ventas" });
    }
  };


// INSERT (CORREGIDO)
salesController.createsales = async (req, res) => {
    const { id_carros, id_clientes, Estado } = req.body; // <-- Ahora coincide con el schema
    const newSales = new salesModel({ id_carros, id_clientes, Estado }); // <-- Campos correctos
    await newSales.save();
    res.json({ message: "Venta guardada correctamente" });
};

// DELETE
salesController.deletesales = async (req, res) => {
    const deletedSales = await salesModel.findByIdAndDelete(req.params.id);
    if (!deletedSales) {
        return res.status(404).json({ message: "Venta no encontrada" });
    }
    res.json({ message: "Venta eliminada correctamente" });
};

// UPDATE (CORREGIDO)
salesController.updatesales = async (req, res) => {
    const { id_carros, id_clientes, Estado } = req.body; // <-- Campos correctos
    await salesModel.findByIdAndUpdate(
        req.params.id,
        { id_carros, id_clientes, Estado }, // <-- Ahora coincide con el schema
        { new: true }
    );
    res.json({ message: "Venta actualizada correctamente" });
};

export default salesController;