import React from "react";
import { Bell } from "lucide-react";

const Header = () => {
  return (
    <div className="bg-white shadow px-6 py-4 flex justify-end items-center space-x-4">
      <Bell size={26} />
      <img
            className="w-8 h-8 rounded-full cursor-pointer"
            src="https://github.com/shadcn.png"
            alt="User Profile"
          />
    </div>
  );
};

export default Header;
