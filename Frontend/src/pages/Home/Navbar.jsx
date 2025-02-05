import React, { useState } from "react";
import "../../index.css"; // Adjust the path if necessary
import { Link } from 'react-router-dom'; // Import Link from React Router



const Navbar = () => {
    console.log('Navbar is rendered');
  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
    // Toggle body scroll when menu is open
    document.body.style.overflow = menuVisible ? "auto" : "hidden";
  };

  return (
    <nav className="bg-[#172554] w-full h-[11vh] flex justify-between items-center px-4 sm:px-2 relative">
      {/* Logo */}
      <img src="/images/Logo.png" alt="Logo" className="h-8 sm:h-10" />

      {/* Links for larger screens */}
      <ul className="hidden lg:flex items-center lg:space-x-8 text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-bold text-[#f0fdfa]">
        <li>
          <a
            href="/"
            className="relative px-2 py-1 hover:text-[#0d9488] transition-colors duration-300 before:absolute before:bottom-0 before:left-0 before:w-0 before:h-[2px] before:bg-[#0d9488] before:transition-all before:duration-300 hover:before:w-full"
          >
            Home
          </a>
        </li>
        <li>
          <a
            href="/reportlostfound"
            className="relative px-2 py-1 hover:text-[#0d9488] transition-colors duration-300 before:absolute before:bottom-0 before:left-0 before:w-0 before:h-[2px] before:bg-[#0d9488] before:transition-all before:duration-300 hover:before:w-full"
          >
            Report(Lost/found)
          </a>
        </li>
        <li>
          <a
            href="/AboutUs"
            className="relative px-2 py-1 hover:text-[#0d9488] transition-colors duration-300 before:absolute before:bottom-0 before:left-0 before:w-0 before:h-[2px] before:bg-[#0d9488] before:transition-all before:duration-300 hover:before:w-full"
          >
            AboutUs
          </a>
        </li>
        <li>
          <a
            href="/search"
            className="relative px-2 py-1 hover:text-[#0d9488] transition-colors duration-300 before:absolute before:bottom-0 before:left-0 before:w-0 before:h-[2px] before:bg-[#0d9488] before:transition-all before:duration-300 hover:before:w-full"
          >
            Search
          </a>
        </li>
        <li>
          <a
            href="/contact"
            className="relative px-2 py-1 hover:text-[#0d9488] transition-colors duration-300 before:absolute before:bottom-0 before:left-0 before:w-0 before:h-[2px] before:bg-[#0d9488] before:transition-all before:duration-300 hover:before:w-full"
          >
            Contact Us
          </a>
        </li>
      </ul>

      <div className="lg:hidden flex items-center">
        
<Link
  to="/login"
  className="px-4 py-2 bg-[#6d28d9] text-white rounded-lg shadow-md hover:bg-[#4c1d95] transition-all duration-300"
>
  Get Started
</Link>

      {/* Hamburger Menu Button */}
      <button
        onClick={toggleMenu}
        className="lg:hidden ml-4 text-[#99c8f4] focus:outline-none"
      >
        
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 6h18M3 12h18M3 18h18"
          />
        </svg>
      </button>
    </div>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 w-3/4 max-w-sm bg-[#0f172a] text-[#f0fdfa] transform ${
          menuVisible ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out z-40`}
      >
        <button
          onClick={toggleMenu}
          className="text-[#99c8f4] p-4 focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <ul className="p-6 space-y-4">
          <li>
            <a
              href="/"
              className="block px-4 py-2 hover:bg-[#1e293b] hover:text-[#0d9488] transition-all duration-300"
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="/reportlostfound"
              className="block px-4 py-2 hover:bg-[#1e293b] hover:text-[#0d9488] transition-all duration-300"
            >
              Report(Lost/Found)
            </a>
          </li>
          <li>
            <a
              href="/AboutUs"
              className="block px-4 py-2 hover:bg-[#1e293b] hover:text-[#0d9488] transition-all duration-300"
            >
              AboutUs
            </a>
          </li>
          <li>
            <a
              href="/search"
              className="block px-4 py-2 hover:bg-[#1e293b] hover:text-[#0d9488] transition-all duration-300"
            >
              Search
            </a>
          </li>
          <li>
            <a
              href="/contact"
              className="block px-4 py-2 hover:bg-[#1e293b] hover:text-[#0d9488] transition-all duration-300"
            >
              Contact Us
            </a>
          </li>
        </ul>
      </div>

      <div className="hidden lg:flex space-x-4 items-center px-2">
         <Link 
        to="/login" 
        className="px-4 py-2 bg-[#0e7490] text-white rounded-lg shadow-md hover:bg-[#065f73] transition-all duration-300"
      >
        Login
      </Link>
      
      <Link 
        to="/signup" 
        className="px-4 py-2 bg-[#075985] text-white rounded-lg shadow-md hover:bg-[#065f73] hover:text-white transition-all duration-300"
      >
        Sign Up
      </Link>
      </div>

      {/* Background Overlay */}
      {menuVisible && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={toggleMenu}
        >

        </div>


        
      )}
    </nav>
  );
};

export default Navbar; 
 