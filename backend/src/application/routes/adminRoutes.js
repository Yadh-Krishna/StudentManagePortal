import express from "express";
import { makeAdminController } from "../../factories/makeAdminController.js";
import { UserAuth } from "../middlewares/userAuth.js";
const router= express.Router();
const adminController=makeAdminController();

router.post('/login', adminController.login.bind(adminController));
router.post('/create',UserAuth.verifyAdminToken,adminController.createUser.bind(adminController));
router.get('/dashboard',UserAuth.verifyAdminToken,adminController.getDashboard.bind(adminController));
router.post('/create', UserAuth.verifyAdminToken, adminController.createUser.bind(adminController));

export default router;

