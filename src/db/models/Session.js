import { Schema, model } from "mongoose";
import { mongooseSaveError } from "./Hooks.js";

const sessionSchema = new Schema ({


    userId: {
        type: String,
        ref: "user",
        required: true
    },

    accessToken: {
        type: String,
        required: true

    },

    refreshToken: {
        type: String,
        required: true
    },

    accessTokenValidUntil: {
        type: Date,
        required: true
    },

    refreshTokenValidUntil: {
        type: Date,
        required: true
    }

},
    {
        timestamps: true,
        versionKey: false
    },
)

sessionSchema.post("save", mongooseSaveError) 
const Session = model("session", sessionSchema)

export default Session; 