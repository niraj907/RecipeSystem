import express from "express";
import { createReply, getFeedbackReplies, likeReply , unlikeReply} from "../controllers/reply.controller.js";

const router = express.Router();

// Route to submit a reply
router.post("/reply", createReply);

// Route to get replies for a specific feedback
router.get("/replies/:feedbackId", getFeedbackReplies);

router.post("/reply/like/:id", likeReply); // Like a reply
router.post("/reply/unlike/:id", unlikeReply); // Unlike a reply

export default router;