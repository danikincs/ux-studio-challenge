import express from "express";
import { createContactController, deleteContactController, getContactsController, updateContactController } from "../controllers/contact.controller";
import multer from "multer";
import path from 'path';

const router = express.Router();


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './src/public/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname))
    }
});
  
var upload = multer({ storage: storage });

/**
 * 
 */
router.get("/", getContactsController);

/**
 *
 */
router.post("/", upload.single("avatar"), createContactController);

/**
 * 
 */
router.put("/:id", upload.single("avatar"), updateContactController);

/**
 * 
 */
router.delete("/:id", deleteContactController);


export default router;

