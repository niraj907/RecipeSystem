import React from "react";
import { useParams } from "react-router-dom";
import { FaRegHeart } from "react-icons/fa";
import { LuAlarmClockCheck } from "react-icons/lu";
import breakfastImg from "../assets/Breakfast.jpg";
import lunchImg from "../assets/Lunch.jpg";
import dinnerImg from "../assets/Dinner.jpg";
import snacksImg from "../assets/Snacks.jpg";
import { Button } from "@/components/ui/button"; // Assuming Button is already created

const CategoryPage = () => {
  const { category } = useParams();

  // Define your recipes data
  const recipes = [
    { id: "1", name: "Chicken Burger", category: "Lunch", time: "30 minutes", image: breakfastImg },
    { id: "2", name: "Momo", category: "Lunch", time: "30 minutes", image: lunchImg },
    { id: "3", name: "Pizza", category: "Dinner", time: "30 minutes", image: dinnerImg },
    { id: "4", name: "Momo", category: "Lunch", time: "30 minutes", image: lunchImg },
    { id: "5", name: "Pizza", category: "Dinner", time: "30 minutes", image: dinnerImg },
    { id: "6", name: "Bisket", category: "Snacks", time: "30 minutes", image: snacksImg },
    { id: "7", name: "Pizza", category: "Dinner", time: "30 minutes", image: dinnerImg },
    { id: "8", name: "Momo", category: "Lunch", time: "30 minutes", image: lunchImg },
    { id: "9", name: "Pizza", category: "Dinner", time: "30 minutes", image: dinnerImg },
    { id: "10", name: "Bisket", category: "Snacks", time: "30 minutes", image: snacksImg },
  ];

  // Filter recipes based on category
  const filteredRecipes = recipes.filter(
    (recipe) => recipe.category.toLowerCase() === category.toLowerCase()
  );

  return (
    <div className="w-full py-[5rem] bg-[#ffffff]">
      <div className="max-w-[1200px] mx-auto px-8 md:px-12">
        {/* Header */}
        <h1 className="text-3xl sm:text-6xl font-semibold text-[#333] capitalize py-4">{category}</h1>

        {/* Recipe Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredRecipes.length > 0 ? (
            filteredRecipes.map((recipe) => (
              <div
                key={recipe.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 relative"
              >
                <img
                  src={recipe.image}
                  alt={recipe.name}
                  className="w-full h-60 object-cover"
                />

                {/* Heart Icon */}
                <div className="absolute top-4 right-4 bg-orange-500 rounded-full w-10 h-10 flex items-center justify-center">
                  <FaRegHeart className="text-white text-[18px]" />
                </div>

                <div className="p-4">
                  <div className="flex justify-between items-center">
                    <h2 className="text-lg font-semibold text-[#333]">{recipe.name}</h2>

                    <Button className="bg-white text-orange-600 border-2 border-orange-600 hover:bg-white hover:border-orange-500 hover:text-orange-500">
                      View
                    </Button>
                  </div>

                  <div className="flex justify-between items-center mt-2">
                    <p className="text-sm text-gray-500">{recipe.category}</p>
                    <p className="text-sm text-gray-500 mt-2 flex items-center">
                      <LuAlarmClockCheck className="mr-1" /> {recipe.time}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center col-span-full">
              No recipes available for this category.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
