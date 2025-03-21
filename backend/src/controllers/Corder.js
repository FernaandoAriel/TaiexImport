/*
    Campos:
        idCustomer
        order
*/

//Array de metodos (C R U D)
const orderController = {};
import orderModel from "../models/Order.js";

// SELECT
orderController.getorder = async (req, res) => {
  const order = await orderModel.find();
    res.json(order);
};

// INSERT
orderController.createorder = async (req, res) => {
  const { idCustomer, order } = req.body;
  const neworder = new orderModel({ idCustomer, order });
  await neworder.save();
    res.json({ message: "order save" });
};

// DELETE
orderController.deleteorder = async (req, res) => {
const deletedorder = await orderModel.findByIdAndDelete(req.params.id);
  if (!deletedorder) {
    return res.status(404).json({ message: "order dont find" });
  }
  res.json({ message: "order deleted" });
};

// UPDATE
orderController.updateorder = async (req, res) => {
  // Solicito todos los valores
  const { idCustomer, order } = req.body;
  // Actualizo
  await orderModel.findByIdAndUpdate(
    req.params.id,
    {
        idCustomer,
        order
    },
    { new: true }
  );
  // muestro un mensaje que todo se actualizo
  res.json({ message: "order update" });
};

    export default orderController;
