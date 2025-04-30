import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useRecipeStore } from "@/components/store/recipeStore";
import { IoPrintSharp } from "react-icons/io5";
import logo from "@/assets/logo.png";
import { MdOutlineArrowCircleLeft } from "react-icons/md";
import { FaRegSadTear } from "react-icons/fa";

const RecipePrinter = () => {
  const { id } = useParams();
  const { recipes, fetchRecipeById } = useRecipeStore();

  useEffect(() => {
    if (id) {
      fetchRecipeById(id);
    }
  }, [id, fetchRecipeById]);

  const recipe = recipes.find((r) => r._id === id);

  const handlePrint = () => {
    window.print();
  };

  if (!recipe) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4 py-10">
        <div className="text-center max-w-md bg-white p-8 rounded-lg shadow-md">
          <FaRegSadTear className="text-8xl text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Oops! Recipe Not Found
          </h2>
          <p className="text-gray-600 mb-6">
            The recipe you're looking for doesn't exist or may have been removed.
          </p>
          <Link
            to="/"
            className="inline-flex items-center bg-[#F67A24] text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-400 transition"
          >
            <MdOutlineArrowCircleLeft className="mr-2 text-xl" />
            Browse All Recipes
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-10 px-4 bg-gray-100 min-h-screen">
      {/* Navigation buttons - hidden in print */}
      <Link to={`/view/${id}`} className="self-start mb-4 print:hidden">
        <MdOutlineArrowCircleLeft className="text-4xl cursor-pointer" />
      </Link>

      <button
        onClick={handlePrint}
        className="bg-[#F67A24] text-white px-5 py-2 flex items-center rounded-md font-semibold hover:bg-orange-300 transition mb-6 print:hidden"
      >
        <IoPrintSharp className="mr-2 text-xl" /> Print
      </button>


      {/* Printable content */}
      <div className="bg-white p-6 rounded-lg shadow-md w-full md:w-[500px] text-gray-800 print:shadow-none print:w-full print:p-2 print:border-0">
        {/* Print header - only visible when printing */}
        <div className="hidden print:block absolute top-0 left-0 w-full">
          <img src={logo} className="w-28 mx-auto mb-4 py-4" alt="TasteTrack Logo" />
        </div>

        <div className="print:mt-12">
          <h1 className="text-2xl md:text-3xl font-bold my-2 print:text-4xl print:text-center">
            {recipe.name}
          </h1>
          <p className="text-gray-600 text-sm md:text-base text-justify print:text-lg print:text-left print:mx-4">
            {recipe.description}
          </p>

          {/* Ingredients Section */}
          <div className="mt-6 print:mt-8">
            <h1 className="text-xl font-bold mb-2 print:text-2xl print:border-b-2 print:border-gray-300 print:pb-1">
              Ingredients
            </h1>
            <ul className="list-disc pl-5 print:pl-8 print:text-lg">
              {recipe.ingredients.map((item, index) => (
                <li key={index} className="text-sm sm:text-base mb-2 print:mb-3">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Instructions Section */}
          <div className="mt-6 print:mt-8">
            <h1 className="text-xl font-bold mb-2 print:text-2xl print:border-b-2 print:border-gray-300 print:pb-1">
              Instructions
            </h1>
            <ol className="list-decimal pl-5 print:pl-8 print:text-lg">
              {recipe.instructions.map((item, index) => (
                <li 
                  key={index} 
                  className="text-sm sm:text-base mb-2 print:mb-4 print:leading-relaxed"
                  style={{ pageBreakInside: "avoid" }}
                >
                  {item}
                </li>
              ))}
            </ol>
          </div>

          {/* Recipe Details */}
          <div className="mt-4 text-sm font-semibold grid grid-cols-2 gap-2 md:grid-cols-1 print:grid-cols-3 print:text-lg print:mt-8">
            <p><strong>Prep:</strong> {recipe.prep_time}</p>
            <p><strong>Cook:</strong> {recipe.cook_time}</p>
            <p><strong>Total:</strong> {recipe.tot_time}</p>
          </div>

          {/* Print Footer - only visible when printing */}
          <div className="hidden print:block text-center mt-12 text-sm text-gray-500">
            <p>Happy Cooking! 🍳</p>
          </div>
        </div>
      </div>

      {/* Print styles */}
      <style>{`
        @media print {
          @page {
            margin: 20px;
            size: auto;
          }
          
          body {
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
            background: white !important;
          }
          
          .print\\:hidden {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
};

export default RecipePrinter;