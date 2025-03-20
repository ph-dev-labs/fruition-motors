"use client";

import React, { useState, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Car as CarIcon,
  DollarSign,
  Package,
  Settings,
  Search,
  AlertCircle,
  Loader2,
} from "lucide-react";
import axios from "../../../../libs/axios";
import { Outfit } from "next/font/google";
import getSymbolFromCurrency from "currency-symbol-map";
import Navigation from "../components/Navigation";
import StatsCard from "../components/statsCard";
import CarList from "../components/carList";

const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
});

function AdminDashboard() {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [visibleCarsCount, setVisibleCarsCount] = useState(10); // Initial number of cars to display

  const {
    data: response,
    isLoading: carsLoading,
    error: carsError,
  } = useQuery({
    queryKey: ["cars"],
    queryFn: async () => {
      const response = await axios.get("/cars");
      return response.data.cars;
    },
  });

  const {
    data: featuredResponse,
    isLoading: featuredCarsLoading,
    error: featuredCarsError,
  } = useQuery({
    queryKey: ["featuredListing"],
    queryFn: async () => {
      const response = await axios.get("/carlisting");
      return response.data.cars;
    },
  });

  const {
    data: categories,
    isLoading: categoriesLoading,
    error: categoriesError,
  } = useQuery({
    queryKey: ["allCategories"],
    queryFn: async () => {
      const response = await axios.get("/getCategory");
      return response.data?.category || [];
    },
  });

  const cars = useMemo(() => (Array.isArray(response) ? response : []), [response]);

  const stats = useMemo(() => {
    const uniqueBrands = new Set(cars.map((car) => car.brand_name));
    const totalPrice = cars.reduce((acc, car) => acc + car.price, 0);
    const averagePrice = cars.length ? Math.round(totalPrice / cars.length) : 0;

    return [
      {
        title: "Total Cars",
        value: cars.length,
        icon: CarIcon,
        color: "primary",
      },
      {
        title: "Total Brands",
        value: uniqueBrands.size,
        icon: Package,
        color: "success",
      },
      {
        title: "Categories",
        value: categories?.length || 0,
        icon: Settings,
        color: "info",
      },
      {
        title: "Average Price",
        value: `${getSymbolFromCurrency("NGN")}${averagePrice.toLocaleString()}`,
        icon: DollarSign,
        color: "warning",
      },
    ];
  }, [cars, categories]);

  const filteredCars = useMemo(() => {
    return cars.filter((car) => {
      const matchesSearch =
        car.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        car.brand_name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filter === "all" || car.category === filter;
      return matchesSearch && matchesFilter;
    });
  }, [cars, searchTerm, filter]);

  const deleteCarMutation = useMutation({
    mutationFn: async (id) => {
      const response = await axios.delete(`/deleteCar?id=${id}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cars"] });
    },
  });

  const deleteFeaturedCarMutation = useMutation({
    mutationFn: async (id) => {
      const response = await axios.delete(`/deleteCar?id=${id}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cars"] });
    },
  });

  const isLoading = carsLoading || categoriesLoading;
  const hasError = carsError || categoriesError || featuredCarsError;

  if (hasError) {
    return (
      <div className={`${outfit.className} bg-gray-100 min-h-screen p-4`}>
        <Navigation />
        <div className="max-w-7xl mx-auto mt-6">
          <div className="bg-red-100 text-red-800 p-4 rounded-lg flex items-center shadow-sm">
            <AlertCircle size={24} className="mr-3 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-lg">Error Loading Data</h3>
              <p>Unable to load dashboard data. Please refresh or try again later.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`${outfit.className} bg-gray-100 min-h-screen`}>
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Dashboard Overview</h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <StatsCard key={index} {...stat} isLoading={isLoading} />
          ))}
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-4 sm:p-6 border-b">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <h2 className="text-xl font-semibold text-gray-900">Car Listings</h2>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                    <Search size={16} />
                  </span>
                  <input
                    type="text"
                    placeholder="Search cars..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 w-full sm:w-auto border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  />
                </div>
                
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  disabled={categoriesLoading}
                  className="border rounded-md py-2 px-4 focus:ring-2 focus:ring-blue-500 transition-colors"
                >
                  <option value="all">All Categories</option>
                  {categories?.map((category, index) => (
                    <option key={index} value={category?.name}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          
          <div className="p-4 sm:p-6">
            {isLoading ? (
              <div className="flex justify-center items-center py-12">
                <Loader2 size={36} className="animate-spin text-blue-500" />
                <span className="ml-3 text-gray-600 font-medium">Loading data...</span>
              </div>
            ) : filteredCars.length === 0 ? (
              <div className="bg-blue-50 text-blue-700 p-4 rounded-md flex items-center justify-center">
                <AlertCircle size={20} className="mr-2 flex-shrink-0" />
                <span>No cars found matching your search criteria.</span>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <CarList
                  cars={filteredCars.slice(0, visibleCarsCount)} // Show only the visible cars
                  onDelete={deleteCarMutation.mutateAsync}
                  isDeleting={deleteCarMutation.isPending}
                />
                {visibleCarsCount < filteredCars.length && (
                  <div className="flex justify-center mt-4">
                    <button
                      onClick={() => setVisibleCarsCount((prev) => prev + 10)} // Load 10 more cars
                      className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
                    >
                      Load More
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Featured Listings Section */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mt-8">
          <div className="p-4 sm:p-6 border-b">
            <h2 className="text-xl font-semibold text-gray-900">Featured Listings</h2>
          </div>
          
          <div className="p-4 sm:p-6">
            {featuredCarsLoading ? (
              <div className="flex justify-center items-center py-12">
                <Loader2 size={36} className="animate-spin text-blue-500" />
                <span className="ml-3 text-gray-600 font-medium">Loading data...</span>
              </div>
            ) : featuredResponse.length === 0 ? (
              <div className="bg-blue-50 text-blue-700 p-4 rounded-md flex items-center justify-center">
                <AlertCircle size={20} className="mr-2 flex-shrink-0" />
                <span>No featured cars available.</span>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <CarList
                  cars={featuredResponse}
                  onDelete={deleteCarMutation.mutateAsync}
                  isDeleting={deleteCarMutation.isPending}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;