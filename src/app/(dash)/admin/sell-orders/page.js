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
  DollarSign,
  MapPin,
  Palette,
  CheckCircle,
  FileText,
  Search,
  AlertCircle,
  Loader2,
  ChevronRight,
  Eye,
  X
} from "lucide-react";
import axios from "../../../../libs/axios";
import { Outfit } from "next/font/google";
import Navigation from "../components/Navigation";

const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
});

// Custom hook for fetching sell orders
const useGetSellOrder = () => {
  return useQuery({
    queryKey: [`sellOrder`],
    queryFn: async () => {
      const { data } = await axios.get('/getSell');
      return data;
    },
  });
};

export default function SellOrdersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [visibleOrdersCount, setVisibleOrdersCount] = useState(10);
  const [selectedImages, setSelectedImages] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const {
    data: response,
    isLoading,
    error,
  } = useGetSellOrder();

  // Safely handle the data from the API
  const sellOrders = useMemo(() => {
    if (!response || !response.cars) return [];
    
    // Process each car to parse the JSON images string
    return Array.isArray(response.cars) ? response.cars.map(car => {
      // Parse the images JSON string if it exists
      let parsedImages = [];
      if (car.images) {
        try {
          // Handle the escaped JSON string format in the API response
          const cleanedJson = car.images.replace(/\\\//g, "/");
          parsedImages = JSON.parse(cleanedJson);
        } catch (e) {
          console.error("Error parsing images for car:", car.id, e);
        }
      }
      
      return {
        ...car,
        parsedImages
      };
    }) : [];
  }, [response]);

  // Filter orders based on search term
  const filteredOrders = useMemo(() => {
    return sellOrders.filter((order) => {
      return (
        order.fullname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.make?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.model?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.location?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
  }, [sellOrders, searchTerm]);

  // Calculate statistics for dashboard cards
  const stats = useMemo(() => {
    const uniqueMakes = new Set(sellOrders.map(order => order.make).filter(Boolean));
    const uniqueModels = new Set(sellOrders.map(order => order.model).filter(Boolean));
    const priceArray = sellOrders.map(order => parseFloat(order.price)).filter(price => !isNaN(price));
    const uniqueLocations = new Set(sellOrders.map(order => order.location).filter(Boolean));

    return [
      {
        title: "Total Listings",
        value: sellOrders.length,
        icon: Car,
        color: "blue",
      },
      {
        title: "Avg. Price",
        value: priceArray.length > 0 ? 
               `₦${(priceArray.reduce((a, b) => a + b, 0) / priceArray.length).toLocaleString(undefined, { maximumFractionDigits: 0 })}` : 
               "N/A",
        icon: DollarSign,
        color: "green",
      },
      {
        title: "Unique Makes",
        value: uniqueMakes.size,
        icon: Package,
        color: "purple",
      },
      {
        title: "Locations",
        value: uniqueLocations.size,
        icon: MapPin,
        color: "orange",
      }
    ];
  }, [sellOrders]);

  const openImageModal = (order) => {
    if (order.parsedImages && order.parsedImages.length > 0) {
      setSelectedImages(order.parsedImages);
      setSelectedOrder(order);
      setCurrentImageIndex(0);
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImages([]);
    setSelectedOrder(null);
  };

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === selectedImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? selectedImages.length - 1 : prevIndex - 1
    );
  };

  // Function to get condition-based color styling
  const getConditionStyle = (condition) => {
    const conditionLower = condition?.toLowerCase();
    
    if (conditionLower === 'excellent') {
      return {
        bgColor: 'bg-green-100',
        textColor: 'text-green-600'
      };
    } else if (conditionLower === 'good') {
      return {
        bgColor: 'bg-blue-100',
        textColor: 'text-blue-600'
      };
    } else if (conditionLower === 'fair') {
      return {
        bgColor: 'bg-yellow-100',
        textColor: 'text-yellow-600'
      };
    } else if (conditionLower === 'brand new') {
      return {
        bgColor: 'bg-purple-100',
        textColor: 'text-purple-600'
      };
    } else {
      return {
        bgColor: 'bg-gray-100',
        textColor: 'text-gray-600'
      };
    }
  };

  if (error) {
    return (
      <div className={`${outfit.className} bg-gray-100 min-h-screen p-4`}>
        <Navigation />
        <div className="max-w-7xl mx-auto mt-6">
          <div className="bg-red-100 text-red-800 p-4 rounded-lg flex items-center shadow-sm">
            <AlertCircle size={24} className="mr-3 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-lg">Error Loading Data</h3>
              <p>Unable to load sell orders. Please refresh or try again later.</p>
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
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Sell Orders</h1>
        
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
              <h2 className="text-xl font-semibold text-gray-900">Vehicles For Sale</h2>
              
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                  <Search size={16} />
                </span>
                <input
                  type="text"
                  placeholder="Search listings..."
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
                <span className="ml-3 text-gray-600 font-medium">Loading sell orders...</span>
              </div>
            ) : filteredOrders.length === 0 ? (
              <div className="bg-blue-50 text-blue-700 p-4 rounded-md flex items-center justify-center">
                <AlertCircle size={20} className="mr-2 flex-shrink-0" />
                <span>No sell orders found matching your search criteria.</span>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Seller</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vehicle</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price & Location</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Images</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredOrders.slice(0, visibleOrdersCount).map((order, index) => {
                      const conditionStyle = getConditionStyle(order.condition);
                      
                      return (
                        <tr key={order.id || index} className="hover:bg-gray-50">
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
                              <div className="flex items-center mt-1">
                                <Palette className="text-gray-400 mr-2" size={14} />
                                <span className="text-sm text-gray-500">Color: {order.color}</span>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex flex-col">
                              <div className="flex items-center">
                                <div className={`p-1.5 rounded-full mr-2 ${conditionStyle.bgColor}`}>
                                  <CheckCircle className={conditionStyle.textColor} size={14} />
                                </div>
                                <span className="text-sm font-medium text-gray-700">{order.condition}</span>
                              </div>
                              <div className="flex items-center mt-1">
                                <FileText className="text-gray-400 mr-2" size={14} />
                                <span className="text-sm text-gray-500">
                                  {order.transmission}
                                </span>
                              </div>
                              {order.description && (
                                <div className="mt-2 text-xs text-gray-500 max-w-xs truncate">
                                  <FileText className="inline text-gray-400 mr-1" size={12} />
                                  {order.description}
                                </div>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex flex-col">
                              <div className="flex items-center">
                                <DollarSign className="text-gray-400 mr-2" size={16} />
                                <span className="font-medium text-gray-900">₦{parseFloat(order.price).toLocaleString()}</span>
                              </div>
                              <div className="flex items-center mt-1">
                                <MapPin className="text-gray-400 mr-2" size={14} />
                                <span className="text-sm text-gray-500">{order.location}</span>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {order.parsedImages && order.parsedImages.length > 0 ? (
                              <button 
                                onClick={() => openImageModal(order)}
                                className="inline-flex items-center justify-center p-2 bg-blue-50 text-blue-700 rounded-full hover:bg-blue-100 transition-colors"
                              >
                                <Eye size={18} />
                              </button>
                            ) : (
                              <span className="text-xs text-gray-400">No images</span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
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
        {!isLoading && sellOrders.length === 0 && (
          <div className="mt-8 bg-white rounded-lg shadow-md p-8 text-center">
            <Car size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Sell Orders Yet</h3>
            <p className="text-gray-500 max-w-md mx-auto">
              When sellers list their vehicles for sale, they will appear here.
            </p>
          </div>
        )}
      </div>

      {/* Image Modal */}
      {isModalOpen && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-full overflow-auto">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-xl font-semibold">{selectedOrder.make} {selectedOrder.model} ({selectedOrder.year})</h3>
              <button 
                onClick={closeModal}
                className="p-1 rounded-full hover:bg-gray-100"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="p-4">
              <div className="relative">
                <img 
                  src={selectedImages[currentImageIndex]} 
                  alt={`${selectedOrder.make} ${selectedOrder.model}`}
                  className="w-full h-auto max-h-96 object-contain rounded-md"
                />
                
                {selectedImages.length > 1 && (
                  <>
                    <button 
                      onClick={prevImage}
                      className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-40 hover:bg-opacity-60 text-white p-2 rounded-full"
                    >
                      <ChevronRight className="rotate-180" size={20} />
                    </button>
                    <button 
                      onClick={nextImage}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-40 hover:bg-opacity-60 text-white p-2 rounded-full"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </>
                )}
                
                {selectedImages.length > 1 && (
                  <div className="mt-4 flex justify-center gap-2">
                    {selectedImages.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentImageIndex(idx)}
                        className={`w-3 h-3 rounded-full ${
                          currentImageIndex === idx ? 'bg-blue-600' : 'bg-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>
              
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-lg mb-2">Vehicle Details</h4>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Car className="text-gray-400 mr-2" size={16} />
                      <span className="text-gray-700">{selectedOrder.make} {selectedOrder.model}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="text-gray-400 mr-2" size={16} />
                      <span className="text-gray-700">Year: {selectedOrder.year}</span>
                    </div>
                    <div className="flex items-center">
                      <Palette className="text-gray-400 mr-2" size={16} />
                      <span className="text-gray-700">Color: {selectedOrder.color}</span>
                    </div>
                    <div className="flex items-center">
                      <FileText className="text-gray-400 mr-2" size={16} />
                      <span className="text-gray-700">Transmission: {selectedOrder.transmission}</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="text-gray-400 mr-2" size={16} />
                      <span className="text-gray-700">Condition: {selectedOrder.condition}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-lg mb-2">Seller Information</h4>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <User className="text-gray-400 mr-2" size={16} />
                      <span className="text-gray-700">{selectedOrder.fullname}</span>
                    </div>
                    <div className="flex items-center">
                      <Mail className="text-gray-400 mr-2" size={16} />
                      <span className="text-gray-700">{selectedOrder.email}</span>
                    </div>
                    <div className="flex items-center">
                      <Phone className="text-gray-400 mr-2" size={16} />
                      <span className="text-gray-700">{selectedOrder.phone}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="text-gray-400 mr-2" size={16} />
                      <span className="text-gray-700">{selectedOrder.location}</span>
                    </div>
                    <div className="flex items-center">
                      <DollarSign className="text-gray-400 mr-2" size={16} />
                      <span className="text-gray-700 font-bold">₦{parseFloat(selectedOrder.price).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {selectedOrder.description && (
                <div className="mt-6">
                  <h4 className="font-medium text-lg mb-2">Description</h4>
                  <p className="text-gray-600">{selectedOrder.description}</p>
                </div>
              )}
            </div>
            
            <div className="flex justify-end p-4 border-t">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors mr-2"
              >
                Close
              </button>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
              >
                Contact Seller
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}