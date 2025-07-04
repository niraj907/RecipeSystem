import React from "react";
import { Link } from "react-router-dom"; // Fixed import
import breakfastImg from "../assets/Breakfast.jpg";
import lunchImg from "../assets/Lunch.jpg";
import dinnerImg from "../assets/Dinner.jpg";
import snacksImg from "../assets/Snacks.jpg";

const CategoryItem = ({ image, category, href }) => {
  return (
    <div className="flex flex-col items-center">
      <Link to={href} className="text-center">
        <img
          src={image}
          alt={category}
          className="w-32 h-32 sm:w-40 sm:h-40 md:w-44 md:h-44 rounded-full shadow-lg mb-4 object-cover transition-transform transform hover:scale-105"
        />
        <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-700">{category}</h3>
      </Link>
    </div>
  );
};

const Category = () => {
  const categories = [
    { category: "Breakfast", image: breakfastImg, href: "/categories/breakfast" },
    { category: "Lunch", image: lunchImg, href: "/categories/lunch" },
    { category: "Dinner", image: dinnerImg, href: "/categories/dinner" },
    { category: "Snacks", image: snacksImg, href: "/categories/snacks" },
  ];

  return (
    <div className="w-full py-10 md:py-16 xl:py-20">
      <div className="max-w-[1200px] mx-auto px-6 sm:px-8 md:px-12 text-center">
        <h1 className="text-xl sm:text-2xl md:text-3xl xl:text-4xl font-bold text-gray-800 mb-8 sm:mb-10 md:mb-12">
          Popular Categories
        </h1>
        <div className="grid grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:grid-cols-4">
          {categories.map((category) => (
            <CategoryItem
              key={category.category}
              image={category.image}
              category={category.category}
              href={category.href}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Category;
