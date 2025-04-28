import React, { useState, useEffect, useRef } from "react";
import { Menu } from "lucide-react";
import { FaPlus } from "react-icons/fa6";
import EditAdminProfile from "@/components/admin/Dashboard/EditAdminProfile";
import { useAdminStore } from "../adminStore";
import { useAuthStore } from "@/components/store/authStore";
import { BsThreeDotsVertical } from "react-icons/bs";
import { toast } from "sonner";
import { FaBell } from "react-icons/fa";
import AddRecipe from "./AddRecipe";

const Header = ({ setSidebarOpen }) => {
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [showRecipeModal, setShowRecipeModal] = useState(false);
  const [isNotificationDropdownOpen, setIsNotificationDropdownOpen] = useState(false);
  const [activeDropdownId, setActiveDropdownId] = useState(null);

  const notificationRef = useRef(null);

  const { admin, fetchAdmin } = useAdminStore();
  const {
    user,
    fetchAllNotification,
    markNotificationAsRead,
    notifications,
    deleteNotification,
  } = useAuthStore();

  useEffect(() => {
    if (user?._id) {
      fetchAllNotification(user._id);
    }
  }, [user, fetchAllNotification]);

  useEffect(() => {
    fetchAdmin();
  }, [fetchAdmin]);

  const unreadNotificationsCount = notifications.filter(
    notification => !notification.isRead
  ).length;

  const handleProfileEdit = () => {
    setSelectedAdmin(admin);
    setIsProfileModalOpen(true);
  };

  const closeModals = () => {
    setIsProfileModalOpen(false);
    setShowRecipeModal(false);
    setSelectedAdmin(null);
  };

  const handleNotificationClick = (notificationId) => {
    markNotificationAsRead(notificationId);
  };

  const handleDeleteNotification = async (notificationId) => {
    try {
      const res = await deleteNotification(notificationId);
      if (res.success) {
        toast.success("Notification deleted successfully");
      } else {
        toast.error("Failed to delete notification");
      }
    } catch (error) {
      toast.error("Error deleting notification.");
    }
  };

  return (
    <div className="bg-white  z-[5] shadow py-4 px-4 flex items-center justify-between fixed top-0 left-0 right-0 ">
      <div className="flex items-center">
        <div className="md:hidden mr-4">
          <Menu 
            onClick={() => setSidebarOpen(prev => !prev)} 
            className="cursor-pointer" 
          />
        </div>
        <h1 className="lg:ml-[18rem] text-lg font-bold">Dashboard</h1>
      </div>

      <div className="flex items-center space-x-4 ml-auto">
        <button
          className="mt-auto bg-orange-400 text-white py-3 px-5 rounded-xl text-center cursor-pointer flex items-center justify-center hover:bg-orange-500 transition-colors"
          onClick={() => setShowRecipeModal(true)}
        >
          <FaPlus className="text-sm" />
          <span className="ml-2">Create recipe</span>
        </button>

        {/* Notification Bell */}
        <div className="relative" ref={notificationRef}>
          <div 
            onClick={() => setIsNotificationDropdownOpen(!isNotificationDropdownOpen)} 
            className="cursor-pointer relative"
          >
            <FaBell size={26} className="text-orange-400"/>
            {unreadNotificationsCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {unreadNotificationsCount}
              </span>
            )}
          </div>

          {/* Notification Dropdown */}
          {isNotificationDropdownOpen && (
            <div className="absolute right-0 mt-2 w-80 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-black/5 z-50">
              {notifications.length === 0 ? (
                <div className="px-4 py-2 text-sm text-gray-700">No notifications</div>
              ) : (
                notifications.map((notification) => (
                  <div
                    key={notification._id}
                    className={`flex justify-between items-start px-4 py-2 hover:bg-gray-50 cursor-pointer ${
                      !notification.isRead ? "bg-blue-50" : ""
                    }`}
                    onClick={() => handleNotificationClick(notification._id)}
                  >
                    <div className="flex items-center space-x-2">
                      <img
                        className="w-8 h-8 rounded-full object-cover"
                        src={notification.image || "/default-avatar.png"}
                        alt={notification.sender?.name || "User"}
                      />
                      <div className="flex flex-col">
                        <span className="block text-sm text-gray-700">
                          {notification.message}
                        </span>
                        <span className="text-xs text-gray-500">
                          {new Date(notification.createdAt).toLocaleString()}
                        </span>
                      </div>
                    </div>

                    <div className="relative">
                      <BsThreeDotsVertical
                        className="text-gray-500 ml-2 mt-1 cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveDropdownId(activeDropdownId === notification._id ? null : notification._id);
                        }}
                      />
                      {activeDropdownId === notification._id && (
                        <div className="absolute right-0 mt-2 w-28 bg-white rounded-md shadow-lg z-50">
                          <div
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteNotification(notification._id);
                            }}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-red-500 hover:text-white cursor-pointer rounded-md"
                          >
                            Delete
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {/* Admin Profile Image */}
        <div onClick={handleProfileEdit} className="cursor-pointer">
          <img
            className="w-8 h-8 rounded-full object-cover"
            src={admin?.images?.[0]?.url || "/default-admin.png"}
            alt="Admin Profile"
          />
        </div>
      </div>

      {isProfileModalOpen && (
        <EditAdminProfile admin={selectedAdmin} onClose={closeModals} />
      )}
      
      {showRecipeModal && (
        <AddRecipe onClose={() => setShowRecipeModal(false)} />
      )}
    </div>
  );
};

export default Header;