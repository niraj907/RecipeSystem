import React from "react";
import kitechen from "../assets/Kitechen.png";

const About = () => {
  return (
    <section id="about" className="w-full py-10 md:py-16 xl:py-20">
      <div className="max-w-[1200px] mx-auto px-6 sm:px-8 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Image Section */}
          <div className="relative">
            <img
              src={kitechen}
              alt="Dish presentation"
              className="w-full rounded-lg shadow-lg transition-transform duration-300 ease-in-out hover:scale-105 cursor-pointer object-cover"
            />
          </div>

          {/* Text Section */}
          <div className="text-center md:text-left">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#333]">
              About Us
            </h1>
            <p className="text-[#666666] leading-relaxed py-4 text-sm sm:text-base md:text-lg">
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
    </section>
  );
};

export default About;
