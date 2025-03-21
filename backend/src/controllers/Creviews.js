/*
     Campos:
        idCustomer
        reviewText
        rating
       
*/

//Array de metodos (C R U D)
const reviewsController = {};
import reviewsModel from "../models/Reviews.js";

// SELECT
reviewsController.getreviews = async (req, res) => {
  const reviews = await reviewsModel.find();
    res.json(reviews);
};

// INSERT
reviewsController.createreviews = async (req, res) => {
  const { idCustomer, reviewText, rating, idVehicle } = req.body;
  const newreviews = new reviewsModel({ idCustomer, reviewText, rating, idVehicle});
  await newreviews.save();
    res.json({ message: "reviews save" });
};

// DELETE
reviewsController.deletereviews = async (req, res) => {
const deletedreviews = await reviewsModel.findByIdAndDelete(req.params.id);
  if (!deletedreviews) {
    return res.status(404).json({ message: "reviews dont find" });
  }
  res.json({ message: "reviews deleted" });
};

// UPDATE
reviewsController.updatereviews = async (req, res) => {
  // Solicito todos los valores
  const { idCustomer, reviewText, rating, idVehicle } = req.body;
  // Actualizo
  await reviewsModel.findByIdAndUpdate(
    req.params.id,
    {
        idCustomer,
        reviewText,
        rating,
        idVehicle
    },
    { new: true }
  );
  // muestro un mensaje que todo se actualizo
  res.json({ message: "reviews update" });
};

    export default reviewsController;
