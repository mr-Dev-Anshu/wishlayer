"use client";
import React, { useContext } from "react";
import html2canvas from "html2canvas";
import Image from "next/image";
import { filterContext } from "@/context/FilterContext";

const EventPass = (props) => {
  console.log(props);

  const { showPass, setShowPass } = useContext(filterContext);

  return (
    <div className="max-w-sm mx-auto  bg-white shadow-lg rounded-lg  ">
      <div className="  ">
        <div className="flex justify-center items-center ">
          <Image
          className=" rounded-md"
          src={props.data.photo}
          width={200}
          height={100}
        />
        </div>
        
        <div className="px-6 py-4 text-center">
          <h2 className="text-xl font-semibold text-gray-800">
            {props.data.name}{" "}
          </h2>
          <p className="text-gray-600">Event Name: {props.data.title} </p>
          <p className="text-gray-600">Date: {props.data.startingDate} </p>
          <p className="text-gray-600">Time: {props.data.startingTime} </p>
          <p className="text-gray-600">Phone: {props.data.phone}</p>
          <p className="text-gray-600">Type: {props.data.type}</p>
          <p className="text-gray-600">Paid : {props.data.price}</p>
          <p className="text-gray-600">Company: wishlayer.com</p>
        </div>
        <div className="bg-gray-100 text-center py-2">
          <p className="text-sm text-gray-500">
            Please show this pass at the entry.
          </p>
        </div>
        <button
          onClick={() => setShowPass(!showPass)}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 ease-in-out"
        >
          close
        </button>
      </div>
    </div>
  );
};

export default EventPass;
