import bookModel from "../../DB/models/book.model.js";
import transactionModel, { transStatus } from "../../DB/models/transaction.model.js";


export const borrowTransaction = async(req,res,next) =>{
   const userId = req.existingUser;
   const {bookId} = req.body;
   const existingBook = await bookModel.findById(bookId);
   if(!existingBook){
    throw new Error("Book is not available or out of stock");
   }
   const borrowTransaction = await transactionModel.create({userId,bookId,status:transStatus.borrowed,borrowDate:Date.now()});
   existingBook.availableCopies =  existingBook.availableCopies -1;
   await existingBook.save();
   return res.status(201).json({message:"Borrow transaction issued successfully!!",borrowTransaction,existingBook});
}

export const returnTransaction = async(req,res,next) =>{
   const transId = req.params.id;
   const existingTrans = await transactionModel.findById(transId);

   if(!existingTrans){  
    throw new Error("No transaction found");  
   }

   existingTrans.status = transStatus.returned;
   existingTrans.returnDate = Date.now();
   await existingTrans.save();

   const bookId = existingTrans.bookId;
   const book = await bookModel.findById(bookId);
   book.availableCopies = book.availableCopies+1;
   await book.save();

   return res.status(200).json({message:"Return transaction issued successfully!!",existingTrans,book});


}

export const listTransactions = async(req,res,next) =>{
   const userId = req.existingUser;
   
   const trans = await transactionModel.find({userId}).populate({
    path:"bookId"
   });

   return res.status(200).json({trans});

}