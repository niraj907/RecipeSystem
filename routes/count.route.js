import express from "express";
import { getUserCount, getUserGenderCount, getRecipeCount , getMonthlyUserGenderStats} from "../controllers/count.controller.js";

const router = express.Router();

router.get("/total-users", getUserCount);
router.get("/total-gender", getUserGenderCount);
router.get("/total-recipe", getRecipeCount);
router.get("/monthly-gender", getMonthlyUserGenderStats);
export default router;
