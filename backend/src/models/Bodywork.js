/*
    Campos:
    bodyWork
*/

import { Schema, model, ObjectId } from "mongoose";

const bodyworkSchema = new Schema(
    {
        bodyWork: {
            type: String,
            required: true
        },
    }
);

export default model("Bodywork", bodyworkSchema);