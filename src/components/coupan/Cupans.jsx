"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

const CoupanCard = ({ img, description, title, code, lastDate }) => {
  const [formattedDate, setFormattedDate] = useState("");

  useEffect(() => {
    if (lastDate && lastDate.seconds) {
      const milliseconds = lastDate.seconds * 1000;
      const date = new Date(milliseconds);
      setFormattedDate(date.toLocaleDateString()); // Format the date as a string
    }
  }, [lastDate]);

  return (
    <div className="relative w-[300px] px-2 md:px-2 rounded-lg overflow-hidden shadow-lg">
      {/* Background Image */}
      <div className="relative w-full h-[150px] md:h-[150px]">
        <Image
          src={img}
          alt="Product Image"
          layout="fill"
          objectFit="cover"
          className="absolute inset-0 rounded-lg"
        />
      </div>

      {/* Card Content */}
      <div className="p-1 md:p-4">
        <p className=" text-sm md:text-sm font-semibold md:font-bold my-1 md:my-2">
          {title}
        </p>
        <div className="mt-1 md:mt-2 text-sm flex justify-center">{description}</div>
        <button className="bg-[#FFC5AC] border border-[#F06429] border-dotted py-1 px-2 rounded-md mt-2">
          Use Code : <span className="font-semibold">{code}</span>
        </button>
        <p className=" text-xs md:text-sm mt-2">
          <span className="text-green-600">Valid till</span> {formattedDate}
        </p>
      </div>
    </div>
  );
};

export default CoupanCard;
