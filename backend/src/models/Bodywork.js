/*
    Campos:
       bodyWork
*/

import { Schema, model, ObjectId } from "mongoose";

const billSchema = new Schema(
  {
    bodyWork: {
        type: String,
        require: true,
    },
});

export default model("Bodywork", bodyworkSchema);
