import multer from "multer";
import createHttpError from "http-errors";
 

import { TEMP_UPLOAD_DIR } from "../constants/contacts.js";


const storage = multer.diskStorage({
    destination: TEMP_UPLOAD_DIR,
    filename: (req, file, callback)=> {
        const uniquePrefix = Date.now();
        const filename = `${uniquePrefix}_${file.originalname}`;
        callback(null, filename);
    }
})

const limits = {
    fileSize: 1024 * 1024 * 10,
};

const fileFilter = (req, file, callback) => {
    const extension = file.originalname.split(".").pop();
    if(extension === "exe") {
        return callback(createHttpError(400, "exe file not allow"));
    }
    callback(null, true);
}

const upload = multer({
    storage,
    limits,
    fileFilter,
})

export default upload;