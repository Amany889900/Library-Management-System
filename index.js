import path from "path";
import dotenv from "dotenv";
dotenv.config({path:path.resolve("src/config/.env")});
import express from  "express"
import bootstrap from "./src/app.controller.js";


const port = process.env.PORT || 5000

const app = express();

bootstrap(app,express);

app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})