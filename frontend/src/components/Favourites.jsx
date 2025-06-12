import { LuAlarmClockCheck } from "react-icons/lu";
import { useEffect, useState } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { useAuthStore } from "./store/authStore";
import { useFavoriteStore } from "./store/favoriteStore";
import { GoAlertFill } from "react-icons/go";
import { IoStar } from "react-icons/io5";

const Favourites = () => {
  const {
    favorites,
    addToFavorites,
    removeFromFavorites,
    fetchFavorites,
  } = useFavoriteStore();
  const { isAuthenticated, user } = useAuthStore();
  const [hoveredRecipe, setHoveredRecipe] = useState(null);

  useEffect(() => {
    if (isAuthenticated && user?._id) {
      fetchFavorites(user._id);
    }
  }, [isAuthenticated, user, fetchFavorites]);

  const handleToggleFavorite = async (recipeId) => {
    const isFav = favorites.some((fav) => fav._id === recipeId);
  
    if (isFav) {
      // Optimistically update the UI by removing the recipe
      useFavoriteStore.setState((state) => ({
        favorites: state.favorites.filter((fav) => fav._id !== recipeId),
      }));
  
      await removeFromFavorites(user._id, recipeId);
      toast.success("Recipe removed from favorites!");
    } else {
      await addToFavorites(user._id, recipeId);
      toast.success("Recipe added to favorites!");
    }
  };
  

  return (
    <section id="favourites" className="w-full py-20">
      <div className="max-w-[1200px] mx-auto px-8 md:px-12 pt-4">
        <h1 className="text-2xl"> Favourite Recipes</h1>
       
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-[2.5rem]">
        
        
        {favorites.length > 0 ? (
  favorites.map((recipe) => (
    <div key={recipe._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 relative">
      <img src={recipe?.images?.[0]?.url || "https://via.placeholder.com/300"} alt={recipe?.name} className="w-full h-60 object-cover" />

      {/* Favorite Button */}
      <div
        className="absolute top-4 right-4 bg-orange-500 rounded-full w-10 h-10 flex items-center justify-center cursor-pointer"
        onClick={() => handleToggleFavorite(recipe._id)}
        onMouseEnter={() => setHoveredRecipe(recipe._id)}
        onMouseLeave={() => setHoveredRecipe(null)}
      >
        {favorites.some((fav) => fav._id === recipe._id) || hoveredRecipe === recipe._id ? (
          <FaHeart className="text-white text-[18px]" />
        ) : (
          <FaRegHeart className="text-white text-[18px]" />
        )}
      </div>

      <div className="p-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-[#333]">{recipe.name}</h2>
          <Link to={`/view/${recipe._id}`} className="bg-white px-4 py-1 rounded-md text-orange-600 border-2 border-orange-600 hover:bg-orange-600 hover:text-white transition">
            View
          </Link>
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

        <div className="flex justify-between items-center mt-2">
          <p className="text-sm text-gray-500">{recipe.category}</p>
          <p className="text-sm text-gray-500 flex items-center">
            <LuAlarmClockCheck className="mr-1" /> {recipe.tot_time || "N/A"}
          </p>
        </div>
      </div>
    </div>
  ))
) : (
  <div className="col-span-full text-center py-12 flex flex-col items-center">
    <GoAlertFill className="text-orange-500 text-6xl mb-4" />
    <p className="text-lg text-gray-600 font-medium">No favorite recipes added yet.</p>
    <p className="text-sm text-gray-500">Browse and add your favorite recipes to see them here.</p>
  </div>
)}


        </div>
      </div>
    </section>
  );
};

export default Favourites;







