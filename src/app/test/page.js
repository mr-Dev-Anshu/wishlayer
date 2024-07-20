import ImageCard from "@/components/ImageCard";
import React from "react";
import offer1 from "@/assets/offer1.png";
import ProductCard2 from "@/components/ProductCard2";
const page = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <ProductCard2 discount={40} img={offer1} />
    </div>
  );
};

export default page;
