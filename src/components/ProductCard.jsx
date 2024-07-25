// src/components/ProductCard.js
"use client";
import React from "react";
import Image from "next/image";

const ProductCard = ({ img, discount, title, price }) => {
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
        <div className="flex justify-center ">
          <div className="relative w-[80%]">
            <select className="focus:outline-none border-gray-300 border-2 w-full px-4 py-2 rounded-full text-gray-500 bg-white appearance-none">
              <option value="">Option1</option>
              <option value="">Option2</option>
              <option value="">Option3</option>
            </select>
            <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </span>
          </div>
        </div>
        <p className="  flex justify-center  md:text-xl font-medium my-2">
          {title}{" "}
        </p>
        <div className="mt-4 flex justify-center ">
          <span className="text-lg font-bold text-gray-900">${price}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
