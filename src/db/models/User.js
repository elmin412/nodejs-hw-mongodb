import  { Schema, model } from "mongoose"
import { emailRegexp } from "../../constants/users-constant.js";
import { mongooseSaveError } from "./Hooks.js";


const userSchema = new Schema ({

    name: {
        type: String, 
        required: true
    },
    email: {
       type: String, 
       email: emailRegexp,
       unique: true,
       required: true
    },

    password: {

        type: String, 
        required: true
    }
},
    {
        timestamps: true,
        versionKey: false
    },
)

userSchema.post("save", mongooseSaveError) 
const User = model("user", userSchema)

export default User;