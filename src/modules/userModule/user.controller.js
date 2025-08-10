import {Router} from "express"
import * as US from "./user.service.js"
import * as UV from "./user.validation.js"
import { validation } from "../../middleware/validation.js";
import { authentication } from "../../middleware/authentication.js";

const userRouter = Router();

userRouter.post("/register",validation(UV.registerSchema),US.register);
userRouter.post("/login",validation(UV.loginSchema),US.login);
userRouter.get("/profile",authentication,US.getProfile);

export default userRouter