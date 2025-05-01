import { useState } from "react";
import { 
  Home, Book, Star, LogOut, 
  ChevronDown, Settings, 
  MessageCircle, User2, Youtube 
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import logo from "@/assets/logo.png";
import Confirm from "@/components/admin/Dashboard/Confirm";
import { toast } from "sonner";
import { useAdminStore } from "../adminStore";
import Cookies from "js-cookie";

const Sidebar = ({ isMobileOpen, onClose }) => {
  const [showModal, setShowModal] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { logout } = useAdminStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out successfully.");
      Cookies.remove("adminToken");
      localStorage.clear();
      navigate("/");
    } catch (error) {
      toast.error("Unsuccessful logout.");
    }
    setShowModal(false);
  };

  return (
    <>
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed z-50 h-screen p-5 flex flex-col gap-5 bg-[#FEF5EC] 
        w-64 transform transition-transform duration-300
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"} 
        lg:translate-x-0`}
      >
        <div className="flex items-center gap-3 p-2">
          <img
            src={logo}
            className="w-40 cursor-pointer hover:opacity-80 transition-opacity"
            alt="Logo"
            onClick={() => navigate("/dashboard")}
          />
        </div>

        <nav className="flex-1">
          <ul className="space-y-2 text-gray-700">
            <li
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-orange-100 
              transition-colors cursor-pointer"
              onClick={() => navigate("/dashboard")}
            >
              <Home size={22} />
              <span className="text-[1rem]">Home</span>
            </li>

            <div
              className="p-2 rounded-lg hover:bg-orange-100 transition-colors cursor-pointer"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <div className="flex items-center gap-3">
                <Book size={22} />
                <span className="text-[1rem] flex-1">Recipes</span>
                <ChevronDown 
                  size={16}
                  className={`transform transition-transform ${
                    dropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </div>
            </div>

            {dropdownOpen && (
              <div className="ml-10 space-y-2">
                <li
                  className="p-2 rounded-md hover:bg-orange-100 
                  transition-colors cursor-pointer text-[19px]"
                  onClick={() => navigate("/recipes/add")}
                >
                  Add
                </li>
              </div>
            )}

            {[
              { icon: Settings, text: "Dishes", path: "/dashboard/dishes" },
              { icon: Star, text: "Favorites", path: "/dashboard/favorites" },
              { icon: MessageCircle, text: "Feedback", path: "/dashboard/feedback" },
              { icon: User2, text: "Users", path: "/dashboard/user" },
              { icon: Youtube, text: "YouTube", path: "/dashboard/youtube" },
            ].map((item) => (
              <li
                key={item.text}
                className="flex items-center gap-3 p-2 rounded-lg 
                hover:bg-orange-100 transition-colors cursor-pointer"
                onClick={() => navigate(item.path)}
              >
                <item.icon size={22} />
                <span className="text-[1rem]">{item.text}</span>
              </li>
            ))}
          </ul>
        </nav>

        <button
          onClick={() => setShowModal(true)}
          className="mt-auto flex items-center justify-center gap-2 
          bg-orange-400 text-white p-3 rounded-lg hover:bg-orange-500 
          transition-colors text-[1rem]"
        >
          <LogOut size={20} />
          Log Out
        </button>
      </aside>

      {showModal && (
        <Confirm 
          onClose={() => setShowModal(false)} 
          onConfirm={handleLogout} 
          message="Are you sure you want to log out?"
        />
      )}
    </>
  );
};

export default Sidebar;




