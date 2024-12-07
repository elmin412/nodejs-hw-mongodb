import { getContacts, getContactById, addContact, upserContact, deleteContaact } from "../services/contact-service.js";
import createHttpError from "http-errors";


export const getAllcontactsController = async(req, res, ) => {
    const data  = await getContacts();
    res.json({
      status: 200,
      message: "Successfully found contacts!",
      data 
      
    });
  }; 

export const getContactsByIdController = async(req, res) => {
  
      const {contactId} = req.params;
      const data = await getContactById(contactId);
      if(!data) {
        throw createHttpError(404, `Сontact with id=${contactId} not found!`);
      } 
        res.json({
        status: 200,
        message: `Successfully found contact with id=${contactId}!`,
        data
      });
  };
export const addContactController = async(req, res) => {

  const data = await addContact(req.body);

  res.status(201).json({
    status: 201,
    message: "Successfully created a contact!",
    data
  })


};

export const patchContactController = async(req, res) => {
  const {contactId} = req.params;
  const result = await upserContact({_id: contactId}, req.body)

  if(!result) {
    throw createHttpError(404, `Сontact with id=${contactId} not found!`);
  }
  res.json({
    status: 200,
    message: "Successfully patched a contact!",
    data: result.data,

  })
};

export const deleteContactController = async (req, res) => {
  const {contactId} = req.params;

  const result = await deleteContaact({_id: contactId});


  if(!result) {
    throw createHttpError(404, `Сontact with id=${contactId} not found!`);
  }

  res.status(204).json({
    status: 204,
    message: "Successfully delete a contact!",

  })
}