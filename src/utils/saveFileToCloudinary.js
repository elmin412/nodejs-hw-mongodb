import {v2 as cloudinary} from "cloudinary";
import fs from "node:fs/promises";
import env from "./env.js";



 const cloud_name = env("CLOUD_NAME");
 const api_key = env("API_KEY");
 const api_secret = env("API_SECRET");

 cloudinary.config({
    cloud_name,
    api_key,
    api_secret,

 })

 const saveFileToCloudinary = async (file, folder) => {

    const respons = await cloudinary.uploader.upload(file.path, {
        folder
    });

    await fs.unlink(file.path);

    return respons.secure_url;
 }


 export default saveFileToCloudinary;