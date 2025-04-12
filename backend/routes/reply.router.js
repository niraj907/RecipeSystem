import express from "express";
import { createReply, getFeedbackReplies } from "../controllers/reply.controller.js";

const router = express.Router();

// Route to submit a reply
router.post("/reply", createReply);

// Route to get replies for a specific feedback
router.get("/replies/:feedbackId", getFeedbackReplies);

export default router;