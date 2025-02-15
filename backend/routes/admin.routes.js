import express from "express";
import {adminLogin,updateAdmin,adminLogout,adminforgotPassword,adminResetPassword} from "../controllers/admin.conroller.js";
const router = express.Router();

router.post("/adminlogin", adminLogin);
router.put("/:id", updateAdmin);
router.post("/adminlogout", adminLogout);
router.post("/adminforgotPassword", adminforgotPassword);
router.post("/adminResetPassword/:token", adminResetPassword);
export default router;
