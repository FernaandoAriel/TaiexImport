/*
    Campos:
    idBrand
    model
       
*/

import { Schema, model, ObjectId } from "mongoose";

const modelSchema = new Schema(
  {
    
    idBrand: {
      type: ObjectId,
      ref: "Brand",
    },

    model: {
        type: String,
        require: true,
    },

    
});

export default model("Model", modelSchema);
