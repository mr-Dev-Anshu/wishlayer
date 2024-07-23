"use client";
import Image from "next/image";
import React, { useState } from "react";
import img1 from "@/assets/cakeIcons.png";

const CakeProductInfo = () => {
  const [weight, setWeight] = useState();

  return (
    <div className="px-4 md:px-12 space-y-8 md:mr-20">
      <div className="flex flex-col md:flex-row md:gap-6 items-center">
        <span className="mb-2 md:mb-0">
          <Image
            src={
              "https://firebasestorage.googleapis.com/v0/b/news-f534b.appspot.com/o/eggless.webp?alt=media&token=785cbd2c-0463-4c02-960a-2766ac36ae78"
            }
            height={40}
            width={40}
          />
        </span>
        <h1 className="text-xl md:text-2xl font-semibold text-center md:text-left">
          Our Classic Chocolate Truffel Cake{" "}
        </h1>
        <p className="text-center md:text-left">Like this</p>
      </div>
      <div>
        <span className="text-xl md:text-2xl mr-2">
          4.5/5 <span className="text-xl md:text-2xl text-yellow-500">★</span> (245)
        </span>
      </div>
      <div className="border-b border-gray-600 border-dotted"></div>
      <div className="md:flex   flex-col md:flex-row gap-2 md:gap-4 text-lg md:text-xl font-semibold items-center">
        <span className="line-through text-gray-500 ml-2">₹450</span>
        <span className="text-red-500 ml-2">₹400</span>
        <span className="text-green-500 ml-2">(9% OFF)</span>
        <span className="text-sm ml-2">(inclusive of GST)</span>
      </div>
      <div className="flex flex-wrap gap-2 md:gap-4 font-semibold">
        {["0.5Kg", "1Kg", "2Kg", "4Kg"].map((item) => (
          <span
            onClick={() => setWeight(item)}
            className={`p-2 cursor-pointer rounded-md border-gray-400 border w-20 text-center ${
              weight === item ? "border-red-500 text-black" : "text-gray-400"
            }`}
            key={item}
          >
            {item}
          </span>
        ))}
      </div>
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
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Mollitia,
          temporibus!...{" "}
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
