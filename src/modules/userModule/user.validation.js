import joi from "joi";
import { userRoles } from "../../DB/models/user.model.js";
import { generalRules } from "../../utils/generalRules/index.js";


export const registerSchema = {
    body:joi.object({
    name:joi.string().alphanum().min(2).required(),
    email:generalRules.email.required(),
    password:generalRules.password.required(),
    cPassword:joi.string().valid(joi.ref("password")).required(), 
    role:joi.string().valid(userRoles.admin,userRoles.member).required(),
  }).required()
}



export const loginSchema = {
    body:joi.object({

    email:generalRules.email.required(),
    password:generalRules.password.required(),
   
  }).required()
}