// utils/carData.js
export const cars = [
    {
      id: "1",
      title: "Nissan contour",
      description: "Built for the big road",
      image_url: "https://res.cloudinary.com/dvr3dya4e/image/upload/v1740356303/vjefnftvausn5o3nrwhc.jpg",
      car_gallery: ["https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1966&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"],
      price: "40000000",
      category: "sedan",
      brand_name: "Nissan",
      model: "Camry xle 2023",
      year: "2024",
      fuel_type: "electric",
      color: "black",
      seat: "0",
      type_of_gear: "hybrid",
      created_at: "2025-02-20 12:46:45.956427"
    },
    {
      id: "2",
      title: "Tesla Model S",
      description: "The future of electric cars",
      image_url: "https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      car_gallery: ["https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", "https://images.unsplash.com/photo-1560958089-b8a1929cea89?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"],
      price: "85000000",
      category: "electric",
      brand_name: "Tesla",
      model: "Model S Plaid",
      year: "2025",
      fuel_type: "electric",
      color: "white",
      seat: "5",
      type_of_gear: "automatic",
      created_at: "2025-01-15 09:30:22.123456"
    },
    {
      id: "3",
      title: "BMW X7",
      description: "Luxury reimagined",
      image_url: "https://images.unsplash.com/photo-1556189250-72ba954cfc2b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      car_gallery: ["https://images.unsplash.com/photo-1556189250-72ba954cfc2b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"],
      price: "95000000",
      category: "suv",
      brand_name: "BMW",
      model: "X7 M50i",
      year: "2024",
      fuel_type: "gasoline",
      color: "blue",
      seat: "7",
      type_of_gear: "automatic",
      created_at: "2025-01-30 14:22:45.789012"
    },
    {
      id: "4",
      title: "Honda Civic",
      description: "Reliable and efficient",
      image_url: "https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?q=80&w=2067&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      car_gallery: ["https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?q=80&w=2067&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"],
      price: "28000000",
      category: "sedan",
      brand_name: "Honda",
      model: "Civic Touring",
      year: "2024",
      fuel_type: "hybrid",
      color: "silver",
      seat: "5",
      type_of_gear: "automatic",
      created_at: "2025-02-10 11:15:33.654321"
    },
  ];
  
  export const getCarById = (id) => {
    return cars.find(car => car.id === id);
  };
  
  export const getCarsByCategory = (category) => {
    if (!category) return cars;
    return cars.filter(car => car.category.toLowerCase() === category.toLowerCase());
  };
  
  export const getAllCategories = () => {
    const categories = [...new Set(cars.map(car => car.category))];
    return categories;
  };
  
  export const formatPrice = (price) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      currencyDisplay: 'symbol',
      minimumFractionDigits: 0,
    }).format(price);
  };