import { create } from 'zustand';
import axios from 'axios';

const API_URL = "http://localhost:4000/api/a2/auth";

const useAdminStore = create((set) => ({
  admin: null,
  isAuthenticated: false,
  loading: false,
  error: null,


// fetchAdmin: async () => {
//   set({ loading: true, error: null });
//   try {
//     const response = await axios.get(`${API_URL}/admin`, { withCredentials: true });
//     console.log("API Response: ", response.data);
//     set({
//       admin: response.data.admin || null,
//       isAuthenticated: !!response.data.admin,
//       loading: false
//     });
// console.log("Admin state updated: ", response.data.admin);
//   } catch (error) {
//     console.error("Fetch Admin Error: ", error);
//     set({ error: error.response?.data?.message || 'Failed to fetch admin', loading: false });
//   }
// },


fetchAdmin: async () => {
  set({ loading: true, error: null });
  try {
    const response = await axios.get(`${API_URL}/admin`, { withCredentials: true });
    console.log("API Response: ", response.data);

    const adminData = Array.isArray(response.data) ? response.data[0] : response.data.admin;

    set({
      admin: adminData || null,
      isAuthenticated: !!adminData,
      loading: false
    });

    console.log("Admin state updated: ", adminData);
  } catch (error) {
    console.error("Fetch Admin Error: ", error);
    set({ error: error.response?.data?.message || 'Failed to fetch admin', loading: false });
  }
},






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

 // Update admin profile
 updateAdmin: async (id, updatedData) => {
  set({ loading: true, error: null });
  try {
    const formData = new FormData();
    Object.keys(updatedData).forEach(key => {
      if (key === 'images') {
        // Handle image array
        updatedData.images.forEach(image => {
          formData.append('images', image);
        });
      } else {
        formData.append(key, updatedData[key]);
      }
    });

    const response = await axios.put(
      `${API_URL}/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    );

    set((state) => ({
      admin: state.admin.map((admins) =>
        admins._id === id ? response.data.data : admins
      ),
    }));
    return { success: true, message: "Admin updated successfully" };
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
