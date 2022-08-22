import { Contacts } from "../models/contact.model";

/**
 * get multiple contact objects
 * @param query object with query parameters
 * @returns list of contacts
 */
export async function getContactsService() {
    try {
        const contacts = await Contacts.findAll();
        console.log('contacts', contacts)
        return contacts
    }
    catch(err:any) {
        console.log('error', err)
        throw Error("Error while getting Contacts");
    }
}

/**
 *  Get one contact object
 * @param query object with query parameters
 * @returns one contact object
 */
export async function getContactService(_id:number) {
    try {
        const contact = await Contacts.findByPk(_id);
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
export async function createContactService(contact:any) {
    try {
        const newContact = await Contacts.create(contact);
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
export async function updateContactService(_id:number, newData:any) {
    try {
        await Contacts.update(newData, { where: { _id:_id }, returning: true,  });
        const updatedContact = await Contacts.findOne({ where: { _id:_id }});
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
export async function deleteContactService(_id:number) {
    try {
        const deleted = await Contacts.destroy({where: {_id:_id}});
        return deleted
    }
    catch(err:any) {
        console.log('err', err)
        throw Error("Error while deleting Contact");
    }
}