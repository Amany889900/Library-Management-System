import mongoose from "mongoose";

export const userRoles = {
    admin:"admin",
    member:"member"
}

const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true,
        enum:Object.values(userRoles),
        default:userRoles.member
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
},{
    autoCreate:true
})

const userModel = mongoose.models.User || mongoose.model("User",userSchema)

export default userModel