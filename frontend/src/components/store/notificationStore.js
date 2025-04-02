import { create } from "zustand";
import axios from "axios";

const API_URL = "http://localhost:4000/api/a1/auth";

export const useNotificationStore = create((set) => ({
  notifications: [], // Array to store notifications
  notificationCount: 0, // Counter for unread notifications
  isLoading: false, // Loading state
  error: null, // Error state

  // Fetch notifications for a user
  fetchNotifications: async (userId) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/notifications/${userId}`);
      set({
        notifications: response.data.notifications,
        notificationCount: response.data.notificationCount, // Update notification count
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error fetching notifications",
        isLoading: false,
      });
      throw error;
    }
  },

  // Mark a notification as read
  markNotificationAsRead: async (notificationId) => {
    set({ isLoading: true, error: null });
    try {
      await axios.put(`${API_URL}/notifications/${notificationId}`);
      set((state) => ({
        notifications: state.notifications.map((notification) =>
          notification._id === notificationId
            ? { ...notification, isRead: true }
            : notification
        ),
        notificationCount: state.notificationCount - 1, // Decrement notification count
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

  // Clear notifications (optional)
  clearNotifications: () => {
    set({ notifications: [], notificationCount: 0 });
  },
}));