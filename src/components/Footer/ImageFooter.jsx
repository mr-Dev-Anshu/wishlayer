import Image from "next/image";
import React from "react";
import backgroundImage from '@/assets/homefooterimg.jpeg'
const ImageFooter = () => {
  return (
    <div className="relative h-[411.39px] w-full flex justify-center items-center text-center text-white">

      <Image
        src={backgroundImage}
        alt="Background Image"
        layout="fill"
        objectFit="cover"
        className="z-0"
      />
      <div className="absolute inset-0 bg-black bg-opacity-50 z-10 flex flex-col justify-center items-center p-4">
        <h1 className="text-2xl font-bold ">Want to get Special Offers ? </h1>
        <p className="text-2xl font-bold mb-2">Signup Now </p>
        <div className="w-full max-w-lg bg-white flex py-1 px-4 rounded-full  mb-4">
          <input
            type="text"
            placeholder="Your Email Address..."
            className="w-full px-4 py-2 text-black rounded-full focus:outline-none"
          />
        <button className=" px-4 py-1 bg-[#1950D1] font-semibold rounded-full text-white text-sm w-[100px] hover:bg-red-600  focus:outline-none">
          Sign Up
        </button>
        </div>
      </div>
    </div>
  );
};

export default ImageFooter;
