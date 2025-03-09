"use client";
import Link from 'next/link';
import { FaCar, FaTruck, FaBolt, FaMotorcycle, FaBus, FaBicycle, } from 'react-icons/fa';
import { useQuery } from '@tanstack/react-query';
import Loader from './loader';
import axios from '../libs/axios';

const CategoryList = () => {
  const {
    data,
    isLoading: catLoading,
    error: catError,
  } = useQuery({
    queryKey: ["allCategories"],
    queryFn: async () => {
      const response = await axios.get("/getCategory");
      return response?.data.category; // Ensure this matches your API response structure
    },
  });

  

  if (catLoading) {
    return <Loader />;
  }

  if (catError) {
    return <div>Error loading categories: {catError.message}</div>;
  }

  if (!data || !Array.isArray(data)) {
    return <div>No categories found.</div>;
  }

  const getCategoryIcon = (category) => {
    switch (category?.name.toLowerCase()) {
      case 'sedan':
        return <FaCar className="h-10 w-10 text-primary" />;
      case 'suv':
        return <FaTruck className="h-10 w-10 text-primary" />;
      case 'electric':
        return <FaBolt className="h-10 w-10 text-primary" />;
      case 'motorcycle':
        return <FaMotorcycle className="h-10 w-10 text-primary" />;
      case 'bus':
        return <FaBus className="h-10 w-10 text-primary" />;
      case 'bicycle':
        return <FaBicycle className="h-10 w-10 text-primary" />;
      case 'van':
        return <FaVan className="h-10 w-10 text-primary" />;
      // Add more cases for other categories as needed
      default:
        return <FaCar className="h-10 w-10 text-primary" />; // Default icon
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {data.map((category, index) => (
        <Link 
          key={index} 
          href={`/category/${category.name.toLowerCase()}/category-details`}
          className="bg-white rounded-lg shadow-md p-6 text-center transition-transform hover:-translate-y-1 hover:shadow-lg"
          aria-label={`Explore ${category.name} collection`}
        >
          <div className="flex justify-center mb-4">
            {getCategoryIcon(category)}
          </div>
          <h3 className="text-xl font-bold capitalize">{category.name}</h3>
          <p className="text-gray-600 mt-2">Explore our {category.name} collection</p>
        </Link>
      ))}
    </div>
  );
};

export default CategoryList;