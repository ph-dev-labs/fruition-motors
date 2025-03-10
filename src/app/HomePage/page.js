"use client"
import { useCars, useGetFeaturedListing } from '../../hooks/useGetCars';
import Hero from '../../components/Hero';
import FeaturedCars from '../../components/featuredCar';
import Link from 'next/link';
import { FaArrowRight, FaCheckCircle, FaCar } from 'react-icons/fa';
import Loader from '../../components/loader';
import Layout from '../../components/layout';
import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../../libs/axios'; // Ensure axiosInstance is imported
import Image from 'next/image'; // Import Image from next/image

export default function HomePage() {
  const { data, isLoading, isError, error } = useGetFeaturedListing();
  const {
    data: catData,
    isLoading: catLoading,
    error: catError,
  } = useQuery({
    queryKey: ["allCategories"],
    queryFn: async () => {
      const response = await axiosInstance.get("/getCategory");
      return response?.data.category; // Ensure this matches your API response structure
    },
  });

  if (isLoading || catLoading) {
    return <Loader />; // Show a loading state
  }

  if (error || catError) {
    return <div>Error: {error?.message || catError.message}</div>; // Show an error message
  }

  return (
    <Layout>
      {/* Hero Section */}
      <Hero />
      
      {/* Featured Cars Section */}
      <FeaturedCars cars={data.cars} />
      
      {/* Why Choose Us Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Why Choose Fruition Motors</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              We provide an exceptional car buying experience with features you will love
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

      {/* Categories Section */}
     {/* Categories Section */}
<section className="py-16 bg-gray-50">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center mb-12">
      <h2 className="text-3xl font-bold text-gray-900">Explore Our Categories</h2>
      <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
        Discover the perfect vehicle for your needs from our diverse categories.
      </p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {catData && catData.length > 0 ? (
        catData.map((category) => (
          <div 
            key={category?.name} 
            className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl"
          >
            <Link href={`/category/${category._id || category.name}/category-details`} className="block">
              <div className="relative h-60">
                <Image 
                  src={category.image || "https://images.unsplash.com/photo-1556189250-72ba954cfc2b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} 
                  alt={category.name} 
                  width={500} 
                  height={300} 
                  className="w-full h-full object-cover" 
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-4 w-full">
                  <span className="inline-block px-3 py-1 bg-primary text-white text-sm font-medium rounded-full mb-2">
                    {category.count || "0"} vehicles
                  </span>
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{category.name}</h3>
                <p className="text-gray-600 mb-4">
                  {category.description || `Explore our collection of premium ${category.name} vehicles.`}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-primary font-medium">View Collection</span>
                  <FaArrowRight className="text-primary" />
                </div>
              </div>
            </Link>
          </div>
        ))
      ) : (
        <div className="text-center col-span-full py-12">
          <p className="text-gray-600 text-lg">No categories available at the moment.</p>
          <button className="mt-4 bg-primary text-white px-6 py-2 rounded-md hover:bg-primary/90 transition">
            Check Back Soon
          </button>
        </div>
      )}
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
    </Layout>
  );
}