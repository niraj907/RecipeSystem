import React, { useState, useCallback, useRef, useEffect } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";
import UpdateRecipe from "@/components/admin/Dashboard/UpdateRecipe";
import DeleteConfirm from "@/components/admin/Dashboard/DeleteConfirm";
import { useRecipeStore } from "@/components/store/recipeStore";
import { toast } from "sonner";
import { Link } from "react-router-dom";

const Maintain = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [recipeToDelete, setRecipeToDelete] = useState(null);
   const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState('10');
  const dropdownRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(1);

  const { recipes, fetchAllRecipes , deleteRecipe} = useRecipeStore();
console.log(recipes) 

  useEffect(() => {
    fetchAllRecipes(); // Fetch recipes when component mounts
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setCurrentPage(1); // Reset to first page when changing items per page
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleDelete = useCallback(async (id) => {
    try {
      await deleteRecipe(id);
      toast.success("Deleted successfully recipe");
    } catch (error) {
      toast.error("Error deleting recipe.");
    } finally {
      setIsDeleteConfirmOpen(false);
    }
  }, [deleteRecipe]);


  const handleEdit = (recipe) => {
    setSelectedRecipe(recipe);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRecipe(null);
  };

  const openDeleteConfirm = (recipe) => {
    setRecipeToDelete(recipe);
    setIsDeleteConfirmOpen(true);
  };

  const closeDeleteConfirm = () => {
    setIsDeleteConfirmOpen(false);
    setRecipeToDelete(null);
  };

  const filteredRecipes = recipes.filter((recipe) =>
    recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  recipe.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate the number of pages
  const totalPages = Math.ceil(filteredRecipes.length / selectedItem);
  const startIndex = (currentPage - 1) * selectedItem;
  const endIndex = startIndex + parseInt(selectedItem, 10);
  const paginatedRecipes = filteredRecipes.slice(startIndex, endIndex);

  return (
    <div className="px-4 py-4 sm:pl-[8rem] md:pl-[12rem] lg:pl-[18rem] pt-[5.5rem] lg:pt-[6rem] max-w-[83rem] mx-auto">
      <div className="border border-gray-300">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center p-4">
          <div className="relative inline-block text-left w-full sm:w-auto" ref={dropdownRef}>
            <div className="flex justify-center items-center gap-2">
              <span>Show</span>
              <button
                className="py-2 px-4 bg-white rounded hover:bg-gray-100 flex items-center"
                onClick={toggleDropdown}
              >
                {selectedItem}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              <span>entries</span>
            </div>

            {isOpen && (
              <div className="absolute left-44 lg:left-16 z-10 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                  <button
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                    onClick={() => handleItemClick('5')}
                  >
                    5
                  </button>
                  <button
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                    onClick={() => handleItemClick('8')}
                  >
                    8
                  </button>
                  <button
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                    onClick={() => handleItemClick('10')}
                  >
                    10
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row mt-2 sm:mt-0">
            <input
              type="search"
              className="border p-2 rounded w-full max-w-md"
              placeholder="Search recipe..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-gray-500 border border-gray-300">
            <thead className="text-gray-700 uppercase bg-gray-100">
              <tr className="text-left">
                <th className="px-6 py-2 border border-gray-300">ID</th>
                <th className="px-6 py-2 border border-gray-300">Image</th>
                <th className="px-6 py-2 border border-gray-300">Name</th>
                <th className="px-6 py-2 border border-gray-300">Category</th>
                <th className="px-6 py-2 border border-gray-300">Action</th>
              </tr>
            </thead>
            <tbody>
              {paginatedRecipes.length > 0 ? (
                paginatedRecipes.map((recipe) => (
                  <tr key={recipe._id} className="bg-white border border-gray-300 transition-all">
                    <td className="px-6 py-4 border border-gray-300">{recipe._id}</td>
                    <td className="px-6 py-4 border border-gray-300">
                      <img src={recipe.images?.[0]?.url || "/default-image.jpg" }  className="w-12 h-12 rounded-md object-cover" />
                    </td>
                    <td className="px-6 py-4 border border-gray-300">{recipe.name}</td>
                    <td className="px-6 py-4 border border-gray-300">{recipe.category}</td>
                    <td className="px-6 py-8 flex gap-3 text-xl">
                      <Link  to={`/recipes/view/${recipe._id}`} className="hover:text-orange-500 flex items-center transition">
                        <IoEyeOutline />
                      </Link>
                      <button onClick={() => handleEdit(recipe)} className="hover:text-green-500 flex items-center transition">
                        <FaRegEdit />
                      </button>
                      <button onClick={() => openDeleteConfirm(recipe)} className="hover:text-red-500  flex items-center transition">
                        <MdDeleteOutline />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-4 text-gray-500">
                    No recipe found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex flex-col lg:flex-row justify-between items-center p-4 text-xs text-gray-600">
          <p>Showing {startIndex + 1} to {Math.min(endIndex, filteredRecipes.length)} of {filteredRecipes.length} entries</p>
          <nav aria-label="Pagination" className="flex items-center gap-2">
            <button
              aria-label="Previous Page"
              className="p-2 rounded hover:bg-gray-100"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                className={`px-4 py-2 rounded ${currentPage === index + 1 ? "bg-gray-200 text-gray-900 font-medium" : "hover:bg-gray-100"}`}
                onClick={() => setCurrentPage(index + 1)}
              >
                {index + 1}
              </button>
            ))}
            <button
              aria-label="Next Page"
              className="p-2 rounded hover:bg-gray-100"
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </nav>
        </div>
      </div>

      {/* Modal for updating recipe */}
      {isModalOpen && (
        <UpdateRecipe recipe={selectedRecipe} onClose={closeModal} />
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteConfirmOpen && (
        <DeleteConfirm
          onClose={closeDeleteConfirm}
          onConfirm={() => handleDelete(recipeToDelete._id)}
        />
      )}
    </div>
  );
};

export default Maintain;