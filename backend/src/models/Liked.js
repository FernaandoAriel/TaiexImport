/*
    Campos:
    idVehicle
    idCustomer
    favorite
        
*/

import { Schema, model, ObjectId } from "mongoose";

const likedSchema = new Schema(
  {
    
    idVehicle: {
      type: ObjectId,
      ref: "Vehicle",
    },

    idCustomer: {
        type: ObjectId,
        ref: "Customer",
    },

    favorite: {
        type: Boolean,
        require: true,
    },

    
});

export default model("Liked", likedSchema);
