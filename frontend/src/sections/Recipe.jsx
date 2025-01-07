import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LuAlarmClockCheck } from "react-icons/lu";
import { FaRegHeart } from "react-icons/fa";
import breakfastImg from "../assets/Breakfast.jpg";
import lunchImg from "../assets/Lunch.jpg";
import dinnerImg from "../assets/Dinner.jpg";
import snacksImg from "../assets/Snacks.jpg";

const Recipe = () => {
  const [searchItem, setSearchItem] = useState("");

  const handleInputChange = (e) => {
    const searchTerm = e.target.value;
    setSearchItem(searchTerm);
  };

  const recipes = [
    { title: "Chicken Burger", cateRecipe: "Lunch", time: "30 minutes", image: breakfastImg },
    { title: "Momo", cateRecipe: "Lunch", time: "30 minutes", image: lunchImg },
    { title: "Pizza", cateRecipe: "Dinner", time: "30 minutes", image: dinnerImg },
    { title: "Momo", cateRecipe: "Lunch", time: "30 minutes", image: lunchImg },
    { title: "Pizza", cateRecipe: "Dinner", time: "30 minutes", image: dinnerImg },
    { title: "Bisket", cateRecipe: "Snacks", time: "30 minutes", image: snacksImg },
  ];

  // Filter recipes based on search input
  const filteredRecipes = recipes.filter((recipe) =>
    recipe.title.toLowerCase().includes(searchItem.toLowerCase())
  );

  return (
    <section id="recipes" className="w-full py-[60px] xl:py-[85px] bg-[#FEF5EC]">
      <div className="max-w-[1200px] mx-auto px-8 md:px-12">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-xl xl:text-2xl font-bold text-[#333]">Popular Recipe</h1>
          <Input
            value={searchItem}
            onChange={handleInputChange}
            placeholder="Search"
            className="w-[15rem] md:w-80 xl:w-96 xl-text-[16px] xl:text-xl font-semibold"
          />
        </div>

        {/* Recipe Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredRecipes.length > 0 ? (
            filteredRecipes.map((recipe, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 relative"
              >
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="w-full h-60 object-cover"
                />

                {/* Heart Icon */}
                <div className="absolute top-4 right-4 bg-orange-500 rounded-full w-10 h-10 flex items-center justify-center">
                  <FaRegHeart className="text-white  text-[18px]" />
                </div>

                <div className="p-4">
                  <div className="flex justify-between items-center">
                    <h2 className="text-lg font-semibold text-[#333]">
                      {recipe.title}
                    </h2>

                    <Button className="bg-white text-orange-600 border-2 border-orange-600 hover:bg-white hover:border-orange-500 hover:text-orange-500">
                      View
                    </Button>
                  </div>

                  <div className="flex justify-between items-center mt-2">
                    <p className="text-sm text-gray-500">{recipe.cateRecipe}</p>
                    <p className="text-sm text-gray-500 mt-2 flex items-center">
                      <LuAlarmClockCheck className="mr-1" /> {recipe.time}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center col-span-full">
              No recipes found for "{searchItem}".
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Recipe;
