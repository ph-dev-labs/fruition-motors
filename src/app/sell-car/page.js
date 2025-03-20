"use client"
import { useState } from 'react';
import Layout from '../../components/layout';
import { FaCarAlt, FaCheckCircle, FaUpload } from 'react-icons/fa';
import Image from 'next/image';

export default function SellYourCarPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    email: '',
    make: '',
    model: '',
    year: '',
    transmission: '',
    color: '',
    condition: '',
    images: []
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleImageUpload = (e) => {
    // Handle image upload logic here
    const files = Array.from(e.target.files);
    // For demo purposes, we're just storing the file objects
    setFormData(prev => ({ ...prev, images: files }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Form submitted:', formData);
      setSubmitSuccess(true);
      // Reset form after submission
      setFormData({
        fullName: '',
        phoneNumber: '',
        email: '',
        make: '',
        model: '',
        year: '',
        transmission: '',
        color: '',
        condition: '',
        images: []
      });
    } catch (error) {
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-red-600 to-red-500 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold mb-4">Sell Your Car with Fruition Motors</h1>
            <p className="text-xl opacity-90 mb-8">
              Get a competitive offer for your vehicle and enjoy a hassle-free selling experience
            </p>
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">How It Works</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Selling your car with us is quick and straightforward
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-gray-50 p-8 rounded-xl text-center">
              <div className="bg-red-600 bg-opacity-10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaCarAlt className="text-red-600 text-2xl" />
              </div>
              <h3 className="text-xl font-bold mb-2">Submit Details</h3>
              <p className="text-gray-600">
                Fill out the form with information about your vehicle and contact details.
              </p>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-xl text-center">
              <div className="bg-red-600 bg-opacity-10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaCheckCircle className="text-red-600 text-2xl" />
              </div>
              <h3 className="text-xl font-bold mb-2">Get an Offer</h3>
              <p className="text-gray-600">
                Our team will evaluate your car and provide you with a competitive offer.
              </p>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-xl text-center">
              <div className="bg-red-600 bg-opacity-10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaCheckCircle className="text-red-600 text-2xl" />
              </div>
              <h3 className="text-xl font-bold mb-2">Complete the Sale</h3>
              <p className="text-gray-600">
                Accept the offer, complete the necessary paperwork, and receive your payment.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Form Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Sell Your Car</h2>
              
              {submitSuccess ? (
                <div className="text-center py-8">
                  <div className="bg-green-100 text-green-800 p-4 rounded-xl mb-6">
                    <FaCheckCircle className="text-green-500 text-4xl mx-auto mb-4" />
                    <h3 className="text-xl font-bold mb-2">Thank You!</h3>
                    <p>Your car details have been submitted successfully. Our team will contact you shortly.</p>
                  </div>
                  <button
                    onClick={() => setSubmitSuccess(false)}
                    className="bg-red-600 text-white py-2 px-6 rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Submit Another Car
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-100">Contact Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                        <input
                          type="text"
                          id="fullName"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-red-600 outline-none transition"
                        />
                      </div>
                      <div>
                        <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                        <input
                          type="tel"
                          id="phoneNumber"
                          name="phoneNumber"
                          value={formData.phoneNumber}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-red-600 outline-none transition"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-red-600 outline-none transition"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-100">Car Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="make" className="block text-sm font-medium text-gray-700 mb-1">Make</label>
                        <input
                          type="text"
                          id="make"
                          name="make"
                          value={formData.make}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-red-600 outline-none transition"
                        />
                      </div>
                      <div>
                        <label htmlFor="model" className="block text-sm font-medium text-gray-700 mb-1">Model</label>
                        <input
                          type="text"
                          id="model"
                          name="model"
                          value={formData.model}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-red-600 outline-none transition"
                        />
                      </div>
                      <div>
                        <label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-1">Year of Manufacture</label>
                        <input
                          type="number"
                          id="year"
                          name="year"
                          value={formData.year}
                          onChange={handleChange}
                          min="1900"
                          max={new Date().getFullYear()}
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-red-600 outline-none transition"
                        />
                      </div>
                      <div>
                        <label htmlFor="transmission" className="block text-sm font-medium text-gray-700 mb-1">Transmission</label>
                        <select
                          id="transmission"
                          name="transmission"
                          value={formData.transmission}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-red-600 outline-none transition"
                        >
                          <option value="">Select Transmission</option>
                          <option value="Automatic">Automatic</option>
                          <option value="Manual">Manual</option>
                          <option value="CVT">CVT</option>
                          <option value="Semi-Automatic">Semi-Automatic</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="color" className="block text-sm font-medium text-gray-700 mb-1">Color</label>
                        <input
                          type="text"
                          id="color"
                          name="color"
                          value={formData.color}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-red-600 outline-none transition"
                        />
                      </div>
                      <div>
                        <label htmlFor="condition" className="block text-sm font-medium text-gray-700 mb-1">Condition</label>
                        <select
                          id="condition"
                          name="condition"
                          value={formData.condition}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-red-600 outline-none transition"
                        >
                          <option value="">Select Condition</option>
                          <option value="Brand New">Brand New</option>
                          <option value="Foreign Used">Foreign Used</option>
                          <option value="Nigerian Used">Nigerian Used</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-100">Car Photos</h3>
                    <div className="mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                      <div className="space-y-1 text-center">
                        <FaUpload className="mx-auto h-12 w-12 text-gray-400" />
                        <div className="flex text-sm text-gray-600">
                          <label htmlFor="fileUpload" className="relative cursor-pointer rounded-md font-medium text-red-600 hover:text-red-500">
                            <span>Upload files</span>
                            <input 
                              id="fileUpload" 
                              name="fileUpload" 
                              type="file" 
                              className="sr-only" 
                              multiple
                              onChange={handleImageUpload}
                            />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">
                          PNG, JPG, GIF up to 10MB (Maximum 5 photos)
                        </p>
                      </div>
                    </div>
                    {formData.images.length > 0 && (
                      <div className="mt-4">
                        <p className="text-sm text-gray-700 mb-2">{formData.images.length} file(s) selected</p>
                        <div className="flex flex-wrap gap-2">
                          {formData.images.map((file, index) => (
                            <div key={index} className="h-20 w-20 relative bg-gray-100 rounded-md overflow-hidden">
                              {/* This would show actual image previews in a real app */}
                              <div className="absolute inset-0 flex items-center justify-center text-xs text-gray-500">
                                Image {index + 1}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="text-center">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full md:w-auto bg-red-600 text-white py-3 px-8 rounded-xl font-medium hover:bg-red-700 transition-colors ${
                        isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
                      }`}
                    >
                      {isSubmitting ? 'Submitting...' : 'Submit Car Details'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Happy Sellers</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              What our customers say about selling their cars with us
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-8 rounded-xl relative">
              <div className="text-red-600 text-5xl absolute -top-4 -left-2">"</div>
              <p className="text-gray-700 mb-6 pt-6">
                The process was incredibly smooth. I got a fair price for my Toyota Camry and the payment was processed quickly.
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
                <div>
                  <h4 className="font-bold text-gray-900">John Doe</h4>
                  <p className="text-sm text-gray-600">Lagos, Nigeria</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-xl relative">
              <div className="text-red-600 text-5xl absolute -top-4 -left-2">"</div>
              <p className="text-gray-700 mb-6 pt-6">
                I was hesitant at first, but the team made me feel comfortable throughout the entire selling process.
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
                <div>
                  <h4 className="font-bold text-gray-900">Sarah Johnson</h4>
                  <p className="text-sm text-gray-600">Abuja, Nigeria</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-xl relative">
              <div className="text-red-600 text-5xl absolute -top-4 -left-2">"</div>
              <p className="text-gray-700 mb-6 pt-6">
                Sold my Mercedes in just 3 days. The offer was better than what I could get elsewhere. Highly recommended!
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
                <div>
                  <h4 className="font-bold text-gray-900">Michael Adebayo</h4>
                  <p className="text-sm text-gray-600">Port Harcourt, Nigeria</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}