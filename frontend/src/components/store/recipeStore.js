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


  // Create a new recipe
  createRecipe: async (newRecipe) => {
    console.log("Received Recipe Data newRecipe:", newRecipe);
    console.log("Received Recipe Data ingredients:", newRecipe.ingredients);
    console.log("Received Recipe Data instructions:", newRecipe.instructions);
  

  
    try {
      const formData = new FormData();
         // Handle array fields
         ['ingredients', 'instructions'].forEach((field) => {
          newRecipe[field].forEach((item) => {
            formData.append(field, item); 
          });
        });
  
        // Handle other fields
        Object.keys(newRecipe).forEach((key) => {
          if (key === 'images') {
            newRecipe.images.forEach((image) => {
              formData.append('images', image);
            });
          } else if (!['ingredients', 'instructions'].includes(key)) {
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
      console.log("API Response ingredients ...:", response.data.data.ingredients);
      console.log("API Response instructions...:", response.data.data.instructions);

console.log("response ingredients: ", response.data.data.ingredients);
console.log("response Type of ingredients: ", typeof response.data.data.ingredients);


      set((state) => ({ recipes: [...state.recipes, response.data.data] }));
  
      return { success: true, message: "Recipe added successfully" };
    } catch (error) {
      console.error("API Error:", error);
      console.log("skjaksjksaj")
      return {
        success: false,
        message: error.response?.data?.msg || error.message || "Error adding recipe"
      };
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
