import { create } from "zustand";
import axios from "axios";

const API_URL = "http://localhost:4000/api/users/message";

export const useFeedbackStore = create((set) => ({
  feedback: [],
  loading: false,
  error: null,

  // Fetch all feedback for a recipe
  fetchFeedback: async (recipeId) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/feedback/${recipeId}`);
      set({ feedback: response.data.feedbackMessages, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  // Create new feedback
  createFeedback: async (feedbackData) => {
    if (!feedbackData.userId || !feedbackData.recipeId || 
        !feedbackData.rating || !feedbackData.comment) {
      throw new Error("Missing required fields");
    }
    set({ loading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/feedback`, feedbackData);
      set((state) => ({
        feedback: [...state.feedback, response.data.feedback],
        loading: false,
      }));
      return response.data.feedback;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  // Update existing feedback
  editFeedback: async (id, updatedData) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.put(`${API_URL}/feedback/${id}`, updatedData);
      set((state) => ({
        feedback: state.feedback.map((item) =>
          item._id === id ? response.data.data : item
        ),
        loading: false,
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  // Delete feedback
  deleteFeedback: async (id) => {
    set({ loading: true, error: null });
    try {
      await axios.delete(`${API_URL}/feedback/${id}`);
      set((state) => ({
        feedback: state.feedback.filter((item) => item._id !== id),
        loading: false,
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  // Get rating statistics
  getRecipeRatingCount: async (recipeId) => {
    try {
      const response = await axios.get(`${API_URL}/rating-count/${recipeId}`);
      return response.data.totalRating;
    } catch (error) {
      set({ error: error.message });
      throw error;
    }
  },


  likeFeedback: async (feedbackId, userId) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/feedback/like/${feedbackId}`, { userId });
      set((state) => ({
        feedback: state.feedback.map((item) =>
          item._id === feedbackId ? response.data.data : item
        ),
        loading: false,
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  unlikeFeedback: async (feedbackId, userId) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/feedback/unlike/${feedbackId}`, { userId });
      set((state) => ({
        feedback: state.feedback.map((item) =>
          item._id === feedbackId ? response.data.data : item
        ),
        loading: false,
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  // Reset store
  resetFeedback: () => set({ feedback: [], loading: false, error: null }),
}));