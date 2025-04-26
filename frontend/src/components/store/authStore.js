// import {create} from "zustand";
// import axios from "axios";


// const API_URL = "http://localhost:4000/api/a1/auth";

// export const useAuthStore = create((set)=>({
// user:null,
// isAuthenticated:false,
// error:null,
// isLoading:false,
// isCheckingAuth:true,
// message : null,

// signup: async (name,email, password, username, images, country, gender) => {
  
//     set({ isLoading: true, error: null });
//     try {
//       const formData = new FormData();
//       formData.append("name", name);
//       formData.append("email", email);
//       formData.append("password", password);
//       formData.append("username", username);
//       formData.append("country", country);
//       formData.append("gender", gender);
//       images.forEach((image) => formData.append("images", image));
  
//       const response = await axios.post(`${API_URL}/signup`, formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });

  
//       set({ user: response.data.user, isAuthenticated: true, isLoading: false });
//     } catch (error) {
//       set({
//         error: error.response?.data?.message || "Error signing up",
//         isLoading: false,
//       });
//       throw error;
//     }
//   },

//   login: async (email, password) => {
// 		set({ isLoading: true, error: null });
// 		try {
// 			const response = await axios.post(`${API_URL}/login`, { email, password });
// 			set({
// 				isAuthenticated: true,
// 				user: response.data.user,
// 				error: null,
// 				isLoading: false,
// 			});
// 		} catch (error) {
// 			set({ error: error.response?.data?.message || "Error logging in", isLoading: false });
// 			throw error;
// 		}
// 	},

//   logout: async () => {
// 		set({ isLoading: true, error: null });
// 		try {
// 			await axios.post(`${API_URL}/logout`);
// 			set({ user: null, isAuthenticated: false, error: null, isLoading: false });
// 		} catch (error) {
// 			set({ error: "Error logging out", isLoading: false });
// 			throw error;
// 		}
// 	},

//   verifyEmail: async (code) => {
//     set({ isLoading: true, error: null });
//     try {
//         const response = await axios.post(`${API_URL}/verify-email`, { code });
//         set({ user: response.data.user, isAuthenticated: true, isLoading: false });
//         return response.data;
//     } catch (error) {
//         set({ error: error.response.data.message || "Error verifying email", isLoading: false });
//         throw error;
//     }
// },

// checkAuth: async () => {
//     set({ isCheckingAuth: true, error: null });
//     try {
//         const response = await axios.get(`${API_URL}/check-auth`);
//         set({ user: response.data.user, isAuthenticated: true, isCheckingAuth: false });
//     } catch (error) {
//         set({ error: null, isCheckingAuth: false, isAuthenticated: false });
//     }
// },

// forgotPassword: async (email) => {
//   set({ isLoading: true, error: null });
//   try {
//     const response = await axios.post(`${API_URL}/forgot-password`, { email });
//     set({ message: response.data.message, isLoading: false });
//   } catch (error) {
//     set({
//       isLoading: false,
//       error: error.response.data.message || "Error sending reset password email",
//     });
//     throw error;
//   }
//  } ,

//  resetPassword: async (token, password) => {
//   set({ isLoading: true, error: null });
//   try {
//     const response = await axios.post(`${API_URL}/reset-password/${token}`, { password });
//     set({ message: response.data.message, isLoading: false });
//   } catch (error) {
//     set({
//       isLoading: false,
//       error: error.response.data.message || "Error resetting password",
//     });
//     throw error;
//   }
// },




// // part 2
// updateProfile: async (id, formData) => {
//   set({ isLoading: true, error: null });
//   try {
//     // Make a PUT request to update the user profile
//     const response = await axios.put(`${API_URL}/${id}`, formData, {
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//     });

//     // Update the user state with the new user data
//     set({ user: response.data.user, isAuthenticated: true, isLoading: false });
//   } catch (error) {
//     set({
//       error: error.response?.data?.message || "Error updating profile",
//       isLoading: false,
//     });
//     throw error;
//   }
// },


