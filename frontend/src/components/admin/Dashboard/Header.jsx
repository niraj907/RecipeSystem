import { useState, useEffect, useRef } from "react";
import { Menu } from "lucide-react";
import { FaBell } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import { toast } from "sonner";
import EditAdminProfile from "@/components/admin/Dashboard/EditAdminProfile";
import { useAdminStore } from "../adminStore";
import { useAuthStore } from "@/components/store/authStore";

const Header = ({ toggleSidebar }) => {
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [activeDropdownId, setActiveDropdownId] = useState(null);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const notificationRef = useRef(null);
  
  const { admin, fetchAdmin } = useAdminStore();
  const { 
    fetchAllNotification, 
    markNotificationAsRead, 
    notifications, 
    deleteNotification 
  } = useAuthStore();

  useEffect(() => {
    fetchAdmin();
    fetchAllNotification();
  }, [fetchAdmin, fetchAllNotification]);

  useClickOutside(notificationRef, () => {
    setIsNotificationOpen(false);
    setActiveDropdownId(null);
  });

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const handleNotificationClick = async (notification) => {
    if (!notification.isRead) {
      await markNotificationAsRead(notification._id);
    }
    
  };

  const handleDeleteNotification = async (id) => {
    try {
      await deleteNotification(id);
      toast.success("Notification deleted");
    } catch (error) {
      toast.error("Delete failed");
    }
  };

  return (
    <header className="bg-white shadow-sm fixed top-0 left-0 right-0 lg:left-64 z-[50]">
      <div className="flex items-center justify-between h-16 px-4">
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-lg hover:bg-gray-100 lg:hidden"
        >
          <Menu size={24} className="text-gray-600" />
        </button>

        <div className="hidden sm:block text-xl font-semibold text-gray-800">
          Admin Dashboard
        </div>

        <div className="flex items-center gap-4">

        <div className="relative" ref={notificationRef}>
  <button
    onClick={() => setIsNotificationOpen(!isNotificationOpen)}
    className="p-2 relative hover:bg-gray-100 rounded-full"
  >
    <FaBell size={20} className="text-orange-500" />
    {unreadCount > 0 && (
      <span className="absolute top-0 right-0 bg-red-500 text-white 
      text-xs w-4 h-4 rounded-full flex items-center justify-center">
        {unreadCount}
      </span>
    )}
  </button>

  {isNotificationOpen && (
    <div className="absolute right-0 mt-2 w-96 max-h-[400px] bg-white 
    rounded-lg shadow-xl border border-gray-100 overflow-y-auto">
      <div className="p-4 border-b border-gray-200">
        <h3 className="font-medium text-gray-800">Notifications</h3>
      </div>
      
      {notifications.length === 0 ? (
        <p className="p-4 text-gray-500 text-sm">No notifications</p>
      ) : (
        notifications.map((notification) => (
          <div
            key={notification._id}
            className={`p-4 border-b border-gray-100 hover:bg-gray-50 
            cursor-pointer ${!notification.isRead ? "bg-blue-50" : ""}`}
            onClick={() => handleNotificationClick(notification)}
          >
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0">
                <img 
                  className="w-10 h-10 rounded-full object-cover"
                  src={notification.image || "/placeholder.svg"}
                  alt="User"
                />
              </div>
              
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-800 truncate">
                  {notification.message}
                </p>
                <time className="text-xs text-gray-500 mt-1">
                  {new Date(notification.createdAt).toLocaleString()}
                </time>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveDropdownId(
                    activeDropdownId === notification._id 
                      ? null 
                      : notification._id
                  );
                }}
                className="p-1 hover:bg-gray-200 rounded-full self-start"
              >
                <BsThreeDotsVertical className="text-gray-600" />
              </button>
            </div>
            
            {activeDropdownId === notification._id && (
              <div className="mt-2 flex justify-end">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteNotification(notification._id);
                  }}
                  className="text-red-600 hover:text-red-800 text-sm 
                  px-3 py-1 rounded-md hover:bg-red-50"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  )}
</div>
          <button
            onClick={() => setIsProfileModalOpen(true)}
            className="flex items-center gap-2 p-2 rounded-lg"
          >
            <img
              className="w-8 h-8 rounded-full object-cover"
              src={admin?.images?.[0]?.url || "/default-admin.png"}
              alt="Admin"
            />
          
          </button>
        </div>



      </div>

      {isProfileModalOpen && (
        <EditAdminProfile
          admin={admin}
          onClose={() => setIsProfileModalOpen(false)}
        />
      )}
    </header>
  );
};

// Custom hook for click outside detection
const useClickOutside = (ref, handler) => {
  useEffect(() => {
    const listener = (event) => {
      if (!ref.current || ref.current.contains(event.target)) return;
      handler(event);
    };
    document.addEventListener("mousedown", listener);
    return () => document.removeEventListener("mousedown", listener);
  }, [ref, handler]);
};

export default Header;