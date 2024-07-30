"use client";
import { FaStar } from "react-icons/fa";
import { TbHearts } from "react-icons/tb";
import { FaWallet } from "react-icons/fa6";
import { FaAddressCard } from "react-icons/fa";
import { AboutContent } from "@/constant/AboutContent";
import flag from "@/assets/flag.webp";
import { useState } from "react";
import Image from "next/image";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/config/firebase.config";
import Swal from "sweetalert2";
const RoomInfo = ({ data, id }) => {
  // console.log(  'this is from Room '  , data.type, id);
  const [fullName, setFullName] = useState();
  const [phone, setPhone] = useState();
  const [message, setMessage] = useState();
  const [isFormOpen, setIsFormOpen] = useState();
  const [checkInDate, setCheckInDate] = useState();
  const [checkOutDate, setCheckOutDate] = useState();
  const [loading, setLoading] = useState();
  const [numberOfRoom, setNumberOfRoom] = useState();

  const isNullOrWhitespace = (input) => {
    return !input || input.trim().length === 0;
  };

  const handleOrder = async (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Loading...",
      text: "Please wait while we process your request.",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    const roomData = {
      checkInDate,
      checkOutDate,
      phone,
      fullName,
      message,
      id,
      price: data.price,
      numberOfRoom,
      type: data.type,
    };

    if (
      isNullOrWhitespace(roomData.checkInDate) ||
      isNullOrWhitespace(roomData.checkOutDate) ||
      isNullOrWhitespace(roomData.phone) ||
      isNullOrWhitespace(roomData.price) ||
      isNullOrWhitespace(roomData.fullName) ||
      isNullOrWhitespace(roomData.message) ||
      isNullOrWhitespace(roomData.id) ||
      isNullOrWhitespace(roomData.type)
    ) {
      Swal.fire({
        title: "Error!",
        text: "All fields are required.",
        icon: "error",
      });
    }

    try {
      const docRef = await addDoc(collection(db, "orders"), roomData);
      console.log(docRef);
      Swal.fire({
        title: "Good job!",
        text: "Your Room is Booked now ! ",
        icon: "success",
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {" "}
      <div className="flex flex-col md:flex-row p-4 md:p-10 md:mr-20">
        <div className="w-full md:w-[620px] mb-6 md:mb-0">
          <p></p>
        </div>
        <div className="w-full md:w-auto p-2">
          <div>
            <p className="text-lg md:text-xl font-medium">Hotel Comfort Inn</p>
            <p className="flex text-xs pb-2 items-center">
              4.9
              <span className="px-2 text-yellow-500 py-0.5">
                <FaStar />
              </span>
              (2025)
            </p>
            <hr />
          </div>
          <div className="flex flex-col   md:flex-row py-3 pt-10">
            <div className="flex flex-col border-2 p-2 w-full md:w-[280px] border-[#F06429] rounded-t-md md:rounded-s-md md:rounded-e-none">
              <label htmlFor="event_date" className="text-[#F06429] px-4">
                Check-in Date
              </label>
              <input
                onChange={(e) => setCheckInDate(e.target.value)}
                type="date"
                id="event_date"
                className="px-4 focus:outline-none"
              />
            </div>
            <div className="flex flex-col border-2 p-2 w-full md:w-[280px] border-[#F06429]  md:border-l-0 border-t-0 md:border-t-2 rounded-b-md md:rounded-e-md md:rounded-s-none">
              <label htmlFor="event_type" className="text-[#F06429] px-4">
                Check-out Date
              </label>
              <input
                onChange={(e) => setCheckOutDate(e.target.value)}
                type="date"
                className="px-4 focus:outline-none"
              />
            </div>
          </div>

          <div className="flex md:mt-4   md:flex-row justify-between items-center md:justify-end">
            <div className="mt-6 md:mt-0 md:mr-4">
              <p className="text-[#F06429] text-xs px-1 pr-6">
                For One Room Price
              </p>
              <p className="font-semibold px-1">{data.price}</p>
            </div>
            <button
              onClick={() => setIsFormOpen(!isFormOpen)}
              className="bg-[#F06429] rounded-md text-white p-2 mt-6 md:mt-0"
            >
              Reserve Now
            </button>
          </div>
          <div className="flex justify-end pt-4">
            <p className="text-xs font-extralight text-center md:text-right">
              By Clicking 'Reserve now' Button, you agree to our{" "}
              <span className="text-[#F06429]">T&C</span> and{" "}
              <span className="text-[#F06429]">Hotel Policies</span>
            </p>
          </div>
          <div className="py-10">
            <div className="p-4">
              <p className="text-[#F06429] font-semibold flex items-center">
                <span className="p-1 pr-2">
                  <TbHearts />
                </span>
                Couple Friendly
              </p>
              <p>
                We Provide Couple friendly hourly hotels for both unmarried and
                married couples with our completely secure and safe bookings
              </p>
            </div>
            <div className="p-4">
              <p className="text-[#F06429] font-semibold flex items-center">
                <span className="p-1 pr-2">
                  <FaWallet />
                </span>
                Pay At Hotel
              </p>
              <p>
                You can confirm your booking now and pay at the hotel when you
                arrive there.
              </p>
            </div>
            <div className="p-4">
              <p className="text-[#F06429] font-semibold flex items-center">
                <span className="p-1 pr-2">
                  <FaAddressCard />
                </span>
                Local ID Accepted
              </p>
              <p>We accept Same City Guests with hassle-free check-in</p>
            </div>
          </div>
          <p className="text-[#F06429] py-2 px-5 font-semibold">
            Amenities at Hotel Comfort Inn
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4">
            {AboutContent.map((items, index) => {
              return (
                <div key={index} className="flex p-4 items-center">
                  <p className="pr-4 p-1">{items.icon}</p>
                  <p>{items.title}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {isFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl  mb-4">For Order Please Fill this form </h2>
            <form>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Full Name
                </label>
                <input
                  onChange={(e) => setFullName(e.target.value)}
                  type="text"
                  placeholder="Enter your full Name "
                  className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-none"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Number of room
                </label>
                <input
                  onChange={(e) => setNumberOfRoom(e.target.value)}
                  type="Number"
                  placeholder="Enter Number of Room   "
                  className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Phone Number
                </label>
                <div className="grid grid-cols-5 items-center">
                  <div className="col-span-1 border  border-gray-400 md:py-3 py-2 px-1  flex gap-2">
                    <Image
                      className="rounded-md"
                      src={flag}
                      width={20}
                      height={20}
                    />
                    <span>+91</span>
                  </div>
                  <div className="col-span-4">
                    <input
                      onChange={(e) => setPhone(e.target.value)}
                      name="phone"
                      placeholder="Enter Phone Number"
                      type="number"
                      className="w-full md:p-3 p-2 focus:outline-none rounded-md border border-gray-400"
                    />
                  </div>
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Message
                </label>
                <textarea
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-none"
                  rows="4"
                  placeholder="Enter Message Here "
                ></textarea>
              </div>
              <button
                onClick={handleOrder}
                type="submit"
                className="bg-[#F06429] hover:bg-[#d9551d] text-white font-bold py-2 px-4 rounded mr-2"
              >
                {loading ? "Loading..." : "Submit"}
              </button>
              <button
                type="button"
                onClick={() => setIsFormOpen(!isFormOpen)}
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default RoomInfo;