// }))


import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";


const API_URL = "http://localhost:4000/api/a1/auth";

export const useAuthStore = create(
  persist(
    (set) => ({
      users: [],
      user: null,
      isAuthenticated: false,
      error: null,
      isLoading: false,
      isCheckingAuth: true,
      message: null,

     // New state variables for notifications
    notifications: [], // Holds the list of notifications
    notificationCount: 0, // Holds the count of unread notifications
      
    adminRecipes:[],


   // Get all users
   fetchUsers: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/users`);
      console.log("Fetched users:", response.data); // Debugging
      set({ users: response.data, isLoading: false });
    } catch (error) {
      console.error("Fetch users error:", error); // Debugging
      set({ error: error.message, isLoading: false });
    }
  },


  

  genderUser: async (genders) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/gender`, {
        params: {
          gender: genders.join(',') // Send as comma-separated string
        }
      });
      
      set({ 
        users: response.data.users, 
        isLoading: false 
      });
  
    } catch (error) {
      console.error("Fetch users by gender error:", error);
      set({ 
        error: error.response?.data?.message || error.message,
        isLoading: false 
      });
    }
  },


      // Signup function
      signup: async (name, email, password, username, images, country, gender) => {
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

      // Login function
      login: async (email, password) => {
        set({ isLoading: true, error: null });
        try {
          const response = await axios.post(
            `${API_URL}/login`,
            { email, password },
            { withCredentials: true }
          );
console.log("Response Headers: ", response.headers);
console.log("Login successful:", response.data);
          set({
            isAuthenticated: true,
            user: response.data.user,
            error: null,
            isLoading: false,
          });
        } catch (error) {
          set({
            error: error.response?.data?.message || "Error logging in",
            isLoading: false,
          });
          throw error;
        }
      },


      // updatePassword
  updatePassword: async (currentPassword, newPassword, confirmPassword) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.put(
        `${API_URL}/update-password`,
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


      // Logout function
      logout: async () => {
        set({ isLoading: true, error: null });
        try {
        const response =   await axios.post(`${API_URL}/logout`, {}, { withCredentials: true });
        console.log("Logout response:", response); // Debugging
        set({ user: null, isAuthenticated: false, error: null, isLoading: false });
        } catch (error) {
          console.error("Logout error:", error.response?.data || error.message); // Debugging
          set({ error: "Error logging out", isLoading: false });
          throw error;
        }
      },

      // Email verification function
      verifyEmail: async (code) => {
        set({ isLoading: true, error: null });
        try {
          const response = await axios.post(`${API_URL}/verify-email`, { code });
          set({ user: response.data.user, isAuthenticated: true, isLoading: false });
          return response.data;
        } catch (error) {
          set({
            error: error.response?.data?.message || "Error verifying email",
            isLoading: false,
          });
          throw error;
        }
      },

      // Check authentication status
      checkAuth: async () => {
        set({ isCheckingAuth: true, error: null });
        try {
          const response = await axios.get(`${API_URL}/check-auth`, {withCredentials : true});
          set({ user: response.data.user, isAuthenticated: true, isCheckingAuth: false });
        } catch (error) {
          set({ error: null, isCheckingAuth: false, isAuthenticated: false });
        }
      },

      // Forgot password function
      forgotPassword: async (email) => {
        set({ isLoading: true, error: null });
        try {
          const response = await axios.post(`${API_URL}/forgot-password`, { email });
          set({ message: response.data.message, isLoading: false });
        } catch (error) {
          set({
            isLoading: false,
            error: error.response?.data?.message || "Error sending reset password email",
          });
          throw error;
        }
      },

      // Reset password function
      resetPassword: async (token, password) => {
        set({ isLoading: true, error: null });
        try {
          const response = await axios.post(`${API_URL}/reset-password/${token}`, { password });
          set({ message: response.data.message, isLoading: false });
        } catch (error) {
          set({
            isLoading: false,
            error: error.response?.data?.message || "Error resetting password",
          });
          throw error;
        }
      },

      // Update user profile
      updateProfile: async (id, formData) => {
        set({ isLoading: true, error: null });
        try {
          const response = await axios.put(`${API_URL}/${id}`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          set({ user: response.data.user, isAuthenticated: true, isLoading: false });
        } catch (error) {
          set({
            error: error.response?.data?.message || "Error updating profile",
            isLoading: false,
          });
          throw error;
        }
      },

fetchAllNotification : async() => {
  set({ isLoading: true, error: null });
  try {
    const response = await axios.get(`${API_URL}/notifications/all`);
    set({ 
      notifications: response.data.notifications, 
      notificationCount: response.data.notificationCount, 
      isLoading: false 
    });
  } catch (error) {
    set({
      error: error.response?.data?.message || "Error All the fetching notifications",
      isLoading: false,
    });
    throw error;
  }
},

        // New function to fetch notifications
        fetchNotifications: async (userId) => {
          set({ isLoading: true, error: null });
          try {
            const response = await axios.get(`${API_URL}/notifications/user/${userId}`);
            // Update notifications and notification count in state
            set({ 
              notifications: response.data.notifications, 
              notificationCount: response.data.notificationCount, 
              isLoading: false 
            });
          } catch (error) {
            set({
              error: error.response?.data?.message || "Error fetching notifications",
              isLoading: false,
            });
            throw error;
          }
        },
  
        // New function to mark notification as read
        markNotificationAsRead: async (notificationId) => {
          set({ isLoading: true, error: null });
          try {
            await axios.put(`${API_URL}/notifications/mark-read/${notificationId}`);
            // Update the state to mark the notification as read
            set((state) => ({
              notifications: state.notifications.map((notification) =>
                notification._id === notificationId ? { ...notification, isRead: true } : notification
              ),
              notificationCount: state.notificationCount > 0 ? state.notificationCount - 1 : 0,
              isLoading: false,
            }));
          } catch (error) {
            set({
              error: error.response?.data?.message || "Error marking notification as read",
              isLoading: false,
            });
            throw error;
          }
        },
      
          // Delete a deleteNotification
          deleteNotification: async (id) => {
            set({ isLoading: true, error: null }); 
            try {
              await axios.delete(`${API_URL}/notifications/${id}`);
              set((state) => ({
                notifications: state.notifications.filter((n) => n._id !== id),
                notificationCount: state.notificationCount > 0 ? state.notificationCount - 1 : 0,
                isLoading: false
              }));
              return { success: true, message: "Notification deleted successfully" };
            } catch (error) {
              set({ isLoading: false });
              return { success: false, message: "Error deleting notification" }; 
            }
           },

          
          fetchAlladminRecipe: async () => {
            set({ isLoading: true, error: null });
            try {
              const response = await axios.get(`${API_URL}/getAlladminRecipe/save`);
              set({ 
                adminRecipes: response.data.data, 
                isLoading: false 
              });
            } catch (error) {
              set({
                error: error.response?.data?.message || "Error fetching admin recipes",
                isLoading: false,
              });
              throw error;
            }
          },


          deleteadminRecipe: async (id) => {
            set({ isLoading: true, error: null });
            try {
              const response = await axios.delete(`${API_URL}/deleteadminRecipe/save/${id}`);
              set((state) => ({
                adminRecipes: state.adminRecipes.filter((recipe) => recipe._id !== id), 
                isLoading: false,
              }));
              return { success: true, message: response.data.message }; 
            } catch (error) {
              set({
                error: error.response?.data?.message || "Error deleting admin recipe",
                isLoading: false,
              });
              throw error;
            }
          },
    }),

    {
      name: "auth-store", // Key for localStorage
      getStorage: () => localStorage, // Persist data in localStorage
    }
  )
);
