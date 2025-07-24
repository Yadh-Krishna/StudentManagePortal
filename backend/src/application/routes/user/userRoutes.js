import express from "express";
import { StudentController } from "../../controllers/studentController.js";

const router= express.Router();

router.post('/register',StudentController.create);

export default router;

