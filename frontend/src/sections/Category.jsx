import React from "react";
import breakfastImg from "../assets/Breakfast.jpg";
import lunchImg from "../assets/Lunch.jpg";
import dinnerImg from "../assets/Dinner.jpg";
import snacksImg from "../assets/Snacks.jpg";
import { Link } from "react-router";

const CategoryItem = ({ image, title , href }) => {
  return (
    <div className="flex flex-col items-center">
      <img
        src={image}
        alt={title}
        className="w-32 h-32 sm:w-40 sm:h-40 md:w-44 md:h-44 rounded-full shadow-lg mb-4 object-cover"
      />
      <Link to={href}>
      <h3 className="text-sm sm:text-base md:text-lg font-semibold text-[#666]">{title}</h3>
      
      </Link>
    </div>
  );
};

const Category = () => {
  const categories = [
    { title: "Breakfast", image: breakfastImg , href:"/categories/breakfast" },
    { title: "Lunch", image: lunchImg , href:"/categories/lunch"},
    { title: "Dinner", image: dinnerImg , href:"/categories/dinner" },
    { title: "Snacks", image: snacksImg , href:"/categories/snacks" },
  ];

  return (
    <div className="w-full py-10 md:py-16 xl:py-20">
      <div className="max-w-[1200px] mx-auto px-6 sm:px-8 md:px-12 text-center">
        <h1 className="text-xl sm:text-2xl md:text-3xl xl:text-4xl font-bold text-[#333] mb-8 sm:mb-10 md:mb-12">
          Popular Categories
        </h1>
        <div className="grid grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:grid-cols-4">
          {categories.map((category) => (
            <CategoryItem
              key={category.title}
              image={category.image}
              title={category.title}
              href={category.href}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Category;