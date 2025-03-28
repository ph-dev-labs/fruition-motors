// pages/about.js
import Layout from '../../components/layout';
import Image from 'next/image';
import { FaTrophy, FaUsers, FaCar, FaThumbsUp, FaRobot } from 'react-icons/fa';

export default function About() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-80 bg-[#170a0aab]">
        <Image
          src="/about.JPG"
          alt="Fruition Motors Team"
          layout="fill"
          objectFit="cover"
          className="mix-blend-overlay opacity-50"
        />
        <div className="relative h-full flex items-center justify-center z-10">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">About Fruition Motors</h1>
            <p className="text-xl max-w-2xl mx-auto">Your trusted partner in finding the perfect vehicle</p>
          </div>
        </div>
      </section>
      
      {/* Nootee Section (Replaced Our Story) */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center mb-6">
                <FaRobot className="text-primary text-3xl mr-4" />
              </div>
              <p className="text-gray-600 mb-4">
              Welcome to Fruition Motors, the premier car dealership located in the vibrant heart of Port Harcourt, where your remarkable automotive adventure begins. Established with a genuine passion for excellence and a strong dedication to ensuring customer satisfaction, we take great pride in offering an extensive selection of certified pre-owned vehicles.
              </p>
              <p className="text-gray-600 mb-4">
              No matter where you are in Nigeria, our team is devoted to providing you with a hassle-free and enjoyable car-buying experience. Our diverse inventory features an impressive array of luxury vehicles, ranging from sleek sedans to robust SUVs, ensuring that you’ll discover the ideal car to match your lifestyle and preferences. Drive away from our dealership not just with a top vehicle, but with a beaming smile and a sense of fulfillment.
              </p>
              <p className="text-gray-600">
               To enhance your experience, our website and social media channels are available 24/7, providing you with convenient access to our offers, detailed vehicle listings, and helpful resources. At Fruition Motors, we strive to make your journey to find the perfect car more intuitive and pleasurable than ever before.
              </p>
            </div>
            <div className="relative h-80 rounded-lg overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Nootee AI Assistant"
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Key Figures */}
      {/* <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Fruition Motors by the Numbers</h2>
            <p className="mt-4 text-xl text-gray-600">Our growth and impact over the years</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-lg text-center shadow-sm">
              <FaUsers className="text-primary text-4xl mx-auto mb-4" />
              <p className="text-4xl font-bold text-gray-900 mb-2">5,000+</p>
              <p className="text-gray-600">Happy Customers</p>
            </div>
            
            <div className="bg-white p-8 rounded-lg text-center shadow-sm">
              <FaCar className="text-primary text-4xl mx-auto mb-4" />
              <p className="text-4xl font-bold text-gray-900 mb-2">10,000+</p>
              <p className="text-gray-600">Cars Sold</p>
            </div>
            
            <div className="bg-white p-8 rounded-lg text-center shadow-sm">
              <FaThumbsUp className="text-primary text-4xl mx-auto mb-4" />
              <p className="text-4xl font-bold text-gray-900 mb-2">98%</p>
              <p className="text-gray-600">Customer Satisfaction</p>
            </div>
            
            <div className="bg-white p-8 rounded-lg text-center shadow-sm">
              <FaTrophy className="text-primary text-4xl mx-auto mb-4" />
              <p className="text-4xl font-bold text-gray-900 mb-2">15+</p>
              <p className="text-gray-600">Industry Awards</p>
            </div>
          </div>
        </div>
      </section> */}
      
      {/* Our Team */}
      {/* <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Meet Our Team</h2>
            <p className="mt-4 text-xl text-gray-600">The passionate people behind Fruition Motors</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-lg overflow-hidden shadow-sm">
              <div className="relative h-64">
                <Image
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=2149&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="John Smith"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900">John Smith</h3>
                <p className="text-primary font-medium mb-2">CEO & Founder</p>
                <p className="text-gray-600">
                  Automotive enthusiast with over 15 years of experience in the industry.
                </p>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-lg overflow-hidden shadow-sm">
              <div className="relative h-64">
                <Image
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=2076&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Jane Doe"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900">Jane Doe</h3>
                <p className="text-primary font-medium mb-2">Chief Operations Officer</p>
                <p className="text-gray-600">
                  Expert in automotive operations with a passion for customer satisfaction.
                </p>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-lg overflow-hidden shadow-sm">
              <div className="relative h-64">
                <Image
                  src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=2187&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Mark Johnson"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900">Mark Johnson</h3>
                <p className="text-primary font-medium mb-2">Head of Sales</p>
                <p className="text-gray-600">
                  Dedicated to finding the perfect match between customers and cars.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section> */}
    </Layout>
  );
}