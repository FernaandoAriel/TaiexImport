/*
    Campos:
        brand
*/

import { Schema, model, ObjectId } from "mongoose";

// models/Brand.js
const brandSchema = new Schema({
    brand: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        default: ""
    }
}, { timestamps: true });

export default model("Brand", brandSchema);