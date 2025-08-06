import express from "express";
import { makeStudentController } from "../../factories/makeStudentController.js";

const studentController= makeStudentController();
const router= express.Router();


router.post('/register',studentController.create.bind(studentController));
router.post('/login',studentController.login.bind(studentController));
// router.put('/update',)

export default router;

