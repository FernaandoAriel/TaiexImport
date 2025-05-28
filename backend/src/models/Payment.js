/*
    Campos:
        paymentMethod
*/

import { Schema, model, ObjectId } from "mongoose";

const paymentSchema = new Schema(
    {

        paymentMethod: {
            type: String,
            require: true,
        },

    });

export default model("Payment", paymentSchema);