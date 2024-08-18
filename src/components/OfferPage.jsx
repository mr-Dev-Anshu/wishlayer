"use client";
import { offerData } from "@/constant/offerData";
import React, { useContext } from "react";
import ImageCard from "./ImageCard";
import { filterContext } from "@/context/FilterContext";
import { useRouter } from "next/navigation";

const OfferPage = () => {
  const { setFilterData } = useContext(filterContext);
  const router = useRouter();

  const handleClick = (item) => {
    setFilterData((prev) =>
      prev.includes(item) ? prev.filter((ele) => ele !== item) : [item]
    );
    router.push("/allproducts");
  };

  return (
    <div className="px-4 py-6 md:px-48 md:py-10">
      <div className="">
        <p className="flex justify-center font-semibold text-red-500">
          Celebrate Moments, Create Memories.
        </p>
        <p className="flex justify-center text-2xl md:text-4xl font-bold mt-4">
          Our Offerings
        </p>
        <div className="flex justify-center mt-2">
          <div className="w-10 h-1 md:w-20 md:h-2 bg-[#F0642966] rounded-lg"></div>
        </div>
      </div>
      <div className="grid grid-cols-1 justify-center  md:pl-10 md:grid-cols-4 items-center space-y-4 mt-12">
        {offerData.map((item, index) => (
          <div
            onClick={() => handleClick(item.to)}
            key={index}
            className="col-span-1 cursor-pointer   md:col-span-2"
          >
            <ImageCard img={item.img} heading={item.heading} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default OfferPage;
