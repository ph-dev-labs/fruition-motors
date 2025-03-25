"use client";
import { useState } from "react";
import Layout from "../../components/layout";
import {
  FaCarAlt,
  FaCheckCircle,
  FaUpload,
  FaTimesCircle,
} from "react-icons/fa";
import Image from "next/image";
import { useSellCar } from "../../hooks/useGetCars";
import { uploadToCloudinary } from "../../utils/cloudinary";

export default function SellYourCarPage() {
  const [formData, setFormData] = useState({
    fullname: "",
    phone: "",
    email: "",
    make: "",
    model: "",
    year: "",
    transmission: "",
    color: "",
    condition: "",
    description: "", // Added description field
    location: "", // Added location field
    price: "", // Added price field
    images: [],
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const sellCar = useSellCar();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const newFiles = Array.from(e.target.files);
    setFormData((prev) => {
      // Combine existing images with new ones and limit to 5
      const updatedImages = [...prev.images, ...newFiles].slice(0, 5);
      return { ...prev, images: updatedImages };
    });

    // Reset the input value so the same file can be selected again if needed
    e.target.value = "";
  };

  const handleRemoveImage = (indexToRemove) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, index) => index !== indexToRemove),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setUploadProgress(0);

    try {
      // Process images
      let imageUrls = [];

      if (formData.images.length > 0) {
        // Upload each image to Cloudinary and collect the returned URLs
        const totalImages = formData.images.length;

        for (let i = 0; i < totalImages; i++) {
          const imageFile = formData.images[i];

          // Upload the image to Cloudinary
          const imageUrl = await uploadToCloudinary(imageFile);
          imageUrls.push(imageUrl);

          // Update progress after each upload
          setUploadProgress(Math.round(((i + 1) / totalImages) * 100));
        }
      }

      // Create the final submission data with image URLs
      const submissionData = {
        fullname: formData.fullname,
        phone: formData.phone,
        email: formData.email,
        make: formData.make,
        model: formData.model,
        year: formData.year,
        transmission: formData.transmission,
        color: formData.color,
        condition: formData.condition,
        description: formData.description, // Added description field
        location: formData.location, // Added location field
        price: formData.price, // Added price field
        images: imageUrls,
      };

      // Send data to backend using the hook
      await sellCar.mutate(submissionData);

      setSubmitSuccess(true);

      // Reset form after submission
      setFormData({
        fullname: "",
        phone: "",
        email: "",
        make: "",
        model: "",
        year: "",
        transmission: "",
        color: "",
        condition: "",
        description: "", // Reset description field
        location: "", // Reset location field
        price: "", // Reset price field
        images: [],
      });
    } catch (error) {
      console.error("Submission error:", error);
      alert("Failed to submit your car details. Please try again.");
    } finally {
      setIsSubmitting(false);
      setUploadProgress(0);
    }
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-red-600 to-red-500 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold mb-4">
              Sell Your Car with Fruition Motors
            </h1>
            <p className="text-xl opacity-90 mb-8">
              Get a competitive offer for your vehicle and enjoy a hassle-free
              selling experience
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
                Fill out the form with information about your vehicle and
                contact details.
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-xl text-center">
              <div className="bg-red-600 bg-opacity-10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaCheckCircle className="text-red-600 text-2xl" />
              </div>
              <h3 className="text-xl font-bold mb-2">Get an Offer</h3>
              <p className="text-gray-600">
                Our team will evaluate your car and provide you with a
                competitive offer.
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-xl text-center">
              <div className="bg-red-600 bg-opacity-10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaCheckCircle className="text-red-600 text-2xl" />
              </div>
              <h3 className="text-xl font-bold mb-2">Complete the Sale</h3>
              <p className="text-gray-600">
                Accept the offer, complete the necessary paperwork, and receive
                your payment.
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
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Sell Your Car
              </h2>

              {submitSuccess ? (
                <div className="text-center py-8">
                  <div className="bg-green-100 text-green-800 p-4 rounded-xl mb-6">
                    <FaCheckCircle className="text-green-500 text-4xl mx-auto mb-4" />
                    <h3 className="text-xl font-bold mb-2">Thank You!</h3>
                    <p>
                      Your car details have been submitted successfully. Our
                      team will contact you shortly.
                    </p>
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
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-100">
                      Contact Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label
                          htmlFor="fullname"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Full Name
                        </label>
                        <input
                          type="text"
                          id="fullname"
                          name="fullname"
                          value={formData.fullname}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-red-600 outline-none transition"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="phone"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-red-600 outline-none transition"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Email
                        </label>
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
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-100">
                      Car Details
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label
                          htmlFor="make"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Make
                        </label>
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
                        <label
                          htmlFor="model"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Model
                        </label>
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
                        <label
                          htmlFor="year"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Year of Manufacture
                        </label>
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
                        <label
                          htmlFor="transmission"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Transmission
                        </label>
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
                        <label
                          htmlFor="color"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Color
                        </label>
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
                        <label
                          htmlFor="condition"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Condition
                        </label>
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
                      <div>
                        <label
                          htmlFor="location"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Location
                        </label>
                        <input
                          type="text"
                          id="location"
                          name="location"
                          value={formData.location}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-red-600 outline-none transition"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="price"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Asking Price (₦)
                        </label>
                        <input
                          type="text"
                          id="price"
                          name="price"
                          value={formData.price}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-red-600 outline-none transition"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label
                          htmlFor="description"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Description
                        </label>
                        <textarea
                          id="description"
                          name="description"
                          value={formData.description}
                          onChange={handleChange}
                          required
                          rows={4}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-red-600 outline-none transition"
                          placeholder="Provide additional details about your car..."
                        ></textarea>
                      </div>
                    </div>
                  </div>

                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-100">
                      Car Photos
                    </h3>
                    <div
                      className="mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg"
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={(e) => {
                        e.preventDefault();
                        const files = Array.from(e.dataTransfer.files).filter(
                          (file) => file.type.startsWith("image/")
                        );
                        setFormData((prev) => ({
                          ...prev,
                          images: [...prev.images, ...files].slice(0, 5),
                        }));
                      }}
                    >
                      <div className="space-y-1 text-center">
                        <FaUpload className="mx-auto h-12 w-12 text-gray-400" />
                        <div className="flex text-sm text-gray-600">
                          <label
                            htmlFor="fileUpload"
                            className="relative cursor-pointer rounded-md font-medium text-red-600 hover:text-red-500"
                          >
                            <span>Upload files</span>
                            <input
                              id="fileUpload"
                              name="fileUpload"
                              type="file"
                              className="sr-only"
                              multiple
                              accept="image/*"
                              onChange={handleImageUpload}
                            />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">
                          PNG, JPG, GIF up to 10MB (Maximum 5 photos)
                        </p>
                        <p className="text-xs text-gray-500">
                          {formData.images.length}/5 photos selected
                        </p>
                      </div>
                    </div>
                    {formData.images.length > 0 && (
                      <div className="mt-4">
                        <p className="text-sm text-gray-700 mb-2">
                          {formData.images.length} file(s) selected
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {formData.images.map((file, index) => (
                            <div
                              key={index}
                              className="h-20 w-20 relative bg-gray-100 rounded-md overflow-hidden group"
                            >
                              <div className="absolute inset-0 flex items-center justify-center">
                                {/* Create image previews */}
                                {file.type.startsWith("image/") && (
                                  <Image
                                    src={URL.createObjectURL(file)}
                                    alt={`Preview ${index}`}
                                    fill
                                    style={{ objectFit: "cover" }}
                                    onLoad={(event) => {
                                      URL.revokeObjectURL(event.target.src);
                                    }}
                                  />
                                )}
                              </div>
                              <button
                                type="button"
                                className="absolute top-0 right-0 bg-red-600 text-white p-1 rounded-bl-md opacity-0 group-hover:opacity-100 transition-opacity"
                                onClick={() => handleRemoveImage(index)}
                              >
                                <FaTimesCircle size={14} />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {isSubmitting && uploadProgress > 0 && (
                    <div className="mb-6">
                      <p className="text-sm font-medium text-gray-700 mb-1">
                        Uploading images: {uploadProgress}%
                      </p>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                          className="bg-red-600 h-2.5 rounded-full"
                          style={{ width: `${uploadProgress}%` }}
                        ></div>
                      </div>
                    </div>
                  )}

                  <div className="text-center">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full md:w-auto bg-red-600 text-white py-3 px-8 rounded-xl font-medium hover:bg-red-700 transition-colors ${
                        isSubmitting ? "opacity-75 cursor-not-allowed" : ""
                      }`}
                    >
                      {isSubmitting ? "Submitting..." : "Submit Car Details"}
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
            <div className="bg-gray-50 p-6 rounded-xl shadow-sm">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-gray-300 flex items-center justify-center mr-4">
                  <span className="text-xl font-bold text-gray-600">CH</span>
                </div>
                <div>
                  <h4 className="font-bold">Chimaobi</h4>
                  <p className="text-sm text-gray-600">Mercedes Cla 250</p>
                </div>
              </div>
              <p className="text-gray-700">
                Sold my Mercedes in just 3 days. The offer was better than what
                I could get elsewhere. Highly recommended!
              </p>
              <p className="text-sm text-gray-600">Owerri, Nigeria</p>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl shadow-sm">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-gray-300 flex items-center justify-center mr-4">
                  <span className="text-xl font-bold text-gray-600">PI</span>
                </div>
                <div>
                  <h4 className="font-bold">Princess Igwe</h4>
                  <p className="text-sm text-gray-600">Toyota Camry 2015</p>
                </div>
              </div>
              <p className="text-gray-700">
                I was hesitant at first, but the team made me feel comfortable
                throughout the entire selling process.
              </p>
              <p className="text-sm text-gray-600">Rivers, Nigeria</p>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl shadow-sm">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-gray-300 flex items-center justify-center mr-4">
                  <span className="text-xl font-bold text-gray-600">FO</span>
                </div>
                <div>
                  <h4 className="font-bold">Favour O</h4>
                  <p className="text-sm text-gray-600">Honda Accord</p>
                </div>
              </div>
              <p className="text-gray-700">
                The process was incredibly smooth. I got a fair price for my
                Honda and the payment was processed quickly.
              </p>
              <p className="text-sm text-gray-600">Bayelsa, Nigeria</p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
