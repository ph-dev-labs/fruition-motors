import Link from 'next/link';
import Image from 'next/image';
import { FaGasPump, FaCog, FaCalendarAlt, FaChair, FaTag, FaPhone, FaComment, FaWhatsapp, FaShoppingCart, FaStar } from 'react-icons/fa';
import { useState } from 'react';

const CarCard = ({ car }) => {
  const [showContactOptions, setShowContactOptions] = useState(false);
  const phoneNumber = "0810471769";
  
  const toggleContactOptions = () => {
    setShowContactOptions(!showContactOptions);
  };

  // Function to generate pre-populated message
  const generateContactMessage = (type) => {
    const message = encodeURIComponent(`Hello, I'm interested in the ${car.color || 'specified'} ${car.title} that I saw on your website. What's the price of the vehicle?`);
    
    if (type === 'sms') {
      return `sms:${phoneNumber}?body=${message}`;
    } else if (type === 'whatsapp') {
      return `https://wa.me/+2348157083863?text=${message}`;
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl border border-gray-100 relative">
      {/* Image Container with Enhanced Gradient Overlay */}
      <div className="relative h-64 overflow-hidden">
        <Image 
          src={car.image_url} 
          alt={`${car.brand_name} ${car.model} - ${car.title}`}
          layout="fill"
          objectFit="cover"
          className="transition-transform duration-700 hover:scale-110"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-40 hover:opacity-60 transition-opacity duration-300"></div>
        
        {/* Category Badge */}
        <div className="absolute top-4 right-4 bg-zinc-800 text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-md backdrop-blur-sm bg-opacity-90 flex items-center gap-1.5 transition-all duration-300 hover:bg-zinc-700">
          <FaTag className="text-xs" />
          {car.category}
        </div>
      </div>
      
      <div className="p-6">
        {/* Title and Brand */}
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="text-lg font-bold text-gray-800 truncate mb-1 w-full">{car.title}</h3>
            <p className="text-sm font-medium text-gray-600">
              {car.brand_name} <span className="text-red-600">{car.model}</span>
            </p>
          </div>
        </div>
        
        {/* Specifications Grid */}
        <div className="grid grid-cols-2 gap-y-3 gap-x-4 mb-6 bg-gray-50 p-4 rounded-xl">
          <div className="flex items-center text-sm text-gray-700">
            <div className="flex items-center justify-center bg-white shadow-sm rounded-full p-2 mr-3">
              <FaGasPump className="text-red-500 text-xs" />
            </div>
            <span className="font-medium">{car.fuel_type}</span>
          </div>
          <div className="flex items-center text-sm text-gray-700">
            <div className="flex items-center justify-center bg-white shadow-sm rounded-full p-2 mr-3">
              <FaCog className="text-red-500 text-xs" />
            </div>
            <span className="font-medium">{car.type_of_gear}</span>
          </div>
          <div className="flex items-center text-sm text-gray-700">
            <div className="flex items-center justify-center bg-white shadow-sm rounded-full p-2 mr-3">
              <FaCalendarAlt className="text-red-500 text-xs" />
            </div>
            <span className="font-medium">{car.year}</span>
          </div>
          <div className="flex items-center text-sm text-gray-700">
            <div className="flex items-center justify-center bg-white shadow-sm rounded-full p-2 mr-3">
              <FaChair className="text-red-500 text-xs" />
            </div>
            <span className="font-medium">{car.seat || 'N/A'} seats</span>
          </div>
        </div>
        
        {/* Button Group */}
        <div className="grid grid-cols-2 gap-3 mb-3">
          {/* Buy Now Button */}
          <button 
            onClick={toggleContactOptions}
            className="group flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 to-red-500 text-white text-sm font-medium py-3 px-4 rounded-xl shadow-md transition-all duration-300 hover:shadow-lg hover:from-red-500 hover:to-red-600 relative overflow-hidden whitespace-nowrap"
          >
            <span className="relative z-10 flex items-center gap-1 whitespace-nowrap">
              <FaShoppingCart className="text-sm flex-shrink-0" />
              <span className="font-semibold">Buy Now</span>
            </span>
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-red-600 to-red-400 transform scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100"></span>
          </button>
          
          {/* View Details Button */}
          <Link 
            href={`/cars/${car.id}`}
            className="flex items-center justify-center gap-1 bg-gray-100 text-gray-800 text-sm font-medium py-3 px-4 rounded-xl transition-all duration-300 hover:bg-gray-200 whitespace-nowrap"
          >
            View Details
          </Link>
        </div>
        
        {/* Contact Options */}
        {showContactOptions && (
          <div className="mt-3 grid grid-cols-3 gap-3 bg-gray-50 p-3 rounded-xl">
            <a 
              href={`tel:${phoneNumber}`}
              className="flex flex-col items-center justify-center bg-blue-500 text-white rounded-lg py-2 px-2 transition-all hover:bg-blue-600 shadow-sm"
            >
              <FaPhone className="mb-1 text-base" />
              <span className="text-xs font-medium whitespace-nowrap">Call</span>
            </a>
            <a 
              href={generateContactMessage('sms')}
              className="flex flex-col items-center justify-center bg-green-500 text-white rounded-lg py-2 px-2 transition-all hover:bg-green-600 shadow-sm"
            >
              <FaComment className="mb-1 text-base" />
              <span className="text-xs font-medium whitespace-nowrap">Message</span>
            </a>
            <a 
              href={generateContactMessage('whatsapp')}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center bg-green-600 text-white rounded-lg py-2 px-2 transition-all hover:bg-green-700 shadow-sm"
            >
              <FaWhatsapp className="mb-1 text-base" />
              <span className="text-xs font-medium whitespace-nowrap">WhatsApp</span>
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default CarCard;