import { useState, useEffect } from "react";
import { useRecipeStore } from "@/components/store/recipeStore";
import { Link } from "react-router-dom";
import { LuAlarmClockCheck } from "react-icons/lu";
import { GoAlertFill } from "react-icons/go";

const CategoryItem = ({ category, onClick, isSelected }) => {
  return (
    <button
      onClick={() => onClick(category)}
      className={`flex-1 text-center border border-gray-300 py-3  px-2 lg:px-4 
                  text-gray-600 font-semibold text-base sm:text-lg 
                  hover:bg-gray-100
                  ${isSelected ? "bg-gray-200" : ""}`}
    >
      {category}
    </button>
  );
};

const RecipeCard = () => {
  const { recipes, fetchAllRecipes } = useRecipeStore();
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    fetchAllRecipes(); 
  }, [fetchAllRecipes]);

  const filteredRecipes = selectedCategory
    ? recipes.filter((recipe) => recipe.category === selectedCategory)
    : recipes;

  const categories = ["all", "breakfast", "lunch", "dinner", "snacks"];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Recipes</h1>
      <div className="flex border border-gray-400 divide-x divide-gray-300 rounded-md">
        {categories.map((category) => (
       <CategoryItem
       key={category}
       category={category}
       onClick={(selected) => setSelectedCategory(selected === "all" ? "" : selected)}
       isSelected={selectedCategory === category || (category === "all" && selectedCategory === "")}
     />
     
        ))}
      </div>
      <div className="mt-6">
        {filteredRecipes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredRecipes.map((recipe) => (
              <div
                key={recipe._id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <img
                  src={recipe.images?.[0]?.url || "https://via.placeholder.com/300"}
                  alt={recipe.name}
                  className="w-full h-56 object-cover"
                />
                <div className="p-4">
                  <div className="flex justify-between items-center">
                    <h2 className="text-lg font-semibold text-[#333]">{recipe.name}</h2>
                    <Link
                      to={`/view/${recipe._id}`}
                      className=" px-4 py-1 rounded-md text-orange-600 border-2 border-orange-600 hover:bg-orange-600 hover:text-white transition"
                    >
                      View
                    </Link>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <p className="text-sm text-gray-500">{recipe.category}</p>
                    <p className="text-sm text-gray-500 flex items-center">
                      <LuAlarmClockCheck className="mr-1" /> {recipe.tot_time || "N/A"}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center h-64">
            <div className="text-center flex flex-col items-center">
              <GoAlertFill className="text-orange-500 text-6xl mb-4" />
              <p className="text-lg text-gray-600 font-medium">No recipes found</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecipeCard;
