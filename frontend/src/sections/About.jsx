import React from "react";
import kitechen from "../assets/Kitechen.png";

const About = () => {
  return (
    <div className="w-full py-[55px] md:py-[100px]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="relative">
            <img
              src={kitechen}
              alt="Dish presentation"
              className="w-full rounded-lg shadow-lg transition-transform duration-300 ease-in-out hover:scale-105 cursor-pointer object-cover"
            />
          </div>

          <div className="md:my-20">
            <h1 className="text-3xl md:text-4xl font-bold text-[#333]">
              About Us
            </h1>
            <p className="text-[#666666] md:mb-2 leading-relaxed py-4 text-sm md:text-base">
              Food systems comprise all the people, institutions, places, and
              activities that play a part in growing, processing, transporting,
              selling, marketing, and, ultimately, eating food. Food systems
              influence diets by determining what kinds of foods are produced,
              which foods are accessible, both physically and economically, and
              peoples’ food preferences.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
