import { offerData } from "@/constant/offerData";
import React from "react";
import ImageCard from "./ImageCard";
import Link from "next/link";

const OfferPage = () => {
  return (
    <div className="px-4 py-6 md:px-48 md:py-10">
      <div className="">
        <p className="flex justify-center font-semibold text-red-500">
          India's Best Event Company
        </p>
        <p className="flex justify-center text-2xl md:text-4xl font-bold mt-4">
          Our Offerings
        </p>
        <div className="flex justify-center mt-2">
          <div className="w-10 h-1 md:w-14 md:h-2 bg-[#F0642966] rounded-lg"></div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:pl-10 md:grid-cols-4 items-center space-y-4 mt-12">
        {offerData.map((item, index) => (
          <div key={index} className="col-span-1 md:col-span-2">
            <Link href={item.to}>
              <ImageCard img={item.img} heading={item.heading} />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OfferPage;
