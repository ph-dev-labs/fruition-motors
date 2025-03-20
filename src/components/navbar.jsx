"use client";
import { useState } from "react";
import Link from "next/link";
import { FaSearch, FaBars, FaTimes, FaChevronDown } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import Loader from "./loader";
import axiosInstance from "../libs/axios";
import Image from "next/image"; // Import Image from next/image
import logo from "../../public/logo.png"; // Ensure the path to your logo is correct

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
  const {
    data,
    isLoading: catLoading,
    error: catError,
  } = useQuery({
    queryKey: ["allCategories"],
    queryFn: async () => {
      const response = await axiosInstance.get("/getCategory");
      return response?.data.category; // Ensure this matches your API response structure
    },
  });

  if (catLoading) {
    return <Loader />;
  }

  if (catError) {
    return <div>Error loading categories: {catError.message}</div>;
  }

  if (!data || !Array.isArray(data)) {
    return <div>No categories found.</div>;
  }

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <Image
                src={logo}
                alt="Fruition Motors Logo"
                width={150}
                height={50}
                className="h-auto"
              />{" "}
              {/* Use Image component */}
            </Link>
            <div className="hidden md:ml-10 md:flex md:space-x-8">
              <Link
                href="/"
                className="text-gray-900 hover:text-primary border-transparent border-b-2 hover:border-primary px-3 py-2 text-sm font-medium"
              >
                Home
              </Link>
              {/* Inventory Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="text-gray-900 hover:text-primary border-transparent border-b-2 hover:border-primary px-3 py-2 text-sm font-medium flex items-center"
                >
                  Inventory
                  <FaChevronDown className="ml-1 h-3 w-3" />
                </button>
                {isDropdownOpen && (
                  <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                    {data.map((category) => (
                      <Link
                        key={category._id || category.name}
                        href={`/category/${
                          category._id || category.name
                        }/category-details`}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-primary"
                      >
                        {category.name}
                      </Link>
                    ))}
                    <Link
                      href="/category"
                      className="block px-4 py-2 text-sm font-medium text-primary border-t border-gray-100"
                    >
                      All Categories
                    </Link>
                  </div>
                )}
              </div>
              <Link
                href="/cars"
                className="text-gray-900 hover:text-primary border-transparent border-b-2 hover:border-primary px-3 py-2 text-sm font-medium"
              >
                Cars
              </Link>
              <Link
                href="/about-us"
                className="text-gray-900 hover:text-primary border-transparent border-b-2 hover:border-primary px-3 py-2 text-sm font-medium"
              >
                About
              </Link>

              <Link
                href="/contact-us"
                className="text-gray-900 hover:text-primary border-transparent border-b-2 hover:border-primary px-3 py-2 text-sm font-medium"
              >
                Contact us
              </Link>
              <div className="relative">
                <button
                  onClick={() =>
                    setIsServicesDropdownOpen(!isServicesDropdownOpen)
                  }
                  className="text-gray-900 hover:text-primary border-transparent border-b-2 hover:border-primary px-3 py-2 text-sm font-medium flex items-center"
                >
                  Services
                  <FaChevronDown className="ml-1 h-3 w-3" />
                </button>
                {isServicesDropdownOpen && (
                  <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                    <Link
                      href={`/custom-order`}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-primary"
                    >
                      create a custom order
                    </Link>

                    <Link
                      href="/sell-car"
                      className="block px-4 py-2 text-sm font-medium text-primary border-t border-gray-100"
                    >
                      sell car
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <div className="hidden md:flex items-center border border-gray-300 rounded-full px-3 py-1 bg-gray-50">
              <input
                type="text"
                placeholder="Search cars..."
                className="bg-transparent border-none focus:outline-none text-sm"
              />
              <FaSearch className="text-gray-500 ml-2" />
            </div>
            <button
              className="md:hidden ml-auto"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <FaTimes className="h-6 w-6 text-primary" />
              ) : (
                <FaBars className="h-6 w-6 text-primary" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg rounded-b-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              href="/"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-primary hover:text-white"
            >
              Home
            </Link>
            {/* Mobile Inventory Submenu */}
            <div>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex justify-between w-full px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-primary hover:text-white"
              >
                Inventory
                <FaChevronDown
                  className={`transform ${
                    isDropdownOpen ? "rotate-180" : ""
                  } transition-transform duration-200`}
                />
              </button>
              {isDropdownOpen && (
                <div className="pl-4 space-y-1 mt-1">
                  {data.map((category) => (
                    <Link
                      key={category._id || category.name}
                      href={`/category/${
                        category._id || category.name
                      }/category-details`}
                      className="block px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100"
                    >
                      {category.name}
                    </Link>
                  ))}
                  <Link
                    href="/category"
                    className="block px-3 py-2 rounded-md text-sm font-medium text-primary"
                  >
                    All Categories
                  </Link>
                </div>
              )}
            </div>
            <Link
              href="/cars"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-primary hover:text-white"
            >
              Cars
            </Link>
            <Link
              href="/about-us"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-primary hover:text-white"
            >
              About
            </Link>
            <Link
              href="/contact-us"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-primary hover:text-white"
            >
              Contact us
            </Link>
            <div className="relative">
              <button
                onClick={() =>
                  setIsServicesDropdownOpen(!isServicesDropdownOpen)
                }
                className="text-gray-900 hover:text-primary border-transparent border-b-2 hover:border-primary px-3 py-2 text-sm font-medium flex items-center"
              >
                Services
                <FaChevronDown className="ml-1 h-3 w-3" />
              </button>
              {isServicesDropdownOpen && (
                <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                  <Link
                    href={`/custom-order`}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-primary"
                  >
                    create a custom order
                  </Link>

                  <Link
                    href="/sell-car"
                    className="block px-4 py-2 text-sm font-medium text-primary border-t border-gray-100"
                  >
                    sell car
                  </Link>
                </div>
              )}
            </div>
          </div>
          <div className="px-4 py-3">
            <div className="flex items-center border border-gray-300 rounded-full px-3 py-1 bg-gray-50">
              <input
                type="text"
                placeholder="Search cars..."
                className="bg-transparent border-none focus:outline-none text-sm w-full"
              />
              <FaSearch className="text-gray-500 ml-2" />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
