"use client";
import React from "react";
import Image from "next/image";

const ProductCard2 = ({ img, discount, title, price, rating , id , type }) => {
  const totalStars = 5; // Total number of stars in the rating system
  const filledStars = Math.round(rating); // Round rating to nearest whole number

  return (
    <div>
      <div className="relative w-full min-h-[260px] px-2 md:px-2 md:min-h-[400px] rounded-lg overflow-hidden shadow-lg">
        {/* Background Image */}
        <div className="relative w-full h-[150px] md:h-[250px]">
          <Image
            src={img}
            alt="Product Image"
            layout="fill"
            objectFit="cover"
            className="absolute inset-0 rounded-lg"
          />
          {/* Discount Badge */}
          {discount && (
            <div className="absolute top-2 left-2 md:top-4 md:left-4 bg-black text-white text-xs md:text-sm font-bold px-1 md:px-2 py-0.5 md:py-1 rounded-full">
              -{discount}%
            </div>
          )}
        </div>

        {/* Card Content */}
        <div className="p-1 md:p-4">
          <p className="text-center text-sm md:text-sm font-semibold my-1 md:my-2">
            {title}
          </p>
          <p className="text-yellow-500 text-lg md:text-xl flex justify-center">
            {Array.from({ length: totalStars }).map((_, index) => (
              <span key={index}>{index < filledStars ? "★" : "☆"}</span>
            ))}
          </p>
          <div className="mt-1 md:mt-4 flex justify-center">
            {price && (
              <span className="text-sm font-semibold md:text-lg md:font-bold text-gray-900">
                ₹{price}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard2;
