import express from "express";
import { getUserCount ,getUserGenderCount} from "../controllers/count.controller.js";

const router = express.Router();

router.get("/total-users", getUserCount);
router.get("/total-gender", getUserGenderCount);

export default router;
