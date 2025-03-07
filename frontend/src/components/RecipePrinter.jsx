import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useRecipeStore } from "@/components/store/recipeStore";
import { IoPrintSharp } from "react-icons/io5";
import logo from "@/assets/logo.png";

const RecipePrinter = () => {
  const { id } = useParams();
  const { recipes, fetchRecipeById } = useRecipeStore();

  useEffect(() => {
    fetchRecipeById(id);
  }, [id, fetchRecipeById]);

  const recipe = recipes.find((r) => r._id === id);

  const handlePrint = () => {
    window.print();
  };

  if (!recipe) {
    return <p className="text-center mt-10 text-lg text-gray-600">Loading recipe...</p>;
  }

  return (
    <div className="flex flex-col items-center justify-center py-10 px-4 bg-gray-100 min-h-screen">
      <button
        onClick={handlePrint}
        className="bg-[#F67A24] text-white px-5 py-2 flex items-center rounded-md font-semibold hover:bg-orange-300 transition"
      >
        <IoPrintSharp className="mr-2 text-xl" /> Print
      </button>

      <div className="bg-white p-6 mt-5 rounded-lg shadow-md w-full md:w-[500px] text-gray-800">
        <img src={logo} className="w-20 mx-auto" alt="TasteTrack Logo" />
        <h1 className="text-2xl md:text-3xl font-bold my-2">{recipe.name}</h1>
        <p className="text-gray-600 text-sm md:text-base text-justify">{recipe.description}</p>

        {/* Ingredients Section */}
        <div className="mt-6">
          <h1 className="text-xl font-bold mb-2">Ingredients</h1>
          <ul className="list-disc pl-5">
            {recipe.ingredients.map((item, index) => (
              <li key={index} className="text-sm sm:text-base mb-2">
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Instructions Section */}
        <div className="mt-6">
          <h1 className="text-xl font-bold mb-2">Instructions</h1>
          <ul className="list-decimal pl-5">
            {recipe.instructions.map((item, index) => (
              <li key={index} className="text-sm sm:text-base mb-2">
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Recipe Details */}
        <div className="mt-4 text-sm font-semibold grid grid-cols-2 gap-2 md:grid-cols-1">
          <p>🕒 <strong>Prep:</strong> {recipe.prep_time}</p>
          <p>🔥 <strong>Cook:</strong> {recipe.cook_time}</p>
          <p>⏳ <strong>Total:</strong> {recipe.tot_time}</p>
        </div>
      </div>
    </div>
  );
};

export default RecipePrinter;