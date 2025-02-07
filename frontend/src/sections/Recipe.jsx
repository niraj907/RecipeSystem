import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { LuAlarmClockCheck } from "react-icons/lu";
import { FaRegHeart } from "react-icons/fa";
import { FaArrowAltCircleDown, FaArrowAltCircleUp } from "react-icons/fa";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { useRecipeStore } from "@/components/store/recipeStore";

const Recipe = () => {
  const [searchItem, setSearchItem] = useState("");
  const [showAll, setShowAll] = useState(false);
  const { recipes, fetchAllRecipes, searchRecipes,  error } = useRecipeStore();

  useEffect(() => {
    fetchAllRecipes();
  }, [fetchAllRecipes]);

  const handleInputChange = (e) => {
    const searchTerm = e.target.value;
    setSearchItem(searchTerm);
    if (searchTerm) {
      searchRecipes(searchTerm);
    } else {
      fetchAllRecipes();
    }
  };

  const filteredRecipes = recipes.filter((recipe) =>
    recipe.name.toLowerCase().includes(searchItem.toLowerCase())
  );
  const displayedRecipes = showAll ? filteredRecipes : filteredRecipes.slice(0, 6);

  return (
    <section id="recipes" className="w-full py-[60px] xl:py-[85px] bg-[#FEF5EC]">
      <div className="max-w-[1200px] mx-auto px-8 md:px-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-xl xl:text-2xl font-bold text-[#333]">Popular Recipe</h1>
          <Input
            value={searchItem}
            onChange={handleInputChange}
            placeholder="Search"
            className="w-[15rem] md:w-80 xl:w-[21.8rem] xl-text-[16px] xl:text-xl font-semibold rounded focus-visible:ring-transparent my-2"
          />
        </div>



        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedRecipes.length > 0 ? (
            displayedRecipes.map((recipe, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 relative"
              >
                <img
                  src={recipe.images[0]?.url || "https://via.placeholder.com/300"}
                  alt={recipe.name}
                  className="w-full h-60 object-cover"
                />

                <div className="absolute top-4 right-4 bg-orange-500 rounded-full w-10 h-10 flex items-center justify-center cursor-pointer">
                  <FaRegHeart className="text-white text-[18px]" />
                </div>

                <div className="p-4">
                  <div className="flex justify-between items-center">
                    <h2 className="text-lg font-semibold text-[#333]">{recipe.name}</h2>
                    <Link to={`/view/${recipe._id}`} className="bg-white px-4 rounded-md text-orange-600 border-2 border-orange-600 hover:bg-white hover:border-orange-500 hover:text-orange-500">
                      View
                    </Link>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <p className="text-sm text-gray-500">{recipe.category}</p>
                    <p className="text-sm text-gray-500 mt-2 flex items-center">
                      <LuAlarmClockCheck className="mr-1" /> {recipe.tot_time || "N/A"}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col justify-center items-center col-span-full h-40">
            <h2 className="text-3xl font-bold">0 results found for your search.</h2>
            <p className="py-4">Please try another search term</p>
          </div>
          
          )}
        </div>

        {filteredRecipes.length > 6 && (
          <div className="text-2xl flex justify-center items-center gap-2 text-center pt-[5rem] cursor-pointer">
            <h2 className="font-semibold text-[#333]" onClick={() => setShowAll(!showAll)}>
              {showAll ? "View Less" : "View More"}
            </h2>
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
