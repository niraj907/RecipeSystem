import {create} from "zustand";
import axios from "axios";


const API_URL = "http://localhost:4000/api/a1/auth";

export const useAuthStore = create((set)=>({
user:null,
isAuthenticated:false,
error:null,
isLoading:false,
isCheckingAuth:true,
message : null,

signup: async (name,email, password, username, images, country, gender) => {
  
    set({ isLoading: true, error: null });
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("username", username);
      formData.append("country", country);
      formData.append("gender", gender);
      images.forEach((image) => formData.append("images", image));
  
      const response = await axios.post(`${API_URL}/signup`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

  
      set({ user: response.data.user, isAuthenticated: true, isLoading: false });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error signing up",
        isLoading: false,
      });
      throw error;
    }
  },

  login: async (email, password) => {
		set({ isLoading: true, error: null });
		try {
			const response = await axios.post(`${API_URL}/login`, { email, password });
			set({
				isAuthenticated: true,
				user: response.data.user,
				error: null,
				isLoading: false,
			});
		} catch (error) {
			set({ error: error.response?.data?.message || "Error logging in", isLoading: false });
			throw error;
		}
	},

  logout: async () => {
		set({ isLoading: true, error: null });
		try {
			await axios.post(`${API_URL}/logout`);
			set({ user: null, isAuthenticated: false, error: null, isLoading: false });
		} catch (error) {
			set({ error: "Error logging out", isLoading: false });
			throw error;
		}
	},

  verifyEmail: async (code) => {
    set({ isLoading: true, error: null });
    try {
        const response = await axios.post(`${API_URL}/verify-email`, { code });
        set({ user: response.data.user, isAuthenticated: true, isLoading: false });
        return response.data;
    } catch (error) {
        set({ error: error.response.data.message || "Error verifying email", isLoading: false });
        throw error;
    }
},

checkAuth: async () => {
    set({ isCheckingAuth: true, error: null });
    try {
        const response = await axios.get(`${API_URL}/check-auth`);
        set({ user: response.data.user, isAuthenticated: true, isCheckingAuth: false });
    } catch (error) {
        set({ error: null, isCheckingAuth: false, isAuthenticated: false });
    }
},

forgotPassword: async (email) => {
  set({ isLoading: true, error: null });
  try {
    const response = await axios.post(`${API_URL}/forgot-password`, { email });
    set({ message: response.data.message, isLoading: false });
  } catch (error) {
    set({
      isLoading: false,
      error: error.response.data.message || "Error sending reset password email",
    });
    throw error;
  }
 } ,

 resetPassword: async (token, password) => {
  set({ isLoading: true, error: null });
  try {
    const response = await axios.post(`${API_URL}/reset-password/${token}`, { password });
    set({ message: response.data.message, isLoading: false });
  } catch (error) {
    set({
      isLoading: false,
      error: error.response.data.message || "Error resetting password",
    });
    throw error;
  }
},

  
// update code 


updateProfile: async (pid, updatedProfile) => {
  set({ isLoading: true, error: null });

  try {
    const formData = new FormData();
    Object.entries(updatedProfile).forEach(([key, value]) => {
      if (key === "image") {
        formData.append("images", value); // Append image file
      } else {
        formData.append(key, value);
      }
    });

    const response = await axios.put(`${API_URL}/${pid}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    set({
      user: response.data.user,
      error: null,
      isLoading: false,
    });

    return { success: true, message: "Profile updated successfully" };
  } catch (error) {
    set({
      error: error.response?.data?.message || "Error updating profile",
      isLoading: false,
    });
    return { success: false, message: error.message };
  }
},



}))