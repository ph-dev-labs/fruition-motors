"use client"
import { useState } from 'react';
import CarCard from './carCard';


const FeaturedCars = ({cars}) => {
  const [visibleCars, setVisibleCars] = useState(4);
  
  const loadMore = () => {
    setVisibleCars(prev => Math.min(prev + 4, cars.length));
  };

  

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {cars.slice(0, visibleCars).map((car, index) => (
            <CarCard key={index} car={car} />
          ))}
        </div>
        
        {visibleCars < cars.length && (
          <div className="text-center mt-12">
            <button 
              onClick={loadMore}
              className="border-0 hover:border-1 bg-red-500 text-white hover:bg-gray-800 hover:text-white  border-primary text-primary hover:bg-primary  font-medium py-3 px-8 rounded-full transition-colors"
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