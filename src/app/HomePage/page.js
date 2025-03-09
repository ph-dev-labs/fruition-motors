"use client"
import { useCars } from '../../hooks/useGetCars';
import Hero from '../../components/Hero';
import FeaturedCars from '../../components/featuredCar';
import Link from 'next/link';
import { FaArrowRight, FaCheckCircle, FaCar } from 'react-icons/fa';
import Loader from '../../components/loader';

export default function HomePage() {
  const {data, isLoading ,isError, error} = useCars()
  console.log(data)

  if (isLoading) {
    return <Loader />; // Show a loading state
  }

  if (error) {
    console.log(error)
    return <div>Error: {error.message}</div>; // Show an error message
  }

  
  return (
    <>
      {/* Hero Section */}
      <Hero />
      
      {/* Featured Cars Section */}
      <FeaturedCars />
      
      {/* Why Choose Us Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Why Choose Fruition Motors</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              We provide an exceptional car buying experience with features youll love
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-8 rounded-lg text-center">
              <div className="bg-primary bg-opacity-10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaCheckCircle className="text-primary text-2xl" />
              </div>
              <h3 className="text-xl font-bold mb-2">Quality Assurance</h3>
              <p className="text-gray-600">
                Every vehicle in our collection undergoes a rigorous inspection process to ensure top quality.
              </p>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-lg text-center">
              <div className="bg-primary bg-opacity-10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaCar className="text-primary text-2xl" />
              </div>
              <h3 className="text-xl font-bold mb-2">Extensive Selection</h3>
              <p className="text-gray-600">
                Browse through a wide range of vehicles from luxury sedans to powerful SUVs and electric cars.
              </p>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-lg text-center">
              <div className="bg-primary bg-opacity-10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaCheckCircle className="text-primary text-2xl" />
              </div>
              <h3 className="text-xl font-bold mb-2">Customer Support</h3>
              <p className="text-gray-600">
                Our dedicated team provides excellent support throughout your car buying journey.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-16 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Find Your Dream Car?
          </h2>
          <p className="text-xl text-white opacity-90 max-w-2xl mx-auto mb-8">
            Browse our extensive collection of premium vehicles and drive home your perfect match today.
          </p>
          <Link href="/category" className="inline-flex items-center bg-white text-primary hover:bg-gray-100 font-medium py-3 px-8 rounded-full transition-colors">
            Explore Categories
            <FaArrowRight className="ml-2" />
          </Link>
        </div>
      </section>
    </>
  );
}