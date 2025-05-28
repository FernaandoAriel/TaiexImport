/*
    Campos:
    idVehicle (ObjectId)
    idCustomer (ObjectId)  
    Estado
*/

const salesController = {};
import salesModel from "../models/Sales.js";

// SELECT
salesController.getsales = async (req, res) => {
    try {
      const sales = await salesModel.find()
        .populate('idCustomer', 'firsName lastName nombre apellido email telefono')
        .populate('idVehicle', 'year price marca modelo precio');
      
      console.log("Datos que se enviarán:", JSON.stringify(sales, null, 2));
      res.json(sales);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Error al cargar ventas" });
    }
};

// INSERT - Usar nombres consistentes con el modelo
salesController.createsales = async (req, res) => {
    try {
        const { idVehicle, idCustomer, Estado } = req.body; // Usar nombres del modelo
        const newSales = new salesModel({ 
            idVehicle, 
            idCustomer, 
            Estado 
        });
        await newSales.save();
        res.json({ message: "Venta guardada correctamente" });
    } catch (error) {
        console.error("Error creating sale:", error);
        res.status(500).json({ error: "Error al crear venta" });
    }
};

// DELETE
salesController.deletesales = async (req, res) => {
    try {
        const deletedSales = await salesModel.findByIdAndDelete(req.params.id);
        if (!deletedSales) {
            return res.status(404).json({ message: "Venta no encontrada" });
        }
        res.json({ message: "Venta eliminada correctamente" });
    } catch (error) {
        console.error("Error deleting sale:", error);
        res.status(500).json({ error: "Error al eliminar venta" });
    }
};

// UPDATE - Usar nombres consistentes con el modelo
salesController.updatesales = async (req, res) => {
    try {
        const { idVehicle, idCustomer, Estado } = req.body; // Usar nombres del modelo
        const updatedSale = await salesModel.findByIdAndUpdate(
            req.params.id,
            { idVehicle, idCustomer, Estado },
            { new: true }
        );
        
        if (!updatedSale) {
            return res.status(404).json({ message: "Venta no encontrada" });
        }
        
        res.json({ message: "Venta actualizada correctamente" });
    } catch (error) {
        console.error("Error updating sale:", error);
        res.status(500).json({ error: "Error al actualizar venta" });
    }
};

export default salesController;