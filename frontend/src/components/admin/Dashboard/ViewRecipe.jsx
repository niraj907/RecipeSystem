import React, { useEffect } from "react";
import KitchenGuide from "@/components/recipe/KitchenGuide";
import VideoCategory from "@/components/recipe/VideoCategory";
import { useRecipeStore } from "@/components/store/recipeStore";
import { GoAlertFill } from "react-icons/go";
import { Navigate, useNavigate, useParams } from "react-router-dom";
// import Share from "@/components/Share";
import Feedback from "@/components/Feedback";
import { MdOutlineArrowCircleLeft } from "react-icons/md";

const ViewRecipe = () => {
  const { id } = useParams();
  const { recipes, fetchRecipeById } = useRecipeStore();
const navigate = useNavigate();
  useEffect(() => {
    fetchRecipeById(id);
  }, [id, fetchRecipeById]);

  const recipe = recipes.find((r) => r._id === id);

  if (!recipe) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50 px-4 py-8">
        <div className="max-w-md text-center bg-white p-8 rounded-xl shadow-lg transition-all hover:shadow-xl">
          {/* Alert Icon */}
          <div className="mb-6 animate-bounce">
            <GoAlertFill className="text-6xl text-orange-500 mx-auto" />
          </div>
  
          {/* Main Message */}
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
            Recipe Unavailable 🥄
          </h2>
  
          {/* Sub Message */}
          <p className="text-gray-600 mb-6 text-lg">
            We couldn't find the recipe you're looking for. It might have been 
            removed or doesn't exist.
          </p>
  
          {/* Action Button */}
          <button
            onClick={() => navigate('/dashboard')}
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-8 rounded-lg 
            transition-all flex items-center justify-center gap-2 mx-auto"
          >
            <MdOutlineArrowCircleLeft className="text-xl" />
            Back to Recipes
          </button>
  
          {/* Additional Help */}
          <p className="mt-6 text-sm text-gray-500">
            Need help? Contact support@tastetrack.com
          </p>
        </div>
      </div>
    );
  }


  return (
    <div className="px-4  lg:pl-[16rem] py-[6rem] lg:py-[6rem] max-w-[81rem] mx-auto">
      {/* Image */}
      <img
        src={recipe.images[0]?.url || "https://via.placeholder.com/300"}
        alt={recipe.name}
        className="w-full rounded-lg object-cover"
        style={{ height: "auto", maxHeight: "500px" }}
      />

      {/* Name */}
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#333] py-4">
        {recipe.name}
      </h1>
      <p className="text-gray-600 text-sm sm:text-base font-sans">{recipe.description}</p>

      {/* Preparation Time */}
      <div className="py-6">
        <h2 className="text-xl sm:text-2xl font-semibold font-sans">Preparation Time</h2>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 items-center py-6">
          <div className="border-r sm:border-gray-500 pr-2 sm:pr-4 ">
            <h2 className="text-sm sm:text-base font-semibold text-gray-500 opacity-80">TOTAL TIME</h2>
            <p className="text-sm sm:text-base font-medium">{recipe.tot_time}</p>
          </div>
          <div className="border-r sm:border-gray-500 px-2 sm:px-4 ">
            <h2 className="text-sm sm:text-base font-semibold text-gray-500 opacity-80">PREP TIME</h2>
            <p className="text-sm sm:text-base font-medium">{recipe.prep_time}</p>
          </div>
          <div className="px-2 sm:px-4 ">
            <h2 className="text-sm sm:text-base font-semibold text-gray-500 opacity-80">COOK TIME</h2>
            <p className="text-sm sm:text-base font-medium">{recipe.cook_time}</p>
          </div>

          {/* Social Media Share */}
          {/* <div className="px-2 sm:px-4 ">
            <h2 className="text-sm sm:text-base font-semibold text-gray-500 opacity-80">Social Media</h2>
            <Share className="text-2xl sm:text-3xl flex justify-center cursor-pointer" />
          </div> */}
        </div>

        {/* Kitchen Guide */}
        <KitchenGuide recipe={recipe} />

        {/* Video Category */}
        <VideoCategory recipe={recipe} />

       
      </div>
    </div>
  );
};

export default ViewRecipe;
