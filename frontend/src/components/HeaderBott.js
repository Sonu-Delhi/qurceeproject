import React, { useState } from 'react'
import {FaBars, FaTimes } from "react-icons/fa";
import { Link } from 'react-router-dom';
import CategoryList from './CategoryList';

const HeaderBott = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    return (
        <nav className="bg-slate-400 border-b border-gray-200 shadow-sm fixed w-full z-40">
          <div className="container mx-auto flex items-center py-2">
            {/* Left Side - Logo */}
            
            <div className="flex-shrink-0">
            <CategoryList/>
              {/* <Link to="/" className="text-xl font-bold text-gray-800">Qurcce</Link> */}
            </div>
            
            
            
            {/* Center - Navigation Links */}
            <div className={`font-medium top-11 left-0 w-full lg:w-fit bg-slate-400 md:static md:flex items-center md:space-x-1 transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
              <Link to={"/"} className="block md:inline-block px-4 py-2 text-gray-700 hover:text-gray-900">Home</Link>
              <Link to={"/about"} className="block md:inline-block px-4 py-2 text-gray-700 hover:text-gray-900">About</Link>
              <Link to="/buy" className="block md:inline-block px-4 py-2 text-gray-700 hover:text-gray-900">Buy</Link>
              <Link to={"/service"} className="block md:inline-block px-4 py-2 text-gray-700 hover:text-gray-900">Services</Link>
              <Link to={"/contact-us"} className="block md:inline-block px-4 py-2 text-gray-700 hover:text-gray-900">Contact</Link>
            </div>
    
            {/* Right Side - Profile, Cart, and Login */}
            <div className="flex items-center gap-4">
              
              {/* Hamburger Menu Icon for Mobile */}
            <div className="md:hidden text-2xl" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
            </div>
            </div>
          </div>
        </nav>
      );
    };

export default HeaderBott
