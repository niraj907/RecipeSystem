import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LuAlarmClockCheck } from "react-icons/lu";
import { FaRegHeart } from "react-icons/fa";
import breakfastImg from "../assets/Breakfast.jpg";
import lunchImg from "../assets/Lunch.jpg";
import dinnerImg from "../assets/Dinner.jpg";
import snacksImg from "../assets/Snacks.jpg";
import { FaArrowAltCircleDown } from "react-icons/fa";
import { FaArrowAltCircleUp } from "react-icons/fa";

import { Link } from "react-router";

const Recipe = () => {
  const [searchItem, setSearchItem] = useState("");
  const [showAll, setShowAll] = useState(false); // New state to control showing more recipes

  const handleInputChange = (e) => {
    const searchTerm = e.target.value;
    setSearchItem(searchTerm);
  };

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

  // Filter recipes based on search input
  const filteredRecipes = recipes.filter((recipe) =>
    recipe.name.toLowerCase().includes(searchItem.toLowerCase())
  );

  // Show only the first 6 recipes when "showAll" is false
  const displayedRecipes = showAll ? filteredRecipes : filteredRecipes.slice(0, 6);

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
            className="w-[15rem] md:w-80 xl:w-96 xl-text-[16px] xl:text-xl font-semibold rounded focus-visible:ring-transparent my-2"
          />
        </div>

        {/* Recipe Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedRecipes.length > 0 ? (
            displayedRecipes.map((recipe, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 relative"
              >
                <img
                  src={recipe.image}
                  alt={recipe.name}
                  className="w-full h-60 object-cover"
                />

                {/* Heart Icon */}
                <div className="absolute top-4 right-4 bg-orange-500 rounded-full w-10 h-10 flex items-center justify-center cursor-pointer">
                  <FaRegHeart className="text-white text-[18px]" />
                </div>

                <div className="p-4">
                  <div className="flex justify-between items-center">
                    <h2 className="text-lg font-semibold text-[#333]">
                      {recipe.name}
                    </h2>

                    <Link to="/view/id" className="bg-white px-4 rounded-md text-orange-600 border-2 border-orange-600 hover:bg-white hover:border-orange-500 hover:text-orange-500">
                      View
                    </Link>
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
              No recipes found for "{searchItem}".
            </p>
          )}
        </div>

        {/* View More / View Less */}
        {filteredRecipes.length > 6 && (
     <div className="text-2xl flex justify-center items-center gap-2 text-center pt-[5rem] cursor-pointer">
     <h2
       className="font-semibold text-[#333]"
       onClick={() => setShowAll(!showAll)}
     >
       {showAll ? "View Less" : "View More"}
     </h2>
   
     {/* Wrap the icon in a clickable div */}
     <div onClick={() => setShowAll(!showAll)} className="cursor-pointer">
       {showAll ? <FaArrowAltCircleUp /> : <FaArrowAltCircleDown />}
     </div>
   </div>
   
        )}
      </div>
    </section>
  );
};

export default Recipe;
