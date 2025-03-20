// app/cars/[slug]/page.tsx
"use client";

import React from "react";
import { Container, Card } from "react-bootstrap";
import { Car } from "lucide-react";
import { Outfit } from "next/font/google";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import axios from "../../../../libs/axios";
import { toast } from "react-hot-toast";
import { useParams } from "next/navigation";
import Navigation from "../components/Navigation";
import CarForm from "../components/carForm";


const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
});

function FeaturedPage() {
  const params = useParams();
  const slug = params.slug;
  const mode = slug === "new" || slug === "featured-listing"? "create" : "update";
  const carId = mode === "update" ? slug : null;
  const queryClient = useQueryClient();
  

  // Fetch car data if in update mode
  const { data: carData, isLoading: isLoadingCar } = useQuery({
    queryKey: ["car", carId],
    queryFn: async () => {
      if (!carId || mode === "create") return null;
      const response = await axios.get("/car", {
        params: { id: carId },
      });
      return response.data;
    },
    enabled: mode === "update",
  });

  const createCarMutation = useMutation({
    mutationFn: async (carData) => {
      const response = await axios.post("/createListing", carData);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cars"] });
      toast.success("Car added successfully!");
      // router.push('/cars'); // Redirect to cars list
    },
    onError: (error) => {
      toast.error(`Failed to add car: ${error.message}`);
    },
  });

  

  const handleSubmit = async (data) => {
    
      createCarMutation.mutate(data);
    
  };

  const {
    data,
    isLoading: catLoading,
    error: catError,
  } = useQuery({
    queryKey: ["allCategories"],
    queryFn: async () => {
      const response = await axios.get("/getCategory");
      return response.data?.category;
    },
  });

  if ((mode === "update" && isLoadingCar) || catLoading) {
    return (
      <>
        <Navigation />
        <Container
          fluid
          className={`py-4 bg-light min-vh-100 ${outfit.className}`}
        >
          <div>Loading...</div>
        </Container>
      </>
    );
  }

  return (
    <>
      <Navigation />
      <Container
        fluid
        className={`py-4 bg-light min-vh-100 ${outfit.className}`}
      >
        <Card className="border-0 shadow-sm">
          <Card.Header className="bg-primary text-white">
            <h4 className="mb-0 d-flex align-items-center gap-2">
              <Car size={24} />{" "}
              Add New feature  Car
            </h4>
          </Card.Header>
          <Card.Body>
            <CarForm
              onSubmit={handleSubmit}
              isLoading={
               
                   createCarMutation.isPending
                 
              }
              initialData={carData?.car}
              categoryData={data}
              mode={mode}
            />
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}

export default FeaturedPage
