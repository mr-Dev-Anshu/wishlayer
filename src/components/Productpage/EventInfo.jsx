import React from "react";
import { MdOutlineEventAvailable } from "react-icons/md";
import { BsCalendar2Date } from "react-icons/bs";
import { GrLocation } from "react-icons/gr";
const EventInfo = ({ data }) => {
  return (
    <div>
      <div className="md:space-y-6 space-y-4 mx-6 md:mt-0 mt-4 h-screen overflow-y-scroll  scroll-hidden">
        <h1 className="text-xl md:text-2xl font-semibold ">{data?.title}</h1>
        <div className="flex font-semibold text-sm md:text-[17px]  gap-4 item-center ">
          <span className="text-xl">
            <MdOutlineEventAvailable />
          </span>
          <span>{data?.eventType}</span>
        </div>
        <div className="flex font-semibold text-sm md:text-[17px]  gap-4 item-center ">
          <span className="text-xl">
            <BsCalendar2Date />
          </span>
          <span>
            {" "}
            Start at {data?.startingDate} {data?.startingTime} | End at{" "}
            {data.endDate} {data.endTime}{" "}
          </span>
        </div>
        <div className="flex font-semibold text-sm md:text-[17px]  gap-4 item-center ">
          <span className="text-xl">
            <GrLocation />
          </span>
          <span>{data.location} </span>
        </div>
        <div className="md:flex   flex-col md:flex-row gap-2 md:gap-4 text-lg md:text-xl font-semibold items-center">
          <span className="line-through text-gray-500 ml-2">
            ₹{data?.mainPrice}{" "}
          </span>
          <span className="text-red-500 ml-2">₹{data?.discountedPrice}</span>
          <span className="text-green-500 ml-2">({data.discount}% OFF)</span>
          <span className="text-sm ml-2">(inclusive of GST)</span>
        </div>
        <div className="">
          <p className="text-xl  underline font-semibold"> About</p>
          <p className="md:font-semibold text-sm font-medium ">
            {data?.description}
          </p>
        </div>
        <button
          //   onClick={() => setIsFormOpen(!isFormOpen)}
          className="bg-[#F06429] text-white flex justify-center items-center py-2 rounded-md cursor-pointer hover:bg-[#853513] px-12 "
        >
          Buy Now
        </button>
        <div>
          <p className="md:text-xl font-semibold text-sm  ">Terms & Conditions </p>  
          <ol className=" ">
            {data?.terms?.map((item, index) => (
              <li key={index} className="list-disc  ">
               {index+1}.  {item.term}{" "}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
};
export default EventInfo;
