import { LuAlarmClockCheck } from "react-icons/lu";
import { useRecipeStore } from "@/components/store/recipeStore";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { useState } from "react";
import { useAuthStore } from "./store/authStore";

const Favourites = () => {
  const { favorites, recipes, removeFromFavorites, addToFavorites } = useRecipeStore();
  const { isAuthenticated } = useAuthStore();
  const [hoveredRecipe, setHoveredRecipe] = useState(null);

  const toggleFavorite = (recipe) => {
    if (!isAuthenticated) {
      toast.error("Please login to add to favorites!");
      return; // Exit the function if not authenticated
    }
  
    if (favorites[recipe._id]) {
      removeFromFavorites(recipe._id);
      toast.error("Removed from Favorites!");
    } else {
      addToFavorites(recipe);
      toast.success("Added to Favorites!");
    }
  };

  return (
    <section id="favourites" className="w-full py-20">
      <div className="max-w-[1200px] mx-auto px-8 md:px-12 pt-4">
        <h1 className="text-xl xl:text-2xl font-bold text-[#333] py-4 mb-4">Your Favourite Recipes</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Object.keys(favorites).length > 0 ? (
            Object.keys(favorites).map((recipeId) => {
              const recipe = recipes.find((rec) => rec._id === recipeId);
              if (!recipe) return null; // Avoid rendering errors

              return (
                <div key={recipeId} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 relative">
                  <img src={recipe?.images?.[0]?.url || "https://via.placeholder.com/300"} alt={recipe?.name} className="w-full h-60 object-cover" />

                  {/* Favorite Button */}
                  <div
                    className="absolute top-4 right-4 bg-orange-500 rounded-full w-10 h-10 flex items-center justify-center cursor-pointer"
                    onClick={() => toggleFavorite(recipe)}
                    onMouseEnter={() => setHoveredRecipe(recipe._id)}
                    onMouseLeave={() => setHoveredRecipe(null)}
                  >
                    {favorites[recipe._id] || hoveredRecipe === recipe._id ? (
                      <FaHeart className="text-white text-[18px]" />
                    ) : (
                      <FaRegHeart className="text-white text-[18px]" />
                    )}
                  </div>

                  <div className="p-4">
                    <div className="flex justify-between items-center">
                      <h2 className="text-lg font-semibold text-[#333]">{recipe?.name}</h2>

                      <Link to={`/view/${recipe._id}`} className="bg-white px-4 rounded-md text-orange-600 border-2 border-orange-600 hover:bg-white hover:border-orange-500 hover:text-orange-500">
                        View
                      </Link>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <p className="text-sm text-gray-500">{recipe?.category}</p>
                      <p className="text-sm text-gray-500 mt-2 flex items-center">
                        <LuAlarmClockCheck className="mr-1" /> {recipe?.tot_time || "N/A"}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="col-span-full text-center py-8">
              <p>No favourite recipes added yet!</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Favourites;
