"use client";
import React from "react";
import Image from "next/image";
import { BsCalendar2Date } from "react-icons/bs";
import { GrLocation } from "react-icons/gr";

const EventCard = (props) => {
  console.log("this is props data ", props.data);

  return (
    <div>
      <div className="relative w-full md:w-[400px] h-60 bg-cover bg-center rounded-[16px] shadow-lg overflow-hidden">
        <Image
          src={props.img}
          alt="Background Image"
          layout="fill"
          objectFit="cover"
          className="absolute inset-0"
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-40 p-4 text-center">
          <p className="text-white text-xs md:text-sm border border-gray-400 px-4 py-2 cursor-pointer rounded-md ">
            Buy now{" "}
          </p>
        </div>
      </div>
      <div className="px-2 py-2 space-y-4">
        <div className="md:text-xl  font-semibold">{props?.data?.title}</div>
        <div className="flex font-semibold text-sm md:text-[12px]  gap-2 item-center ">
          <span className="text-xl">
            <BsCalendar2Date />
          </span>
          <span>
            {" "}
            {props?.data?.startingDate} {props?.data?.startingTime} |{" "}
            {props?.data?.endDate} {props?.data?.endTime}{" "}
          </span>
        </div>
        <div className="flex font-semibold text-sm md:text-[12px]  gap-2 item-center ">
          <span className="text-xl">
            <GrLocation />
          </span>
          <span>
            {props?.data?.location.substring(0, 20)}...{" "}
            <span className="text-red-600">know more </span>{" "}
          </span>
        </div>
        <div className="flex  font-medium justify-between  md:pr-8 ">
          <p>₹{props?.data?.eventPrice[0].mainPrice} | ONWORDS</p>
          <p className="text-sm">
            {" "}
            <span className="text-sky-500">|</span>Buy Now{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
