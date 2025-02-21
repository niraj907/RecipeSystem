import React, { useEffect } from "react";
import KitchenGuide from "@/components/recipe/KitchenGuide";
import VideoCategory from "@/components/recipe/VideoCategory";
import { useRecipeStore } from "@/components/store/recipeStore";
import { GoAlertFill } from "react-icons/go";
import { useParams } from "react-router-dom";
import Share from "@/components/Share";

const ViewRecipe = () => {
  const { id } = useParams();
  const { recipes, fetchRecipeById } = useRecipeStore();

  useEffect(() => {
    fetchRecipeById(id);
  }, [id, fetchRecipeById]);

  const recipe = recipes.find((r) => r._id === id);

  if (!recipe) {
    return (
      <div className="w-full h-screen flex flex-col items-center justify-center bg-white text-center p-6">
        <GoAlertFill className="text-orange-500 text-6xl mb-4" />
        <p className="text-lg text-gray-600 font-medium">Recipe View Not Found.</p>
        <p className="text-sm text-gray-500">Sorry, we couldn't find recipes for this category.</p>
      </div>
    );
  }

  return (
    <div className="px-4  sm:pl-[8rem] md:pl-[12rem] lg:pl-[18rem] pt-[5.5rem] lg:pt-[6rem] max-w-[81rem] mx-auto">
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
          <div className="border-r sm:border-gray-500 px-2 sm:px-4 ">
            <h2 className="text-sm sm:text-base font-semibold text-gray-500 opacity-80">COOK TIME</h2>
            <p className="text-sm sm:text-base font-medium">{recipe.cook_time}</p>
          </div>

          {/* Social Media Share */}
          <div className="px-2 sm:px-4 ">
            <h2 className="text-sm sm:text-base font-semibold text-gray-500 opacity-80">Social Media</h2>
            <Share className="text-2xl sm:text-3xl flex justify-center cursor-pointer" />
          </div>
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
