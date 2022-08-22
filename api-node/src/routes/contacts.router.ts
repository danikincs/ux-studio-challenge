import express from "express";
import { createContactController, deleteContactController, getContactsController, updateContactController } from "../controllers/contact.controller";
import multer from "multer";
import path from 'path';

const router = express.Router();

//Multer for file upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './src/public/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname))
    }
});
  
const upload = multer({ storage: storage });

/**
 * GET
 */
router.get("/", getContactsController);

/**
 * POST
 */
router.post("/", upload.single("avatar"), createContactController);

/**
 * PUT
 */
router.put("/:id", upload.single("avatar"), updateContactController);

/**
 * DELETE
 */
router.delete("/:id", deleteContactController);


export default router;

