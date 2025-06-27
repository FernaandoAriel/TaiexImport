/*
    Campos:
        firstName
        lastName
        email
        password
        
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
        }
    });

export default model("Customer", customersSchema);
