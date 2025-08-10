import userModel from "../DB/models/user.model.js";
import jwt from "jsonwebtoken";
import { verifyToken } from './../utils/token/verifyToken.js';


export const authentication = async(req,res,next) =>{
     const {authorization} = req.headers;
     const [prefix,token] = authorization.split(" ") || []; 
     if(!prefix || !token){
        throw new Error("token does not exist");
     }
     let signature = "";
     if(prefix == "bearer"){
        signature = process.env.ACCESS_TOKEN_USER;
     }else if(prefix=="admin"){
        signature=process.env.ACCESS_TOKEN_ADMIN;
     }else{
       throw new Error("Invalid prefix");
     }
     const decoded_access_token = await verifyToken({token:token,SIGNATURE:signature});
     if(!(decoded_access_token?.email)){
       throw new Error("Invalid token",{cause:400});
     }
     const existingUser = await userModel
    .findOne({ email: decoded_access_token.email })
    .select("-password");
    if(!existingUser){
      throw new Error("User does not exist",{cause:404});
    }
     req.existingUser=existingUser;
     req.decoded_access_token=decoded_access_token;
     return next();
}


