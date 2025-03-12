// KitchenGuide.jsx
import React, { useState, useEffect } from "react";
import { FaCheckCircle, FaRegCircle } from "react-icons/fa";

const KitchenGuide = ({ recipe }) => {
  const [checkedItems, setCheckedItems] = useState({});

  const toggleCheck = (index) => {
    setCheckedItems((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-6">
      {/* Ingredients Section */}
      <div>
        <h1 className="text-lg sm:text-2xl font-bold mb-4">Ingredients</h1>
        <ul className="space-y-3">
          {recipe.ingredients.map((item, index) => (
            <li
              key={index}
              className="flex items-center space-x-3 text-sm sm:text-base cursor-pointer"
              onClick={() => toggleCheck(index)}
            >
              {checkedItems[index] ? (
                <FaCheckCircle className="text-orange-500 text-xl" />
              ) : (
                <FaRegCircle className="text-gray-500 text-xl" />
              )}
              <p
                className={`text-lg ${checkedItems[index] ? "line-through text-gray-400" : "text-gray-700"}`}
              >
                {item}
              </p>
            </li>
          ))}
        </ul>
      </div>

      {/* Instructions Section */}
      <div>
        <h1 className="text-lg sm:text-2xl font-bold mb-4">Instructions</h1>
        <div className="space-y-4">
          {recipe.instructions.map((step, index) => (
            <div key={index} className="flex items-start space-x-4">
              <div className="flex items-center justify-center w-8 h-8 min-w-[2rem] min-h-[2rem] bg-orange-500 text-white text-lg font-bold rounded-full">
                {index + 1}
              </div>
              <p className="text-gray-700 text-base sm:text-lg flex-1">{step}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default KitchenGuide;
