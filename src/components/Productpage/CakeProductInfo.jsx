"use client";
import Image from "next/image";
import React, { useState } from "react";
import img1 from "@/assets/cakeIcons.png";

const CakeProductInfo = ({ data }) => {
  const [weight, setWeight] = useState();
  const [discountedPrice, setDiscountedPrice] = useState();

  const [mainPrice, setMainPrice] = useState();
  const handleMainPrice = (value) => {
    setMainPrice(value);
  };
  const handleDiscountedPrice = (value) => {
    setDiscountedPrice(value);
  };
  return (
    <div className="px-4 md:px-12 space-y-8 md:mr-20">
      <div className="flex flex-col md:flex-row md:gap-6 items-center">
        <span className="mb-2 md:mb-0">
          <Image src={img1} height={40} width={40} />
        </span>
        <h1 className="text-xl md:text-2xl font-semibold text-center md:text-left">
          {data.title}
        </h1>
        <p className="text-center md:text-left">Like this</p>
      </div>
      <div>
        <span className=" md:text-2xl mr-2">
          4.5/5 <span className="text-xl md:text-2xl text-yellow-500">★</span>{" "}
          (245)
        </span>
      </div>
      <div className="border-b border-gray-600 border-dotted"></div>
      <div className="md:flex   flex-col md:flex-row gap-2 md:gap-4 text-lg md:text-xl font-semibold items-center">
        <span className="line-through text-gray-500 ml-2">
          ₹{mainPrice || data.mainPrice}
        </span>
        <span className="text-red-500 ml-2">
          ₹{discountedPrice || data.discountedPrice}
        </span>
        <span className="text-green-500 ml-2">({data.discount}% OFF)</span>
        <span className="text-sm ml-2">(inclusive of GST)</span>
      </div>
      {data.weightPrice.length > 1 ? (
        <div className="flex flex-wrap gap-2 md:gap-4 font-semibold">
          {data.weightPrice.map((item) => (
            <span
              onClick={() => {
                setWeight(item.weight);
                handleMainPrice(item.mainPrice);
                handleDiscountedPrice(item.discountedPrice);
              }}
              className={`p-2 cursor-pointer rounded-md border-gray-400 border w-20 text-center ${
                weight === item.weight
                  ? "border-red-500 text-black"
                  : "text-gray-400"
              }`}
              key={item.weight}
            >
              {item.weight}KG
            </span>
          ))}
        </div>
      ) : null}
      <div>
        {data.weightPrice.length > 1 ? (
          <div>
            <p className="flex justify-between font-semibold items-center">
              <span>Cake Message</span>
              <span className="text-gray-500">0/25</span>
            </p>
            <input
              className="w-full p-3 rounded-md focus:outline-none border border-gray-400 focus:border-green-600"
              type="text"
              placeholder="Enter Message on Cake"
            />
          </div>
        ) : null}

        <div className="mt-4 md:mt-9">
          <p className="font-semibold">Delivery Location</p>
          <div className="grid md:grid-cols-3 gap-4 items-center">
            <div className="col-span-2">
              <input
                placeholder="Enter Your City"
                className="w-full p-3 rounded-md focus:outline-none border border-gray-400 focus:border-green-600"
                type="text"
              />
              <p className="text-sm text-[#F5A623]">
                Available in limited city*
              </p>
            </div>
            <div className="col-span-1">
              <button className="bg-[#251D34] p-3 md:mb-4 text-white font-semibold rounded-lg w-full">
                Check Availability
              </button>
            </div>
          </div>
        </div>
      </div>
      <div>
        <h1 className="text-lg font-semibold">Product Description</h1>
        <p>
          {data.description}
          <span className="text-[#43A1F0] cursor-pointer">Read more</span>
        </p>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="border border-[#F06429] text-[#F06429] flex justify-center items-center py-2 font-bold rounded-md cursor-pointer hover:bg-[#F06429] hover:text-white">
          Add to cart
        </div>
        <div className="bg-[#F06429] text-white flex justify-center items-center py-2 rounded-md cursor-pointer hover:bg-[#853513]">
          Buy Now | ₹400
        </div>
      </div>
      <div className="flex justify-center md:justify-start md:gap-24">
        <Image src={img1} alt="Cake Icon" />
      </div>
    </div>
  );
};

export default CakeProductInfo;
