/*
    Campos:
    idVehicle (ObjectId - referencia a vehículos)
    idCustomer (ObjectId - referencia a clientes)
    Estado
*/

import { Schema, model } from "mongoose";

const salesSchema = new Schema(
    {
      idVehicle: {
        type: Schema.Types.ObjectId,
        ref: "Vehicles", // Debe coincidir exactamente con el nombre del modelo de vehículos
        required: true
      },
      idCustomer: {
        type: Schema.Types.ObjectId,
        ref: "Customer", // Debe coincidir exactamente con el nombre del modelo de clientes
        required: true
      },
      Estado: {
        type: String,
        required: true,
        enum: ["Pendiente", "Completada", "Cancelada"],
        default: "Pendiente"
      }
    },
    { timestamps: true }
);

export default model("sales", salesSchema);