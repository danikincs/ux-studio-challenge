import { ObjectId } from "mongoose";
import { IContact } from "../interfaces/db.interfaces";
import Contacts from "../models/contact.model";

/**
 * get multiple contact objects
 * @param query object with query parameters
 * @returns list of contacts
 */
export async function getContactsService(query:any) {
    try {
        const contacts = Contacts.find(query);
        return contacts
    }
    catch(err:any) {
        throw Error("Error while getting Contacts");
    }
}

/**
 *  Get one contact object
 * @param query object with query parameters
 * @returns one contact object
 */
export async function getContactService(query:any) {
    try {
        const contact = Contacts.findOne(query);
        return contact
    }
    catch(err:any) {
        throw Error("Error while getting one Contact");
    }
}

/**
 * Create a contact object
 * @param contact contact data with every required parameter
 * @returns new contact object
 */
export async function createContactService(contact:IContact) {
    try {
        const newContact = Contacts.create(contact);
        return newContact
    }
    catch(err:any) {
        throw Error("Error while creating new Contact");
    }
}

/**
 * Update a contact object
 * @param _id string as object_id
 * @param newData contact data (fields not required)
 * @returns new contact object
 */
export async function updateContactService(_id:string, newData:any) {
    try {
        const updatedContact = Contacts.findOneAndUpdate({_id:_id}, newData, {new:true});
        return updatedContact
    }
    catch(err:any) {
        throw Error("Error while updating Contact");
    }
}

/**
 * Delete a contact object
 * @param query object with parameters
 * @returns deletion success
 */
export async function deleteContactService(query:any) {
    try {
        const deleted = Contacts.deleteOne(query);
        return deleted
    }
    catch(err:any) {
        throw Error("Error while deleting Contact");
    }
}