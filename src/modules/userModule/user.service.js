
import userModel, { userRoles } from "../../DB/models/user.model.js";
import {generateToken,verifyToken,Hash,Compare} from "../../utils/index.js";
export const register = async(req,res,next)=>{
   const {email,password,name,role} = req.body;

   //check if user already exists 
   const existingUser = await userModel.findOne({email});
   if(existingUser){
     throw new Error("Email already exists",{cause:409});
    }

   // hash password 
   const hashedPass = await Hash({plainText:password,SALT_ROUNDS:process.env.SALT_ROUNDS});

   const newUser = await userModel.create({name,email,password:hashedPass,role})
   return res.status(201).json({message:"User created successfully",newUser})
}

export const login = async(req,res,next)=>{
   const {email,password} = req.body;

   //check if user exists 
   const existingUser = await userModel.findOne({email});
   if(!existingUser){
     throw new Error("User does not exist",{cause:409});
    }

   // compare password 
   const matchedPassword = await Compare({plainText:password,cipherText:existingUser.password});
   if(!matchedPassword){
    throw new Error("Password is incorrect",{cause:400});
  }

   //create token
  const access_token = await generateToken({payload:{id:existingUser._id,email:existingUser.email},SIGNATURE:existingUser.role==userRoles.member?process.env.ACCESS_TOKEN_USER:process.env.ACCESS_TOKEN_ADMIN,options:{expiresIn:'1h'}})
  const refresh_token = await generateToken({payload:{id:existingUser._id,email:existingUser.email},SIGNATURE:existingUser.role==userRoles.member? process.env.REFRESH_TOKEN_USER:process.env.REFRESH_TOKEN_ADMIN,options:{expiresIn:'1y'}})
  return res.status(200).json({message:"success",access_token,refresh_token });
}

export const getProfile = async(req,res,next)=>{
    
    return res.status(200).json({message:"success",user:req.existingUser});     
   
}