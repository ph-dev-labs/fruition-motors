"use client";

import React, { useState } from "react";
import { Mail, Lock, LogIn, Eye, EyeOff, AlertCircle } from "lucide-react";
import { Outfit } from "next/font/google";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "../../../../libs/axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Navigation from "../components/Navigation";

const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
});

function CreateAdminPage() {
  const router = useRouter();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const queryClient = useQueryClient();

  const createAdminMutation = useMutation({
    mutationFn: async (data) => {
      const response = await axios.post("/createAdmin", data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admins"] });
      toast.success("Admin created successfully!");
      setCredentials({ email: "", password: "" }); // Reset form
      setErrors({});
      // Optionally redirect to admin list
      // router.push('/admin/dashboard');
    },
    onError: (error) => {
      const errorMessage = error.response?.data?.message || error.message;
      toast.error(`Failed to create admin: ${errorMessage}`);
      
      // Handle validation errors if they come from the server
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      }
    },
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Basic email validation
    if (!credentials.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    // Password strength check
    if (credentials.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      createAdminMutation.mutate(credentials);
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
              <LogIn size={22} />
              Create New Admin Account
            </h1>
            <p className="text-blue-100 text-sm mt-1">
              Create administrative access for system management
            </p>
          </div>

          {/* Form */}
          <div className="p-6">
            <form onSubmit={handleSubmit}>
              {/* Email Field */}
              <div className="mb-5">
                <label className="block text-gray-700 font-medium mb-2 flex items-center gap-2">
                  <Mail size={18} /> 
                  Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    value={credentials.email}
                    onChange={handleInputChange}
                    placeholder="admin@example.com"
                    required
                    className={`border ${errors.email ? 'border-red-400 bg-red-50' : 'border-gray-300 focus:border-blue-500'} 
                              rounded-md p-3 pl-3 w-full outline-none transition-all duration-200
                              focus:ring-2 focus:ring-blue-100`}
                  />
                  {errors.email && (
                    <div className="mt-1 text-red-500 text-sm flex items-start gap-1">
                      <AlertCircle size={14} className="mt-0.5" />
                      <span>{errors.email}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Password Field */}
              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2 flex items-center gap-2">
                  <Lock size={18} /> 
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={credentials.password}
                    onChange={handleInputChange}
                    placeholder="Minimum 8 characters"
                    required
                    className={`border ${errors.password ? 'border-red-400 bg-red-50' : 'border-gray-300 focus:border-blue-500'} 
                              rounded-md p-3 pr-10 w-full outline-none transition-all duration-200
                              focus:ring-2 focus:ring-blue-100`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                  {errors.password && (
                    <div className="mt-1 text-red-500 text-sm flex items-start gap-1">
                      <AlertCircle size={14} className="mt-0.5" />
                      <span>{errors.password}</span>
                    </div>
                  )}
                </div>
                <div className="mt-2 text-xs text-gray-500">
                  Password should be at least 8 characters long with a mix of letters, numbers, and symbols.
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={createAdminMutation.isPending}
                className={`w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-md
                          transition-all duration-200 font-medium flex items-center justify-center gap-2
                          ${createAdminMutation.isPending ? 'opacity-80 cursor-not-allowed' : 'hover:shadow-md'}`}
              >
                {createAdminMutation.isPending ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Creating...</span>
                  </>
                ) : (
                  <>
                    <LogIn size={18} />
                    <span>Create Admin Account</span>
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

export default CreateAdminPage;