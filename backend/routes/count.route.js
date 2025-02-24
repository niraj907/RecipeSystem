import express from "express";
import { getUserCount, getUserGenderCount, getRecipeCount } from "../controllers/count.controller.js";

const router = express.Router();

router.get("/total-users", getUserCount);
router.get("/total-gender", getUserGenderCount);
router.get("/total-recipe", getRecipeCount);

export default router;
