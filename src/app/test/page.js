'use client'
import ImageCard from "@/components/ImageCard";
import React, { useEffect } from "react";
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
import LoginPage from "@/components/auth/login";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/config/firebase.config";
import VenueInfo from "@/components/Productpage/VenueInfo";
import ProductSuggestionCard from "@/components/Productpage/SuggestProducts";
import { CakeData } from "@/constant/CakeData";
const page = () => {
  return (
    <div className="flex justify-between">
     <ProductSuggestionCard product={CakeData} />
    </div>
  );
};
export default page;
