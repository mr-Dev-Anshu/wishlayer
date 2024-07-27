import { FaStar, FaTimes } from "react-icons/fa";
import img1 from "@/assets/menu1.png";
import img2 from "@/assets/menu2.png";

import GuestDetails from "./GuestInfo";
import { AboutContent } from "@/constant/AboutContent";
import Image from "next/image";
import { useState } from "react";

const VenueInfo = () => {
  const [menuImage, setMenuImage] = useState();

  const handleMenuImage = (img) => {
    setMenuImage(img);
  };
  return (
    <div className="flex flex-col lg:flex-row p-4 lg:p-10">
      <div className="w-full lg:w-[620px] mb-6 lg:mb-0">
        <p></p>
      </div>
      <div className="p-2 w-full lg:w-auto">
        <div>
          <p className="text-xl font-medium">Party Hall Comfort Inn</p>
          <p className="flex text-xs pb-2">
            4.9{" "}
            <span className="px-2 text-yellow-500 py-0.5">
              <FaStar />
            </span>{" "}
            (2025)
          </p>
          <hr />
        </div>
        <div className="flex flex-col lg:flex-row py-3 pt-10">
          <div className="flex flex-col border-2 p-2 w-full lg:w-[280px] border-[#F06429] rounded-t-md lg:rounded-s-md lg:rounded-t-none">
            <label htmlFor="event_date" className="text-[#F06429] px-2">
              Choose Event Date
            </label>
            <input
              type="date"
              id="event_date"
              className="px-2 focus:outline-none"
            />
          </div>
          <div className="flex flex-col border-2 p-2 w-full lg:w-[280px] border-[#F06429] border-t-0 lg:border-t-none lg:border-l-0 rounded-b-md lg:rounded-e-md lg:rounded-b-none">
            <label htmlFor="event_type" className="text-[#F06429] px-2">
              Choose Event Type
            </label>
            <select id="event_type" className="px-2 focus:outline-none">
              <option value="" disabled>
                Select an option
              </option>
              <option value="Birthday Celebration">Birthday Celebration</option>
              <option value="Wedding Ceremony ">Wedding Ceremony</option>
              <option value="Party Hosting">Party Hosting</option>
            </select>
          </div>
        </div>
        <div>
          <GuestDetails />
        </div>
        <div className="border-2 border-[#F06429] rounded-md mt-6">
          <p className="border-b-2 border-[#F06429] text-[#F06429] px-6 py-2">
            Menu Cards
          </p>
          <div className="flex  gap-3 flex-row p-6">
            <div className="mb-4 lg:mb-0 lg:mr-6">
              <Image
                onClick={() => handleMenuImage(img1)}
                width={120}
                src={img1}
                alt="Food Menu"
                className="cursor-pointer"
              />
              <p className="text-white bg-[#F06429]  px-2">Food Menu</p>
            </div>
            <div>
              <Image
                onClick={() => handleMenuImage(img2)}
                width={120}
                src={img2}
                alt="Bar Menu"
                className="cursor-pointer"
              />
              <p className="text-white bg-[#F06429] px-2">Bar Menu</p>
            </div>
          </div>
        </div>
        <div className="border-2 border-[#F06429] rounded-md mt-6">
          <p className="border-b-2 border-[#F06429] px-6 py-2">About</p>
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {AboutContent.map((item, index) => {
              return (
                <div className="flex p-4" key={index}>
                  <p className="pr-4 p-1">{item.icon}</p>
                  <p>{item.title}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {menuImage && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
          <button
            className="absolute top-4 right-4 text-white text-2xl"
            onClick={() => setMenuImage(null)}
          >
            <FaTimes />
          </button>

          <Image
            className="rounded-md"
            src={menuImage}
            width={400}
            height={400}
          />
        </div>
      )}
    </div>
  );
};

export default VenueInfo;
