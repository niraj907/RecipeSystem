import { create } from "zustand";
import axios from "axios";

const API_URL = "http://localhost:4000/api/recipe";

export const useRecipeStore = create((set) => ({
  recipes: [],
  loading: false,
  error: null,

  setRecipes: (recipes) => set({ recipes }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),

  fetchRecipes: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get(`${API_URL}`);
      set({ recipes: response.data.data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  fetchRecipesByCategory: async (category) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/categories/${category}`);
      set({ recipes: response.data.data, loading: false });
    } catch (error) {
      set({ error: error.response?.data?.msg || "Error fetching recipes by category", loading: false });
    }
  },

  fetchAllRecipes: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get(`${API_URL}`);
      set({ recipes: response.data.data, loading: false });
    } catch (error) {
      set({ error: error.response?.data?.msg || "Error fetching all recipes", loading: false });
    }
  },

  fetchRecipeById: async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`);
      if (!response.ok) {
        throw new Error(`Error fetching recipe: ${response.statusText}`);
      }
      const data = await response.json();  // Make sure the response is JSON
      console.log(data);
      return data;
    } catch (error) {
      console.error("Error fetching recipe by ID:", error);
      throw new Error("Failed to fetch recipe");
    }
  },
  

  searchRecipes: async (query) => {
    if (!query) {
      set({ recipes: [], error: "Search query is required" });
      return;
    }
    set({ loading: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/items`, { params: { q: query } });
      
      set({ recipes: response.data, loading: false });
    } catch (error) {
      console.log("Error searching recipes");
      set({ 
        error: error.response?.data?.message || "Error searching recipes", 
        loading: false 
      });
    }
  },

  createRecipe: async (newRecipe) => {
    if (!newRecipe.menuId || !newRecipe.name || !newRecipe.category || !newRecipe.description || !newRecipe.ingredients || !newRecipe.instructions || !newRecipe.tot_time || !newRecipe.prep_time || !newRecipe.cook_time || !newRecipe.nepal || !newRecipe.hindi || !newRecipe.english || !newRecipe.images) {
      return { success: false, message: "Please fill all fields" };
    }
    try {
      const response = await axios.post(`${API_URL}`, newRecipe);
      set((state) => ({ recipes: [...state.recipes, response.data.data] }));
      return { success: true, message: "Recipe added successfully" };
    } catch (error) {
      return { success: false, message: error.response?.data?.msg || "Error adding recipe" };
    }
  },

  deleteRecipe: async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      set((state) => ({ recipes: state.recipes.filter((recipe) => recipe._id !== id) }));
      return { success: true, message: "Recipe deleted successfully" };
    } catch (error) {
      return { success: false, message: "Error deleting recipe" };
    }
  },

  updateRecipe: async (id, updatedRecipe) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, updatedRecipe);
      set((state) => ({
        recipes: state.recipes.map((recipe) =>
          recipe._id === id ? response.data.data : recipe
        ),
      }));
      return { success: true, message: "Recipe updated successfully" };
    } catch (error) {
      return { success: false, message: "Error updating recipe" };
    }
  },

  getRecipeById: async (id) => {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return response.data.data;
    } catch (error) {
      return null;
    }
  },
}));
