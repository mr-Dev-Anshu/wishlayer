"use client";
import { FaStar } from "react-icons/fa";
import { TbHearts } from "react-icons/tb";
import { FaWallet } from "react-icons/fa6";
import { FaAddressCard } from "react-icons/fa";
import { AboutContent } from "@/constant/AboutContent";
import flag from "@/assets/flag.webp";
import { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/config/firebase.config";
import Swal from "sweetalert2";
import { getCurrentTime } from "@/controller/Time";
import { filterContext } from "@/context/FilterContext";
import PaymentQRCode from "../Payment";
import { Send_Email } from "@/controller/sendEmail";
import { handleAddToCart } from "@/controller/handleAddToCart";
import { getSession } from "@/authThing/action";
import Spinner from "../Spinner";
import { notify } from "@/controller/notify";
import { ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";
const RoomInfo = ({ data, id }) => {
  const [fullName, setFullName] = useState();
  const [phone, setPhone] = useState();
  const [message, setMessage] = useState();
  const [isFormOpen, setIsFormOpen] = useState();
  const [checkInDate, setCheckInDate] = useState();
  const [checkOutDate, setCheckOutDate] = useState();
  const [loading, setLoading] = useState();
  const [numberOfRoom, setNumberOfRoom] = useState();
  const [orderData, setOrderData] = useState();
  const [errorMessage, setErrorMessage] = useState(null);
  const { paymentToggle, setPaymentToggle } = useContext(filterContext);
  const [numberOfGuest, setNumberOfGuest] = useState();
  const [cartLoading, setCartLoading] = useState();
  const [days, setDays] = useState(1);
  const [isExpend, setIsExpend] = useState(false);
  const router = useRouter();
  const isNullOrWhitespace = (input) => {
    return !input === 0;
  };
  useEffect(() => {
    if (checkInDate && checkOutDate) {
      const checkinDate = new Date(checkInDate);
      const checkoutDate = new Date(checkOutDate);
      const timeDifference = checkoutDate - checkinDate;
      const daysDifference = timeDifference / (1000 * 60 * 60 * 24);
      setDays(daysDifference);
    }
  }, [checkInDate, checkOutDate]);

  const handleOrder = async (e) => {
    e.preventDefault();
    const roomData = {
      checkInDate,
      checkOutDate,
      phone,
      fullName,
      message: message || "No Message Provided ",
      id,
      price: +data.price * days,
      type: data.type,
      numberOfGuest,
    };

    if (
      isNullOrWhitespace(roomData.checkInDate) ||
      isNullOrWhitespace(roomData.checkOutDate) ||
      isNullOrWhitespace(roomData.phone) ||
      isNullOrWhitespace(roomData.fullName) ||
      isNullOrWhitespace(roomData.id) ||
      isNullOrWhitespace(roomData.numberOfGuest) ||
      isNullOrWhitespace(roomData.type)
    ) {
      notify(0, "Plese fill the reqired field");
      setLoading(false);
      return;
    }

    roomData.time = getCurrentTime();
    console.log(roomData);
    try {
      Swal.fire({
        title: "Loading...",
        text: "Please wait while we process your request.",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
      const docRef = await addDoc(collection(db, "orders"), roomData);
      console.log(docRef);
      Swal.fire({
        title: "Good job!",
        text: "Your Room is Booked now ! ",
        icon: "success",
      });
      await Send_Email(roomData);
      setIsFormOpen(!isFormOpen);
    } catch (error) {
      console.log(error);
    }
  };

  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handlePayment = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      setErrorMessage(null);
      const roomData = {
        checkInDate,
        checkOutDate,
        phone,
        fullName,
        message: message || "No Message Provided ",
        id,
        price: +data.price * days,
        type: data.type,
        numberOfGuest,
      };
      if (
        isNullOrWhitespace(roomData.checkInDate) ||
        isNullOrWhitespace(roomData.checkOutDate) ||
        isNullOrWhitespace(roomData.phone) ||
        isNullOrWhitespace(roomData.price) ||
        isNullOrWhitespace(roomData.fullName) ||
        isNullOrWhitespace(roomData.id) ||
        isNullOrWhitespace(roomData.numberOfGuest) ||
        isNullOrWhitespace(roomData.type)
      ) {
        setErrorMessage("All Fields are required ");
        notify(0, "Plese fill the reqired field");
        setLoading(false);
        return;
      }
      roomData.time = getCurrentTime();

      setOrderData(roomData);
      setLoading(false);
      setPaymentToggle(!paymentToggle);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <div>
      {" "}
      <div className="flex flex-col md:flex-row p-4 md:p-10 md:mr-20">
        <div className="w-full md:w-[620px] mb-6 md:mb-0">
          <p></p>
        </div>
        <div className="w-full md:w-auto p-2">
          <div>
            <p className="text-lg md:text-xl font-medium">{data?.title}</p>
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
                min={getTodayDate()}
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
                min={getTodayDate()}
              />
            </div>
          </div>
          <div className="flex md:mt-4 md:flex-row  justify-between items-center md:justify-end">
            <div className="mt-6 md:mt-0 md:mr-4">
              <p className="text-[#F06429] text-xs px-1 pr-6">
                For One Room Price
              </p>
              <p className="font-semibold px-1">₹{+data.price * days}</p>
            </div>
            <div className="md:flex gap-10 ">
              <button
                onClick={async () => {
                  setCartLoading(true);
                  const session = await getSession();
                  console.log(session);

                  if (!session || !session.phone) {
                    router.push("/login");
                    setCartLoading(false);
                    return;
                  }

                  const cartData = {
                    title: data?.title,
                    cover: data?.cover_img,
                    price: data.price,
                    phone: session.phone,
                    id: id,
                  };
                  await handleAddToCart(cartData);
                  notify(1, "Product add into Cart");
                  setCartLoading(false);
                }}
                className="border border-[#F06429] px-4 text-[#F06429] flex justify-center items-center py-2 font-bold rounded-md cursor-pointer hover:bg-[#F06429] hover:text-white"
              >
                {cartLoading ? <Spinner /> : "Add to Cart"}
              </button>
              <button
                onClick={() => setIsFormOpen(!isFormOpen)}
                className="bg-[#F06429] rounded-md text-white p-2 mt-6 md:mt-0"
              >
                Reserve Now
              </button>
            </div>
          </div>
          <div className="flex justify-end pt-4">
            <p className="text-xs font-extralight text-center md:text-right">
              By Clicking 'Reserve now' Button, you agree to our{" "}
              <span className="text-[#F06429]">T&C</span> and{" "}
              <span className="text-[#F06429]">Hotel Policies</span>
            </p>
          </div>
          <div className="mt-4 md:mt-6">
            {isExpend ? (
              <div>
                {data?.description}{" "}
                <span
                  onClick={() => setIsExpend(!isExpend)}
                  className="text-red-600 cursor-pointer"
                >
                  show less{" "}
                </span>
              </div>
            ) : (
              <div>
                {data?.description?.substring(0, 100)} ...{" "}
                <span
                  onClick={() => setIsExpend(!isExpend)}
                  className="text-red-600 cursor-pointer"
                >
                  read more
                </span>
              </div>
            )}
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
              {/* <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Number of room
                </label>
                <input
                  onChange={(e) => setNumberOfRoom(e.target.value)}
                  type="Number"
                  placeholder="Enter Number of Room   "
                  className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-none"
                />
              </div> */}
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Number of Guest
                </label>
                <input
                  onChange={(e) => setNumberOfGuest(e.target.value)}
                  type="Number"
                  placeholder="Enter Number of Guest"
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
            <p className="flex justify-center text-red-600">{errorMessage}</p>
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

export default RoomInfo;
