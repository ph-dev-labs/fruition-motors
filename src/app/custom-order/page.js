"use client"
import { useState } from 'react';
import Layout from '../../components/layout';
import { FaCarAlt, FaCheckCircle, FaCog, FaSearch } from 'react-icons/fa';
import Image from 'next/image';

export default function CustomOrderPage() {
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
    additionalDetails: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
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
        additionalDetails: ''
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
            <h1 className="text-4xl font-bold mb-4">Custom Car Orders</h1>
            <p className="text-xl opacity-90 mb-8">
              Can't find what you're looking for? Let us source your dream car for you.
            </p>
          </div>
        </div>
      </section>
      
      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Why Choose Our Custom Order Service</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              We go the extra mile to find exactly what you want
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-gray-50 p-8 rounded-xl text-center">
              <div className="bg-red-600 bg-opacity-10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaSearch className="text-red-600 text-2xl" />
              </div>
              <h3 className="text-xl font-bold mb-2">Global Network</h3>
              <p className="text-gray-600">
                We leverage our extensive international network to source rare and specific vehicles.
              </p>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-xl text-center">
              <div className="bg-red-600 bg-opacity-10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaCog className="text-red-600 text-2xl" />
              </div>
              <h3 className="text-xl font-bold mb-2">Custom Specifications</h3>
              <p className="text-gray-600">
                Tell us exactly what you need, from interior features to engine specifications.
              </p>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-xl text-center">
              <div className="bg-red-600 bg-opacity-10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaCheckCircle className="text-red-600 text-2xl" />
              </div>
              <h3 className="text-xl font-bold mb-2">Guaranteed Satisfaction</h3>
              <p className="text-gray-600">
                We don't stop until we find exactly what you're looking for, guaranteed.
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
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Custom Car Order Request</h2>
              
              {submitSuccess ? (
                <div className="text-center py-8">
                  <div className="bg-green-100 text-green-800 p-4 rounded-xl mb-6">
                    <FaCheckCircle className="text-green-500 text-4xl mx-auto mb-4" />
                    <h3 className="text-xl font-bold mb-2">Request Received!</h3>
                    <p>Thank you for your custom order request. Our team will contact you within 24 hours to discuss your requirements.</p>
                  </div>
                  <button
                    onClick={() => setSubmitSuccess(false)}
                    className="bg-red-600 text-white py-2 px-6 rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Submit Another Request
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
                          placeholder="e.g. Toyota, Mercedes, BMW"
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
                          placeholder="e.g. Camry, E-Class, X5"
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
                          max={new Date().getFullYear() + 1}
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-red-600 outline-none transition"
                          placeholder="e.g. 2023"
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
                        <label htmlFor="color" className="block text-sm font-medium text-gray-700 mb-1">Preferred Color</label>
                        <input
                          type="text"
                          id="color"
                          name="color"
                          value={formData.color}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-red-600 outline-none transition"
                          placeholder="e.g. Black, Silver, Red"
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
                          <option value="New">New</option>
                          <option value="Used - Like New">Used - Like New</option>
                          <option value="Used - Good">Used - Good</option>
                          <option value="Used - Fair">Used - Fair</option>
                        </select>
                      </div>
                      <div className="md:col-span-2">
                        <label htmlFor="additionalDetails" className="block text-sm font-medium text-gray-700 mb-1">
                          Additional Details or Requirements
                        </label>
                        <textarea
                          id="additionalDetails"
                          name="additionalDetails"
                          value={formData.additionalDetails}
                          onChange={handleChange}
                          rows="4"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-red-600 outline-none transition"
                          placeholder="Please specify any additional features, modifications, or requirements..."
                        ></textarea>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`py-3 px-8 bg-red-600 text-white font-medium rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors ${
                        isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                      }`}
                    >
                      {isSubmitting ? 'Submitting...' : 'Submit Custom Order Request'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">What Our Customers Say</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              We've helped hundreds of customers find their perfect vehicle
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-xl shadow-sm">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-gray-300 flex items-center justify-center mr-4">
                  <span className="text-xl font-bold text-gray-600">JD</span>
                </div>
                <div>
                  <h4 className="font-bold">James Davis</h4>
                  <p className="text-sm text-gray-600">Mercedes-Benz AMG</p>
                </div>
              </div>
              <p className="text-gray-700">
                "I was looking for a specific AMG model with unique specifications. The team found exactly what I wanted within two weeks. Incredible service!"
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-xl shadow-sm">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-gray-300 flex items-center justify-center mr-4">
                  <span className="text-xl font-bold text-gray-600">SM</span>
                </div>
                <div>
                  <h4 className="font-bold">Sarah Miller</h4>
                  <p className="text-sm text-gray-600">Porsche 911</p>
                </div>
              </div>
              <p className="text-gray-700">
                "The custom order process was seamless. They kept me updated throughout and delivered a car that exceeded my expectations."
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-xl shadow-sm">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-gray-300 flex items-center justify-center mr-4">
                  <span className="text-xl font-bold text-gray-600">RT</span>
                </div>
                <div>
                  <h4 className="font-bold">Robert Thompson</h4>
                  <p className="text-sm text-gray-600">Toyota Land Cruiser</p>
                </div>
              </div>
              <p className="text-gray-700">
                "I needed a specific Land Cruiser configuration that wasn't available locally. Their global network found it quickly and the import process was handled perfectly."
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Frequently Asked Questions</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to know about our custom order process
            </p>
          </div>
          
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-2">How long does the custom order process take?</h3>
              <p className="text-gray-700">
                Depending on the rarity and specifications of the vehicle, our custom orders typically take 2-8 weeks. We'll provide you with a more specific timeline after reviewing your requirements.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Is there a deposit required for custom orders?</h3>
              <p className="text-gray-700">
                Yes, we require a refundable deposit of 10% of the estimated vehicle cost to begin the search process. This deposit is fully refundable if we're unable to find a vehicle that meets your specifications.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Can you source vehicles from overseas?</h3>
              <p className="text-gray-700">
                Absolutely! Our global network allows us to source vehicles from Europe, Asia, and other international markets. We handle all import logistics and ensure the vehicle meets local regulations.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-2">What if I'm not satisfied with the vehicle?</h3>
              <p className="text-gray-700">
                Customer satisfaction is our top priority. Before finalizing any purchase, we provide detailed information and images of the vehicle. If the vehicle doesn't meet your expectations upon delivery, we offer a satisfaction guarantee.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}