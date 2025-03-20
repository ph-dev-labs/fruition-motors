import axiosInstance from '../libs/axios'
import { useQuery } from '@tanstack/react-query';
// import axios from 'axios';

const fetchCars = async () => {
  const { data } = await axiosInstance.get('/cars');
  return data.cars;
};

export function useCars() {
  return useQuery({
    queryKey: ['cars'],
    queryFn: fetchCars
  });
}

export const useGetCarsByCategory = (category) => {
  return useQuery({
    queryKey: [`cars`, category], // Unique key for caching
    queryFn: async () => {
      const { data } = await axiosInstance.get('/cars', {
        params: {
          cat: category, // Set the query parameter
        },
      });

      return data; // Adjust based on your API response structure
    },
    enabled: !!category, // Only run the query if category is defined
  });
};

export const useGetFeaturedListing = () => {
  return useQuery({
    queryKey: [`carsFeatured`], // Unique key for caching
    queryFn: async () => {
      const { data } = await axiosInstance.get('/carlisting');

      return data; // Adjust based on your API response structure
    },
  });
};


export const useGetCarsById = (id) => {
  return useQuery({
    queryKey: [`cars`, id], // Unique key for caching
    queryFn: async () => {
      const { data } = await axiosInstance.get('/cars', {
        params: {
          id: id, // Set the query parameter
        },
      });

      return data; // Adjust based on your API response structure
    },
    enabled: !!id, // Only run the query if category is defined
  });
};