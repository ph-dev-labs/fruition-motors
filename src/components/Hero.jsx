"use client"
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaChevronRight } from 'react-icons/fa';

const Hero = () => {
  const [currentBg, setCurrentBg] = useState(0);
  const backgrounds = [
    'https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?q=80&w=2064&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  ];

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
      
      {/* Dark overlay */}
      <div className="absolute inset-0  bg-opacity-50"></div>
      
      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Find Your Dream Car
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl">
            Explore our extensive collection of premium vehicles and drive home your perfect match today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/category" className="bg-primary hover:bg-primary-dark text-white font-medium py-3 px-6 rounded-full inline-flex items-center transition-colors">
              Browse Categories
              <FaChevronRight className="ml-2" />
            </Link>
            <Link href="/about" className="bg-black  hover:bg-gray-100 font-medium py-3 px-6 rounded-full inline-flex items-center transition-colors">
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