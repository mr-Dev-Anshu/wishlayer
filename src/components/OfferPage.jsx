import { offerData } from "@/constant/offerData";
import React from "react";
import ImageCard from "./ImageCard";
import Link from "next/link";

const OfferPage = () => {
  return (
    <div className="md:px-48 md:py-10 ">
      <div className=" ">
        <p className="flex justify-center font-semibold text-red-500">
          India's Best Event Company{" "}
        </p>
        <p className="flex justify-center text-4xl  font-bold mt-4 ">
          {" "}
          Our Offerings{" "}
        </p>
        <div className="flex justify-center mt-2 ">
          <div className="w-14 h-2 bg-[#F0642966] rounded-lg"></div>
        </div>
      </div>

      <div className="grid md:pl-10 md:grid-cols-4 items-center space-y-4 mt-12">
        {offerData.map((item) => (
          <div className="md:col-span-2 ">
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
