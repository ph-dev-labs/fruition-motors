"use client"
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaChevronRight } from 'react-icons/fa';

const Hero = () => {
  const [currentBg, setCurrentBg] = useState(0);
  const backgrounds = [
    'https://wigmoretrading.com/wp-content/uploads/2022/08/iStock-1325361893.jpg',
    'https://buycars.ng/wp-content/uploads/car-dealers-abuja-1000x556.jpg',
    'https://gazettengr.com/wp-content/uploads/Buy-A-Car-And-Pay-In-Monthly-Installment-Guide-In-Nigeria.jpg'  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % backgrounds.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-screen max-h-[600px] overflow-hidden">
      {/* Background images with fade transition */}
      {backgrounds.map((bg, index) => (
        <div
          key={index}
          className="absolute inset-0 w-full h-full transition-opacity duration-1000 bg-center bg-cover"
          style={{
            backgroundImage: `url(${bg})`,
            opacity: currentBg === index ? 1 : 0,
          }}
        />
      ))}
      
      {/* Dark overlay - Modified to be more transparent */}
      <div className="absolute h-full w-full top-0 left-0 bg-[#32262662] inset-0  bg-opacity-50"></div>
      
      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-shadow-md">
            Find Your Dream Car
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl text-shadow-sm">
            Explore our extensive collection of premium vehicles and drive home your perfect match today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/category" className="bg-primary hover:bg-primary-dark text-white font-medium py-3 px-6 rounded-full inline-flex items-center transition-colors">
              Browse Categories
              <FaChevronRight className="ml-2" />
            </Link>
            <Link href="/about-us" className="bg-red-500 text-primary hover:bg-gray-800 hover:text-white font-medium py-3 px-6 rounded-full inline-flex items-center transition-colors">
              Learn More
            </Link>
          </div>
        </div>
      </div>
      
      {/* Bottom indicators */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2 z-10">
        {backgrounds.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentBg(index)}
            className={`w-3 h-3 rounded-full ${
              currentBg === index ? "bg-primary" : "bg-white bg-opacity-50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;