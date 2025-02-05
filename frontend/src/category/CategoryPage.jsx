import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { LuAlarmClockCheck } from 'react-icons/lu';
import { FaRegHeart } from "react-icons/fa";
import breakfastImg from "../assets/Breakfast.jpg";
import lunchImg from "../assets/Lunch.jpg";
import dinnerImg from "../assets/Dinner.jpg";
import snacksImg from "../assets/Snacks.jpg";

const CategoryPage = () => {

const {category} = useParams();  
  const recipes = [
    { title: "Chicken Burger", category: "Lunch", time: "30 minutes", image: breakfastImg },
    { title: "Momo", category: "Lunch", time: "30 minutes", image: lunchImg },
    { title: "Pizza", category: "Dinner", time: "30 minutes", image: dinnerImg },
    { title: "Bisket", category: "Snacks", time: "30 minutes", image: snacksImg },
  ];

 return (
  <div className="w-full  py-[5rem] bg-[#ffffff]">
  <div className="max-w-[1200px] mx-auto px-6 md:px-12">
    {/* Header */}

      <h1 className="text-3xl sm:text-6xl font-semibold text-[#333] capitalize py-10">{category}</h1>

    {/* Recipe Cards */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {recipes.map((recipe, index) => (
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
            <FaRegHeart className="text-white text-[18px]" />
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
              <p className="text-sm text-gray-500">{recipe.category}</p>
              <p className="text-sm text-gray-500 mt-2 flex items-center">
                <LuAlarmClockCheck className="mr-1" /> {recipe.time}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</div>
   )
 }

export default CategoryPage

