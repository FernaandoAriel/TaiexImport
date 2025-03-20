/*
    Campos:
        id
        idPayment
        amount
        billDetails
        bilingAdress
        idOrder
*/

import { Schema, model, ObjectId } from "mongoose";

const billSchema = new Schema(
  {
    
    idPayment: {
      type: ObjectId,
      ref: "Payment",
    },

    amount: {
        type: Number,
        require: true,
        min: 0,
    },

    billDetails: {
        type: String,
        require: true,
    },

    billingAddress: {
        type: String,
        require: true,
    },

    idOrder: {
        type: ObjectId,
        ref: "Order",
    },
});

export default model("Bill", billSchema);
