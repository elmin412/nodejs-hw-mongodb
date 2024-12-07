import { Router } from "express";
import ctrlWrapper from "../utils/ctrlWrapper.js";
import  {validateBody}  from "../middlewares/validateBody.js";
import { userSigninSchema, userSignupSchema } from "../validation/user-schema.js";
import { loginController, registerController, refreshController, logoutController} from "../controllers/auth.js";


const authRouter = Router();

authRouter.post("/register", validateBody(userSignupSchema), ctrlWrapper(registerController));

authRouter.post("/login", validateBody(userSigninSchema), ctrlWrapper(loginController));

authRouter.post("/refresh", ctrlWrapper(refreshController));

authRouter.post("/logout", ctrlWrapper(logoutController));

export default authRouter;