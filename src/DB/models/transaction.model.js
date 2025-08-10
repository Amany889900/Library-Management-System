import mongoose from "mongoose";

export const transStatus={
  borrowed:"borrowed",
  returned:"returned"
}
const transactionSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    bookId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Book",
        required:true
    },
    borrowDate:{
        type:Date,
        required:true,
        default:Date.now
    },
    returnDate:{
        type:Date
    },
    status:{
        type:String,
        required:true,
        enum:Object.values(transStatus),
        default:transStatus.borrowed
    }
},{
    autoCreate:true
})

const transactionModel = mongoose.models.Transaction || mongoose.model("Transaction",transactionSchema)

export default transactionModel