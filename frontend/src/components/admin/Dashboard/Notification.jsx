import React, { useState, useEffect, useRef } from "react";
import { Bell as BellIcon } from "lucide-react";

const Notification = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative cursor-pointer" ref={dropdownRef} onClick={toggleDropdown}>
      <span className="sr-only">Open notifications</span>
      <BellIcon size={26} className="cursor-pointer" />

      {/* Notification Counter */}
      {/* {totalUsers > 0 && (
        <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
          {totalUsers}
        </span>
      )} */}

      {/* Notification Dropdown */}
      {isDropdownOpen && (
        <div className="absolute flex items-center space-x-2 px-2 right-0 mt-2 w-80 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-black/5">
          {/* Profile Image */}
          <img
            className="w-8 h-8 rounded-full object-cover"
            src="https://github.com/shadcn.png"
            alt="logged"
          />

          {/* Message & Date-Time */}
          <div className="flex flex-col">
            <a className="block text-sm text-gray-700 cursor-pointer px-2">
              Niraj Chaudhary logged successfully
            </a>

          </div>
        </div>
      )}
    </div>
  );
};

export default Notification;
