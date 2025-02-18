import { Home, Book, Filter, Star,LogOut  } from "lucide-react";
import logo from "@/assets/logo.png"

const Sidebar = () => {
  return (
    <div className="w-64 bg-[#FFF8F4] h-screen p-5 flex flex-col gap-5">
      <img
                src={logo}
                className="w-40 cursor-pointer"
                alt="TasteTrack Logo"
              />
      <ul className="space-y-3 text-gray-700">
        <li className="flex items-center gap-3 p-2 cursor-pointer hover:bg-orange-200 rounded"><Home /> Home</li>
        <li className="flex items-center gap-3 p-2 cursor-pointer hover:bg-orange-200 rounded"><Book /> Recipes</li>
        <li className="flex items-center gap-3 p-2 cursor-pointer hover:bg-orange-200 rounded"><Filter /> Filter</li>
        <li className="flex items-center gap-3 p-2 cursor-pointer hover:bg-orange-200 rounded"><Star /> Favorite</li>
      </ul>
      <div className="mt-auto bg-orange-300 text-white p-3 rounded-lg text-center cursor-pointer">
        <LogOut className="inline mr-2" /> Log Out
      </div>
    </div>
  );
};

export default Sidebar; 
