import React, { useState, useEffect, useRef } from "react";
import { Menu, Bell as BellIcon } from "lucide-react";
import EditAdminProfile from "@/components/admin/Dashboard/EditAdminProfile";
import { useAdminStore } from "../adminStore";
import { useAuthStore } from "@/components/store/authStore";
import { BsThreeDotsVertical } from "react-icons/bs";
import { toast } from "sonner";

const Header = ({ setSidebarOpen }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState(null);

  const [isNotificationDropdownOpen, setIsNotificationDropdownOpen] = useState(false);
  const [activeDropdownId, setActiveDropdownId] = useState(null);

  const notificationRef = useRef(null);

  const { admin, fetchAdmin } = useAdminStore();
  const {
    user,
    fetchAllNotification,
    markNotificationAsRead,
    notifications,
    notificationCount,
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
  };

  const toggleNotificationDropdown = () => {
    setIsNotificationDropdownOpen((prev) => !prev);
  };

  const toggleActionDropdown = (id) => {
    setActiveDropdownId((prevId) => (prevId === id ? null : id));
  };

  const handleClickOutside = (event) => {
    if (
      notificationRef.current &&
      !notificationRef.current.contains(event.target)
    ) {
      setIsNotificationDropdownOpen(false);
      setActiveDropdownId(null);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleDelete = async (notificationId) => {
    // console.log("Delete notification with ID:", notificationId);
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

 let notificationCounts = 0 ;

  const notificationArrays = notifications.map((notification)=>{
      if( notification.isRead === false){
        notificationCounts++;
      }
  })

  

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
        <div className="relative" ref={notificationRef}>
          <div onClick={toggleNotificationDropdown} className="cursor-pointer relative">
            <BellIcon size={26} />
            {notifications.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {notificationCounts}
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
                        src={notification.image || "https://github.com/shadcn.png"}
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

                    {/* Action dropdown for each notification */}
                    <div className="relative">
                      <BsThreeDotsVertical
                        className="text-gray-500 ml-2 mt-1 cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleActionDropdown(notification._id);
                        }}
                      />
                      {activeDropdownId === notification._id && (
                        <div className="absolute right-0 mt-2 w-28 bg-white rounded-md shadow-lg z-50">
                          <div
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(notification._id);
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
