"use client";

import React, { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  User,
  Phone,
  Mail,
  Car,
  Package,
  Calendar,
  Settings,
  Palette,
  CheckCircle,
  FileText,
  Search,
  AlertCircle,
  Loader2,
  ChevronRight,
  Eye
} from "lucide-react";
import axios from "../../../../libs/axios";
import { Outfit } from "next/font/google";
import Navigation from "../components/Navigation";

const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
});

// This is the custom hook from your example
const useGetCustomerOrder = () => {
  return useQuery({
    queryKey: [`customOrder`],
    queryFn: async () => {
      const { data } = await axios.get('/getCustom');
      return data;
    },
  });
};


export default function CustomerOrdersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [visibleOrdersCount, setVisibleOrdersCount] = useState(10);

  const {
    data: response,
    isLoading,
    error,
  } = useGetCustomerOrder();


  // Safely handle the data from the API
  const customerOrders = useMemo(() => {
    if (!response || !response.cars) return [];
    return Array.isArray(response.cars) ? response.cars : [];
  }, [response]);

  // Filter orders based on search term
  const filteredOrders = useMemo(() => {
    return customerOrders.filter((order) => {
      return (
        order.fullname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.make?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.model?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.email?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
  }, [customerOrders, searchTerm]);

  // Calculate statistics for dashboard cards
  const stats = useMemo(() => {
    const uniqueMakes = new Set(customerOrders.map(order => order.make).filter(Boolean));
    const uniqueModels = new Set(customerOrders.map(order => order.model).filter(Boolean));
    const uniqueYears = new Set(customerOrders.map(order => order.year).filter(Boolean));

    return [
      {
        title: "Total Orders",
        value: customerOrders.length,
        icon: Car,
        color: "blue",
      },
      {
        title: "Unique Makes",
        value: uniqueMakes.size,
        icon: Package,
        color: "green",
      },
      {
        title: "Unique Models",
        value: uniqueModels.size,
        icon: Settings,
        color: "purple",
      },
      {
        title: "Year Range",
        value: uniqueYears.size > 0 ? 
               `${Math.min(...uniqueYears)}-${Math.max(...uniqueYears)}` : 
               "N/A",
        icon: Calendar,
        color: "orange",
      }
    ];
  }, [customerOrders]);

  if (error) {
    return (
      <div className={`${outfit.className} bg-gray-100 min-h-screen p-4`}>
        <Navigation />
        <div className="max-w-7xl mx-auto mt-6">
          <div className="bg-red-100 text-red-800 p-4 rounded-lg flex items-center shadow-sm">
            <AlertCircle size={24} className="mr-3 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-lg">Error Loading Data</h3>
              <p>Unable to load customer orders. Please refresh or try again later.</p>
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
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Customer Orders</h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className={`bg-white p-5 rounded-lg shadow-md flex items-center border-l-4 border-${stat.color}-500`}
            >
              <div className={`p-3 rounded-full bg-${stat.color}-100 text-${stat.color}-600`}>
                <stat.icon size={20} />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {isLoading ? (
                    <span className="inline-block w-12 h-6 bg-gray-200 animate-pulse rounded"></span>
                  ) : (
                    stat.value
                  )}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-4 sm:p-6 border-b">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <h2 className="text-xl font-semibold text-gray-900">Custom Car Orders</h2>
              
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                  <Search size={16} />
                </span>
                <input
                  type="text"
                  placeholder="Search orders..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full sm:w-auto border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
              </div>
            </div>
          </div>
          
          <div className="p-4 sm:p-6">
            {isLoading ? (
              <div className="flex justify-center items-center py-12">
                <Loader2 size={36} className="animate-spin text-blue-500" />
                <span className="ml-3 text-gray-600 font-medium">Loading orders...</span>
              </div>
            ) : filteredOrders.length === 0 ? (
              <div className="bg-blue-50 text-blue-700 p-4 rounded-md flex items-center justify-center">
                <AlertCircle size={20} className="mr-2 flex-shrink-0" />
                <span>No customer orders found matching your search criteria.</span>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vehicle</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Specifications</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Condition</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredOrders.slice(0, visibleOrdersCount).map((order, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="flex flex-col">
                            <div className="flex items-center">
                              <User className="text-gray-400 mr-2" size={16} />
                              <span className="font-medium text-gray-900">{order.fullname}</span>
                            </div>
                            <div className="flex items-center mt-1">
                              <Mail className="text-gray-400 mr-2" size={14} />
                              <span className="text-sm text-gray-500">{order.email}</span>
                            </div>
                            <div className="flex items-center mt-1">
                              <Phone className="text-gray-400 mr-2" size={14} />
                              <span className="text-sm text-gray-500">{order.phone}</span>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-col">
                            <div className="flex items-center">
                              <Car className="text-gray-400 mr-2" size={16} />
                              <span className="font-medium text-gray-900">{order.make} {order.model}</span>
                            </div>
                            <div className="flex items-center mt-1">
                              <Calendar className="text-gray-400 mr-2" size={14} />
                              <span className="text-sm text-gray-500">Year: {order.year}</span>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-col">
                            <div className="flex items-center">
                              <Settings className="text-gray-400 mr-2" size={16} />
                              <span className="text-sm text-gray-700">{order.transmission}</span>
                            </div>
                            <div className="flex items-center mt-1">
                              <Palette className="text-gray-400 mr-2" size={14} />
                              <span className="text-sm text-gray-700">Color: {order.color}</span>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <div className={`
                              p-1.5 rounded-full mr-2
                              ${order.condition?.toLowerCase() === 'excellent' ? 'bg-green-100' : 
                                order.condition?.toLowerCase() === 'good' ? 'bg-blue-100' : 
                                order.condition?.toLowerCase() === 'fair' ? 'bg-yellow-100' : 'bg-gray-100'}
                            `}>
                              <CheckCircle className={`
                                ${order.condition?.toLowerCase() === 'excellent' ? 'text-green-600' : 
                                  order.condition?.toLowerCase() === 'good' ? 'text-blue-600' : 
                                  order.condition?.toLowerCase() === 'fair' ? 'text-yellow-600' : 'text-gray-600'}
                              `} size={14} />
                            </div>
                            <span className="text-sm font-medium text-gray-700">{order.condition}</span>
                          </div>
                          {order.details && (
                            <div className="mt-2 text-xs text-gray-500 max-w-xs truncate">
                              <FileText className="inline text-gray-400 mr-1" size={12} />
                              {order.details}
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <button className="inline-flex items-center justify-center p-2 bg-blue-50 text-blue-700 rounded-full hover:bg-blue-100 transition-colors">
                            <Eye size={18} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                
                {visibleOrdersCount < filteredOrders.length && (
                  <div className="flex justify-center mt-6">
                    <button
                      onClick={() => setVisibleOrdersCount(prev => prev + 10)}
                      className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors flex items-center"
                    >
                      Load More
                      <ChevronRight size={16} className="ml-1" />
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        
        {/* Empty state for when there are no orders */}
        {!isLoading && customerOrders.length === 0 && (
          <div className="mt-8 bg-white rounded-lg shadow-md p-8 text-center">
            <Car size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Customer Orders Yet</h3>
            <p className="text-gray-500 max-w-md mx-auto">
              When customers submit custom order requests, they will appear here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}