"use client";

import React, { useState } from "react";
import { Settings, Settings2, AlertCircle, Check, Image, Upload } from "lucide-react";
import { Outfit } from "next/font/google";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "../../../../libs/axios";
import toast from "react-hot-toast";
import Navigation from "../components/Navigation";
import { uploadToCloudinary } from "../../../../utils/cloudinary"; // Import the cloudinary upload function

const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
});

function CreateCategoryPage() {
  const [categoryData, setCategoryData] = useState({ 
    name: "",
    thumbnailUrl: "" 
  });
  const [error, setError] = useState("");
  const [thumbnailError, setThumbnailError] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const queryClient = useQueryClient();

  const createCategoryMutation = useMutation({
    mutationFn: async (data) => {
      const response = await axios.post("/createCategory", data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast.success("Category created successfully!");
      setCategoryData({ name: "", thumbnailUrl: "" }); // Reset form
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
      if (error.response?.data?.errors?.thumbnailUrl) {
        setThumbnailError(error.response.data.errors.thumbnailUrl);
      }
    },
  });

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
        thumbnailUrl: imageUrl
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
    if (file.size > 2 * 1024 * 1024) {
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
    
    if (!categoryData.name.trim()) {
      setError("Category name is required");
      isValid = false;
    } else if (categoryData.name.length < 2) {
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

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navigation />
      
      <main className={`flex-grow flex items-center justify-center p-4 ${outfit.className}`}>
        <div className="bg-white shadow-lg rounded-lg w-full max-w-md overflow-hidden transition-all duration-300 hover:shadow-xl">
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
                  <Settings size={18} /> 
                  Category Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="name"
                    value={categoryData.name}
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
                                ${categoryData.thumbnailUrl ? 'bg-blue-50 border-blue-300' : ''}`}>
                    
                    {categoryData.thumbnailUrl ? (
                      <div className="mb-3">
                        <div className="relative w-full h-40 bg-gray-100 rounded-md overflow-hidden">
                          <img 
                            src={categoryData.thumbnailUrl} 
                            alt="Category thumbnail" 
                            className="w-full h-full object-cover"
                          />
                          <button
                            type="button"
                            onClick={() => setCategoryData(prev => ({ ...prev, thumbnailUrl: "" }))}
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

              {/* Recently Added Categories (Optional) */}
              <div className="mb-6 bg-gray-50 p-3 rounded-md border border-gray-200">
                <h3 className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
                  <Check size={14} className="text-green-500" />
                  Recently Added Categories
                </h3>
                <div className="flex flex-wrap gap-2">
                  {['SUV', 'Sedan', 'Luxury'].map(category => (
                    <span key={category} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                      {category}
                    </span>
                  ))}
                  <span className="text-gray-400 text-xs italic">+ more</span>
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
      </main>
      
      {/* Optional footer */}
      <footer className="py-4 text-center text-gray-500 text-sm">
        <p>Car Management System &copy; {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}

export default CreateCategoryPage;