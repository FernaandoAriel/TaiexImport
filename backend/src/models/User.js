/*
    Campos:
       firstName
       lastName
       email
       password
       profilePicture
       privilages
*/

import { Schema, model } from "mongoose";

const userSchema = new Schema(
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

        privilages: {
            type: String,
            require: true,
        },
        
    },
    { timestamps: true,
        strict: false,
    }
);

export default model("User", userSchema);
