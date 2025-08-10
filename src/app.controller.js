import userModel from "./DB/models/user.model.js"
import transactionModel from "./DB/models/transaction.model.js"
import bookModel from "./DB/models/book.model.js"
import testConnectionDB from "./DB/connectionDB.js"
import { globalErrorHandling } from "./middleware/globalErrorHandling.js";
import userRouter from "./modules/userModule/user.controller.js"
import bookRouter from "./modules/bookModule/book.controller.js"
import transactionRouter from "./modules/transactionModule/transaction.controller.js";


const bootstrap = async (app,express)=>{
   app.use(express.json());

   testConnectionDB();

    app.use("/api/users",userRouter)
    app.use("/api/books",bookRouter)
    app.use("/api/transactions",transactionRouter)



    app.use("{/*demo}",(req,res,next)=>{
    throw new Error(`Url not found ${req.originalUrl}`,{cause:404});
    })

    app.use(globalErrorHandling);

}





export default bootstrap 