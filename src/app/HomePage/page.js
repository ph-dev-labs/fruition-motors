"use client";
import { useCars } from "../../hooks/useGetCars";
import Hero from "../../components/Hero";
import FeaturedCars from "../../components/featuredCar";
import Link from "next/link";
import {
  FaArrowRight,
  FaCheckCircle,
  FaCar,
  FaPhoneAlt,
  FaTags,
} from "react-icons/fa";
import Loader from "../../components/loader";
import Layout from "../../components/layout";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../libs/axios";
import Image from "next/image";
import { motion } from "framer-motion";

export default function HomePage() {
  const { data, isLoading, isError, error } = useCars();
  const {
    data: catData,
    isLoading: catLoading,
    error: catError,
  } = useQuery({
    queryKey: ["allCategories"],
    queryFn: async () => {
      const response = await axiosInstance.get("/getCategory");
      return response?.data.category;
    },
  });

  const featuredCar = data?.filter((car) => car.featured === "featured");

  if (isLoading || catLoading) {
    return <Loader />;
  }

  if (error || catError) {
    return <div>Error: {error?.message || catError.message}</div>;
  }

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <Layout>
      {/* Hero Section with Video Background or Dynamic Slider */}
      <Hero />

      {/* Featured Cars Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            variants={fadeInUp}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-2">
              Featured Vehicles
            </h2>
            <div className="w-24 h-1 bg-primary mx-auto mb-4"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover our premium selection of featured vehicles
            </p>
          </motion.div>
          <FeaturedCars cars={featuredCar} />
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-5">
          <Image
            src="/images/pattern-bg.jpg"
            alt="Background pattern"
            fill
            className="object-cover"
            priority={false}
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-2">
              Why Choose Fruition Motors
            </h2>
            <div className="w-24 h-1 bg-primary mx-auto mb-4"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We provide an exceptional car buying experience with features you
              will love
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              variants={fadeInUp}
              className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 group"
            >
              <div className="bg-primary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors">
                <FaCheckCircle className="text-primary text-3xl" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-center">
                Quality Assurance
              </h3>
              <p className="text-gray-600 text-center">
                Every vehicle in our collection undergoes a rigorous inspection
                process to ensure top quality and reliability for your peace of
                mind.
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              variants={fadeInUp}
              className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 group"
            >
              <div className="bg-primary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors">
                <FaCar className="text-primary text-3xl" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-center">
                Extensive Selection
              </h3>
              <p className="text-gray-600 text-center">
                Browse through our curated collection of vehicles ranging from
                luxury sedans to powerful SUVs and cutting-edge electric cars.
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              variants={fadeInUp}
              className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 group"
            >
              <div className="bg-primary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors">
                <FaPhoneAlt className="text-primary text-3xl" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-center">
                Premium Support
              </h3>
              <p className="text-gray-600 text-center">
                Our dedicated team of automotive experts provides personalized
                support throughout your car buying journey.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-2">
              Explore Our Categories
            </h2>
            <div className="w-24 h-1 bg-primary mx-auto mb-4"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover the perfect vehicle for your needs from our diverse
              categories
            </p>
          </motion.div>

          {catData && catData.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {catData.map((category, index) => (
                <motion.div
                  key={category?.name}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  variants={fadeInUp}
                  className="bg-white rounded-xl shadow-lg overflow-hidden group"
                >
                  <Link
                    href={`/category/${
                      category._id || category.name
                    }/category-details`}
                    className="block"
                  >
                    <div className="relative h-64 overflow-hidden">
                      <Image
                        src={
                          category.image ||
                          "https://images.unsplash.com/photo-1556189250-72ba954cfc2b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        }
                        alt={category.name}
                        width={500}
                        height={300}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                      <div className="absolute bottom-0 left-0 p-6">
                        <h3 className="text-2xl font-bold text-white mb-2">
                          {category.name}
                        </h3>
                        <div className="flex items-center text-white">
                          <FaTags className="mr-2" />
                          <span className="text-white/90">
                            Premium Collection
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="p-6">
                      <p className="text-gray-600 mb-4">
                        {category.description ||
                          `Explore our collection of premium ${category.name} vehicles.`}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-primary font-medium">
                          View Collection
                        </span>
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                          <FaArrowRight className="text-primary group-hover:text-white" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-xl shadow-md">
              <FaCar className="text-primary/30 text-6xl mx-auto mb-6" />
              <p className="text-gray-600 text-xl mb-6">
                No categories available at the moment.
              </p>
              <button className="inline-flex items-center bg-primary text-white px-8 py-3 rounded-lg hover:bg-primary/90 transition font-medium">
                Check Back Soon
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}

      <section className="py-24 bg-gradient-to-r from-primary to-primary/80 relative overflow-hidden">
      <div className="absolute h-full w-full top-0 left-0 bg-[#32262662] inset-0  bg-opacity-50">
          <Image
            src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=2066&auto=format&fit=crop&ixlib=rb-4.0.3"
            alt="Background pattern"
            fill
            className="object-cover"
            priority={false}
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 text-white">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            variants={fadeInUp}
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Find Your Dream Car?
            </h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto mb-10">
              Browse our extensive collection of premium vehicles and drive home
              your perfect match today.
            </p>
            <Link
              href="/category"
              className="inline-flex items-center bg-red-600 text-white hover:bg-red-900 font-medium py-4 px-8 rounded-lg transition-colors shadow-lg hover:shadow-xl"
            >
              Explore Categories
              <FaArrowRight className="ml-2" />
            </Link>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
