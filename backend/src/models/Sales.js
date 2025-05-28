/*
    Campos:
    id_carros
    id_clientes
    Estado
*/

import { Schema, model } from "mongoose";

const salesSchema = new Schema(
    {
        idVehicle: {
            type: Schema.Types.ObjectId,
            ref: "Vehicles",
        },

        idCustomer: {
            type: Schema.Types.ObjectId,
            ref: "Customers",
        },

        state: {
            type: String,
            require: true
        }
    });

export default model("sales", salesSchema);