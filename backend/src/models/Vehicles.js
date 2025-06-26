/*
    Campos:
    idModel
    year
    price
    carDetails
    equipment
    discount
    imgVehicle
*/

import { Schema, model, ObjectId } from "mongoose";

const vehiclesSchema = new Schema({
    idModel: {
        type: ObjectId,
        ref: "Model",
        required: true
    },
    year: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    carDetails: {
        type: String,
        required: true,
    },
    equipment: {
        type: String,
        required: true,
    },
    discount: {
        type: Number,
        required: true,
    },
    imgVehicle: {
        type: String,
        default: ""
    },
    idBodyWork: {
        type: ObjectId,
        ref: "Bodywork",
        required: true
    },
}, { 
    timestamps: true,
    toJSON: { virtuals: true }
});

// Campos virtuales para marca y modelo
vehiclesSchema.virtual('marca').get(function() {
    return this.idModel?.idBrand?.brand || "Marca no disponible";
});

vehiclesSchema.virtual('modelo').get(function() {
    return this.idModel?.model || "Modelo no disponible";
});

// Middleware para populate automático (solo uno, incluye ambos populate)
vehiclesSchema.pre(/^find/, function(next) {
    this.populate({
        path: 'idModel',
        populate: {
            path: 'idBrand',
            select: 'brand'
        }
    }).populate({
        path: 'idBodyWork',
        select: 'bodyWork'
    });
    next();
});

export default model("Vehicle", vehiclesSchema);