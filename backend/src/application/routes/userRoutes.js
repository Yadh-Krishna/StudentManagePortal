import express from "express";
import { makeStudentController } from "../../factories/makeStudentController.js";
import multer from 'multer';
import { UserAuth } from "../middlewares/userAuth.js";
import {storage} from "../../domain/services/multerFile.js";

const studentController= makeStudentController();
const router= express.Router(); 
const upload = multer({storage});

router.post('/register',studentController.create.bind(studentController));
router.post('/login',studentController.login.bind(studentController));
router.put('/upload',UserAuth.userAuthentication,upload.single('image'),studentController.uploadProfileImage.bind(studentController));



export default router;

