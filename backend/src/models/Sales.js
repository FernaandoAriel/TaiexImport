/*
    Campos:
    id_carros
    id_clientes
    Estado
*/

import { Schema, model, ObjectId } from "mongoose";

const salesSchema = new Schema(
    {
        idVehicle: {
            type: ObjectId,
            ref: "Vehicle",
        },

        idCustomer: {
            type: ObjectId,
            ref: "Customer",
        },

        state: {
            type: String,
            require: true
        }
    });

export default model("sales", salesSchema);