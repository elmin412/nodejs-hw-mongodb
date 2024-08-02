import { Schema, model, version } from "mongoose"
import { typeContact } from "../../constants/constants.js";



const contactShema = new Schema ({
    name: {
       type: String,
       required: true,
    }, 
    
    phoneNumber: {
        type: String,
        required: true,
    }, 
    
    email: {
        type: String,
        required: false,
      },
    
    isFavourite: {
        type: Boolean,
        default: false,

    }, 
    
    contactType: {
        type: String,
        enum: typeContact, 
        required: false,
        default: "personal"
    }, 
},
    {
        timestamps: true,
        versionKey: false
    },
)

const Contact = model("contact", contactShema);



export default Contact;