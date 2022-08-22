import express from "express";
import bodyParser from "body-parser";

//db
import mongoose from "mongoose";

//Import routers
import contactsRouter from "./routes/contacts.router";

//cors
import cors from "cors";

//dotenv to store sensitive data
import * as dotenv from "dotenv";

//Socket.io
import { errorHandler } from "./_helper/error-handler";

//multer
import multer from 'multer';
import path from "path";


const app = express();

//serve files
var dir = path.join(__dirname, 'public');

console.log('dir', dir)

app.use(express.static(dir));

//setup dotenv
dotenv.config();


//basic body parser for req
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 


//temp usage for cors. We have to disable it on production.
app.use(cors());

//use global error handling
app.use(errorHandler);


//routers
app.use("/contact", contactsRouter);

//Connect to database
mongoose.connect((process.env.DB_URL as string), {}).then(() => console.log("Mongo DB is connected.")).catch((err) => console.log("Error when connecting to Mongo DB", err));

// make sure Mongoose runs validators on update (not just on create)
mongoose.set('runValidators', true);


export default app;
