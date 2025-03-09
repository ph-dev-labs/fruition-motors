"use client";

import React, { useState } from "react";
import { Settings, Settings2, AlertCircle, Check } from "lucide-react";
import { Outfit } from "next/font/google";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "../../../../libs/axios";
import toast from "react-hot-toast";
import Navigation from "../components/Navigation";

const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
});

function CreateCategoryPage() {
  const [categoryData, setCategoryData] = useState({ name: "" });
  const [error, setError] = useState("");
  const queryClient = useQueryClient();

  const createCategoryMutation = useMutation({
    mutationFn: async (data) => {
      const response = await axios.post("/createCategory", data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast.success("Category created successfully!");
      setCategoryData({ name: "" }); // Reset form
      setError("");
    },
    onError: (error) => {
      const errorMessage = error.response?.data?.message || error.message;
      toast.error(`Failed to create category: ${errorMessage}`);
      
      if (error.response?.data?.errors?.name) {
        setError(error.response.data.errors.name);
      }
    },
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCategoryData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError(""); // Clear error when user types
  };

  const validateForm = () => {
    if (!categoryData.name.trim()) {
      setError("Category name is required");
      return false;
    }
    
    if (categoryData.name.length < 2) {
      setError("Category name must be at least 2 characters long");
      return false;
    }
    
    return true;
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
                disabled={createCategoryMutation.isPending}
                className={`w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-md
                          transition-all duration-200 font-medium flex items-center justify-center gap-2
                          ${createCategoryMutation.isPending ? 'opacity-80 cursor-not-allowed' : 'hover:shadow-md'}`}
              >
                {createCategoryMutation.isPending ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Creating Category...</span>
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