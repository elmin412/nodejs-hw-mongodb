import { Router } from "express";
import ctrlWrapper from "../utils/ctrlWrapper.js";
import  {validateBody}  from "../middlewares/validateBody.js";
import { 
    resetEmailSchema, 
    resetPasswordSchema, 
    userSigninSchema, 
    userSignupSchema } from "../validation/user-schema.js";
import { 
    loginController, 
    registerController, 
    refreshController, 
    logoutController, 
    resetEmailController, 
    resetPasswordController} from "../controllers/auth.js";



const authRouter = Router();

authRouter.post("/register", validateBody(userSignupSchema), ctrlWrapper(registerController));

authRouter.post("/login", validateBody(userSigninSchema), ctrlWrapper(loginController));

authRouter.post("/refresh", ctrlWrapper(refreshController));

authRouter.post("/logout", ctrlWrapper(logoutController));

authRouter.post("/send-reset-email", validateBody(resetEmailSchema), ctrlWrapper(resetEmailController));

authRouter.post("/reset-pwd", validateBody(resetPasswordSchema), ctrlWrapper(resetPasswordController));

export default authRouter;