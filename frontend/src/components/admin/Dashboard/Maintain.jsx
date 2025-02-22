import React, { useState, useCallback } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import UpdateRecipe from "@/components/admin/Dashboard/UpdateRecipe"
import DeleteConfirm from "@/components/admin/Dashboard/DeleteConfirm"
const Maintain = () => {
  const [recipes, setRecipes] = useState([
  
      {
        menuId: 1,
        image: "https://github.com/shadcn.png",
        recipeName: "Spaghetti Carbonara",
        category: "Pasta",
      },
      {
        menuId: 2,
        image: "https://github.com/shadcn.png",
        recipeName: "Chicken Curry",
        category: "Curry",
      },
      {
        menuId: 3,
        image: "https://github.com/shadcn.png",
        recipeName: "Margherita Pizza",
        category: "Pizza",
      },
      {
        menuId: 4,
        image: "https://github.com/shadcn.png",
        recipeName: "Beef Stroganoff",
        category: "Beef",
      },
      {
        menuId: 5,
        image: "https://github.com/shadcn.png",
        recipeName: "Vegetable Stir Fry",
        category: "Vegetarian",
      },
      {
        menuId: 6,
        image: "https://github.com/shadcn.png",
        recipeName: "Shrimp Scampi",
        category: "Seafood",
      },
      {
        menuId: 7,
        image: "https://github.com/shadcn.png",
        recipeName: "Mushroom Risotto",
        category: "Rice",
      },
      {
        menuId: 8,
        image: "https://github.com/shadcn.png",
        recipeName: "Tacos al Pastor",
        category: "Mexican",
      },
      {
        menuId: 9,
        image: "https://github.com/shadcn.png",
        recipeName: "Butter Chicken",
        category: "Curry",
      },
      {
        menuId: 10,
        image: "https://github.com/shadcn.png",
        recipeName: "Greek Salad",
        category: "Salad",
      },
      {
        menuId: 11,
        image: "https://github.com/shadcn.png",
        recipeName: "Lobster Bisque",
        category: "Soup",
      },
      {
        menuId: 12,
        image: "https://github.com/shadcn.png",
        recipeName: "Lasagna",
        category: "Pasta",
      },
      {
        menuId: 13,
        image: "https://github.com/shadcn.png",
        recipeName: "Grilled Salmon",
        category: "Seafood",
      },
      {
        menuId: 14,
        image: "https://github.com/shadcn.png",
        recipeName: "BBQ Ribs",
        category: "BBQ",
      },
      {
        menuId: 15,
        image: "https://github.com/shadcn.png",
        recipeName: "Sushi Rolls",
        category: "Japanese",
      },
      {
        menuId: 16,
        image: "https://github.com/shadcn.png",
        recipeName: "Pancakes",
        category: "Breakfast",
      },
      {
        menuId: 17,
        image: "https://github.com/shadcn.png",
        recipeName: "Clam Chowder",
        category: "Soup",
      },
      {
        menuId: 18,
        image: "https://github.com/shadcn.png",
        recipeName: "Biryani",
        category: "Rice",
      },
      {
        menuId: 19,
        image: "https://github.com/shadcn.png",
        recipeName: "Falafel Wrap",
        category: "Vegetarian",
      },
      {
        menuId: 20,
        image: "https://github.com/shadcn.png",
        recipeName: "Chocolate Cake",
        category: "Dessert",
      },
 
    
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [recipeToDelete, setRecipeToDelete] = useState(null); // State to hold the recipe to delete

  const handleDelete = useCallback((id) => {
    setRecipes((prevRecipes) => prevRecipes.filter((recipe) => recipe.menuId !== id));
    setIsDeleteConfirmOpen(false); // Close the confirmation modal after deletion
  }, []);


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

  return (
    <div className="px-4 py-4 sm:pl-[8rem] md:pl-[12rem] lg:pl-[18rem] pt-[5.5rem] lg:pt-[6rem] max-w-[83rem] mx-auto">
      <div className="border border-gray-300">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between p-4">
          <button className="py-2 px-4 bg-white rounded hover:bg-gray-100 active:bhttps://github.com/shadcn.png flex items-center mb-2 sm:mb-0">
            10 items
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>

          <form className="flex flex-col sm:flex-row ">
            <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only">Search</label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                </svg>
              </div>
              <input type="search" id="default-search" className="block  w-full p-3 ps-10 text-sm border border-https://github.com/shadcn.png focus:ring-blue-500 focus:border-blue-500" placeholder="Search recipes..." required />
            </div>
          </form>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-gray-500 border border-gray-300">
            <thead className="text-gray-700 uppercase bg-gray-100">
              <tr className="text-left">
                <th className="px-6 py-2 border border-gray-300">Menu ID</th>
                <th className="px-6 py-2 border border-gray-300">Image</th>
                <th className="px-6 py-2 border border-gray-300">Name</th>
                <th className="px-6 py-2 border border-gray-300">Category</th>
                <th className="px-6 py-2 border border-gray-300">Action</th>
              </tr>
            </thead>
            <tbody>
              {recipes.map((recipe) => (
                <tr key={recipe.menuId} className="bg-white border bohttps://github.com/shadcn.png transition-all">
                  <td className="px-6 py-4 border border-gray-300">{recipe.menuId}</td>
                  <td className="px-6 py-4 border border-gray-300">
                    <img src={recipe.image} alt={recipe.recipeName} className="w-12 h-12 rounded-md object-cover" />
                  </td>
                  <td className="px-6 py-4 border border-gray-300">{recipe.recipeName}</td>
                  <td className="px-6 py-4 border border-gray-300">{recipe.category}</td>
                  <td className="px-6 py-8 flex gap-3 text-xl">

                  <button onClick={() => handleEdit(recipe)} className="hover:text-green-800 flex items-center transition">
                      <FaRegEdit />
                    </button>

                 <button onClick={() => openDeleteConfirm(recipe)} className="hover:text-red-800 flex items-center transition">
                      <MdDeleteOutline />
                    </button>

                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex flex-col lg:flex-row justify-between items-center p-4 text-xs text-gray-600">
          <p>Showing 11 to 20 of 95 entries</p>
          <nav aria-label="Pagination" className="flex items-center gap-2">
            <button aria-label="Previous Page" className="p-2 rounded hover:bg-gray-100">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            {[1, 2, 3, "...", 9].map((num, index) => (
              <button key={index} className={`px-4 py-2 rounded ${num === 2 ? "bg-gray-200 text-gray-900 font-medium" : "hover:bg-gray-100"}`}>
                {num}
              </button>
            ))}
            <button aria-label="Next Page" className="p-2 rounded hover:bg-gray-100">
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
          onConfirm={() => handleDelete(recipeToDelete.menuId)}
        />
      )}
      
    </div>
  );
};

export default Maintain;