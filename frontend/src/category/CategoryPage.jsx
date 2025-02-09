import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaRegHeart } from "react-icons/fa";
import { LuAlarmClockCheck } from "react-icons/lu";
import { useRecipeStore } from "@/components/store/recipeStore";
import { Link } from "react-router-dom";

const CategoryPage = () => {
  const { category } = useParams();
  const { recipes, fetchRecipesByCategory, error } = useRecipeStore();

  // Fetch recipes by category when the component mounts
  useEffect(() => {
    fetchRecipesByCategory(category);
  }, [category, fetchRecipesByCategory]);

  // Check for errors
  if (error) {
    return (
      <div className="w-full py-20 bg-white">
        <div className="max-w-[1200px] mx-auto px-8 md:px-12 pt-10 text-center">
          <h1 className="text-3xl sm:text-6xl font-semibold text-gray-800 capitalize py-4">
            Category Not Found
          </h1>
          <p className="text-center text-gray-600">Sorry, we couldn't find recipes for this category.</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="w-full py-20 bg-white">
        <div className="max-w-[1200px] mx-auto px-8 md:px-12">
          <h1 className="text-3xl sm:text-6xl font-semibold text-gray-800 capitalize py-4">{category}</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recipes.map((recipe) => (
              <div
                key={recipe._id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 relative"
              >
                <img
                  src={recipe.images[0]?.url || "https://via.placeholder.com/300"}
                  alt={recipe.name}
                  className="w-full h-60 object-cover"
                />

                {/* Favorite Icon */}
                <div className="absolute top-4 right-4 bg-orange-500 rounded-full w-10 h-10 flex items-center justify-center">
                  <FaRegHeart className="text-white text-[18px]" />
                </div>

                <div className="p-4">
                  <div className="flex justify-between items-center">
                    <h2 className="text-lg font-semibold text-gray-800">{recipe.name}</h2>
                     <Link to={`/view/${recipe._id}`} className="bg-white px-4 rounded-md text-orange-600 border-2 border-orange-600 hover:bg-white hover:border-orange-500 hover:text-orange-500">
                                         View
                                       </Link>
                  </div>

                  <div className="flex justify-between items-center mt-2 text-gray-500">
                    <p className="text-sm">{recipe.category}</p>
                    <p className="text-sm flex items-center">
                      <LuAlarmClockCheck className="mr-1" /> {recipe.tot_time || "N/A"}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryPage;
