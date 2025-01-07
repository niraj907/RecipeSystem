import React from 'react';
import logo from "../assets/logo.png";

const Footer = () => {
  return (
    <div className="w-full py-12 bg-[#FEF5EC]">
      <div className="max-w-[1200px] mx-auto px-8 md:px-12">
        {/* Logo */}
        <img src={logo} alt="logorecipe" className="w-[10rem] md:w-[12rem] mb-6" />

        {/* Content */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-6 md:gap-0 text-base md:text-lg">
          {/* Description */}
          <p className="text-gray-600 max-w-[30rem]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc eget mollis neque, et dapibus erat. Nunc dapibus dictum lectus. Integer efficitur urna arcu, vel tempus diam convallis ac.
          </p>

          {/* Links */}
          <div className="flex gap-[10rem] md:gap-[14rem] md:px-4">
            {/* Column 1 */}
            <div>
              <ul className="text-gray-600">
                <li><a href="#home" className="hover:text-gray-800">Home</a></li>
                <li><a href="#recipe" className="hover:text-gray-800">Recipe</a></li>
              </ul>
            </div>

            {/* Column 2 */}
            <div>
              <ul className="text-gray-600">
                <li><a href="#testimonials" className="hover:text-gray-800">Testimonials</a></li>
                <li><a href="#about" className="hover:text-gray-800">About Us</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t-2 border-gray-300 mt-6 pt-6">
          <p className="text-gray-600 text-center text-sm md:text-lg">@ 2025 TasteTrack - All rights reserved</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
