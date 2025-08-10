import mongoose from "mongoose";


const bookSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    },
    publishedYear:{
        type:Number,
        required:true
    },
    availableCopies:{
        type:Number,
        required:true,
        default:1
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
},{
    autoCreate:true
})

const bookModel = mongoose.models.Book || mongoose.model("Book",bookSchema)

export default bookModel