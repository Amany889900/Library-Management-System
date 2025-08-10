import {Router} from "express"
import * as BS from "./book.service.js"
import * as BV from "./book.validation.js"
import { validation } from "../../middleware/validation.js";
import { authentication } from "../../middleware/authentication.js";

const bookRouter = Router();

bookRouter.post("/",validation(BV.addBookSchema),BS.addBook);
bookRouter.get("/",BS.listBooks);
bookRouter.put("/:id",validation(BV.updateBookSchema),authentication,BS.updateBook);
bookRouter.delete("/:id",validation(BV.deleteBookSchema),authentication,BS.deleteBook);



export default bookRouter