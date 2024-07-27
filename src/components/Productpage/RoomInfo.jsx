import { FaStar } from "react-icons/fa";
import { TbHearts } from "react-icons/tb";
import { FaWallet } from "react-icons/fa6";
import { FaAddressCard } from "react-icons/fa";
import { AboutContent } from "@/constant/AboutContent";

const RoomInfo = ({data}) => {
  return (
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
              type="date"
              id="event_date"
              className="px-4 focus:outline-none"
            />
          </div>
          <div className="flex flex-col border-2 p-2 w-full md:w-[280px] border-[#F06429]  md:border-l-0 border-t-0 md:border-t-2 rounded-b-md md:rounded-e-md md:rounded-s-none">
            <label htmlFor="event_type" className="text-[#F06429] px-4">
              Check-out  Date
            </label>
            <input type="date" className="px-4 focus:outline-none" />
          </div>
        </div>
       
       
        <div className="flex md:mt-4   md:flex-row justify-between items-center md:justify-end">
          <div className="mt-6 md:mt-0 md:mr-4">
            <p className="text-[#F06429] text-xs px-1 pr-6">Total Price</p>
            <p className="font-semibold px-1">{data.price}</p>
          </div>
          <button className="bg-[#F06429] rounded-md text-white p-2 mt-6 md:mt-0">
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
  );
};

export default RoomInfo;
