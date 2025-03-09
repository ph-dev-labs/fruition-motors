'use client'
import { useState } from 'react';
import Link from 'next/link';
import { FaSearch, FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <h1 className="text-2xl font-bold text-primary">
                Fruition <span className="text-gray-800">Motors</span>
              </h1>
            </Link>
            <div className="hidden md:ml-10 md:flex md:space-x-8">
              <Link href="/" className="text-gray-900 hover:text-primary border-transparent border-b-2 hover:border-primary px-3 py-2 text-sm font-medium">
                Home
              </Link>
              <Link href="/category" className="text-gray-900 hover:text-primary border-transparent border-b-2 hover:border-primary px-3 py-2 text-sm font-medium">
                Categories
              </Link>
              <Link href="/cars" className="text-gray-900 hover:text-primary border-transparent border-b-2 hover:border-primary px-3 py-2 text-sm font-medium">
                Cars
              </Link>
              <Link href="/about-us" className="text-gray-900 hover:text-primary border-transparent border-b-2 hover:border-primary px-3 py-2 text-sm font-medium">
                About
              </Link>
            </div>
          </div>
          <div className="flex items-center">
            <div className="hidden md:flex items-center border border-gray-300 rounded-full px-3 py-1 bg-gray-50">
              <input type="text" placeholder="Search cars..." className="bg-transparent border-none focus:outline-none text-sm" />
              <FaSearch className="text-gray-500 ml-2" />
            </div>
            <button className="md:hidden ml-auto" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <FaTimes className="h-6 w-6 text-primary" /> : <FaBars className="h-6 w-6 text-primary" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg rounded-b-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link href="/" className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-primary hover:text-white">
              Home
            </Link>
            <Link href="/cars" className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-primary hover:text-white">
              Cars
            </Link>
            <Link href="/category" className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-primary hover:text-white">
              Categories
            </Link>
            <Link href="/about-us" className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-primary hover:text-white">
              About
            </Link>
          </div>
          <div className="px-4 py-3">
            <div className="flex items-center border border-gray-300 rounded-full px-3 py-1 bg-gray-50">
              <input type="text" placeholder="Search cars..." className="bg-transparent border-none focus:outline-none text-sm w-full" />
              <FaSearch className="text-gray-500 ml-2" />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;