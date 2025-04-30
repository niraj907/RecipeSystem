// import { create } from 'zustand';
// import axios from 'axios';

// const API_URL = "http://localhost:4000/api/a2/auth";

// const useAdminStore = create((set) => ({
//   admin: null,
//   isAuthenticated: false,
//   loading: false,
//   error: null,


//  fetchAdmin: async () => {
//     set({ loading: true, error: null });

//     try {
//       const response = await axios.get(`${API_URL}/admin`, { withCredentials: true });
//       console.log("API Response: ", response.data);

//       // Extract the admin data correctly based on API response structure
//       const adminData = response.data?.admin || (Array.isArray(response.data) ? response.data[0] : null);

//       set({
//         admin: adminData || null,
//         isAuthenticated: Boolean(adminData),
//         loading: false
//       });

//       console.log("Admin state updated: ", adminData);
//     } catch (error) {
//       console.error("Fetch Admin Error: ", error);

//       set({
//         error: error.response?.data?.message ?? "Failed to fetch admin. Please try again.",
//         loading: false
//       });
//     }
//   },



//   login: async (email, password) => {
//     set({ loading: true, error: null });
//     try {
//       const response = await axios.post(
//         `${API_URL}/adminlogin`,
//         { email, password },
//         { withCredentials: true }
//       );
//       set({ admin: response.data.admin, isAuthenticated: true, loading: false });
//       console.log("Login successful:", response.data);
//          // Debugging: Log cookies after login
//     console.log("Cookies after login:", document.cookie);
//       return response;
//     } catch (error) {
//       const errMsg = error.response?.data?.message || 'Login failed';
//       set({ error: errMsg, isAuthenticated: false, loading: false });
//       throw error;
//     }
//   },

//   logout: async () => {
//     set({ loading: true, error: null });
//     try {
//       await axios.post(
//         `${API_URL}/adminlogout`,
//         {},
//         { withCredentials: true }
//       );
//       set({ admin: null, isAuthenticated: false, loading: false });
//     } catch (error) {
//       set({ error: error.response?.data?.message || 'Logout failed', loading: false });
//     }
//   },



//   // Update admin profile 
//   updateAdmin: async (id, updatedData) => {
//     set({ loading: true, error: null });
//     try {
//       const formData = new FormData();
//       Object.keys(updatedData).forEach(key => {
//         if (key === 'images') {
//           updatedData.images.forEach(image => {
//             formData.append('images', image);
//           });
//         } else {
//           formData.append(key, updatedData[key]);
//         }
//       });

//       await axios.put(`${API_URL}/${id}`, formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data'
//         }
//       });

//       // Fetch updated admin details after update
//       await useAdminStore.getState().fetchAdmin(id);

//       return { success: true, message: "Admin updated successfully" };
//     } catch (error) {
//       set({ error: error.response?.data?.message || 'Update failed', loading: false });
//     }
//   } ,




//   // forgotPassword: async (email) => {
//   //   set({ loading: true, error: null });
//   //   try {
//   //     await axios.post(`${API_URL}/adminforgotPassword`, { email });
//   //     set({ loading: false });
//   //   } catch (error) {
//   //     set({ error: error.response?.data?.message || 'Request failed', loading: false });
//   //   }
//   // },

//   forgotPassword: async (email) => {
//     set({ isLoading: true, error: null });

//     try {
//       const response = await axios.post(`${API_URL}/adminforgotPassword`, { email });

//       set({ isLoading: false });
//       return true; // Success case
//     } catch (error) {
//       const errorMessage = error.response?.data?.message || "Email not found. Please enter a registered email.";
//       set({ isLoading: false, error: errorMessage });
//       return false; // Error case
//     }
//   },


//   resetPassword: async (token, password) => {
//     set({ loading: true, error: null });
//     try {
//       await axios.post(`${API_URL}/reset-password-admin/${token}`, { password });
//       set({ loading: false });
//     } catch (error) {
//       set({ error: error.response?.data?.message || 'Reset failed', loading: false });
//     }
//   },
// }));

// export default useAdminStore;


import { create } from 'zustand';
import { persist } from "zustand/middleware";
import axios from 'axios';

const API_URL = "http://localhost:4000/api/a2/auth";

