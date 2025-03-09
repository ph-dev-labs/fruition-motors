'use client'
import React, { useState, useEffect } from "react";
import {
  Car as CarIcon,
  DollarSign,
  Package,
  Settings,
  Calendar,
  Fuel,
  Palette,
  Users,
  GaugeCircle,
  Upload,
  Plus,
  Type,
  BookOpen,
  Save,
  XCircle,
  Image as ImageIcon,
  Loader2,
} from "lucide-react";
import { uploadToCloudinary } from "../../../../utils/cloudinary";
import getSymbolFromCurrency from "currency-symbol-map";
import { Outfit } from "next/font/google";

const initialFormData = {
  title: "",
  description: "",
  price: 0,
  image_url: "",
  car_gallery: [],
  category: "",
  brand_name: "",
  model: "",
  year: "",
  fuel_type: "",
  color: "",
  seat: 0,
  type_of_gear: "",
};

const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
});

const CarForm = ({ onSubmit, isLoading, initialData, categoryData, mode = "create" }) => {
  const [formData, setFormData] = useState(initialFormData);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  
  // Gallery state
  const [galleryFiles, setGalleryFiles] = useState([]);
  const [galleryPreviews, setGalleryPreviews] = useState([]);
  const [galleryUrls, setGalleryUrls] = useState([]);

  // Form validation
  const [errors, setErrors] = useState({});
  const [formTouched, setFormTouched] = useState(false);

  useEffect(() => {
    if (initialData && mode === "update") {
      setFormData(initialData);
      setPreviewUrl(initialData.image_url);
      
      // Set gallery previews if updating
      if (initialData.car_gallery && initialData.car_gallery.length > 0) {
        if (typeof initialData.car_gallery === 'string' &&
            initialData.car_gallery.startsWith('[') &&
            initialData.car_gallery.endsWith(']')) {
          try {
            const parsedGallery = JSON.parse(initialData.car_gallery);
            setGalleryPreviews(parsedGallery);
            setGalleryUrls(parsedGallery);
          } catch (e) {
            console.error("Failed to parse car_gallery JSON", e);
            setGalleryPreviews([]);
            setGalleryUrls([]);
          }
        } else if (Array.isArray(initialData.car_gallery)) {
          setGalleryPreviews(initialData.car_gallery);
          setGalleryUrls(initialData.car_gallery);
        } else {
          console.error("car_gallery is in an unexpected format:", initialData.car_gallery);
          setGalleryPreviews([]);
          setGalleryUrls([]);
        }
      }
    }
  }, [initialData, mode]);

  // Validate form data
  useEffect(() => {
    if (!formTouched) return;
    
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.brand_name.trim()) newErrors.brand_name = "Brand name is required";
    if (!formData.description.trim()) newErrors.description = "Description is required";
    if (formData.price <= 0) newErrors.price = "Price must be greater than 0";
    if (!formData.category) newErrors.category = "Category is required";
    if (!formData.model.trim()) newErrors.model = "Model is required";
    if (!formData.year) newErrors.year = "Year is required";
    if (!formData.fuel_type) newErrors.fuel_type = "Fuel type is required";
    if (!formData.color.trim()) newErrors.color = "Color is required";
    if (formData.seat <= 0) newErrors.seat = "Seats must be greater than 0";
    if (!formData.type_of_gear) newErrors.type_of_gear = "Gear type is required";
    if (mode === "create" && !selectedFile && !previewUrl) newErrors.image = "Main image is required";
    
    setErrors(newErrors);
  }, [formData, selectedFile, previewUrl, formTouched, mode]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormTouched(true);
    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" || name === "seat" ? Number(value) : value,
    }));
  };

  const handleFileChange = (e) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setFormTouched(true);

      const fileUrl = URL.createObjectURL(file);
      setPreviewUrl(fileUrl);

      return () => URL.revokeObjectURL(fileUrl);
    }
  };

  const handleGalleryFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      setGalleryFiles((prev) => [...prev, ...newFiles]);
      setFormTouched(true);
      
      const newPreviews = newFiles.map(file => URL.createObjectURL(file));
      setGalleryPreviews((prev) => [...prev, ...newPreviews]);
      
      return () => {
        newPreviews.forEach(url => URL.revokeObjectURL(url));
      };
    }
  };

  const removeGalleryImage = (index) => {
    if (index < galleryUrls.length && mode === "update") {
      const updatedUrls = [...galleryUrls];
      updatedUrls.splice(index, 1);
      setGalleryUrls(updatedUrls);
      setGalleryPreviews((prev) => {
        const updated = [...prev];
        updated.splice(index, 1);
        return updated;
      });
      setFormData((prev) => ({
        ...prev,
        car_gallery: updatedUrls
      }));
    } else {
      const filesIndex = mode === "update" ? index - galleryUrls.length : index;
      if (filesIndex >= 0) {
        setGalleryFiles((prev) => {
          const updated = [...prev];
          updated.splice(filesIndex, 1);
          return updated;
        });
        setGalleryPreviews((prev) => {
          const updated = [...prev];
          updated.splice(index, 1);
          return updated;
        });
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormTouched(true);
    
    // Validate form before submission
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.brand_name.trim()) newErrors.brand_name = "Brand name is required";
    if (!formData.description.trim()) newErrors.description = "Description is required";
    if (formData.price <= 0) newErrors.price = "Price must be greater than 0";
    if (!formData.category) newErrors.category = "Category is required";
    if (!formData.model.trim()) newErrors.model = "Model is required";
    if (!formData.year) newErrors.year = "Year is required";
    if (!formData.fuel_type) newErrors.fuel_type = "Fuel type is required";
    if (!formData.color.trim()) newErrors.color = "Color is required";
    if (formData.seat <= 0) newErrors.seat = "Seats must be greater than 0";
    if (!formData.type_of_gear) newErrors.type_of_gear = "Gear type is required";
    if (mode === "create" && !selectedFile && !previewUrl) newErrors.image = "Main image is required";
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      // Scroll to the first error
      const firstErrorField = document.querySelector('.error-message');
      if (firstErrorField) {
        firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }
    
    try {
      setUploading(true);
      let imageUrl = formData.image_url;
      if (selectedFile) {
        imageUrl = await uploadToCloudinary(selectedFile);
      }
      
      let updatedGallery = [...galleryUrls];
      if (galleryFiles.length > 0) {
        const uploadPromises = galleryFiles.map(file => uploadToCloudinary(file));
        const newGalleryUrls = await Promise.all(uploadPromises);
        updatedGallery = [...updatedGallery, ...newGalleryUrls];
      }
      
      await onSubmit({ 
        ...formData, 
        image_url: imageUrl,
        car_gallery: updatedGallery
      });
      
      if (mode === "create") {
        setFormData(initialFormData);
        setSelectedFile(null);
        setPreviewUrl("");
        setGalleryFiles([]);
        setGalleryPreviews([]);
        setGalleryUrls([]);
        setFormTouched(false);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setUploading(false);
    }
  };

  const inputClassName = `block w-full px-4 py-3 rounded-lg border ${errors ? 'focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none' : 'border-gray-300'}`;
  const labelClassName = `block mb-2 font-medium text-gray-700 flex items-center gap-2`;

  // Determine if form is valid
  const isFormValid = Object.keys(errors).length === 0;
  const isSubmitDisabled = isLoading || uploading || !formTouched || !isFormValid;

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 w-full max-w-6xl mx-auto">
      <h2 className={`${outfit.className} text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2`}>
        <CarIcon size={24} className="text-blue-500" />
        {mode === "create" ? "Add New Vehicle" : "Update Vehicle Details"}
      </h2>
      
      <form onSubmit={handleSubmit} className={outfit.className}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Basic Information Section */}
          <div className="md:col-span-2 mb-2">
            <h3 className="text-lg font-semibold text-gray-700 pb-2 border-b border-gray-200">
              Basic Information
            </h3>
          </div>
          
          <div className="space-y-2">
            <label className={labelClassName}>
              <CarIcon size={18} className="text-blue-500" /> Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Enter car title"
              className={`${inputClassName} ${errors.title ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.title && <p className="mt-1 text-sm text-red-500 error-message">{errors.title}</p>}
          </div>

          <div className="space-y-2">
            <label className={labelClassName}>
              <Package size={18} className="text-blue-500" /> Brand Name
            </label>
            <input
              type="text"
              name="brand_name"
              value={formData.brand_name}
              onChange={handleInputChange}
              placeholder="Enter brand name"
              className={`${inputClassName} ${errors.brand_name ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.brand_name && <p className="mt-1 text-sm text-red-500 error-message">{errors.brand_name}</p>}
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className={labelClassName}>
              <BookOpen size={18} className="text-blue-500" /> Description
            </label>
            <textarea
              rows={4}
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Enter car description"
              className={`${inputClassName} ${errors.description ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.description && <p className="mt-1 text-sm text-red-500 error-message">{errors.description}</p>}
          </div>

          {/* Specifications Section */}
          <div className="md:col-span-2 pt-4 mb-2">
            <h3 className="text-lg font-semibold text-gray-700 pb-2 border-b border-gray-200">
              Vehicle Specifications
            </h3>
          </div>
          
          <div className="space-y-2">
            <label className={labelClassName}>
              <Type size={18} className="text-blue-500" /> Model
            </label>
            <input
              type="text"
              name="model"
              value={formData.model}
              onChange={handleInputChange}
              placeholder="Enter car model"
              className={`${inputClassName} ${errors.model ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.model && <p className="mt-1 text-sm text-red-500 error-message">{errors.model}</p>}
          </div>

          <div className="space-y-2">
            <label className={labelClassName}>
              <Calendar size={18} className="text-blue-500" /> Year
            </label>
            <input
              type="number"
              name="year"
              value={formData.year}
              onChange={handleInputChange}
              placeholder="Enter year"
              min="1900"
              max={new Date().getFullYear() + 1}
              className={`${inputClassName} ${errors.year ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.year && <p className="mt-1 text-sm text-red-500 error-message">{errors.year}</p>}
          </div>

          <div className="space-y-2">
            <label className={labelClassName}>
              <Fuel size={18} className="text-blue-500" /> Fuel Type
            </label>
            <select
              name="fuel_type"
              value={formData.fuel_type}
              onChange={handleInputChange}
              className={`${inputClassName} ${errors.fuel_type ? 'border-red-500' : 'border-gray-300'}`}
            >
              <option value="">Select fuel type</option>
              <option value="petrol">Petrol</option>
              <option value="diesel">Diesel</option>
              <option value="electric">Electric</option>
              <option value="hybrid">Hybrid</option>
            </select>
            {errors.fuel_type && <p className="mt-1 text-sm text-red-500 error-message">{errors.fuel_type}</p>}
          </div>

          <div className="space-y-2">
            <label className={labelClassName}>
              <Palette size={18} className="text-blue-500" /> Color
            </label>
            <input
              type="text"
              name="color"
              value={formData.color}
              onChange={handleInputChange}
              placeholder="Enter car color"
              className={`${inputClassName} ${errors.color ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.color && <p className="mt-1 text-sm text-red-500 error-message">{errors.color}</p>}
          </div>

          <div className="space-y-2">
            <label className={labelClassName}>
              <Users size={18} className="text-blue-500" /> Seats
            </label>
            <input
              type="number"
              name="seat"
              value={formData.seat}
              onChange={handleInputChange}
              placeholder="Enter number of seats"
              min="1"
              max="50"
              className={`${inputClassName} ${errors.seat ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.seat && <p className="mt-1 text-sm text-red-500 error-message">{errors.seat}</p>}
          </div>

          <div className="space-y-2">
            <label className={labelClassName}>
              <GaugeCircle size={18} className="text-blue-500" /> Type of Gear
            </label>
            <select
              name="type_of_gear"
              value={formData.type_of_gear}
              onChange={handleInputChange}
              className={`${inputClassName} ${errors.type_of_gear ? 'border-red-500' : 'border-gray-300'}`}
            >
              <option value="">Select gear type</option>
              <option value="manual">Manual</option>
              <option value="automatic">Automatic</option>
              <option value="cvt">CVT</option>
              <option value="hybrid">Hybrid</option>
            </select>
            {errors.type_of_gear && <p className="mt-1 text-sm text-red-500 error-message">{errors.type_of_gear}</p>}
          </div>

          <div className="space-y-2">
            <label className={labelClassName}>
              <Settings size={18} className="text-blue-500" /> Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className={`${inputClassName} ${errors.category ? 'border-red-500' : 'border-gray-300'}`}
            >
              <option value="">Select category</option>
              {categoryData?.map((category, index) => (
                <option key={index} value={category?.name}>
                  {category.name}
                </option>
              ))}
            </select>
            {errors.category && <p className="mt-1 text-sm text-red-500 error-message">{errors.category}</p>}
          </div>

          <div className="space-y-2">
            <label className={labelClassName}>
              <DollarSign size={18} className="text-blue-500" /> Price
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <span className="text-gray-500">{getSymbolFromCurrency("NGN")}</span>
              </div>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                placeholder="Enter price"
                min="0"
                className={`${inputClassName} pl-8 ${errors.price ? 'border-red-500' : 'border-gray-300'}`}
              />
            </div>
            {errors.price && <p className="mt-1 text-sm text-red-500 error-message">{errors.price}</p>}
          </div>

          {/* Images Section */}
          <div className="md:col-span-2 pt-4 mb-2">
            <h3 className="text-lg font-semibold text-gray-700 pb-2 border-b border-gray-200">
              Vehicle Images
            </h3>
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className={labelClassName}>
              <Upload size={18} className="text-blue-500" /> Main Image
            </label>
            <div className="flex items-center gap-4">
              <label className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer ${errors.image ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-gray-50 hover:bg-gray-100'}`}>
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-8 h-8 mb-3 text-gray-400" />
                  <p className="mb-1 text-sm text-gray-500">Click to upload main image</p>
                  <p className="text-xs text-gray-500">PNG, JPG or JPEG (MAX. 5MB)</p>
                </div>
                <input
                  type="file"
                  onChange={handleFileChange}
                  accept="image/*"
                  className="hidden"
                />
              </label>
              
              {previewUrl && (
                <div className="relative">
                  <img
                    src={previewUrl}
                    alt="Car preview"
                    className="h-32 w-auto rounded-lg object-cover"
                  />
                  <button
                    type="button"
                    className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full"
                    onClick={() => {
                      setPreviewUrl("");
                      setSelectedFile(null);
                    }}
                  >
                    <XCircle size={16} />
                  </button>
                </div>
              )}
            </div>
            {errors.image && <p className="mt-1 text-sm text-red-500 error-message">{errors.image}</p>}
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className={labelClassName}>
              <ImageIcon size={18} className="text-blue-500" /> Gallery Images
              <span className="ml-2 text-sm font-normal text-gray-500">
                ({Array.isArray(galleryPreviews) ? galleryPreviews.length : 0} selected)
              </span>
            </label>
            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer border-gray-300 bg-gray-50 hover:bg-gray-100">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <ImageIcon className="w-8 h-8 mb-3 text-gray-400" />
                <p className="mb-1 text-sm text-gray-500">Click to upload gallery images</p>
                <p className="text-xs text-gray-500">PNG, JPG or JPEG (MAX. 5MB)</p>
              </div>
              <input
                type="file"
                onChange={handleGalleryFileChange}
                accept="image/*"
                multiple
                className="hidden"
              />
            </label>

            {galleryPreviews && Array.isArray(galleryPreviews) && galleryPreviews.length > 0 && (
              <div className="mt-4">
                <div className="flex flex-wrap gap-3">
                  {galleryPreviews.map((url, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={url}
                        alt={`Gallery preview ${index + 1}`}
                        className="rounded-lg"
                        style={{ width: "120px", height: "90px", objectFit: "cover" }}
                      />
                      <button
                        type="button"
                        className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => removeGalleryImage(index)}
                      >
                        <XCircle size={16} />
                      </button>
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all rounded-lg"></div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <button
            type="button"
            className="px-6 py-3 mr-3 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors"
            onClick={() => {
              // Implement cancel functionality here
              if (window.confirm("Are you sure you want to cancel? All unsaved changes will be lost.")) {
                // Reset form or navigate away
              }
            }}
          >
            Cancel
          </button>
          
          <button
            type="submit"
            disabled={isSubmitDisabled}
            className={`px-6 py-3 rounded-lg bg-blue-600 text-white flex items-center gap-2 transition-all
              ${isSubmitDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'}`}
          >
            {isLoading || uploading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                {mode === "create" ? "Adding..." : "Updating..."}
              </>
            ) : (
              <>
                {mode === "create" ? (
                  <>
                    <Plus size={18} /> Add Vehicle
                  </>
                ) : (
                  <>
                    <Save size={18} /> Update Vehicle
                  </>
                )}
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CarForm;