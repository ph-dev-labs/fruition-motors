"use client";

import React, { useState, useEffect } from "react";
import { Mail, Lock, LogIn, Eye, EyeOff, AlertCircle } from "lucide-react";
import { Outfit } from "next/font/google";
import { useMutation } from "@tanstack/react-query";
import axios from "../../../../libs/axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { getCookie, setCookie } from 'cookies-next';

const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
});

export default function AdminLoginPage() {
  const router = useRouter();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  // Check if user is already logged in
  useEffect(() => {
    const token = getCookie("authFruition");
    if (token) {
      router.push("/admin/dashboard");
    }
  }, [router]);

  const loginMutation = useMutation({
    mutationFn: async (data) => {
      const response = await axios.post("/login", data);
      return response.data;
    },
    onSuccess: (data) => {
      const token = "gdwyshtjfghsfdghfsgsfsf"; // Adjust based on your API response
      setCookie('authFruition', token, { 
        maxAge: rememberMe ? 60 * 60 * 24 * 30 : 60 * 60 * 24, // 30 days if remember me, else 1 day
        path: '/',
      });
      toast.success("Login successful! Welcome back.");
      router.push("/admin/dashboard"); // Redirect to admin dashboard
    },
    onError: (error) => {
      const errorMessage = error.response?.data?.message || "Invalid email or password. Please try again.";
      setError(errorMessage);
      toast.error(errorMessage);
    },
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError(""); // Clear error on input change
  };

  const validateForm = () => {
    if (!credentials.email) {
      setError("Email is required");
      return false;
    }
    
    if (!/\S+@\S+\.\S+/.test(credentials.email)) {
      setError("Please enter a valid email address");
      return false;
    }
    
    if (!credentials.password) {
      setError("Password is required");
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      loginMutation.mutate(credentials);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <main className={`flex-grow flex items-center justify-center p-4 ${outfit.className}`}>
        <div className="bg-white shadow-lg rounded-lg w-full max-w-md overflow-hidden transition-all duration-300 hover:shadow-xl">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white py-5 px-6 rounded-t-lg">
            <h1 className="text-2xl font-semibold flex items-center gap-2 justify-center">
              <LogIn size={24} />
              Admin Login
            </h1>
            <p className="text-blue-100 text-sm mt-1 text-center">
              Sign in to access the car management dashboard
            </p>
          </div>

          {/* Form */}
          <div className="p-6">
            <form onSubmit={handleSubmit}>
              {/* Error Message */}
              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md flex items-start gap-2 text-red-600">
                  <AlertCircle size={18} className="mt-0.5 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {/* Email Field */}
              <div className="mb-5">
                <label className="block text-gray-700 font-medium mb-2 flex items-center gap-2" htmlFor="email">
                  <Mail size={18} /> 
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={credentials.email}
                  onChange={handleInputChange}
                  placeholder="admin@example.com"
                  className="border border-gray-300 focus:border-blue-500 rounded-md p-3 w-full outline-none transition-all duration-200 focus:ring-2 focus:ring-blue-100"
                  aria-label="Email Address"
                />
              </div>

              {/* Password Field */}
              <div className="mb-5">
                <label className="block text-gray-700 font-medium mb-2 flex items-center gap-2" htmlFor="password">
                  <Lock size={18} /> 
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    id="password"
                    value={credentials.password}
                    onChange={handleInputChange}
                    placeholder="Enter your password"
                    className="border border-gray-300 focus:border-blue-500 rounded-md p-3 pr-10 w-full outline-none transition-all duration-200 focus:ring-2 focus:ring-blue-100"
                    aria-label="Password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Remember Me Checkbox */}
              <div className="mb-6 flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">
                  Remember me for 30 days
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loginMutation.isPending}
                className={`w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-md transition-all duration-200 font-medium flex items-center justify-center gap-2 ${
                  loginMutation.isPending ? 'opacity-80 cursor-not-allowed' : 'hover:shadow-md'
                }`}
              >
                {loginMutation.isPending ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Signing in...</span>
                  </>
                ) : (
                  <>
                    <LogIn size={18} />
                    <span>Sign In</span>
                  </>
                )}
              </button>
            </form>

            {/* Additional Links */}
            <div className="mt-6 text-center">
              <a href="#" className="text-sm text-blue-600 hover:text-blue-800 transition-colors">
                Forgot your password?
              </a>
            </div>
          </div>
          
          {/* Footer */}
          <div className="bg-gray-50 py-4 px-6 text-center border-t">
            <p className="text-sm text-gray-600">
              Car Management System &copy; {new Date().getFullYear()}
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}