import { getContacts, getContact, addContact, upserContact, deleteContaact } from "../services/contact-service.js";
import createHttpError from "http-errors";
import  parsePaginationParams  from "../utils/parsePaginationParams.js";
import { contactFieldList } from "../constants/constants.js";
import parseSortParams from "../utils/parseSortParams.js";
import parseContactFilterParams from "../utils/parseContactFilterParams.js";
// import saveFileToPublicDir from '../utils/saveFileToPublicDir.js'
import saveFileToCloudinary from "../utils/saveFileToCloudinary.js";

export const getAllcontactsController = async(req, res, ) => {
  const {_id: userId} = req.user ;
  const {query} = req;
  const {page, perPage} = parsePaginationParams(query);
  const { sortBy, sortOrder } = parseSortParams(query, contactFieldList);
  const filter = {...parseContactFilterParams(query), userId};


  const data  = await getContacts({
    page, 
    perPage,
    sortBy,
    sortOrder,
    filter,
  });

    res.json({
      status: 200,
      message: "Successfully found contacts!",
      data 
      
    });
  }; 

export const getContactsByIdController = async(req, res) => {
      
      const {contactId: id } = req.params;
      const {_id: userId} = req.user;
      const data = await getContact({_id: id , userId});
      if(!data) {
        throw createHttpError(404, `Сontact with id=${id } not found!`);
      } 
        res.json({
        status: 200,
        message: `Successfully found contact with id=${id }!`,
        data
      });
  };
export const addContactController = async(req, res) => {

  const {_id: userId} = req.user;
  let photo = "";

  // зберігання на диску
  // if(req.file) {
  //   photo = await saveFileToPublicDir(req. file, 'photo');
  // }
  // зберігання на хмарному сховищі
  if(req.file) {
    photo = await saveFileToCloudinary(req. file, 'photo');
  }
  
  const data = await addContact({...req.body, userId, photo});

  res.status(201).json({
    status: 201,
    message: "Successfully created a contact!",
    data
  })


};

export const patchContactController = async(req, res) => {
 
  const {id} = req.params;
  const {_id: userId} = req.user;
  let photo = ""
  if(req.file) {
    photo = await saveFileToCloudinary(req. file, 'photo');
  }
  
  const result = await upserContact({id, userId}, photo)

  
  if(!result) {
    throw createHttpError(404, `Сontact with id=${id} not found!`);
  }
  res.json({
    status: 200,
    message: "Successfully patched a contact!",
    data: result.data,

  })
};

export const deleteContactController = async (req, res) => {
  const {id} = req.params;
  const {_id: userId} = req.user;
  const result = await deleteContaact({id, userId});

  if(!result) {
    throw createHttpError(404, `Сontact with id=${id} not found!`);
  }

  res.status(204).json({
    status: 204,
    message: "Successfully delete a contact!",

  })
}