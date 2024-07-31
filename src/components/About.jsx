"use client";
import React from "react";

const AboutUsPage = () => {
  return (
    <div className="p-4 md:p-10 bg-[#FFE6DB] my-12">
      <div className=" p-6 ">
        <h1 className="text-2xl font-bold  text-center">About Us</h1>
        <div className="flex justify-center">
            <div className="w-10 h-1 md:w-14 md:h-2 bg-[#F0642966] rounded-lg mb-6"></div>
          </div>
        <div className="text-lg space-y-4">
          <p>
            Discover Wishlayer, your ultimate destination for celebrations in
            Lucknow. Originating from the culturally vibrant city, we specialize
            in providing a seamless experience for tourists and travelers with
            our Airbnb & Studio Concept Roomstay options.
          </p>
          <p>
            Alongside, we offer bespoke services including customized cakes,
            exquisite decorations, and versatile venues for parties and night
            clubbing. At Wishlayer, we bring together everything you need to
            make every celebration memorable, all in one place.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;
