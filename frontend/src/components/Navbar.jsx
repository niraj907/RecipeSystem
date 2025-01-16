import React, { useState } from "react";
import logo from "../assets/logo.png";
import { Button } from "./ui/button";
import { FiMenu } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom"; 

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigate = useNavigate();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="fixed top-0  bg-white w-full z-50 shadow-md">
      <div className="max-w-[1200px] mx-auto flex justify-between items-center py-4 px-8 lg:px-10">
        {/* Logo */}
        <NavLink to="/">
        <img src={logo} className="w-40" alt="logo" />
        </NavLink>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex gap-7 font-sans text-[18px] px-4">
          <li 
            className="cursor-pointer hover:text-orange-600"
            onClick={() => scrollToSection("home")}
          >
            Home
          </li>
          <li
            className="cursor-pointer hover:text-orange-600"
            onClick={() => scrollToSection("recipes")}
          >
            Recipes
          </li>
          <li
            className="cursor-pointer hover:text-orange-600"
            onClick={() => scrollToSection("about")}
          >
            About
          </li>
          <li
            className="cursor-pointer hover:text-orange-600"
            onClick={() => scrollToSection("testimonial")}
          >
            Testimonial
          </li>
        </ul>

        {/* Sign-In Button */}
        <div className="flex gap-4 items-center">
        <Button  onClick={() => navigate("/admin-signup")} 
          className="hidden lg:block bg-white text-[#F67A24] hover:bg-white hover:text-[#F67A24] 
          ring-2 ring-[#F67A24] ring-inset hover:ring-[#F67A24] hover:ring-4 px-8 rounded-md transition-all ease-in-out duration-300 text-[16px]"
        >
        Admin Panel
        </Button>

        <Button  onClick={() => navigate("/signup")} 
          className="hidden lg:block  bg-[#F67A24] hover:bg-[#f67b24e8] text-white px-8 py-2 rounded-md transition duration-300 ease-in-out"
        >
       Create Accoint
       </Button>

        </div>

        {/* Mobile Menu Icon */}
        <div className="lg:hidden">
          {isMobileMenuOpen ? (
            <IoClose
              className="text-3xl text-orange-600 cursor-pointer"
              onClick={toggleMobileMenu}
            />
          ) : (
            <FiMenu
              className="text-3xl text-orange-600 cursor-pointer"
              onClick={toggleMobileMenu}
            />
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="bg-white w-full lg:hidden shadow-md">
          <ul className="flex flex-col gap-4 font-sans text-[18px] py-4 px-9">
            <li
              className="cursor-pointer hover:text-orange-600"
              onClick={() => scrollToSection("home")}
            >
              Home
            </li>
            <li
              className="cursor-pointer hover:text-orange-600"
              onClick={() => scrollToSection("recipes")}
            >
              Recipes
            </li>
            <li
              className="cursor-pointer hover:text-orange-600"
              onClick={() => scrollToSection("about")}
            >
              About
            </li>
            <li
              className="cursor-pointer hover:text-orange-600"
              onClick={() => scrollToSection("testimonial")}
            >
              Testimonial
            </li>
            <Button  onClick={() => navigate("/admin-signup")} 
              className="w-[7rem] px-6 bg-white text-[#F67A24] hover:bg-white hover:text-[#F67A24] 
              ring-2 ring-[#F67A24] ring-inset hover:ring-[#F67A24] hover:ring-4 rounded-md 
              transition-all ease-in-out duration-300 text-[16px]"
            >
              Admin Panel
            </Button>

              <Button onClick={() => navigate("/signup")} 
          className="w-[7rem] px-6 bg-[#F67A24] hover:bg-[#f67b24e8] text-white rounded-md transition duration-300 ease-in-out"
        >
       Create Accoint
        </Button>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;










