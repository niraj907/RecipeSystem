import React, { useEffect } from "react";
import KitchenGuide from "./recipe/KitchenGuide";
import VideoCategory from "./recipe/VideoCategory";
import { useRecipeStore } from "@/components/store/recipeStore";
import { Loader } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import Share from "./Share";
import { GoAlertFill } from "react-icons/go";
import { IoPrintSharp } from "react-icons/io5";
import Feedback from "./Feedback";
const View = () => {
  const { id } = useParams();
  const { recipes, fetchRecipeById } = useRecipeStore();
    const navigate = useNavigate();
  useEffect(() => {
    fetchRecipeById(id);
  }, [id, fetchRecipeById]);

  const recipe = recipes.find((r) => r._id === id);

  const printerOnclick = () => {
    navigate(`/printer/${id}`);
  };
  

  if (!recipe) {
    return (
      // <div className="col-span-full text-center py-12 flex flex-col items-center">
       <div className="flex flex-col justify-center items-center h-screen"> 
        <GoAlertFill className="text-orange-500 text-6xl mb-4" />
        <p className="text-lg text-gray-600 font-medium">No View page</p>
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
