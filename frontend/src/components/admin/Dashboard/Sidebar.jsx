import { useState } from "react";
import { Menu, Home, Book, Star, LogOut, ChevronDown,Settings, MessageCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import logo from "@/assets/logo.png";
import Confirm from "@/components/admin/Dashboard/Confirm";
import { toast } from "sonner";
import { useAdminStore } from "../adminStore";
import Cookies from "js-cookie";


const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const { logout } = useAdminStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out successfully.");
      Cookies.remove("adminToken");
      navigate("/");
    } catch (error) {
      toast.error("Unsuccessful logout.");
    }
    setShowModal(false);
  };

  return (
    <>
      {/* Mobile Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black opacity-50 transition-opacity sm:hidden ${
          sidebarOpen ? "block" : "hidden"
        }`}
        onClick={() => setSidebarOpen(false)}
      ></div>

      {/* Sidebar */}
      <div
        className={`fixed z-50 h-screen p-5 flex flex-col gap-5 bg-[#FFF8F4] transition-all duration-300 ${
          isCollapsed ? "w-20" : "w-64"
        } 
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
        sm:translate-x-0`}
      >
        {/* Logo and Menu Toggle */}
        <div className="flex items-center gap-3 p-2">
          <Menu
            className="cursor-pointer"
            onClick={() => {
              setIsCollapsed(!isCollapsed);
              setSidebarOpen(!sidebarOpen);
            }}
          />
          {!isCollapsed && (
            <img src={logo} className="w-40 cursor-pointer" alt="TasteTrack Logo"   onClick={() => navigate("/dashboard")} />
          )}
        </div>

        {/* Navigation Links */}
        <ul className="space-y-3 text-gray-700">
          <li
            className="flex items-center gap-3 p-2 cursor-pointer hover:bg-orange-200 rounded"
            onClick={() => navigate("/dashboard")}
          >
            <Home /> {!isCollapsed && "Home"}
          </li>

          {/* Recipes Dropdown */}
          <div
            className="p-2 flex items-center rounded-md cursor-pointer hover:bg-orange-200"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <div className="flex items-center gap-3 w-full">
              <Book />
              {!isCollapsed && <span>Recipes</span>}
              {!isCollapsed && (
                <ChevronDown className={`ml-auto transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
              )}
            </div>
          </div>

          {dropdownOpen && (
            <div className="ml-6 space-y-2">
              <li
                className="cursor-pointer p-2 hover:bg-orange-200 rounded-md"
                onClick={() => navigate("/recipes/add")}
              >
                Add
              </li>
            
            </div>
          )}

          <li
            className="flex items-center gap-3 p-2 cursor-pointer hover:bg-orange-200 rounded"
            onClick={() => navigate("/dashboard/maintenance")}
          >
            <Settings /> {!isCollapsed && "Maintenance"}
          </li>

          <li
            className="flex items-center gap-3 p-2 cursor-pointer hover:bg-orange-200 rounded"
            onClick={() => navigate("/dashboard/favorites")}
          >
            <Star /> {!isCollapsed && "Favorite"}
          </li>

          <li
            className="flex items-center gap-3 p-2 cursor-pointer hover:bg-orange-200 rounded"
            onClick={() => navigate("/dashboard/feedback")}
          >
           <MessageCircle /> {!isCollapsed && "Feedback"}
          </li>


        </ul>

        {/* Logout Button */}
        <div
          className="mt-auto bg-orange-300 text-white p-3 rounded-lg text-center cursor-pointer flex items-center justify-center"
          onClick={() => setShowModal(true)}
        >
          <LogOut />
          {!isCollapsed && <span className="ml-2">Log Out</span>}
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      {showModal && <Confirm onClose={() => setShowModal(false)} onConfirm={handleLogout} />}
    </>
  );
};

export default Sidebar;
