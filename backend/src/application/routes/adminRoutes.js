import express from "express";
import { makeAdminController } from "../../factories/makeAdminController.js";

const router= express.Router();
const adminController=makeAdminController();

router.post('/login', adminController.login.bind(adminController));
router.post('/create',adminController.createUser.bind(adminController));


export default router;

