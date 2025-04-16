import express from "express";
import { createReply, getFeedbackReplies, likeReply , unlikeReply,editReply, deleteReply} from "../controllers/reply.controller.js";

const router = express.Router();

// Route to submit a reply
router.post("/", createReply);

// Route to get replies for a specific feedback
router.get("/:feedbackId", getFeedbackReplies);

router.post("/like/:replyId", likeReply); // Like a reply
router.post("/unlike/:replyId", unlikeReply); // Unlike a reply

// Route to edit a reply
router.put("/:replyId", editReply);

// Route to delete a reply
router.delete("/:replyId", deleteReply);
export default router;