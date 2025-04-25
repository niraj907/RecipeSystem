import React, { useState, useEffect, useRef } from 'react';
import { useAuthStore } from "@/components/store/authStore";
import { HiDotsHorizontal } from "react-icons/hi";
import { FiFilter } from "react-icons/fi";
const User = () => {
  const { users, fetchUsers } = useAuthStore();
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const toggleActionDropdown = (id) => {
    setDropdownOpen(dropdownOpen === id ? null : id);
  };

  return (
    <div className="px-4 py-4 sm:pl-[8rem] md:pl-[12rem] lg:pl-[18rem] pt-[5.5rem] lg:pt-[6rem] max-w-[83rem] mx-auto">
      <div className="flex justify-end mb-4">
        <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition">
                      <FiFilter className="text-lg" />
                      <span className="font-medium">Filter</span>
                    </button>
                    </div>
      <div className="border-y-2 border-gray-200">
        <table className="w-full text-sm text-gray-500">
          <thead className="text-gray-700 uppercase">
            <tr className="text-left">
              <th className="px-6 py-2">User</th>
              <th className="px-6 py-2">Image</th>
              <th className="px-6 py-2">Email</th>
              <th className="px-6 py-2">Country</th>
              <th className="px-6 py-2">Date</th>
              <th className="px-6 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-6 py-3 text-center">
                  No users found.
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user._id} className="bg-white border-t-2 border-gray-200 hover:bg-gray-50">
                  <td className="px-6 py-3">{user.name}</td>

                  <td className="px-6 py-3">
                    <img
                       src={user?.images?.[0]?.url || "https://github.com/shadcn.png"}
                      alt="User"
                      className="w-12 h-12 rounded-md object-cover"
                    />
                  </td>

                  <td className="px-6 py-3">{user.email}</td>

                  <td className="px-6 py-3">{user.country}</td>

                  <td className="px-6 py-3">{new Date(user.createdAt).toLocaleString()}</td>

                  <td className="px-6 py-3 relative">
                    <HiDotsHorizontal
                      className="text-gray-500 cursor-pointer text-xl"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleActionDropdown(user._id);
                      }}
                    />
                    {dropdownOpen === user._id && (
                      <div
                        ref={dropdownRef}
                        className="absolute mt-2 w-28 bg-white rounded-md shadow-lg z-50"
                      >
                        <div
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 hover:text-white cursor-pointer rounded-md"
                        >
                          View
                        </div>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default User;
