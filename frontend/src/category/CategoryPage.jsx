import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { LuAlarmClockCheck } from "react-icons/lu";
import { useRecipeStore } from "@/components/store/recipeStore";
import { toast } from "sonner";
import { useAuthStore } from "@/components/store/authStore";
import { useFavoriteStore } from "@/components/store/favoriteStore";
import { GoAlertFill } from "react-icons/go";
import { IoStar } from "react-icons/io5";

const CategoryPage = () => {
  const { category } = useParams();
  const { recipes = [], fetchRecipesByCategory, error } = useRecipeStore();
  const { favorites, addToFavorites, removeFromFavorites, fetchFavorites } = useFavoriteStore();
  const { isAuthenticated, user } = useAuthStore();

  const [hoveredRecipe, setHoveredRecipe] = useState(null);

  useEffect(() => {
    fetchRecipesByCategory(category);
  }, [category, fetchRecipesByCategory]);

  useEffect(() => {
    if (isAuthenticated && user?.id) {
      fetchFavorites(user.id);
    } 
  }, [isAuthenticated, user?.id, fetchFavorites]);

  const toggleFavorite = async (recipe) => {
    if (!isAuthenticated) {
      toast.error("Please login to add to favorites!");
      return;
    }

    const userId = user?._id;
    if (!userId) {
      toast.error("User not found!");
      return;
    }

    if (favorites.includes(recipe._id)) {
      const res = await removeFromFavorites(userId, recipe._id);
      if (res.success) {
        toast.error("Removed from Favorites!");
      }
    } else {
      const res = await addToFavorites(userId, recipe._id);
      if (res.success) {
        toast.success("Added to Favorites!");
      } else {
        toast.error(res.message);
      }
    }
  };

  if (error) {
    return (
        <div className="w-full py-28 bg-white  text-center flex flex-col items-center">
          <GoAlertFill className="text-orange-500 text-6xl mb-4" />
          <p className="text-lg text-gray-600 font-medium">Category Not Found.</p>
          <p className="text-sm text-gray-500">Sorry, we couldn't find recipes for this category.</p>
        </div>
    );
  }

  return (
    <div className="w-full py-20 bg-white">
      <div className="max-w-[1200px] mx-auto px-8 md:px-12 ">
        <h1 className="text-3xl sm:text-6xl font-semibold text-gray-800 capitalize py-8">
          {category}
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recipes?.map((recipe) => (
            <div
              key={recipe._id || recipe.name}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 relative"
            >
              <img
                src={recipe.images?.[0]?.url || "https://via.placeholder.com/300"}
                alt={recipe.name}
                className="w-full h-60 object-cover"
              />

              {/* Favorite Button */}
              <div
                className="absolute top-4 right-4 bg-orange-500 rounded-full w-10 h-10 flex items-center justify-center cursor-pointer"
                onClick={() => toggleFavorite(recipe)}
                onMouseEnter={() => setHoveredRecipe(recipe._id)}
                onMouseLeave={() => setHoveredRecipe(null)}
              >
                {favorites.includes(recipe._id) || hoveredRecipe === recipe._id ? (
                  <FaHeart className="text-white text-[18px]" />
                ) : (
                  <FaRegHeart className="text-white text-[18px]" />
                )}
              </div>

              <div className="p-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold text-gray-800">{recipe.name}</h2>

                  {isAuthenticated ? (
                    <Link
                      to={`/view/${recipe._id}`}
                      className="bg-white px-4 py-1 rounded-md text-orange-600 border-2 border-orange-600 hover:bg-orange-600 hover:text-white transition"
                    >
                      View
                    </Link>
                  ) : (
                    <button
                      onClick={() => toast.error("Please login to view the recipe!")}
                      className="bg-white px-4 py-1 rounded-md text-orange-600 border-2 border-orange-600 hover:bg-orange-600 hover:text-white transition"
                    >
                      View
                    </button>
                  )}
                </div>

               <div className="flex justify-between items-center mt-2">
  <div className="flex items-center">
    {[...Array(5)].map((_, i) => (
      <IoStar 
        key={i}
        className="text-orange-400 mr-1"
      />
    ))}
  </div>
  <p className="text-sm text-gray-500">
    {recipe.ratingCount || 0} Ratings
  </p>
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
  );
};

export default CategoryPage;
