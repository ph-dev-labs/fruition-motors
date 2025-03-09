"use client"
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';
import { getCarById, getCarsByCategory } from '../../../utils/carData';
import CarDetails from '../../../components/carDetails';
import CarCard from '../../../components/carCard';
import { useParams } from 'next/navigation';

export default function CarDetail() {
  const params = useParams()
  const {slug} = params

  
  const car = getCarById(slug);
  
  if (!car) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <h1 className="text-3xl font-bold text-red-600 mb-4">Car Not Found</h1>
          <p className="text-gray-600 mb-6">The car you are looking for does not exist or has been removed.</p>
          <Link href="/" className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }
  
  // Get similar cars
  const similarCars = getCarsByCategory(car.category)
    .filter(c => c.id !== car.id)
    .slice(0, 4);
    
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link href="/cars" className="inline-flex items-center text-blue-500 hover:text-blue-700">
          <FaArrowLeft className="mr-2" />
          Back to Listings
        </Link>
      </div>
      
      <CarDetails car={car} />
      
      {similarCars.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Similar Vehicles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {similarCars.map(car => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}