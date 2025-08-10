import bookModel from "../../DB/models/book.model.js";
import mongoose from 'mongoose';



export const addBook = async(req,res,next)=>{
  const {title,author,publishedYear,availableCopies} = req.body;
  const newBook = await bookModel.create({title,author,publishedYear,availableCopies})
  return res.status(201).json({message:"Book created successfully",newBook})
}

export const listBooks = async(req,res,next)=>{
  let books = [];
  if(req?.query?.title == ""){ //key without value
    books = await bookModel.find().sort({title:-1});
  }
  else if(req?.query?.publishedYear == ""){
    books = await  bookModel.find().sort({publishedYear:-1});
  }
  else books = await bookModel.find();
  return res.status(200).json({books})
}

export const updateBook = async(req,res,next)=>{
  const id = new mongoose.Types.ObjectId(req.params);
  const existingBook = await bookModel.findById(id);
  if(!existingBook){
    throw new Error("Book is not not found",{cause:404});
  }
  if(req.body.title) existingBook.title = req.body.title;
  if(req.body.author) existingBook.author = req.body.author;
  if(req.body.publishedYear) existingBook.publishedYear = req.body.publishedYear;
  if(req.body.availableCopies) existingBook.availableCopies= req.body.availableCopies;
  await existingBook.save();
  return res.status(201).json({message:"Book updated successfully",existingBook});
}

export const deleteBook = async(req,res,next)=>{
  const id = new mongoose.Types.ObjectId(req.params);
  const existingBook = await bookModel.findById(id);
  if(!existingBook){
    throw new Error("Book is not not found",{cause:404});
  }
  await bookModel.deleteOne({_id:id});
  return res.status(201).json({message:"Book deleted successfully"});
}