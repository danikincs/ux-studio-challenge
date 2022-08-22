import { model, Schema } from "mongoose";
import mongoose from 'mongoose';
import { IContact } from "../interfaces/db.interfaces";

/**
 * Schema fro groups
 */
const Contacthcema: Schema = new mongoose.Schema({
    __v: { type: Number, select: false },
    name: { type: String, required:true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    avatar: { type: String, required:true },
});

export default model<IContact>('Contacts', Contacthcema);