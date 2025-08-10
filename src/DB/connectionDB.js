import mongoose from "mongoose"

const testConnectionDB = async(req,res,next) =>{
    await mongoose.connect(process.env.DB_URL)
    .then(()=>{
        console.log("Connected to DB successfully!!");
    })
    .catch((error)=>{
        console.log("Connection to DB failed",error);
    })
}

export default testConnectionDB