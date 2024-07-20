// src/components/ProductCard.js
"use client";
import React from "react";
import Image from "next/image";

const ProductCard2 = ({ img, discount, title, price }) => {
  const totalStars = 5; // Total number of stars in the rating system
  const filledStars = Math.round(3); // Round rating to nearest whole number
  return (
    <div className="relative w-full max-w-sm  rounded-lg overflow-hidden shadow-lg">
      {/* Background Image */}
      <div className="relative  w-[400px] h-[350px]">
        <Image
          src={img}
          alt="Product Image"
          layout="fill"
          objectFit="cover"
          className="absolute inset-0 rounded-lg "
        />
        {/* Discount Badge */}
        {discount && (
          <div className="absolute top-4 left-4 bg-black text-white   text-sm font-bold px-2 py-1 rounded-full">
            -{discount}
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="p-4">
        <p className="  flex justify-center  text-xl font-medium my-2">
          {title}{" "}
        </p>
        <p className="text-yellow-500 text-xl flex justify-center ">
          {Array.from({ length: totalStars }).map((_, index) => (
            <span key={index}>{index < filledStars ? "★" : "☆"}</span>
          ))}
        </p>
        <div className="mt-4 flex justify-center ">
          <span className="text-lg font-bold text-gray-900">${price}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard2;
