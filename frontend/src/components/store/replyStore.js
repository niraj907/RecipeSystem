import { create } from "zustand";
import axios from "axios";

const API_URL = "http://localhost:4000/api/reply";

export const useReplyStore = create((set) => ({
  replies: {},
  loading: false,
  error: null,

  fetchReplies: async (feedbackId) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/${feedbackId}`);
      set((state) => ({
        replies: {
          ...state.replies,
          [feedbackId]: response.data.replies
        },
        loading: false
      }));
    } catch (error) {
      set({ loading: false, error: error.response?.data?.message || "Error fetching replies" });
    }
  },

  createReply: async (replyData) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.post(API_URL, replyData);
      set((state) => ({
        replies: {
          ...state.replies,
          [replyData.feedbackId]: [
            ...(state.replies[replyData.feedbackId] || []),
            response.data.reply
          ]
        },
        loading: false,
      }));
    } catch (error) {
      set({ loading: false, error: error.response?.data?.message || "Error creating reply" });
    }
  },

  editReply: async (replyId, feedbackId, updatedComment) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.put(`${API_URL}/${replyId}`, { comment: updatedComment });
      set((state) => ({
        replies: {
          ...state.replies,
          [feedbackId]: state.replies[feedbackId].map((reply) =>
            reply._id === replyId ? response.data.reply : reply
          )
        },
        loading: false,
      }));
    } catch (error) {
      set({ loading: false, error: error.response?.data?.message || "Error editing reply" });
    }
  },

  deleteReply: async (replyId, feedbackId) => {
    set({ loading: true, error: null });
    try {
      await axios.delete(`${API_URL}/${replyId}`);
      set((state) => ({
        replies: {
          ...state.replies,
          [feedbackId]: state.replies[feedbackId].filter((reply) => reply._id !== replyId)
        },
        loading: false,
      }));
    } catch (error) {
      set({ loading: false, error: error.response?.data?.message || "Error deleting reply" });
    }
  },

  likeReply: async (replyId, feedbackId, userId) => {
    if (!userId) return;
    
    set({ loading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/like/${replyId}`, { userId });
      
      set((state) => ({
        replies: {
          ...state.replies,
          [feedbackId]: state.replies[feedbackId].map(reply => 
            reply._id === replyId ? response.data.data : reply
          )
        },
        loading: false
      }));
    } catch (error) {
      set({ loading: false, error: error.response?.data?.message || "Error liking reply" });
      throw error;
    }
  },

  unlikeReply: async (replyId, feedbackId, userId) => {
    if (!userId) return;
    
    set({ loading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/unlike/${replyId}`, { userId });
      
      set((state) => ({
        replies: {
          ...state.replies,
          [feedbackId]: state.replies[feedbackId].map(reply => 
            reply._id === replyId ? response.data.data : reply
          )
        },
        loading: false
      }));
    } catch (error) {
      set({ loading: false, error: error.response?.data?.message || "Error unliking reply" });
      throw error;
    }
  },

  resetError: () => set({ error: null }),
}));