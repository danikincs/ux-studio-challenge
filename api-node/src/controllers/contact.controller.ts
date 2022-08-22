import { NextFunction, Response, Request } from "express";
import { IContact } from "../interfaces/db.interfaces";
import { createContactService, deleteContactService, getContactService, getContactsService, updateContactService } from "../services/contact.service";
import fs from 'fs';
import { promisify } from 'util';
import path from "path";

const unlinkAsync = promisify(fs.unlink)

/**
 * Get contacts by query
 */
export async function getContactsController(req:Request, res:Response, next:NextFunction) {
    try {
        const contacts = await getContactsService(req.query);
        res.status(200).send(contacts);
    }
    catch(err:any) {
        next(err);
    }

}

/**
 * Create new contact. Parameters required
 */
export async function createContactController(req:Request, res:Response, next:NextFunction) {
    try {

        const { name, email, phone } = req.body

        if( (!req.file || !name || !email || !phone) ) {
            res.status(400).send("Invalid parameters")
            return
        }

        const contactData: IContact = {
            name:name,
            email:email,
            phone:phone,
            avatar:req.file.filename
        }

        const createdContact = await createContactService(contactData);
        res.status(200).send(createdContact);
    }
    catch(err:any) {
        next(err);
    }
}

/**
 * update a contact
 * if avatar change delete the old one
 */
export async function updateContactController(req:Request, res:Response, next:NextFunction) {

    try {
        const _id = req.params.id
        let contactData: IContact = {
            ...req.body
        };

        const contact = await getContactService({_id:_id})
        if(!contact) {
            res.status(404).send("Contact not found.")
            return
        }

        if(req.file) {
            contactData = {...contactData, avatar:req.file.filename}
            await unlinkAsync("./src/public/" + contact.avatar)
        }

        const updatedContact = await updateContactService(_id, contactData);
        res.status(200).send(updatedContact);
    }
    catch(err:any) {
        next(err);
    }
}

/**
 *  delete a contact + avatar related to it.
 */
export async function deleteContactController(req:Request, res:Response, next:NextFunction) {
    try {
        const _id = req.params.id

        const contact = await getContactService({_id:_id})
        if(!contact) {
            res.status(404).send("Contact not found.")
            return
        }

        console.log('dirrr', __dirname)
        await unlinkAsync("./src/public/" + contact.avatar)

        const deletedContact = await deleteContactService({_id:_id});
        res.status(200).send(deletedContact);
    }
    catch(err:any) {
        next(err);
    }
}