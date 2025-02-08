import React, { useState } from "react";
import { FaCheckCircle, FaRegCircle } from "react-icons/fa";

const KitchenGuide = () => {
  const [checkedItems, setCheckedItems] = useState({});

  const ingredients = [
    "2 cups all-purpose flour",
    "½ cup water (adjust as needed)",
    "½ teaspoon salt",
    "250g minced chicken (or any meat of choice)",
    "1 small onion, finely chopped",
    "2 cloves garlic, minced",
    "1-inch piece ginger, grated",
    "2 tablespoons fresh coriander, chopped",
    "1 teaspoon soy sauce",
    "½ teaspoon salt",
    "½ teaspoon black pepper",
    "½ teaspoon garam masala (optional)"
  ];

  const instructions = [
    "In a bowl, mix flour and salt.",
    "Gradually add water and knead into a smooth, firm dough.",
    "Cover and let it rest for 30 minutes.",
    "In a mixing bowl, combine minced chicken, onion, garlic, ginger, coriander, soy sauce, salt, pepper, and garam masala.",
    "Mix well and set aside.",
    "Roll out the dough and cut into small circles (about 3 inches in diameter).",
    "Place a spoonful of filling in the center of each circle.",
    "Fold and pleat the edges to seal the dumplings.",
    "Grease a steamer with oil to prevent sticking.",
    "Place the momos inside, leaving space between them.",
    "Steam for 10-12 minutes or until the dumpling skin becomes translucent.",
    "Enjoy hot with spicy tomato chutney or achar."
  ];

  const toggleCheck = (index) => {
    setCheckedItems((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
      {/* Ingredients Section */}
      <div>
        <h1 className="text-2xl font-bold mb-4">Ingredients</h1>
        <ul className="space-y-3">
          {ingredients.map((item, index) => (
            <li
              key={index}
              className="flex items-center space-x-3 cursor-pointer"
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
        <h1 className="text-2xl font-bold mb-4">Instructions</h1>
        <div className="space-y-4">
          {instructions.map((step, index) => (
            <div key={index} className="flex items-start space-x-4">
              <div className="flex items-center justify-center w-8 h-8 min-w-[2rem] min-h-[2rem] bg-orange-500 text-white text-lg font-bold rounded-full">
                {index + 1}
              </div>
              <p className="text-gray-700 text-lg flex-1">{step}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default KitchenGuide;
