"use client"
import { useState } from 'react';
import CarCard from './carCard';


const FeaturedCars = ({cars}) => {
  const [visibleCars, setVisibleCars] = useState(4);
  
  const loadMore = () => {
    setVisibleCars(prev => Math.min(prev + 4, cars.length));
  };

  console.log(cars)

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Featured Vehicles</h2>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            Discover our handpicked selection of premium cars available for purchase
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {cars.slice(0, visibleCars).map(car => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
        
        {visibleCars < cars.length && (
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
  );
};

export default FeaturedCars;