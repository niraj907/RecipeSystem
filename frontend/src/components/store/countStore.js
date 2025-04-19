import { create } from "zustand";
import axios from "axios";

const API_URL = "http://localhost:4000/api/count/";

export const useCountStore = create((set) => ({
  totalUsers: 0,
  maleUsers: 0,
  femaleUsers: 0,
  totalRecipes: 0,
  monthlyGenderData: [],
  loading: false,

  fetchCounts: async () => {
    set({ loading: true });
    try {
      const [userRes, genderRes, recipeRes] = await Promise.all([
        axios.get(`${API_URL}total-users`),
        axios.get(`${API_URL}total-gender`),
        axios.get(`${API_URL}total-recipe`),
      ]);

      set({
        totalUsers: userRes.data.totalUsers,
        maleUsers: genderRes.data.maleUsers,
        femaleUsers: genderRes.data.femaleUsers,
        totalRecipes: recipeRes.data.totalRecipes,
        loading: false,
      });
    } catch (error) {
      console.error("Error fetching counts:", error);
      set({ loading: false });
    }
  },


    // Add this new function for monthly gender stats
    fetchMonthlyGenderStats: async () => {
      set({ loading: true });
      try {
        const response = await axios.get(`${API_URL}monthly-gender`);
        set({ 
          monthlyGenderData: response.data.data,
          loading: false 
        });
      } catch (error) {
        console.error("Error fetching monthly gender stats:", error);
        set({ loading: false });
      }
    },

    
}));
