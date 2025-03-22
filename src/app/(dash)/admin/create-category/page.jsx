"use client";

import React, { useState } from "react";
import { Settings2, AlertCircle, Check, Image, Upload, Trash2, Search, RefreshCw, Loader } from "lucide-react";
import { Outfit } from "next/font/google";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import axios from "../../../../libs/axios";
import toast from "react-hot-toast";
import Navigation from "../components/Navigation";
import { uploadToCloudinary } from "../../../../utils/cloudinary";

const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
});

function CreateCategoryPage() {
  const [categoryData, setCategoryData] = useState({ 
    categoryName: "",
    thumbnail: "" 
  });
  const [error, setError] = useState("");
  const [thumbnailError, setThumbnailError] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const queryClient = useQueryClient();

  // Fetch categories
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

  // Create category mutation
  const createCategoryMutation = useMutation({
    mutationFn: async (data) => {
      const response = await axios.post("/createCategory", data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allCategories"] });
      toast.success("Category created successfully!");
      setCategoryData({ name: "", thumbnail: "" }); // Reset form
      setSelectedFile(null);
      setError("");
      setThumbnailError("");
    },
    onError: (error) => {
      const errorMessage = error.response?.data?.message || error.message;
      toast.error(`Failed to create category: ${errorMessage}`);
      
      if (error.response?.data?.errors?.name) {
        setError(error.response.data.errors.name);
      }
      if (error.response?.data?.errors?.thumbnail) {
        setThumbnailError(error.response.data.errors.thumbnail);
      }
    },
  });

  // Delete category mutation
  const deleteCarMutation = useMutation({
    mutationFn: async (name) => {
      const response = await axios.delete(`/deleteCategory?name=${name}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allCategories"] });
      toast.success("Category deleted successfully!");
      setDeleteConfirmation(null);
    },
    onError: (error) => {
      const errorMessage = error.response?.data?.message || error.message;
      toast.error(`Failed to delete category: ${errorMessage}`);
    },
  });

  // Upload image mutation
  const uploadImageMutation = useMutation({
    mutationFn: async (file) => {
      setIsUploading(true);
      // Use the imported uploadToCloudinary function
      const imageUrl = await uploadToCloudinary(file);
      return imageUrl;
    },
    onSuccess: (imageUrl) => {
      setCategoryData(prev => ({
        ...prev,
        thumbnail: imageUrl
      }));
      toast.success("Thumbnail uploaded successfully!");
      setThumbnailError("");
    },
    onError: (error) => {
      toast.error("Failed to upload image. Please try again.");
      setThumbnailError("Failed to upload image");
      console.error("Upload error:", error);
    },
    onSettled: () => {
      setIsUploading(false);
    }
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCategoryData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError(""); // Clear error when user types
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      setThumbnailError("Please select a valid image (JPEG, PNG, or WebP)");
      return;
    }

    // Validate file size (max 2MB)
    if (file.size > 5 * 1024 * 1024) {
      setThumbnailError("Image size should be less than 2MB");
      return;
    }

    setSelectedFile(file);
    setThumbnailError("");
    
    // Automatically upload the file when selected
    uploadImageMutation.mutate(file);
  };

  const validateForm = () => {
    let isValid = true;
    
    if (!categoryData.categoryName.trim()) {
      setError("Category name is required");
      isValid = false;
    } else if (categoryData.categoryName.length < 2) {
      setError("Category name must be at least 2 characters long");
      isValid = false;
    }
    
    // Thumbnail is optional, but if upload is in progress, form is invalid
    if (isUploading) {
      setThumbnailError("Please wait for the image to upload");
      isValid = false;
    }
    
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      createCategoryMutation.mutate(categoryData);
    }
  };

  // Delete confirmation
  const confirmDelete = (category) => {
    setDeleteConfirmation(category);
  };

  // Execute deletion
  const handleDelete = () => {
    if (deleteConfirmation) {
      deleteCarMutation.mutate(deleteConfirmation.name);
    }
  };

  // Filter categories by search query
  const filteredCategories = categories ? categories.filter(category => 
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  ) : [];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navigation />
      
      <main className={`flex-grow p-4 ${outfit.className}`}>
        <div className="container mx-auto max-w-5xl">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Create Category Form */}
            <div className="bg-white shadow-lg rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
              {/* Header */}
              <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white py-4 px-6 rounded-t-lg">
                <h1 className="text-xl font-semibold flex items-center gap-2">
                  <Settings2 size={22} />
                  Create New Category
                </h1>
                <p className="text-blue-100 text-sm mt-1">
                  Add a new vehicle category to the management system
                </p>
              </div>

              {/* Form */}
              <div className="p-6">
                <form onSubmit={handleSubmit}>
                  {/* Category Name Field */}
                  <div className="mb-6">
                    <label className="block text-gray-700 font-medium mb-2 flex items-center gap-2">
                      <Settings2 size={18} /> 
                      Category Name
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="categoryName"
                        value={categoryData.categoryName}
                        onChange={handleInputChange}
                        placeholder="e.g., SUV, Sedan, Truck"
                        required
                        className={`border ${error ? 'border-red-400 bg-red-50' : 'border-gray-300 focus:border-blue-500'} 
                                  rounded-md p-3 w-full outline-none transition-all duration-200
                                  focus:ring-2 focus:ring-blue-100`}
                      />
                      {error && (
                        <div className="mt-1 text-red-500 text-sm flex items-start gap-1">
                          <AlertCircle size={14} className="mt-0.5" />
                          <span>{error}</span>
                        </div>
                      )}
                    </div>
                    <div className="mt-2 text-xs text-gray-500">
                      Category names should be clear and descriptive for easy vehicle classification.
                    </div>
                  </div>

                  {/* Thumbnail Upload Field */}
                  <div className="mb-6">
                    <label className="block text-gray-700 font-medium mb-2 flex items-center gap-2">
                      <Image size={18} /> 
                      Category Thumbnail
                    </label>
                    <div className="relative">
                      <div className={`border ${thumbnailError ? 'border-red-400 bg-red-50' : 'border-gray-300'} 
                                    rounded-md p-3 w-full transition-all duration-200
                                    ${categoryData.thumbnail ? 'bg-blue-50 border-blue-300' : ''}`}>
                        
                        {categoryData.thumbnail ? (
                          <div className="mb-3">
                            <div className="relative w-full h-40 bg-gray-100 rounded-md overflow-hidden">
                              <img 
                                src={categoryData.thumbnail} 
                                alt="Category thumbnail" 
                                className="w-full h-full object-cover"
                              />
                              <button
                                type="button"
                                onClick={() => setCategoryData(prev => ({ ...prev, thumbnail: "" }))}
                                className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full hover:bg-red-700"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <line x1="18" y1="6" x2="6" y2="18"></line>
                                  <line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>
                              </button>
                            </div>
                          </div>
                        ) : (
                          <label className="flex flex-col items-center justify-center cursor-pointer">
                            <div className="w-full h-32 bg-gray-100 rounded-md flex flex-col items-center justify-center border-2 border-dashed border-gray-300 hover:border-blue-500 transition-colors duration-200">
                              <Upload size={24} className={`text-gray-400 mb-2 ${isUploading ? 'animate-pulse' : ''}`} />
                              <span className="text-gray-500 text-sm font-medium">
                                {isUploading ? 'Uploading...' : 'Click to upload image'}
                              </span>
                              <span className="text-gray-400 text-xs mt-1">
                                JPEG, PNG, WebP (max 2MB)
                              </span>
                            </div>
                            <input
                              type="file"
                              accept="image/jpeg,image/png,image/webp"
                              onChange={handleFileChange}
                              className="hidden"
                              disabled={isUploading}
                            />
                          </label>
                        )}
                      </div>
                      
                      {thumbnailError && (
                        <div className="mt-1 text-red-500 text-sm flex items-start gap-1">
                          <AlertCircle size={14} className="mt-0.5" />
                          <span>{thumbnailError}</span>
                        </div>
                      )}
                    </div>
                    <div className="mt-2 text-xs text-gray-500">
                      Upload a representative image for this vehicle category. (Optional)
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={createCategoryMutation.isPending || isUploading}
                    className={`w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-md
                              transition-all duration-200 font-medium flex items-center justify-center gap-2
                              ${(createCategoryMutation.isPending || isUploading) ? 'opacity-80 cursor-not-allowed' : 'hover:shadow-md'}`}
                  >
                    {createCategoryMutation.isPending ? (
                      <>
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Creating Category...</span>
                      </>
                    ) : isUploading ? (
                      <>
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Uploading Image...</span>
                      </>
                    ) : (
                      <>
                        <Settings2 size={18} />
                        <span>Create Category</span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>

            {/* Manage Existing Categories Section */}
            <div className="bg-white shadow-lg rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
              <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white py-4 px-6 rounded-t-lg">
                <h1 className="text-xl font-semibold flex items-center gap-2">
                  <Trash2 size={22} />
                  Manage Categories
                </h1>
                <p className="text-purple-100 text-sm mt-1">
                  View and delete existing vehicle categories
                </p>
              </div>

              <div className="p-6">
                {/* Search Bar */}
                <div className="mb-4 relative">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search categories..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="border border-gray-300 rounded-md pl-10 pr-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-purple-100 focus:border-purple-500"
                    />
                    <Search size={18} className="absolute left-3 top-2.5 text-gray-400" />
                    {searchQuery && (
                      <button 
                        onClick={() => setSearchQuery("")}
                        className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="18" y1="6" x2="6" y2="18"></line>
                          <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                      </button>
                    )}
                  </div>
                </div>

                {/* Categories List */}
                <div className="border rounded-md divide-y overflow-hidden">
                  {categoriesLoading ? (
                    <div className="flex justify-center items-center py-12">
                      <Loader size={24} className="animate-spin text-blue-500 mr-2" />
                      <span className="text-gray-500">Loading categories...</span>
                    </div>
                  ) : categoriesError ? (
                    <div className="flex justify-center items-center py-12 text-red-500">
                      <AlertCircle size={24} className="mr-2" />
                      <span>Failed to load categories</span>
                      <button 
                        onClick={() => queryClient.invalidateQueries({ queryKey: ["allCategories"] })}
                        className="ml-2 text-blue-500 hover:text-blue-700 underline flex items-center"
                      >
                        <RefreshCw size={14} className="mr-1" /> Retry
                      </button>
                    </div>
                  ) : filteredCategories.length === 0 ? (
                    <div className="py-8 text-center text-gray-500">
                      {searchQuery ? (
                        <div>
                          <p className="mb-2">No categories match your search</p>
                          <button 
                            onClick={() => setSearchQuery("")}
                            className="text-blue-500 hover:text-blue-700 underline"
                          >
                            Clear search
                          </button>
                        </div>
                      ) : (
                        <p>No categories available</p>
                      )}
                    </div>
                  ) : (
                    filteredCategories.map((category, index) => (
                      <div key={index} className="flex items-center justify-between p-4 hover:bg-gray-50">
                        <div className="flex items-center space-x-3">
                          {category.thumbnailUrl ? (
                            <div className="h-10 w-10 rounded-md overflow-hidden bg-gray-100">
                              <img 
                                src={category.thumbnailUrl} 
                                alt={category.name} 
                                className="h-full w-full object-cover"
                              />
                            </div>
                          ) : (
                            <div className="h-10 w-10 rounded-md bg-purple-100 flex items-center justify-center">
                              <Settings2 size={16} className="text-blue-500" />
                            </div>
                          )}
                          <span className="font-medium">{category.name}</span>
                        </div>
                        <button
                          onClick={() => confirmDelete(category)}
                          className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50"
                          title="Delete category"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    ))
                  )}
                </div>

                {/* Refresh Button */}
                <button
                  onClick={() => queryClient.invalidateQueries({ queryKey: ["allCategories"] })}
                  className="mt-4 w-full border border-blue-300 text-blue-600 py-2 px-4 rounded-md
                            transition-all duration-200 font-medium flex items-center justify-center gap-2
                            hover:bg-purple-50"
                >
                  <RefreshCw size={16} className={categoriesLoading ? "animate-spin" : ""} />
                  <span>Refresh Categories</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      {/* Delete Confirmation Modal */}
      {deleteConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden">
            <div className="bg-red-500 text-white py-4 px-6">
              <h3 className="text-lg font-medium flex items-center gap-2">
                <AlertCircle size={20} />
                Confirm Deletion
              </h3>
            </div>
            <div className="p-6">
              <p className="mb-4">
                Are you sure you want to delete the category <strong>{deleteConfirmation.name}</strong>?
                This action cannot be undone.
              </p>
              <p className="mb-6 text-sm text-gray-500">
                Note: Deleting a category may affect vehicles assigned to this category.
              </p>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setDeleteConfirmation(null)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  disabled={deleteCarMutation.isPending}
                  className={`px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 
                            flex items-center gap-2 ${deleteCarMutation.isPending ? 'opacity-80 cursor-not-allowed' : ''}`}
                >
                  {deleteCarMutation.isPending ? (
                    <>
                      <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Deleting...</span>
                    </>
                  ) : (
                    <>
                      <Trash2 size={16} />
                      <span>Delete Category</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Footer */}
      <footer className="py-4 text-center text-gray-500 text-sm">
        <p>Car Management System &copy; {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}

export default CreateCategoryPage;