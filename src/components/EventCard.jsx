"use client";
import React from "react";
import Image from "next/image";

const EventCard = (props) => {
  return (
    <div className="relative w-full md:w-[400px] h-60 bg-cover bg-center rounded-[16px] shadow-lg overflow-hidden">
      <Image
        src={props.img}
        alt="Background Image"
        layout="fill"
        objectFit="cover"
        className="absolute inset-0"
      />
      <div className="absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-40 p-4 text-center">
        <h2 className="text-white text-lg md:text-2xl font-bold mb-2">
          {props.heading}
        </h2>
        <p className="text-white text-xs md:text-sm border border-gray-400 px-4 py-2 cursor-pointer rounded-md ">Buy now </p>
      </div>
    </div>
  );
};

export default EventCard;
