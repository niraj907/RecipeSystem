import React, { useState, useEffect, useRef } from 'react';
import { useAuthStore } from "@/components/store/authStore";
import { HiDotsHorizontal } from "react-icons/hi";
import { FiFilter } from "react-icons/fi";
import { RiErrorWarningLine } from "react-icons/ri";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import UserView from './UserView';

const User = () => {
  const { users: allUsers, fetchUsers } = useAuthStore();
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState(null);
  const dropdownRef = useRef(null);
  const itemsPerPage = 5;

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const filteredUsers = allUsers.filter(user =>
    user.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const paginatedData = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const toggleActionDropdown = (id) => {
    setDropdownOpen(dropdownOpen === id ? null : id);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleView = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  return (
    <div className="px-4 py-4 sm:pl-[8rem] md:pl-[12rem] lg:pl-[18rem] pt-[5.5rem] lg:pt-[6rem] max-w-[83rem] mx-auto">
      <div className="flex justify-end mb-4 gap-4">
        <div className="relative flex-1 max-w-xs">
          <input
            type="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-full p-2 pl-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Search users..."
            aria-label="Search users"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition duration-200">
          <FiFilter className="text-lg" />
          <span className="font-medium">Filter</span>
        </button>
      </div>

      <div className="border-y-2 border-gray-200">
        <table className="w-full text-sm text-gray-500">
          <thead className="text-gray-700 uppercase bg-gray-50">
            <tr className="text-left">
              <th className="px-6 py-3">User</th>
              <th className="px-6 py-3">Image</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Country</th>
              <th className="px-6 py-3">Date</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-6 py-3 text-center h-64">
                  <div className="flex flex-col items-center justify-center gap-3">
                    {allUsers.length === 0 ? (
                      <div className="text-gray-500 text-sm animate-pulse">
                        Loading users...
                      </div>
                    ) : (
                      <>
                        <RiErrorWarningLine className="text-3xl text-gray-400 mb-2 animate-pulse" />
                        <div className="text-gray-600 font-medium text-sm">
                          No users found
                        </div>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ) : (
              paginatedData.map((user) => (
                <tr key={user._id} className="bg-white border-t-2 border-gray-200 hover:bg-gray-50">
                  <td className="px-6 py-3 font-medium text-gray-900">{user.name}</td>
                  <td className="px-6 py-3">
                    <img
                      src={user?.images?.[0]?.url || "https://github.com/shadcn.png"}
                      alt="User profile"
                      className="w-12 h-12 rounded-md object-cover border border-gray-200"
                    />
                  </td>
                  <td className="px-6 py-3 text-gray-600">{user.email}</td>
                  <td className="px-6 py-3 text-gray-600">{user.country || 'N/A'}</td>
                  <td className="px-6 py-3 text-gray-600">
                    {new Date(user.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </td>
                  <td className="px-6 py-3 relative">
                    <HiDotsHorizontal
                      className="text-gray-500 cursor-pointer text-xl hover:text-gray-700 transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleActionDropdown(user._id);
                      }}
                    />
                    {dropdownOpen === user._id && (
                      <div
                        ref={dropdownRef}
                        className="absolute right-0 mt-2 w-28 bg-white rounded-md shadow-lg z-50 border border-gray-100 divide-y divide-gray-100"
                      >
                        <div
                          className="px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer transition-colors"
                          onClick={() => handleView(user)}
                        >
                          View
                        </div>
                        <div className="px-4 py-2.5 text-sm text-red-600 hover:bg-gray-50 cursor-pointer transition-colors">
                          Delete
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

      {filteredUsers.length > itemsPerPage && (
        <Pagination className="mt-6">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="hover:bg-gray-100"
              />
            </PaginationItem>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <PaginationItem key={page}>
                <PaginationLink
                  href="#"
                  isActive={currentPage === page}
                  onClick={() => setCurrentPage(page)}
                  className="hover:bg-gray-100"
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="hover:bg-gray-100"
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}

      {isModalOpen && selectedUser && (
        <UserView user={selectedUser} onClose={closeModal} />
      )}
    </div>
  );
};

export default User;