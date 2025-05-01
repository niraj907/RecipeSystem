import { create } from "zustand"
import axios from "axios"

const API_URL = "http://localhost:4000/api/recipe"

export const useRecipeStore = create((set) => ({
  recipes: [],
  loading: false,
  error: null,

  setRecipes: (recipes) => set({ recipes }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),

  createRecipe: async (formData) => {
    try {
      // Create a new FormData object for the API request
      const apiFormData = new FormData()

      // Map frontend field names to backend field names
      const fieldMapping = {
        recipeName: "name",
        menuId: "menuId",
        category: "category",
        description: "description",
        totalTime: "tot_time",
        preparationTime: "prep_time",
        cookingTime: "cook_time",
      }

      // Add basic text fields with proper field names
      Object.keys(fieldMapping).forEach((frontendField) => {
        const backendField = fieldMapping[frontendField]
        const value = formData.get(frontendField)
        if (value) {
          apiFormData.append(backendField, value)
        }
      })

      // Handle ingredients and instructions
      const ingredients = formData.get("ingredients")
      const instructions = formData.get("instructions")

      if (ingredients) {
        apiFormData.append("ingredients", ingredients)
      }

      if (instructions) {
        apiFormData.append("instructions", instructions)
      }

      // Handle image file - backend expects a field named 'images'
      const imageFile = formData.get("image-0")
      if (imageFile) {
        apiFormData.append("images", imageFile)
      }

      // Handle video files - backend expects fields named 'nepalVideo', 'hindiVideo', 'englishVideo'
      const nepalVideo = formData.get("nepalVideo")
      const hindiVideo = formData.get("hindiVideo")
      const englishVideo = formData.get("englishVideo")

      if (nepalVideo) {
        apiFormData.append("nepalVideo", nepalVideo)
      }

      if (hindiVideo) {
        apiFormData.append("hindiVideo", hindiVideo)
      }

      if (englishVideo) {
        apiFormData.append("englishVideo", englishVideo)
      }

      // Log the form data for debugging
      console.log("Sending form data to API:", {
        fields: Array.from(apiFormData.entries()).map(([key]) => key),
        hasNepalVideo: apiFormData.has("nepalVideo"),
        hasHindiVideo: apiFormData.has("hindiVideo"),
        hasEnglishVideo: apiFormData.has("englishVideo"),
        hasImages: apiFormData.has("images"),
      })

      // Make the API request
      const response = await axios.post(API_URL, apiFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })

      // Update the store with the new recipe
      set((state) => ({ recipes: [...state.recipes, response.data.data] }))

      return {
        success: true,
        message: "Recipe added successfully",
      }
    } catch (error) {
      console.error("API Error:", error)

      // Extract the error message from the response if available
      const errorMessage = error.response?.data?.msg || error.message || "Error adding recipe"

      return {
        success: false,
        message: errorMessage,
      }
    }
  },




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


  fetchRecipeById: async (id) => {
    set({ loading: true, error: null }) // Set loading to true before fetching
    try {
      const response = await axios.get(`${API_URL}/${id}`)
      const recipe = response.data.data

      // Check if recipe already exists in the store
      set((state) => {
        const exists = state.recipes.some((r) => r._id === recipe._id)
        return {
          // If recipe exists, replace it; otherwise add it
          recipes: exists ? state.recipes.map((r) => (r._id === recipe._id ? recipe : r)) : [...state.recipes, recipe],
          loading: false,
        }
      })
    } catch (error) {
      set({ error: "Failed to fetch recipe", loading: false })
      console.error("Error fetching recipe by ID:", error)
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




updateRecipe: async (id, formData) => {
  try {
    console.log("Updating recipe with ID:", id)
    console.log("Form data keys:", Array.from(formData.keys()))

    // Create a new FormData object for the API request
    const apiFormData = new FormData()

    // Directly append all form fields
    for (const [key, value] of formData.entries()) {
      // Special handling for ingredients and instructions to ensure they're sent as JSON strings
      if (key === "ingredients" || key === "instructions") {
        // Check if already a string (likely JSON)
        if (typeof value === "string") {
          apiFormData.append(key, value)
        } else {
          // Convert to JSON string if it's not already
          apiFormData.append(key, JSON.stringify(value))
        }
      } else {
        // For all other fields, just append directly
        apiFormData.append(key, value)
      }
    }

    // Log what we're sending for debugging
    console.log("Sending to API:", {
      endpoint: `${API_URL}/${id}`,
      fields: Array.from(apiFormData.entries()).map(([key]) => key),
      hasImages: apiFormData.has("images"),
      hasNepalVideo: apiFormData.has("nepalVideo"),
      hasHindiVideo: apiFormData.has("hindiVideo"),
      hasEnglishVideo: apiFormData.has("englishVideo"),
    })

    // Make the API request
    const response = await axios.put(`${API_URL}/${id}`, apiFormData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })

    // Update the store with the updated recipe
    set((state) => ({
      recipes: state.recipes.map((recipe) => (recipe._id === id ? response.data.data : recipe)),
    }))

    return {
      success: true,
      message: "Recipe updated successfully",
      data: response.data.data,
    }
  } catch (error) {
    console.error("API Error:", error)

    // Extract the error message from the response if available
    const errorMessage = error.response?.data?.msg || error.message || "Error updating recipe"

    return {
      success: false,
      message: errorMessage,
    }
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
