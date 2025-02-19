import React from "react";
import { Bell, Menu } from "lucide-react";

const Header = ({ setSidebarOpen }) => {
  return (
    <div className="bg-white shadow py-4 px-4 flex items-center justify-between fixed top-0 left-0 right-0 z-10">
      <div className="flex items-center">
        {/* Mobile hamburger menu; hidden on md and above */}
        <div className="md:hidden mr-4">
          <Menu onClick={() => setSidebarOpen(prev => !prev)} className="cursor-pointer" />
        </div>
        <h1 className="lg:ml-[18rem] text-lg font-bold">Dashboard</h1>
      </div>
      <div className="flex items-center space-x-4">
        <Bell size={26} className="cursor-pointer" />
        <img
          className="w-8 h-8 rounded-full cursor-pointer"
          src="https://github.com/shadcn.png"
          alt="User Profile"
        />
      </div>
    </div>
  );
};

export default Header;
