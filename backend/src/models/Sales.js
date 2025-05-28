/*
    Campos:
    id_carros
    id_clientes
    Estado
*/

import { Schema, model } from "mongoose";

const salesSchema = new Schema(
    {
      idVehicle: {  // Cambiado a idVehicle para coincidir con DB
        type: Schema.Types.ObjectId,
        ref: "Vehicles", 
        required: true
      },
      idCustomer: {  // Cambiado a idCustomer para coincidir con DB
        type: Schema.Types.ObjectId,
        ref: "Customers",
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