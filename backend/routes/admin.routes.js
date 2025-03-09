import express from "express";
import {adminLogin,getAdmin, updateAdmin,adminLogout,adminforgotPassword,adminResetPassword} from "../controllers/admin.conroller.js";
const router = express.Router();

router.post("/adminlogin", adminLogin);

router.get('/admin', getAdmin);
router.put("/:id", updateAdmin);
router.post("/adminlogout", adminLogout);
router.post("/adminforgotPassword", adminforgotPassword);
router.post("/reset-password-admin/:token", adminResetPassword);
export default router;
