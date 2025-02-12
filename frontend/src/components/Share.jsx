import React, { useState, useRef, useEffect } from "react";
import { FaShareAlt } from "react-icons/fa";
import {
  FacebookShareButton,
  WhatsappShareButton,
  LinkedinShareButton,
  FacebookIcon,
  WhatsappIcon,
  LinkedinIcon,
} from "react-share";

const Share = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Get current page URL dynamically
  const currentPageUrl = window.location.href;
console.log(currentPageUrl);
  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={toggleDropdown}
        className="p-2 focus:outline-none"
      >
        <span className="sr-only">Open share menu</span>
        <FaShareAlt className="text-xl sm:text-2xl cursor-pointer" />
      </button>

      {isDropdownOpen && (
        <div
          className="absolute z-10 mt-2 flex flex-wrap gap-2 bg-white rounded-lg py-2 px-3 shadow-lg ring-1 ring-black/5"
          role="menu"
          aria-orientation="vertical"
        >
          <FacebookShareButton url={currentPageUrl} quote="Please share this post">
            <FacebookIcon size={40} round />
          </FacebookShareButton>

          <LinkedinShareButton url={currentPageUrl}>
            <LinkedinIcon size={40} round />
          </LinkedinShareButton>

          <WhatsappShareButton url={currentPageUrl}>
            <WhatsappIcon size={40} round />
          </WhatsappShareButton>
        </div>
      )}
    </div>
  );
};

export default Share;