import { create } from "zustand";
import axios from "axios";

const API_URL = "http://localhost:4000/api/users"; // Adjust the API URL as needed

export const useFavoriteStore = create((set) => ({
  favorites: [],
  loading: false,
  error: null,

  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),

  // Fetch all favorite recipes for a user
  fetchFavorites: async (userId) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/${userId}/favorites`);
      console.log("Fetched favorites:", response.data.favorites); // Debugging log
      set({ favorites: response.data.favorites, loading: false });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error fetching favorites",
        loading: false,
      });
    }
  },

  // Add a recipe to favorites
  addToFavorites: async (userId, recipeId) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/add-favorite`, { userId, recipeId });
      set((state) => ({
        favorites: [...state.favorites, recipeId],
        loading: false,
      }));
      return { success: true, message: response.data.message };
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error adding to favorites",
        loading: false,
      });
      return { success: false, message: error.response?.data?.message || "Error adding to favorites" };
    }
  },

  // Remove a recipe from favorites
  removeFromFavorites: async (userId, recipeId) => {
    set({ loading: true, error: null });
    try {
      await axios.post(`${API_URL}/remove-favorite`, { userId, recipeId });
      set((state) => ({
        favorites: state.favorites.filter((id) => id !== recipeId),
        loading: false,
      }));
      return { success: true };
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error removing from favorites",
        loading: false,
      });
      return { success: false, message: error.response?.data?.message || "Error removing from favorites" };
    }
  },
}));
