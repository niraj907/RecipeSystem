import { create } from "zustand";
import axios from "axios";

const API_URL = "http://localhost:4000/api/count/";

export const useCountStore = create((set) => ({
  totalUsers: 0,
  maleUsers: 0,
  femaleUsers: 0,
  totalRecipes: 0,
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
}));
