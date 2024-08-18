"use client";
import React, { useContext, useState } from "react";
import { MdOutlineEventAvailable } from "react-icons/md";
import { BsCalendar2Date } from "react-icons/bs";
import { GrLocation } from "react-icons/gr";
import { filterContext } from "@/context/FilterContext";
import PaymentQRCode from "../Payment";
import Spinner from "../Spinner";
import flag from "@/assets/flag.webp";
import { getCurrentTime } from "@/controller/Time";
import { uploadImage } from "@/controller/upload";
import Image from "next/image";
import { notify } from "@/controller/notify";
import { ToastContainer } from "react-toastify";
const EventInfo = ({ data, id }) => {
  const isLoading = !data;

  if (isLoading) {
    return <Spinner />;
  }
  const [phone, setPhone] = useState();
  const [message, setMessage] = useState();
  const [img, setImg] = useState();
  const [fullName, setFullName] = useState();
  const [isFormOpen, setIsFormOpen] = useState();
  const [orderData, setOrderData] = useState();
  const [loading, setLoading] = useState();
  const [person, setPerson] = useState();
  const [price, setPrice] = useState();

  const handlePayment = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);

      if (!img) {
        notify(0, "Please Upload the Photo first");
        setLoading(false);
        return;
      }

      const imgUrl = await uploadImage(img);

      const eventData = {
        phone,
        fullName,
        message: message || "No Message Provided ",
        id,
        price,
        type: data.type,
        person,
        photo: imgUrl,
      };

      console.log(eventData);
      if (
        !eventData.phone ||
        !eventData.fullName ||
        !eventData.id ||
        !eventData.photo ||
        !eventData.price
      ) {
        notify(0, "Plese fill the reqired field");
        setLoading(false);
        return;
      }
      eventData.time = getCurrentTime();

      setOrderData(eventData);
      setLoading(false);
      setPaymentToggle(!paymentToggle);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const handlePrice = (index) => {
    setPrice(data?.eventPrice[index].discountedPrice);
    setPerson(data?.eventPrice[index].person);
    console.log(person, price);
  };

  const { paymentToggle, setPaymentToggle } = useContext(filterContext);

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
        {data?.eventPrice?.length > 0 ? (
          <table className="w-full text-left font-semibold">
            <thead>
              <tr>
                <th className="text-sm md:text-[15px] py-2">For</th>
                <th className="text-sm md:text-[15px] py-2">Main Price</th>
                <th className="text-sm md:text-[15px] py-2">
                  Discounted Price
                </th>
                <th className="text-sm md:text-[15px] py-2">Discount</th>
              </tr>
            </thead>
            <tbody>
              {data.eventPrice?.map((item, index) => (
                <tr key={index} className="border-b">
                  <td className="py-2">For {item.person}</td>
                  <td className="py-2 line-through text-gray-500">
                    ₹{item?.mainPrice}
                  </td>
                  <td className="py-2 text-red-500">
                    ₹{item?.discountedPrice}
                  </td>
                  <td className="py-2 text-green-500">
                    ({data.discount}% OFF)
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : null}

        <div className="">
          <p className="text-xl  underline font-semibold"> About</p>
          <p className=" text-sm font-medium ">{data?.description}</p>
        </div>
        <button
          onClick={() => setIsFormOpen(!isFormOpen)}
          className="bg-[#F06429] text-white flex justify-center items-center py-2 rounded-md cursor-pointer hover:bg-[#853513] px-12 "
        >
          Buy Now
        </button>
        <div>
          <p className="md:text-xl font-semibold text-sm  ">
            Terms & Conditions{" "}
          </p>
          <ol className=" ">
            {data?.terms?.map((item, index) => (
              <li key={index} className="list-disc  ">
                {index + 1}. {item.term}{" "}
              </li>
            ))}
          </ol>
        </div>
      </div>
      {isFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl  mb-4">For Buying Please Fill this form </h2>
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
                  Your Current Image ({" "}
                  <span className="text-[12px] font-normal">
                    Please upload your current photo; it will be verified upon
                    entry.
                  </span>
                  )
                </label>
                <input
                  onChange={(e) => setImg(e.target.files[0])}
                  type="file"
                  placeholder="Enter  Your Current Photo  "
                  className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-none"
                />
              </div>

              <select
                onChange={(e) => handlePrice(e.target.value)}
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-none"
              >
                <option value="">Select Type </option>
                {data.eventPrice?.map((item, index) => (
                  <option value={index}>
                    {item.person.charAt(0).toUpperCase() + item.person.slice(1).toLowerCase()}
                  </option>
                ))}
              </select>
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
                onClick={handlePayment}
                type="submit"
                className="bg-[#F06429] hover:bg-[#d9551d] text-white font-bold py-2 px-4 rounded mr-2"
              >
                {loading ? "Loading..." : "Pay Now"}
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
          {paymentToggle ? (
            <div className="fixed inset-0  bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div>
                <PaymentQRCode data={orderData} />
              </div>
            </div>
          ) : null}
        </div>
      )}
      <ToastContainer />
    </div>
  );
};
export default EventInfo;
