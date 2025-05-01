import React, { useState, useEffect, useRef } from 'react';
import { HiDotsHorizontal } from "react-icons/hi";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useAuthStore } from "@/components/store/authStore";
import { toast } from "sonner";

const FavoriteSave = () => {
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const { adminRecipes, fetchAlladminRecipe, deleteadminRecipe } = useAuthStore();
  const dropdownRef = useRef(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        await fetchAlladminRecipe();
      } catch (error) {
        console.error("Error fetching admin Favourite Save:", error);
      }
    };
    fetchRecipes();
  }, [fetchAlladminRecipe]);

  const toggleActionDropdown = (id) => {
    setDropdownOpen(dropdownOpen === id ? null : id);
  };

  const handleDelete = async (id) => {
    try {
      await deleteadminRecipe(id);
      toast.success("Deleted successfully Favourite Save");
      setDropdownOpen(null);
    } catch (error) {
      toast.error("Error deleting Favourite Save.");
      console.error("Error deleting Favourite Save:", error);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Pagination logic
  const totalPages = Math.ceil(adminRecipes.length / itemsPerPage);
  const paginatedData = adminRecipes.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
  
    <div className="px-2 py-4 md:pl-[2rem] lg:pl-[18rem] pt-[6rem] max-w-[83rem] mx-auto">
     <div className="border-y-2 border-gray-200 overflow-x-auto">
        <table className="w-full text-sm text-gray-500">
          <thead className="text-gray-700 uppercase text-center bg-gray-50">
            <tr className="text-left">
              <th className="px-6 py-2">Recipe ID</th>
              <th className="px-6 py-2">Image</th>
              <th className="px-6 py-2">Message</th>
              <th className="px-6 py-2">Date</th>
              <th className="px-6 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((recipe) => (
              <tr key={recipe._id} className="bg-white border-t-2 border-gray-200 hover:bg-gray-50">
                <td className="px-6 py-3">{recipe._id}</td>
                <td className="px-6 py-3">
                  <img
                    src={recipe.image || '/default-image.jpg'}
                    alt="Recipe"
                    className="w-12 h-12 rounded-md object-cover"
                  />
                </td>
                <td className="px-6 py-3">{recipe.message}</td>
                <td className="px-6 py-3">{new Date(recipe.createdAt).toLocaleString()}</td>
                <td className="px-6 py-3 relative">
                  <HiDotsHorizontal
                    className="text-gray-500 cursor-pointer text-xl"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleActionDropdown(recipe._id);
                    }}
                  />
                  {dropdownOpen === recipe._id && (
                    <div
                      ref={dropdownRef}
                      className="absolute mt-2 w-28 bg-white rounded-md shadow-lg z-50"
                    >
                      <div
                        onClick={() => handleDelete(recipe._id)}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-red-500 hover:text-white cursor-pointer rounded-md"
                      >
                        Delete
                      </div>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Show Pagination only if more than 5 items */}
      {adminRecipes.length > itemsPerPage && (
        <Pagination className="mt-4">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              />
            </PaginationItem>
            {[...Array(totalPages)].map((_, index) => (
              <PaginationItem key={index}>
                <PaginationLink
                  href="#"
                  isActive={currentPage === index + 1}
                  onClick={() => setCurrentPage(index + 1)}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
};

export default FavoriteSave;
