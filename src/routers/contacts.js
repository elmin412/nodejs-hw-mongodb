import {Router} from "express";
import { 
    getAllcontactsController, 
    getContactsByIdController, 
    addContactController, 
    patchContactController,
    deleteContactController
} from "../controllers/contacts.js";
import ctrlWrapper from "../utils/ctrlWrapper.js";
import isValidId from "../middlewares/isValidId.js";


const contactsRouter = Router();

contactsRouter.get('/', ctrlWrapper(getAllcontactsController));

contactsRouter.get("/:contactId", isValidId, ctrlWrapper(getContactsByIdController));

contactsRouter.post("/", ctrlWrapper(addContactController))

contactsRouter.patch("/:contactId", isValidId, ctrlWrapper(patchContactController))

contactsRouter.delete("/:contactId", isValidId, ctrlWrapper(deleteContactController))

export default contactsRouter;