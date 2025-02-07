import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { LuAlarmClockCheck } from 'react-icons/lu';
import { FaRegPlayCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useRecipeStore } from '@/components/store/recipeStore';

const Hero = () => {
  // Fetch recipes from the store
  const { recipes, fetchRecipes } = useRecipeStore();
console.log(recipes)
  // Fetch recipes on component mount
  useEffect(() => {
    fetchRecipes();
  }, [fetchRecipes]);

  // Check if recipes exist before accessing their data
  const firstRecipe = recipes[0];

  return (
    <section id='home' className="w-full py-[2.3rem] md:py-[5.4rem] mt-[75px] bg-[#FEF5EC]">
      <div className="max-w-[1200px] mx-auto px-8 md:px-12 py-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Text Section */}
          <div>
            {/* Recipe Name */}
            {firstRecipe ? (
              <>
                <h2 className="text-4xl font-bold text-[#333] mb-4">
                  {firstRecipe.name}
                </h2>

                {/* Recipe Description */}
                <p className="text-[#666666] mb-6 leading-relaxed">
                  {firstRecipe.description}
                </p>

                <div className="flex items-center gap-4">
                  {/* Total Time */}
                  <Button className="flex items-center gap-2 bg-[#F67A24] hover:bg-[#f67b24e8] text-white px-6 py-2 rounded-md transition duration-300 ease-in-out">
                    <LuAlarmClockCheck />
                    <span className='md:text-[16px]'>
                      {firstRecipe.tot_time} 
                    </span>
                  </Button>

                  {/* View Recipe Link */}
                  <Link 
                    to={`/view/${firstRecipe._id}`} 
                    className="flex items-center gap-2 bg-white text-[#666666] hover:bg-[#FEF5EC] hover:text-[#F67A24] hover:ring-[#F67A24] hover:ring-4 px-6 py-2 rounded-md transition-all ease-in-out duration-300"
                  >
                    <FaRegPlayCircle />
                    <span className='md:text-[16px]'>View Recipe</span>
                  </Link>
                </div>
              </>
            ) : (
              <p>Loading recipe...</p>
            )}
          </div>

        {/* Image Section */}
<div className="relative">
  <img
    // Check if images exist and fallback to a default image if not
    src={firstRecipe?.images?.[0]?.url || '/path/to/fallback-image.jpg'}
    alt={firstRecipe?.name || "Dish presentation"}
    className="w-full rounded-lg shadow-lg transition-transform duration-300 ease-in-out hover:scale-105 cursor-pointer object-cover"
  />
</div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
