import express from "express";
import { createContactController, deleteContactController, getContactsController, updateContactController } from "../controllers/contact.controller";

const router = express.Router();

/**
 * 
 */
router.get("/", getContactsController);

/**
 *
 */
router.post("/", createContactController);

/**
 * 
 */
router.put("/", updateContactController);

/**
 * 
 */
router.delete("/", deleteContactController);


export default router;
