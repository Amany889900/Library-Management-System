import {Router} from "express"
import * as TS from "./transaction.service.js"
import * as TV from "./transaction.validation.js"
import { validation } from "../../middleware/validation.js";
import { authentication } from "../../middleware/authentication.js";

const transactionRouter = Router();

transactionRouter.post("/borrow",validation(TV.borrowTransactionSchema),authentication,TS.borrowTransaction);
transactionRouter.put("/return/:id",authentication,TS.returnTransaction);
transactionRouter.get("/user",authentication,TS.listTransactions);


export default transactionRouter