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

Contacthcema.pre('remove', function(next:Function) {
    // 'this' is the client being removed. Provide callbacks here if you want
    // to be notified of the calls' result.
    //Vouchers.remove({user_id: this._id}).exec();
    console.log("pre test", this);
    next();
});

export default model<IContact>('Contacts', Contacthcema);