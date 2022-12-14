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

//serve avatars to public
//TODO: avatars should be in different cloud service on live app.
var dir = path.join(__dirname, 'public');

app.use(express.static(dir));

//setup dotenv
dotenv.config();

//basic body parser for req and extended for formData
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 


//temp usage for cors. We have to disable it on production.
app.use(cors());

//use global error handling
app.use(errorHandler);

//routers
app.use("/contact", contactsRouter);

export default app;
