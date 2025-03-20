/*
    Campos:
        idCustomer
        order
*/

import { Schema, model, ObjectId } from "mongoose";

const orderSchema = new Schema(
  {
    
    idCustomer: {
      type: ObjectId,
      ref: "Customer",
    },

    order: {
        type: String,
        require: true,
    },

    
});

export default model("Order", orderSchema);
