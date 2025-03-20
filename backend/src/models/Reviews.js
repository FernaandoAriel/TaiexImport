/*
    Campos:
        idCustomer
        reviewText
        rating
        idVehicle
*/

import { Schema, model, ObjectId } from "mongoose";

const reviewsSchema = new Schema(
  {
    
    idCustomer: {
      type: ObjectId,
      ref: "Customer",
    },

    reviewText: {
        type: String,
        require: true,
    },

    rating: {
        type: Number,
        require: true,
    },

    idVehicle: {
        type: ObjectId,
        ref: "Vehicle",
    },

    
});

export default model("Reviews", reviewsSchema);
