import React, { useEffect } from "react";
import KitchenGuide from "./recipe/KitchenGuide";
import VideoCategory from "./recipe/VideoCategory";
import { useRecipeStore } from "./store/recipeStore";
import { Loader } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import Share from "./Share";
import { GoAlertFill } from "react-icons/go";
import { IoPrintSharp } from "react-icons/io5";
import Feedback from "./Feedback";
import { MdOutlineArrowCircleLeft } from "react-icons/md";
const View = () => {
  const { id } = useParams();
  const { recipes, fetchRecipeById } = useRecipeStore();
console.log("Recipes: ", recipes);
  console.log("Hindi Video Array:", recipes[0]?.hindiVideo);
  console.log("Nepal Video Array:", recipes[0]?.nepalVideo);
  console.log("English Video Array:", recipes[0]?.englishVideo);


    const navigate = useNavigate();
  useEffect(() => {
    fetchRecipeById(id);
  }, [id, fetchRecipeById]);

  const recipe = recipes.find((r) => r._id === id);

  const printerOnclick = () => {
    navigate(`/printer/${id}`);
  };
  

  // if (!recipe) {
  //   return (
  //      <div className="flex flex-col justify-center items-center h-screen"> 
  //       <GoAlertFill className="text-orange-500 text-6xl mb-4" />
  //       <p className="text-lg text-gray-600 font-medium">No View page</p>
  //     </div>
  //   );
  // }

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
            onClick={() => navigate('/')}
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
    <div className="w-full py-[3rem] mt-[75px]">
      <div className="max-w-[1200px] mx-auto px-6 sm:px-8 md:px-12">
        <div>
          {/* image */}

          <img
        src={recipe.images[0]?.url || "https://via.placeholder.com/300"}
         alt={recipe.name}
         className="w-full max-w-[70rem] mx-auto rounded-lg object-cover"          
         style={{ height: "auto", maxHeight: "500px" }}
        />
      
          {/* name */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#333] py-4">
          {recipe.name}
          </h1>
          <p className="text-gray-600 text-sm sm:text-base font-sans">
         {recipe.description}
          </p>

 {/* Preparation Time */}
 <div className="py-6">
            <h2 className="text-2xl sm:text-3xl font-semibold font-sans">
              Preparation Time
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 items-center  py-6">
              <div className="border-r sm:border-gray-500 pr-4">
                <h2 className="text-sm sm:text-lg font-semibold text-gray-500 opacity-80">
                  TOTAL TIME
                </h2>
                <p className="text-base font-medium"> {recipe.tot_time}</p>
              </div>
              <div className="border-r sm:border-gray-500 px-4">
                <h2 className="text-sm sm:text-lg font-semibold text-gray-500 opacity-80">
                  PREP TIME
                </h2>
                <p className="text-base font-medium"> {recipe.prep_time}</p>
              </div>
              <div className="border-r sm:border-gray-500 lg:px-4">
                <h2 className="text-sm sm:text-lg font-semibold text-gray-500 opacity-80">
                  COOK TIME
                </h2>
                <p className="text-base font-medium"> {recipe.cook_time}</p>
              </div>

         {/* Social Media Share */}
              <div className="sm:px-4 border-r sm:border-gray-500 pr-4">
                <h2 className="text-sm sm:text-lg font-semibold text-gray-500 opacity-80">
                  Social Media
                </h2>
                <Share className="text-3xl flex justify-center cursor-pointer" />
              </div>

         {/* Printer Share */}
              <div className="sm:px-4 ">
                <h2 className="text-sm sm:text-lg font-semibold text-gray-500 opacity-80">
                 Printer
                </h2>
                <IoPrintSharp className="text-3xl flex justify-center cursor-pointer" onClick={printerOnclick} />
              </div>
            </div>

        {/* Kitchen Guide */}
        <KitchenGuide recipe={recipe} />

<VideoCategory recipe={recipe} />

<Feedback recipeId={recipe._id} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default View;
