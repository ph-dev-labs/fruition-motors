"use client"
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { FaGasPump, FaCog, FaCalendarAlt, FaChair, FaPalette, FaCar, FaTags } from 'react-icons/fa';
import { formatPrice } from '../utils/carData';

const CarDetails = ({ car }) => {
  const [activeImage, setActiveImage] = useState(car.image_url);
  const [gallery, setGallery] = useState([]);

  useEffect(() => {
    // Parse gallery images if they exist
    if (typeof car.car_gallery === 'string') {
      try {
        setGallery(JSON.parse(car.car_gallery));
      } catch (e) {
        setGallery([car.car_gallery]);
      }
    } else if (Array.isArray(car.car_gallery)) {
      setGallery(car.car_gallery);
    }
  }, [car]);

  const allImages = [car.image_url, ...gallery];

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
        {/* Image gallery */}
        <div>
          <div className="relative h-64 md:h-80 rounded-lg overflow-hidden mb-4">
            <Image 
              src={activeImage} 
              alt={car.title}
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </div>
          
          <div className="grid grid-cols-4 gap-2">
            {allImages.map((img, index) => (
              <div 
                key={index}
                className={`relative h-16 md:h-20 overflow-hidden rounded-lg cursor-pointer border-2 ${activeImage === img ? 'border-primary' : 'border-transparent'}`}
                onClick={() => setActiveImage(img)}
              >
                <Image 
                  src={img} 
                  alt={`Gallery ${index}`}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            ))}
          </div>
        </div>
        
        {/* Car details */}
        <div>
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold text-gray-900">{car.title}</h1>
              <span className="bg-primary text-white px-4 py-1 rounded-full text-sm font-bold">{car.category}</span>
            </div>
            <p className="text-xl font-bold text-primary mt-2">{formatPrice(car.price)}</p>
            <p className="text-gray-600 mt-4">{car.description}</p>
          </div>
          
          <div className="grid grid-cols-2 gap-y-4 gap-x-8 mb-8">
            <div className="flex items-center">
              <FaCar className="text-primary mr-3" />
              <div>
                <p className="text-xs text-gray-500">Brand</p>
                <p className="font-medium">{car.brand_name}</p>
              </div>
            </div>
            <div className="flex items-center">
              <FaTags className="text-primary mr-3" />
              <div>
                <p className="text-xs text-gray-500">Model</p>
                <p className="font-medium">{car.model}</p>
              </div>
            </div>
            <div className="flex items-center">
              <FaCalendarAlt className="text-primary mr-3" />
              <div>
                <p className="text-xs text-gray-500">Year</p>
                <p className="font-medium">{car.year}</p>
              </div>
            </div>
            <div className="flex items-center">
              <FaGasPump className="text-primary mr-3" />
              <div>
                <p className="text-xs text-gray-500">Fuel Type</p>
                <p className="font-medium capitalize">{car.fuel_type}</p>
              </div>
            </div>
            <div className="flex items-center">
              <FaCog className="text-primary mr-3" />
              <div>
                <p className="text-xs text-gray-500">Transmission</p>
                <p className="font-medium capitalize">{car.type_of_gear}</p>
              </div>
            </div>
            <div className="flex items-center">
              <FaChair className="text-primary mr-3" />
              <div>
                <p className="text-xs text-gray-500">Seats</p>
                <p className="font-medium">{car.seat || 'N/A'}</p>
              </div>
            </div>
            <div className="flex items-center">
              <FaPalette className="text-primary mr-3" />
              <div>
                <p className="text-xs text-gray-500">Color</p>
                <p className="font-medium capitalize">{car.color}</p>
              </div>
            </div>
          </div>
          
          <button className="w-full bg-primary hover:bg-primary-dark text-white font-medium py-3 rounded-lg transition-colors flex items-center justify-center">
            Contact Seller
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;