import React, { useState, useEffect, useRef } from 'react';
import { useAuthStore } from "@/components/store/authStore";
import { HiDotsHorizontal } from "react-icons/hi";
import { FiFilter } from "react-icons/fi";
import { GoAlertFill } from "react-icons/go";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import UserView from './UserView';

const User = () => {
  const { users: allUsers, fetchUsers, genderUser } = useAuthStore();
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedGender, setSelectedGender] = useState(null);
  const [appliedGender, setAppliedGender] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dropdownRef = useRef(null);
  const itemsPerPage = 5;

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  useEffect(() => {
    const filterUsers = async () => {
      if (appliedGender !== null) {
        setIsLoading(true);
        await genderUser([appliedGender]);
        setIsLoading(false);
      } else {
        fetchUsers();
      }
    };
    filterUsers();
  }, [appliedGender, fetchUsers, genderUser]);

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
  }, [searchTerm, appliedGender]);

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

  const handleGenderChange = (gender) => {
    setSelectedGender(gender === selectedGender ? null : gender);
  };

  const applyFilters = () => {
    setAppliedGender(selectedGender);
    setIsFilterDialogOpen(false);
  };

  const clearFilters = () => {
    setSelectedGender(null);
    setAppliedGender(null);
    setIsFilterDialogOpen(false);
  };

  return (
    <div className="px-2 py-4 md:pl-[2rem] lg:pl-[18rem] pt-[6rem] max-w-[83rem] mx-auto">
      <div className="flex flex-col md:flex-row gap-3 md:gap-4 mb-4">
        <div className="relative flex-1">
          <input
            type="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 pl-4 text-sm md:text-base text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Search users..."
            aria-label="Search users"
          />
        </div>

        <Dialog 
          open={isFilterDialogOpen} 
          onOpenChange={(isOpen) => {
            setIsFilterDialogOpen(isOpen);
            if (isOpen) setSelectedGender(appliedGender);
          }}
        >
          <DialogTrigger asChild>
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition text-sm md:text-base">
              <FiFilter className="text-lg" />
              <span className="font-medium">Filter</span>
            </button>
          </DialogTrigger>
          <DialogContent className="max-w-[95vw] rounded-lg sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-lg font-bold">Filter Users by Gender</DialogTitle>
            </DialogHeader>

            <div className="mt-4">
              <p className="text-xs font-semibold text-gray-500 mb-2">BY GENDER</p>
              <div className="space-y-2">
                {["male", "female"].map((gender) => (
                  <label key={gender} className="flex items-center space-x-2 cursor-pointer p-1.5">
                    <input 
                      type="radio" 
                      name="gender" 
                      className="form-radio h-4 w-4 text-blue-600" 
                      checked={selectedGender === gender}
                      onChange={() => handleGenderChange(gender)}
                    />
                    <span className="text-sm text-gray-700 capitalize">{gender}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="mt-6 flex gap-4 justify-end">
              <button 
                onClick={clearFilters}
                className="text-gray-600 text-sm px-4 py-2 hover:bg-gray-100 rounded"
              >
                Clear
              </button>
              <button 
                onClick={applyFilters}
                className="bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700 text-sm font-semibold"
              >
                Apply
              </button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="border-y-2 border-gray-200 min-h-[400px]">
        <table className="w-full text-sm md:text-base text-gray-500 min-w-[600px]">
          <thead className="text-gray-700 uppercase bg-gray-50">
            <tr className="text-left">
              <th className="px-3 py-3 md:px-6 truncate max-w-[120px]">User</th>
              <th className="px-3 py-3 md:px-6">Image</th>
              <th className="px-3 py-3 md:px-6 truncate max-w-[150px]">Email</th>
              <th className="px-3 py-3 md:px-6">Country</th>
              <th className="px-3 py-3 md:px-6 whitespace-nowrap">Join Date</th>
              <th className="px-3 py-3 md:px-6">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="6" className="px-6 py-3 text-center h-64">
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                  </div>
                </td>
              </tr>
            ) : paginatedData.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-6 py-3 text-center h-64">
                  <div className="flex flex-col items-center justify-center gap-3">
                    {allUsers.length === 0 ? (
                      <div className="text-gray-500 text-sm md:text-base animate-pulse">
                        Loading users...
                      </div>
                    ) : (
                      <>
                        <GoAlertFill className="text-orange-500 text-4xl md:text-6xl mb-2 md:mb-4" />
                        <p className="text-base md:text-lg text-gray-600 font-medium">No Users found</p>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ) : (
              paginatedData.map((user) => (
                <tr key={user._id} className="bg-white border-t-2 border-gray-200 hover:bg-gray-50">
                  <td className="px-3 py-3 md:px-6 font-medium text-gray-900 truncate max-w-[120px]">
                    {user.name}
                  </td>
                  <td className="px-3 py-3 md:px-6">
                    <img
                      src={user?.images?.[0]?.url || "https://github.com/shadcn.png"}
                      alt="User profile"
                      className="w-10 h-10 md:w-12 md:h-12 rounded-md object-cover border border-gray-200"
                    />
                  </td>
                  <td className="px-3 py-3 md:px-6 text-gray-600 truncate max-w-[150px]">
                    {user.email}
                  </td>
                  <td className="px-3 py-3 md:px-6 text-gray-600">
                    {user.country || 'N/A'}
                  </td>
                  <td className="px-3 py-3 md:px-6 text-gray-600 whitespace-nowrap">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-3 py-3 md:px-6 relative">
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
        <div className="mt-6 overflow-x-auto">
          <Pagination className="min-w-[300px]">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  className="text-sm md:text-base"
                  href="#"
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                />
              </PaginationItem>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <PaginationItem key={page}>
                  <PaginationLink
                    className="text-sm md:text-base"
                    href="#"
                    isActive={currentPage === page}
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext
                  className="text-sm md:text-base"
                  href="#"
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}

      {isModalOpen && selectedUser && (
        <UserView user={selectedUser} onClose={closeModal} />
      )}
    </div>
  );
};

export default User;