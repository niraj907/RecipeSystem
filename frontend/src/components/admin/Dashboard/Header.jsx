import React, { useState, useEffect, useRef } from "react";
import { Menu, Bell as BellIcon } from "lucide-react";
import EditAdminProfile from "@/components/admin/Dashboard/EditAdminProfile";
import { useAdminStore } from "../adminStore";
import { useAuthStore } from "@/components/store/authStore";

const Header = ({ setSidebarOpen }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const { admin, fetchAdmin } = useAdminStore();
  const { 
    user,  
    fetchAllNotification,
    markNotificationAsRead,
    notifications,
    notificationCount
  } = useAuthStore(); 
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Fetch notifications when component mounts and when user changes
  useEffect(() => {
    if (user?._id) {
      fetchAllNotification(user._id);
    }
  }, [user, fetchAllNotification]);
  console.log("fetchAllNotification: ", fetchAllNotification)

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isDropdownOpen && dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  useEffect(() => {
    fetchAdmin();
  }, [fetchAdmin]);
  
  const handleEdit = () => {
    setSelectedAdmin(admin);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedAdmin(null);
  };

  const handleNotificationClick = (notificationId) => {
    markNotificationAsRead(notificationId);
    // You might want to add additional logic here, like navigating to the relevant page
  };

  return (
    <div className="bg-white shadow py-4 px-4 flex items-center justify-between fixed top-0 left-0 right-0 z-10">
      <div className="flex items-center">
        <div className="md:hidden mr-4">
          <Menu onClick={() => setSidebarOpen((prev) => !prev)} className="cursor-pointer" />
        </div>
        <h1 className="lg:ml-[18rem] text-lg font-bold">Dashboard</h1>
      </div>

      <div className="flex items-center space-x-4 ml-auto">
        {/* Notification Bell */}
        <div className="relative cursor-pointer" ref={dropdownRef} onClick={toggleDropdown}>
          <span className="sr-only">Open notifications</span>
          <BellIcon size={26} className="cursor-pointer" />
          {notificationCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {notificationCount}
            </span>
          )}

          {/* Notification Dropdown */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-80 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-black/5">
              {notifications.length === 0 ? (
                <div className="px-4 py-2 text-sm text-gray-700">No notifications</div>
              ) : (
                notifications.map((notification) => (
                  <div 
                    key={notification._id} 
                    className={`flex items-center space-x-2 px-4 py-2 hover:bg-gray-50 cursor-pointer ${!notification.isRead ? 'bg-blue-50' : ''}`}
                    onClick={() => handleNotificationClick(notification._id)}
                  >
                    <img
                      className="w-8 h-8 rounded-full object-cover"
                      src={notification.image  || "https://github.com/shadcn.png"}
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
                ))
              )}
            </div>
          )}
        </div>

        {/* Admin Profile Image */}
        <div onClick={handleEdit} className="cursor-pointer">
          <img
            className="w-8 h-8 rounded-full object-cover"
            src={admin?.images?.[0]?.url || "https://via.placeholder.com/150"}
            alt="User Profile"
          />
        </div>
      </div>

      {isModalOpen && <EditAdminProfile admin={selectedAdmin} onClose={closeModal} />}
    </div>
  );
};

export default Header;