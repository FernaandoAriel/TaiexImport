/*
    Campos:
    idModel
    year
    price
    carDetails
    equipment
    discount
    imgVehicle

*/

import { Schema, model, ObjectId } from "mongoose";
    
const vehiclesSchema = new Schema(
  {
    
    idModel: {
      type: ObjectId,
      ref: "Model",
    },

    year: {
        type: Number,
        require: true,
    },

    price: {
        type: Number,
        require: true,
    },

    carDetails: {
        type: String,
        require: true,
    },

    equipment: {
        type: String,
        require: true,
    },

    discount: {
        type: Number,
        require: true,
    },
});

export default model("Vehicles", vehiclesSchema);
