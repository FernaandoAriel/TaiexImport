//Array de metodos (C R U D)
const vehiclesController = {};
import vehiclesModel from "../models/Vehicles.js";

// SELECT
vehiclesController.getvehicles = async (req, res) => {
  const vehicles = await vehiclesModel.find();
  res.json(vehicles);
};

// INSERT
vehiclesController.createvehicles = async (req, res) => {
  const { idModel, year, price, carDetails, equipment, discount, imgVehicle } =
    req.body;
  const newvehicles = new vehiclesModel({
    idModel,
    year,
    price,
    carDetails,
    equipment,
    discount,
    imgVehicle,
  });
  await newvehicles.save();
  res.json({ message: "vehicle save" });
};

// DELETE
vehiclesController.deletevehicles = async (req, res) => {
  const deletedvehicles = await vehiclesModel.findByIdAndDelete(req.params.id);
  if (!deletedvehicles) {
    return res.status(404).json({ message: "vehicle dont find" });
  }
  res.json({ message: "vehicle deleted" });
};

// UPDATE
vehiclesController.updatevehicles = async (req, res) => {
  // Solicito todos los valores
  const { idModel, year, price, carDetails, equipment, discount, imgVehicle } =
    req.body;
  // Actualizo
  await vehiclesModel.findByIdAndUpdate(
    req.params.id,
    {
      idModel,
      year,
      price,
      carDetails,
      equipment,
      discount,
      imgVehicle,
    },
    { new: true }
  );
  // muestro un mensaje que todo se actualizo
  res.json({ message: "vehicle update" });
};

export default vehiclesController;
