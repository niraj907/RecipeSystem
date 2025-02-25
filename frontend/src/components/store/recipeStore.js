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

  // Fetch all recipes
  fetchRecipes: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get(`${API_URL}`);
      set({ recipes: response.data.data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  // Fetch recipes by category
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

   // Fetch a single recipe by ID
  fetchRecipeById: async (id) => {
    set({ loading: true, error: null }); // Set loading to true before fetching
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      const recipe = response.data.data;
      set((state) => ({ recipes: [...state.recipes, recipe], loading: false })); // Update the store
    } catch (error) {
      set({ error: "Failed to fetch recipe", loading: false });
      console.error("Error fetching recipe by ID:", error);
    }
  },
  
// Search recipes
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

  
  

  // Create a new recipe
createRecipe: async (newRecipe) => {
  console.log("Received Recipe Data:", newRecipe);

  // Check for missing fields
  const requiredFields = [
    "menuId", "name", "category", "description", "ingredients",
    "instructions", "tot_time", "prep_time", "cook_time",
    "nepal", "nepalPublishedName", "hindi", "hindiPublishedName",
    "english", "englishPublishedName", "images"
  ];

  const missingFields = requiredFields.filter(field => !newRecipe[field]);

  if (missingFields.length > 0) {
    console.error("Missing Fields:", missingFields);
    return { success: false, message: `Missing fields: ${missingFields.join(", ")}` };
  }

  try {
    const formData = new FormData();
    // Append all fields to FormData
    Object.keys(newRecipe).forEach(key => {
      if (key === 'images') {
        newRecipe.images.forEach(image => {
          formData.append('images', image); // Append each image file
        });
      } else {
        formData.append(key, newRecipe[key]);
      }
    });

    console.log("Sending request to API:", API_URL);
    const response = await axios.post(API_URL, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    console.log("API Response...:", response.data);
    set((state) => ({ recipes: [...state.recipes, response.data.data] }));

    return { success: true, message: "Recipe added successfully" };
  } catch (error) {
    console.error("API Error:", error);
    return {
      success: false,
      message: error.response?.data?.msg || error.message || "Error adding recipe"
    };
  }
},

  // Delete a recipe
  deleteRecipe: async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      set((state) => ({ recipes: state.recipes.filter((recipe) => recipe._id !== id) }));
      return { success: true, message: "Recipe deleted successfully" };
    } catch (error) {
      return { success: false, message: "Error deleting recipe" };
    }
  },

  // Update an existing recipe
  // updateRecipe: async (id, updatedRecipe) => {
  //   try {
  //     const response = await axios.put(`${API_URL}/${id}`, updatedRecipe);
  //     set((state) => ({
  //       recipes: state.recipes.map((recipe) =>
  //         recipe._id === id ? response.data.data : recipe
  //       ),
  //     }));
  //     return { success: true, message: "Recipe updated successfully" };
  //   } catch (error) {
  //     return { success: false, message: "Error updating recipe" };
  //   }
  // },


  // In recipe.js store's updateRecipe function
updateRecipe: async (id, updatedRecipe) => {
  try {
    const formData = new FormData();
    
    Object.keys(updatedRecipe).forEach(key => {
      if (key === 'images') {
        // Handle image array
        updatedRecipe.images.forEach(image => {
          formData.append('images', image);
        });
      } else {
        formData.append(key, updatedRecipe[key]);
      }
    });

    const response = await axios.put(`${API_URL}/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    set((state) => ({
      recipes: state.recipes.map((recipe) =>
        recipe._id === id ? response.data.data : recipe
      ),
    }));
    return { success: true, message: "Recipe updated successfully" };
  } catch (error) {
    return { 
      success: false, 
      message: error.response?.data?.msg || "Error updating recipe" 
    };
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
