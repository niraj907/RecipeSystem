import { create } from 'zustand';
import axios from 'axios';

const API_URL = "http://localhost:4000/api/a2/auth";

const useAdminStore = create((set) => ({
  admin: null,
  isAuthenticated: false,
  loading: false,
  error: null,

  login: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.post(
        `${API_URL}/adminlogin`,
        { email, password },
        { withCredentials: true }
      );
      set({ admin: response.data.admin, isAuthenticated: true, loading: false });
      return response;
    } catch (error) {
      const errMsg = error.response?.data?.message || 'Login failed';
      set({ error: errMsg, isAuthenticated: false, loading: false });
      throw error;
    }
  },

  logout: async () => {
    set({ loading: true, error: null });
    try {
      await axios.post(
        `${API_URL}/adminlogout`,
        {},
        { withCredentials: true }
      );
      set({ admin: null, isAuthenticated: false, loading: false });
    } catch (error) {
      set({ error: error.response?.data?.message || 'Logout failed', loading: false });
    }
  },

  updateAdmin: async (id, updatedData) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.put(
        `${API_URL}/${id}`,
        updatedData,
        { withCredentials: true }
      );
      set({ admin: response.data.adminUser, loading: false });
    } catch (error) {
      set({ error: error.response?.data?.message || 'Update failed', loading: false });
    }
  },

  forgotPassword: async (email) => {
    set({ loading: true, error: null });
    try {
      await axios.post(`${API_URL}/adminforgotPassword`, { email });
      set({ loading: false });
    } catch (error) {
      set({ error: error.response?.data?.message || 'Request failed', loading: false });
    }
  },

  resetPassword: async (token, password) => {
    set({ loading: true, error: null });
    try {
      await axios.post(`${API_URL}/adminResetPassword/${token}`, { password });
      set({ loading: false });
    } catch (error) {
      set({ error: error.response?.data?.message || 'Reset failed', loading: false });
    }
  },
}));

export default useAdminStore;
