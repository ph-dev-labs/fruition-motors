"use client"
import { useState } from 'react';
import Layout from '../../components/layout';
import Image from 'next/image';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import { useSendContactUs } from '../../hooks/useGetCars'; // Consider renaming this file for clarity
import toast from 'react-hot-toast';

export default function Contact() {
  const [formData, setFormData] = useState({
    fullname: '',
    phone: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const contactUs = useSendContactUs();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    
    contactUs.mutate(formData, {
      onSuccess: () => {
        setIsSubmitted(true);
        toast.success("We will reach out to you shortly");
        setFormData({ fullname: '', phone: '', message: '' }); // Reset form with correct field names
      },
      onError: () => {
        toast.error("Something went wrong. Please try again later.");
        setIsSubmitted(false);
      }
    });
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-80 bg-[#170a0aab]">
        <Image
          src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1966&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Fruition Motors Contact"
          layout="fill"
          objectFit="cover"
          className="mix-blend-overlay opacity-50"
        />
        <div className="relative h-full flex items-center justify-center z-10">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
            <p className="text-xl max-w-2xl mx-auto">We'd love to hear from you</p>
          </div>
        </div>
      </section>
      
      {/* Contact Form and Info */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-gray-50 p-8 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Send Us a Message</h2>
              
              {isSubmitted ? (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
                  Thank you for your message! We'll get back to you soon.
                </div>
              ) : null}
              
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="fullname" className="block text-gray-700 font-medium mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="fullname"
                    name="fullname"
                    value={formData.fullname}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="message" className="block text-gray-700 font-medium mb-2">
                    Your Message/Feedback
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="5"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  className="bg-red-600 text-white font-medium py-2 px-6 rounded-md hover:bg-primary-dark transition duration-300"
                  disabled={contactUs.isPending}
                >
                  {contactUs.isPending ? 'Submitting...' : 'Submit'}
                </button>
              </form>
            </div>
            
            {/* Rest of the component remains unchanged */}
            {/* Contact Information */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Get In Touch</h2>
              
              <div className="space-y-8">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <FaPhone className="text-primary text-xl" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">Phone</h3>
                    <p className="text-gray-600">+234 810471769</p>
                    <p className="text-gray-600">+234 810471769</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <FaEnvelope className="text-primary text-xl" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">Email</h3>
                    <p className="text-gray-600">fruitionenterprise24@gmail.com</p>
                    <p className="text-gray-600">fruitionenterprise24@gmail.com</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <FaMapMarkerAlt className="text-primary text-xl" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">Location</h3>
                    <p className="text-gray-600">Plot 100, KM5,</p>
                    <p className="text-gray-600"> East West Road Nkpolu Rumuigbo</p>
                    <p className="text-gray-600">Port Harcourt, Rivers State</p>
                    <p className="text-gray-600">Nigeria</p>
                  </div>
                </div>
              </div>
              
              {/* Map Placeholder */}
              <div className="mt-8 h-64 bg-gray-200 rounded-lg relative overflow-hidden">
                <Image
                  src="/api/placeholder/800/400"
                  alt="Map Location"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 text-white">
                  <p className="font-medium">Google Maps Integration</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Business Hours */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Business Hours</h2>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="grid grid-cols-2 divide-x divide-gray-200">
                <div className="p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Weekdays</h3>
                  <p className="text-gray-600">Monday - Friday</p>
                  <p className="text-gray-600 font-medium">8:00 AM - 6:00 PM</p>
                </div>
                
                <div className="p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Weekends</h3>
                  <p className="text-gray-600">Saturday</p>
                  <p className="text-gray-600 font-medium">9:00 AM - 4:00 PM</p>
                  <p className="text-gray-600 mt-2">Sunday</p>
                  <p className="text-gray-600 font-medium">Closed</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}