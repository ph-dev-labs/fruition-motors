"use client"
import React, { useState } from 'react'
import { useCars } from '../../hooks/useGetCars';
import Loader from '../../components/loader';
import CarCard from '../../components/carCard';

const CarPage = () => {
    const {data, isLoading ,isError, error} = useCars()
  const [visibleCars, setVisibleCars] = useState(4);
   
   const loadMore = () => {
     setVisibleCars(prev => Math.min(prev + 4, data.length));
   };

   console.log(data)
  if (isLoading) {
    return <Loader />; // Show a loading state
  }

  if (error) {
    console.log(error)
    return <div>Error: {error.message}</div>; // Show an error message
  }

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Our premium collection of vechiles</h2>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            Discover our handpicked selection of premium cars available for purchase
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {data?.slice(0, visibleCars).map(car => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
        
        {visibleCars < data?.length && (
          <div className="text-center mt-12">
            <button 
              onClick={loadMore}
              className="bg-white border border-primary text-primary hover:bg-primary hover:text-white font-medium py-3 px-8 rounded-full transition-colors"
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </section>
  )
}

export default CarPage