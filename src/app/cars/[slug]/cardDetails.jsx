"use client";

import React, { useMemo } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useGetCarsById } from '../../../hooks/useGetCars';
import { useQuery } from '@tanstack/react-query';
import axios from '../../../libs/axios';
import CarDetails from '../../../components/carDetails';
import CarCard from '../../../components/carCard';
import Loader from '../../../components/loader';

export default function CarDetail() {
  const params = useParams();
  const { slug } = params;

  // Fetch the current car data
  const {
    data: carData,
    isLoading,
    error
  } = useGetCarsById(slug);

  // Fetch all cars for similar vehicles
  const {
    data: allCars,
    isLoading: allCarsLoading
  } = useQuery({
    queryKey: ['cars'],
    queryFn: async () => {
      const response = await axios.get("/cars");
      return response.data.cars;
    },
  });

  // Extract the current car from the response
  const car = useMemo(() => {
    if (!carData?.cars || !carData.cars.length) return null;
    return carData.cars.find(car => car.id === slug);
  }, [carData, slug]);

  // Get similar cars based on category
  const similarCars = useMemo(() => {
    if (!car || !allCars || !Array.isArray(allCars)) return [];
    
    return allCars
      .filter(c => c.category === car.category && c.id !== car.id)
      .slice(0, 4);
  }, [car, allCars]);

  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader />
      </div>
    );
  }

  // Error state
  if (error || !carData) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 rounded-lg shadow-md p-6 text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error Loading Car</h1>
          <p className="text-gray-700 mb-6">
            There was a problem loading the car information. Please try again later.
          </p>
          <Link 
            href="/cars" 
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Back to Listings
          </Link>
        </div>
      </div>
    );
  }

  // Car not found state
  if (!car) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Car Not Found</h1>
          <p className="text-gray-600 mb-6">
            The car you are looking for does not exist or has been removed.
          </p>
          <Link 
            href="/cars" 
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Back to Listings
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      <div className="container mx-auto px-4 sm:px-6 py-8">
        <div className="mb-6">
          <Link 
            href="/cars" 
            className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors"
          >
            <ArrowLeft size={18} className="mr-2" />
            Back to Listings
          </Link>
        </div>
        
        <CarDetails car={car} />
        
        {similarCars.length > 0 ? (
          <div className="mt-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Similar Vehicles</h2>
              <Link 
                href={`/cars?category=${car.category}`}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                View All
              </Link>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {allCarsLoading ? (
                Array(4).fill(0).map((_, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-sm p-4 animate-pulse">
                    <div className="h-48 bg-gray-200 rounded-md mb-4"></div>
                    <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                    <div className="h-8 bg-gray-200 rounded w-1/3"></div>
                  </div>
                ))
              ) : similarCars.length > 0 ? (
                similarCars.map(similarCar => (
                  <CarCard key={similarCar.id} car={similarCar} />
                ))
              ) : (
                <div className="col-span-full bg-blue-50 text-blue-700 p-4 rounded-md">
                  No similar vehicles found in this category.
                </div>
              )}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}