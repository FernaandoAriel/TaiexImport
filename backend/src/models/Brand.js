/*
    Campos:
        brand
*/

import { Schema, model, ObjectId } from "mongoose";

const brandSchema = new Schema(
  {
    
    brand: {
      type: String,
      require: true,
    },


});

export default model("Brand", brandSchema);
