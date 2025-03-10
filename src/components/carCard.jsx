import Link from 'next/link';
import Image from 'next/image';
import { FaGasPump, FaCog, FaCalendarAlt, FaChair, FaTag } from 'react-icons/fa';
import { formatPrice } from '../utils/carData';

const CarCard = ({ car }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl border border-gray-100">
      {/* Image Container with Gradient Overlay */}
      <div className="relative h-56 overflow-hidden">
        <Image 
          src={car.image_url} 
          alt={`${car.brand_name} ${car.model} - ${car.title}`}
          layout="fill"
          objectFit="cover"
          className="transition-transform duration-500 hover:scale-105"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Category Badge */}
        <div className="absolute top-4 right-4 bg-primary text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-md backdrop-blur-sm bg-opacity-90 flex items-center gap-1.5">
          <FaTag className="text-xs" />
          {car.category}
        </div>
      </div>
      
      <div className="p-6">
        {/* Title - Full Width on One Line */}
        <h3 className="text-lg font-bold text-gray-800 truncate mb-2 w-full">{car.title}</h3>
        
        {/* Price - Full Width on Its Own Line */}
        <p className="font-bold text-primary text-base mb-4 w-full">{formatPrice(car.price)}</p>
        
        {/* Description */}
        {/* <p className="text-gray-600 text-sm mb-5 line-clamp-2">{car.description}</p> */}
        
        {/* Specifications Grid */}
        <div className="grid grid-cols-2 gap-y-3 gap-x-4 mb-5">
          <div className="flex items-center text-sm text-gray-700">
            <div className="flex items-center justify-center bg-gray-100 rounded-full p-2 mr-3">
              <FaGasPump className="text-primary text-xs" />
            </div>
            <span className="font-medium">{car.fuel_type}</span>
          </div>
          <div className="flex items-center text-sm text-gray-700">
            <div className="flex items-center justify-center bg-gray-100 rounded-full p-2 mr-3">
              <FaCog className="text-primary text-xs" />
            </div>
            <span className="font-medium">{car.type_of_gear}</span>
          </div>
          <div className="flex items-center text-sm text-gray-700">
            <div className="flex items-center justify-center bg-gray-100 rounded-full p-2 mr-3">
              <FaCalendarAlt className="text-primary text-xs" />
            </div>
            <span className="font-medium">{car.year}</span>
          </div>
          <div className="flex items-center text-sm text-gray-700">
            <div className="flex items-center justify-center bg-gray-100 rounded-full p-2 mr-3">
              <FaChair className="text-primary text-xs" />
            </div>
            <span className="font-medium">{car.seat || 'N/A'} seats</span>
          </div>
        </div>
        
        {/* Brand info */}
        <p className="text-sm font-semibold text-gray-800 mb-4 border-t border-gray-100 pt-3">
          {car.brand_name} <span className="text-primary">{car.model}</span>
        </p>
        
        {/* View Details Button - Centered on Its Own Line */}
        <div className="flex justify-center w-full">
          <Link 
            href={`/cars/${car.id}`} 
            className="bg-primary hover:bg-primary-dark text-white text-sm font-medium py-2.5 px-6 rounded-lg transition-all duration-200 hover:shadow-md inline-block text-center"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CarCard;