import ImageCard from "@/components/ImageCard";
import React from "react";
import offer1 from "@/assets/offer1.png";
import ProductCard2 from "@/components/ProductCard2";
import ImageFooter from "@/components/Footer/ImageFooter";
import Image from "next/image";
import Products from "@/components/Productpage/Products";
import ProductInfo from "@/components/Productpage/CakeProductInfo";
import RatingAndReview from "@/components/Productpage/RatingAndReview";
import Filter from "@/components/Products/Filter";
import ProductList from "@/components/Products/ProductList";
import RoomInfo from "@/components/Productpage/RoomInfo";
import AuthPage from "@/components/auth/AuthPage";
const page = () => {
  return (
    <div className="flex justify-between">
       <AuthPage/> 
    </div>
  );
};

export default page;
