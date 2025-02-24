import express from "express";
import {adminLogin,getAdmin, updateAdmin,adminLogout,adminforgotPassword,adminResetPassword} from "../controllers/admin.conroller.js";
import { authenticate } from '../middleware/authorization.js';
const router = express.Router();

router.post("/adminlogin", adminLogin);

router.get('/admin', authenticate, getAdmin);
router.put("/:id", updateAdmin);
router.post("/adminlogout", adminLogout);
router.post("/adminforgotPassword", adminforgotPassword);
router.post("/adminResetPassword/:token", adminResetPassword);
export default router;
