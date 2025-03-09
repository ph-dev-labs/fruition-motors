"use client";
import CarCard from '../../../../components/carCard';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { FaArrowLeft } from 'react-icons/fa';
import Loader from '../../../../components/loader';
import { useParams } from 'next/navigation';
import Layout from '../../../../components/layout';
import { useGetCarsByCategory } from '../../../../hooks/useGetCars'; // Adjust the import based on your project structure

export default function CategoryDetail() {
  const params = useParams();
  const { slug } = params;
  const category = slug;

  // Handle case when category is undefined during SSR
  if (!category) {
    return <Loader />;
  }

  // Fetch cars by category using the custom hook
  const { data: response, isLoading, error } = useGetCarsByCategory(category);

  // Ensure cars is an array
  const cars = response?.cat ? [response.cat] : []; // Convert the car object to an array

  const getCategoryDescription = (cat) => {
    const descriptions = {
      sedan: "Elegant and comfortable sedans perfect for everyday driving and long trips.",
      suv: "Spacious and versatile SUVs with ample cargo space and commanding road presence.",
      electric: "Eco-friendly electric vehicles with cutting-edge technology and zero emissions.",
      hybrid: "Efficient hybrid vehicles combining gasoline and electric power for optimal performance.",
      coupe: "Sleek and sporty coupes offering thrilling driving experiences and head-turning design.",
      truck: "Robust and powerful trucks built for work and adventure.",
    };

    return descriptions[cat.toLowerCase()] || `Our collection of ${cat} vehicles.`;
  };

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <div>Error loading cars: {error.message}</div>;
  }

  return (
    <Layout>
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <Link href="/category" className="inline-flex items-center text-primary font-medium hover:underline">
              <FaArrowLeft className="mr-2" /> Back to Categories
            </Link>
          </div>
          
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-gray-900 capitalize">{category} Vehicles</h1>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              {getCategoryDescription(category)}
            </p>
          </div>
          
          {cars.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {cars.map(car => (
                <CarCard key={car.id} car={car} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">No cars found in this category</h3>
              <p className="text-gray-600 mb-8">Please check back later or browse other categories</p>
              <Link href="/category" className="bg-primary hover:bg-primary-dark text-white font-medium py-3 px-6 rounded-full transition-colors">
                Browse All Categories
              </Link>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}