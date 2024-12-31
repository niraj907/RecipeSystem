import React from "react";
import logo from "../assets/logo.png";
import { Button } from "./ui/button";
const Navbar = () => {
  return (
    <div className="fixed bg-white top-0 left-0 w-full z-10 ">
      <div className="max-w-[1200px] mx-auto flex justify-between items-center py-4 px-6">
        <img src={logo} className="w-40" alt="logo" />
        <ul className="hidden lg:flex gap-7 font-sans text-[18px] px-4">
          <a href="Home" className="cursor-pointer  hover:text-orange-600">
            Home
          </a>
          <a href="Recipes" className="cursor-pointer  hover:text-orange-600">
            Recipes
          </a>
          <a href="About" className="cursor-pointer  hover:text-orange-600">
            About
          </a>
          <a
            href="Testimonial"
            className="cursor-pointer  hover:text-orange-600"
          >
            Testimonial
          </a>
        </ul>

        <div className="flex justify-center">
          <Button className="hidden lg:block px-8 bg-orange-600 hover:bg-orange-500">
            Log in
          </Button>
          <Button className="hidden lg:block px-8 mx-4  bg-white text-orange-600 border-2 border-orange-600 hover:bg-white hover:border-orange-500 hover:text-orange-500">
            Sign up
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

