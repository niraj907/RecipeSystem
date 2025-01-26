import React, { useState, useEffect, useRef } from 'react';
import logo from "../assets/logo.png";
import { Button } from "./ui/button";
import { FiMenu } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import { NavLink, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "./store/authStore";
import Swal from "sweetalert2";
import { toast } from "sonner";


const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const { isAuthenticated ,logout ,user } = useAuthStore();



  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleClick = async () => {
    try {
      const result = await Swal.fire({
        title: "Do you want to logout?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#34A853",
        cancelButtonColor: "#d33",
        confirmButtonText: "Logout",
      });
  
      if (result.isConfirmed) {
        await logout();
        toast.success("Logged out successfully.");
        navigate("/");
      } else {
        toast.info("Logout cancelled.");
      }
    } catch (error) {
      toast.error("Unsuccessful logout.");
    }
  };
  

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
    <div className="fixed top-0 bg-white w-full z-50 shadow-md">
      <div className="max-w-[1200px] mx-auto flex justify-between items-center py-4 px-8 lg:px-10">
        {/* Logo */}
        <NavLink to="/" onClick={() => scrollToSection("home")}>
          <img
            src={logo}
            className="w-40 cursor-pointer"
            alt="TasteTrack Logo"
          />
        </NavLink>

        {/* Desktop Menu */}
        {location.pathname !== "/edit-profile" && (
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
            About Us
          </li>
          <li
            className="cursor-pointer hover:text-orange-600"
            onClick={() => scrollToSection("testimonial")}
          >
            Testimonial
          </li>
        </ul>
 )}


        {!isAuthenticated ? (
  <div className="flex gap-4 items-center">
    <Button
      onClick={() => navigate("/admin-signup")}
      className="hidden lg:block bg-white text-[#F67A24] hover:bg-white hover:text-[#F67A24] 
      ring-2 ring-[#F67A24] px-8 rounded-md transition-all duration-300 text-[16px]"
    >
      Admin Panel
    </Button>
    <Button
      onClick={() => navigate("/signup")}
      className="hidden lg:block bg-[#F67A24] hover:bg-[#f67b24e8] text-white px-8 py-2 rounded-md transition duration-300"
    >
      Create Account
    </Button>
  </div>
) : (
  <div className="relative" ref={dropdownRef}>
    <button
      type="button"
      className="hidden lg:block rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
      id="user-menu-button"
      onClick={toggleDropdown}
    >
      
      <span className="sr-only">Open user menu</span>
      <img
        className="w-8 h-8 rounded-full"
      src= {user?.images?.[0]?.url || "/default-profile.png"}
      // src={user.images[0].url || "https://github.com/shadcn.png"}
        
        alt="User Profile"
      />
    
    </button>
    {isDropdownOpen && (
      <div
        className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="user-menu-button"
      >
        <a
        onClick={() => navigate("/edit-profile")}
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
          role="menuitem"
        >
          Profile
        </a>
        <a
          href="#"
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          role="menuitem"   onClick={handleClick}
        >
          Log Out
        </a>
      </div>
    )}
  </div>
)}

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
              About Us
            </li>
            <li
              className="cursor-pointer hover:text-orange-600"
              onClick={() => scrollToSection("testimonial")}
            >
              Testimonial
            </li>
            <Button
              onClick={() => navigate("/admin-signup")}
              className="w-[7rem] px-6 bg-white text-[#F67A24] hover:bg-white hover:text-[#F67A24] 
              ring-2 ring-[#F67A24] rounded-md transition-all duration-300 text-[16px]"
            >
              Admin Panel
            </Button>
            <Button
              onClick={() => navigate("/signup")}
              className="w-[7rem] px-6 bg-[#F67A24] hover:bg-[#f67b24e8] text-white rounded-md transition duration-300"
            >
              Create Account
            </Button>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
