// components/CarCard.js
import Link from 'next/link';
import Image from 'next/image';
import { FaGasPump, FaCog, FaCalendarAlt, FaChair } from 'react-icons/fa';
import { formatPrice } from '../utils/carData';

const CarCard = ({ car }) => {

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl">
      <div className="relative h-48 overflow-hidden">
        <Image 
          src={car.image_url} 
          alt={car.title}
          layout="fill"
          objectFit="cover"
          className="transition-transform duration-500 hover:scale-110"
        />
        <div className="absolute top-4 right-4 bg-primary text-white text-sm font-bold px-3 py-1 rounded-full">
          {car.category}
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-gray-900 truncate">{car.title}</h3>
          <p className="font-bold text-primary">{formatPrice(car.price)}</p>
        </div>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{car.description}</p>
        
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="flex items-center text-sm text-gray-500">
            <FaGasPump className="text-primary mr-2" />
            <span>{car.fuel_type}</span>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <FaCog className="text-primary mr-2" />
            <span>{car.type_of_gear}</span>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <FaCalendarAlt className="text-primary mr-2" />
            <span>{car.year}</span>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <FaChair className="text-primary mr-2" />
            <span>{car.seat || 'N/A'} seats</span>
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-500 font-medium">{car.brand_name} {car.model}</p>
          <Link href={`/cars/${car.id}`} className="bg-primary hover:bg-primary-dark text-white text-sm font-medium py-2 px-4 rounded-full transition-colors">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CarCard;