"use client";
import React, { useState, useEffect } from "react";
import { Package, Calendar, Fuel, Trash2, Edit2, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import getSymbolFromCurrency from "currency-symbol-map";
import { useRouter } from "next/navigation";
import Image from "next/image";

const CarList = ({ cars, onDelete, isDeleting }) => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [deletingId, setDeletingId] = useState(null);
  const [isImageLoading, setIsImageLoading] = useState({});
  const itemsPerPage = 6;

  // Reset to first page when cars array changes
  useEffect(() => {
    setCurrentPage(1);
  }, [cars.length]);

  console.log(cars)

  // Calculate pagination values
  const indexOfLastCar = currentPage * itemsPerPage;
  const indexOfFirstCar = indexOfLastCar - itemsPerPage;
  const currentCars = cars.slice(indexOfFirstCar, indexOfLastCar);
  const totalPages = Math.ceil(cars.length / itemsPerPage);

  const handleEdit = (carId) => {
    router.push(`add-car/${carId}`);
  };

  const handleDelete = async (carId) => {
    try {
      setDeletingId(carId);
      await onDelete(carId);
    } finally {
      setDeletingId(null);
    }
  };

  // Handle page changes
  const handlePageChange = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Handle image loading state
  const handleImageLoad = (carId) => {
    setIsImageLoading(prev => ({...prev, [carId]: false}));
  };

  const handleImageError = (carId) => {
    setIsImageLoading(prev => ({...prev, [carId]: false}));
  };

  // Format price with commas
  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  // Generate pagination controls
  const renderPagination = () => {
    // For small number of pages, show all
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1).map(renderPageButton);
    }
    
    // For many pages, show smart navigation with ellipses
    const pages = [];
    
    // Always show first page
    pages.push(renderPageButton(1));
    
    // Handle ellipsis and middle pages
    if (currentPage <= 3) {
      // Near start: show 2, 3, 4, then ellipsis
      [2, 3, 4].forEach(p => p <= totalPages && pages.push(renderPageButton(p)));
      if (totalPages > 5) pages.push(<span key="ellipsis1" className="mx-1">...</span>);
    } else if (currentPage >= totalPages - 2) {
      // Near end: show ellipsis, then last 3 pages before the final page
      if (totalPages > 5) pages.push(<span key="ellipsis1" className="mx-1">...</span>);
      [totalPages - 3, totalPages - 2, totalPages - 1].forEach(p => p > 1 && pages.push(renderPageButton(p)));
    } else {
      // Middle: show ellipsis, currentPage and its neighbors, then ellipsis
      pages.push(<span key="ellipsis1" className="mx-1">...</span>);
      [currentPage - 1, currentPage, currentPage + 1].forEach(p => pages.push(renderPageButton(p)));
      pages.push(<span key="ellipsis2" className="mx-1">...</span>);
    }
    
    // Always show last page if not already included
    if (totalPages > 1) {
      pages.push(renderPageButton(totalPages));
    }
    
    return pages;
  };

  // Render individual page button
  const renderPageButton = (number) => (
    <button
      key={number}
      aria-label={`Go to page ${number}`}
      aria-current={number === currentPage ? "page" : undefined}
      className={`
        flex items-center justify-center min-w-9 h-9 mx-0.5 rounded focus:outline-none focus:ring-2 focus:ring-blue-500
        ${number === currentPage 
          ? 'bg-blue-600 text-white font-medium' 
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors'}
      `}
      onClick={() => handlePageChange(number)}
    >
      {number}
    </button>
  );

  // Render skeleton loader
  const renderSkeleton = () => (
    <div className="h-full border rounded-lg shadow-sm bg-white overflow-hidden animate-pulse">
      <div className="w-full h-48 bg-gray-200"></div>
      <div className="p-4">
        <div className="flex justify-between">
          <div className="h-5 bg-gray-200 rounded w-1/2"></div>
          <div className="h-5 bg-gray-200 rounded w-1/4"></div>
        </div>
        <div className="mt-3 space-y-2">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
        </div>
        <div className="flex gap-2 mt-4">
          <div className="h-10 bg-gray-200 rounded w-1/2"></div>
          <div className="h-10 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col gap-6">
      {cars.length === 0 ? (
        <div className="bg-blue-50 text-blue-700 p-4 rounded-md text-center">
          No cars found. Try adjusting your search or filters.
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentCars.map((car) => (
              <div 
                key={car.id} 
                className="h-full border rounded-lg shadow-sm bg-white overflow-hidden hover:shadow-md transition-shadow duration-200"
              >
                <div className="relative">
                  <div className="w-full h-48 bg-gray-100 relative">
                    {!car.image_url ? (
                      <div className="absolute inset-0 flex items-center justify-center bg-gray-100 text-gray-400">
                        No Image Available
                      </div>
                    ) : (
                      <>
                        {isImageLoading[car.id] !== false && (
                          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                            <Loader2 className="h-8 w-8 text-gray-400 animate-spin" />
                          </div>
                        )}
                        <img
                          src={car.image_url}
                          alt={car.title}
                          className={`w-full h-full object-cover ${isImageLoading[car.id] !== false ? 'opacity-0' : 'opacity-100'}`}
                          onLoad={() => handleImageLoad(car.id)}
                          onError={() => handleImageError(car.id)}
                        />
                      </>
                    )}
                  </div>
                  <div className="absolute top-2 right-2 bg-blue-600 text-white px-2 py-1 rounded-md text-sm font-medium shadow-sm">
                    {car.category}
                  </div>
                </div>
                
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-gray-900 line-clamp-2">{car.title}</h3>
                    <span className="bg-green-600 text-white px-2 py-1 rounded-md text-sm font-medium whitespace-nowrap ml-2">
                      {getSymbolFromCurrency("NGN")}
                      {formatPrice(car.price)}
                    </span>
                  </div>
                  
                  <div className="text-gray-600 space-y-1 mb-4">
                    <div className="flex items-center gap-2">
                      <Package size={16} className="text-gray-500" /> 
                      <span>{car.brand_name} {car.model}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar size={16} className="text-gray-500" /> 
                      <span>{car.year}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Fuel size={16} className="text-gray-500" /> 
                      <span>{car.fuel_type}</span>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 mt-auto">
                    <button
                      className="flex-1 flex items-center justify-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
                      onClick={() => car.id && handleEdit(car.id)}
                      aria-label={`Edit ${car.title}`}
                    >
                      <Edit2 size={16} />
                      <span>Edit</span>
                    </button>
                    <button
                      className="flex-1 flex items-center justify-center gap-1 bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1 disabled:opacity-60 disabled:cursor-not-allowed"
                      onClick={() => car.id && handleDelete(car.id)}
                      disabled={isDeleting}
                      aria-label={`Delete ${car.title}`}
                    >
                      {isDeleting && deletingId === car.id ? (
                        <>
                          <Loader2 size={16} className="animate-spin" />
                          <span>Deleting...</span>
                        </>
                      ) : (
                        <>
                          <Trash2 size={16} />
                          <span>Delete</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-4 border-t pt-4">
              <div className="text-sm text-gray-600">
                Showing <span className="font-medium">{indexOfFirstCar + 1}</span> to <span className="font-medium">{Math.min(indexOfLastCar, cars.length)}</span> of <span className="font-medium">{cars.length}</span> cars
              </div>
              
              <div className="flex items-center">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  aria-label="Previous page"
                  className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft size={20} />
                </button>
                
                <div className="flex items-center">
                  {renderPagination()}
                </div>
                
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  aria-label="Next page"
                  className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CarList;