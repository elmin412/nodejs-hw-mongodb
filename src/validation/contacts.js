import Joi from "joi";
import { typeContact } from "../constants/constants.js";


export const addContactsSchema = Joi.object({
    name: Joi.string().required().min(3).max(20),
    phoneNumber: Joi.number().required().integer(),
    email: Joi.string().email().required(),
    isFavourite: Joi.boolean(),
    contactType: Joi.string().valid(...typeContact).required(),
  });

  export const updateContactsSchema = Joi.object({
    name: Joi.string().min(3).max(20),
    phoneNumber: Joi.number().integer(),
    email: Joi.string().email(),
    isFavourite: Joi.boolean(),
    contactType: Joi.string().valid(...typeContact),
  });