export const useAdminStore = create(
  persist(
    (set) => ({
      admin: null,
      isAuthenticated: false,
      loading: false,
      error: null,

      fetchAdmin: async () => {
        set({ loading: true, error: null });

        try {
          const response = await axios.get(`${API_URL}/admin`, { withCredentials: true });
          console.log("API Response: ", response.data);

          // Extract admin data correctly based on API response structure
          const adminData = response.data?.admin || (Array.isArray(response.data) ? response.data[0] : null);

          set({
            admin: adminData || null,
            isAuthenticated: Boolean(adminData),
            loading: false,
          });

          console.log("Admin state updated: ", adminData);
        } catch (error) {
          console.error("Fetch Admin Error: ", error);

          set({
            error: error.response?.data?.message ?? "Failed to fetch admin. Please try again.",
            loading: false,
          });
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
          console.log("Login successful:", response.data);
          console.log("Cookies after login:", document.cookie);
          return response;
        } catch (error) {
          const errMsg = error.response?.data?.message || 'Login failed';
          set({ error: errMsg, isAuthenticated: false, loading: false });
          throw error;
        }
      },



            // updatePassword
            adminUpdatePassword: async (currentPassword, newPassword, confirmPassword) => {
          set({ isLoading: true, error: null });
          try {
            const response = await axios.put(
              `${API_URL}/adminupdate-password`,
              { currentPassword, newPassword, confirmPassword },
              { withCredentials: true }
            );
      
            // Handle success response
            set({ 
              message: response.data.message, 
              isLoading: false 
            });
            return response.data; // Return the response for further handling if needed
          } catch (error) {
            set({
              error: error.response?.data?.message || "Error updating password",
              isLoading: false,
            });
            throw error; // Rethrow the error for further handling if needed
          }
        },


      logout: async () => {
        set({ loading: true, error: null });
        try {
          await axios.post(`${API_URL}/adminlogout`, {}, { withCredentials: true });
          set({ admin: null, isAuthenticated: false, loading: false });
        } catch (error) {
          set({ error: error.response?.data?.message || 'Logout failed', loading: false });
        }
      },

      // Update admin profile
      // updateAdmin: async (id, updatedData) => {
      //   set({ loading: true, error: null });
      //   try {
      //     const formData = new FormData();
      //     Object.keys(updatedData).forEach((key) => {
      //       if (key === 'images' && Array.isArray(updatedData.images)) {
      //         updatedData.images.forEach((image) => {
      //           formData.append('images', image);
      //         });
      //       } else {
      //         formData.append(key, updatedData[key]);
      //       }
      //     });

      //     await axios.put(`${API_URL}/admin/${id}`, formData, {
      //       headers: {
      //         'Content-Type': 'multipart/form-data',
      //       },
      //     });

      //     // Fetch updated admin details after update
      //     await useAdminStore.getState().fetchAdmin();

      //     return { success: true, message: "Admin updated successfully" };
      //   } catch (error) {
      //     set({ error: error.response?.data?.message || 'Update failed', loading: false });
      //   }
      // },




  // Update admin profile 
  updateAdmin: async (id, updatedData) => {
    set({ loading: true, error: null });
    try {
      const formData = new FormData();
      Object.keys(updatedData).forEach(key => {
        if (key === 'images') {
          updatedData.images.forEach(image => {
            formData.append('images', image);
          });
        } else {
          formData.append(key, updatedData[key]);
        }
      });

      await axios.put(`${API_URL}/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      // Fetch updated admin details after update
      await useAdminStore.getState().fetchAdmin(id);

      return { success: true, message: "Admin updated successfully" };
    } catch (error) {
      set({ error: error.response?.data?.message || 'Update failed', loading: false });
    }
  } ,




      forgotPassword: async (email) => {
        set({ loading: true, error: null });

        try {
          await axios.post(`${API_URL}/adminforgotPassword`, { email });
          set({ loading: false });
          return true;
        } catch (error) {
          const errorMessage = error.response?.data?.message || "Email not found. Please enter a registered email.";
          set({ loading: false, error: errorMessage });
          return false;
        }
      },

      resetPassword: async (token, password) => {
        set({ loading: true, error: null });
        try {
          await axios.post(`${API_URL}/reset-password-admin/${token}`, { password });
          set({ loading: false });
        } catch (error) {
          set({ error: error.response?.data?.message || 'Reset failed', loading: false });
        }
      },
    }),
    {
      name: "auth-store", // Key for localStorage
      getStorage: () => localStorage, // Persist data in localStorage
    }
  )
);

