/*
    Campos:
        firstName
        lastName
        email
        password
        profilePicture
        birthDate
        
        }

*/

import { Schema, model, ObjectId } from "mongoose";

const customersSchema = new Schema(
    {
        firstName: {
            type: String,
            require: true,
        },
        lastName: {
            type: String,
            require: true,
        },
        email: {
            type: String,
            require: true,
        },
        password: {
            type: String,
            require: true,
        },
        profilePicture: {
            type: String,
            require: true,
        },
        birthDate: {
            type: Date,
            require: true,
        },
    });

export default model("Customers", customersSchema);