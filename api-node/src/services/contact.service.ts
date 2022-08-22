import { ObjectId } from "mongoose";
import { IContact } from "../interfaces/db.interfaces";
import Contacts from "../models/contact.model";

export async function getContactsService(query:any) {
    try {
        const contacts = Contacts.find(query);
        return contacts
    }
    catch(err:any) {
        throw Error("Error while getting Contacts");
    }
}

export async function getContactService(query:any) {
    try {
        const contact = Contacts.findOne(query);
        return contact
    }
    catch(err:any) {
        throw Error("Error while getting one Contact");
    }
}

export async function createContactService(contact:IContact) {
    try {
        const newContact = Contacts.create(contact);
        return newContact
    }
    catch(err:any) {
        throw Error("Error while creating new Contact");
    }
}

export async function updateContactService(_id:string, newData:any) {
    try {
        const updatedContact = Contacts.findOneAndUpdate({_id:_id}, newData, {new:true});
        return updatedContact
    }
    catch(err:any) {
        throw Error("Error while updating Contact");
    }
}

export async function deleteContactService(query:any) {
    try {
        const deleted = Contacts.deleteOne(query);
        return deleted
    }
    catch(err:any) {
        throw Error("Error while deleting Contact");
    }
}