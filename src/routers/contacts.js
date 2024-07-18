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
import {validateBody} from "../middlewares/validateBody.js"
import { addContactsSchema } from "../validation/contacts.js";
import { updateContactsSchema } from "../validation/contacts.js";
import authenticate from "../middlewares/authenticate.js";


import upload from "../middlewares/upload.js";

const contactsRouter = Router();

contactsRouter.use(authenticate);

contactsRouter.get('/', ctrlWrapper(getAllcontactsController));

contactsRouter.get("/:contactId", isValidId, ctrlWrapper(getContactsByIdController));

contactsRouter.post("/", upload.single("avatar"), validateBody(addContactsSchema), ctrlWrapper(addContactController))

contactsRouter.patch("/:contactId", upload.single("avatar"), validateBody(updateContactsSchema), isValidId, ctrlWrapper(patchContactController))

contactsRouter.delete("/:contactId", isValidId, ctrlWrapper(deleteContactController))

export default contactsRouter;