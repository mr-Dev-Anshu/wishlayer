"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import img1 from "@/assets/eggless.png";
import img2 from "@/assets/wishlist.png";
import flag from "@/assets/flag.webp";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/config/firebase.config";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { getSession } from "@/authThing/action";
import Spinner from "../Spinner";
const CakeProductInfo = ({ data, id }) => {
 
  const router = useRouter();
  const [weight, setWeight] = useState();
  const [discountedPrice, setDiscountedPrice] = useState();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [loading, setLoading] = useState();
  const [mainPrice, setMainPrice] = useState();
  const [fullName, setFullName] = useState();
  const [phone, setPhone] = useState();
  const [message, setMessage] = useState();
  const [city, setCity] = useState();
  const [address, setAddress] = useState();
  const [wishlisted, setWishlisted] = useState();

  const handleMainPrice = (value) => {
    setMainPrice(value);
  };

  const isNullOrWhitespace = (input) => {
    return !input || input.trim().length === 0;
  };

  useEffect(() => {
    const getWishListData = async () => {
      const session = await getSession();
      const q = query(
        collection(db, "wishlists"),
        where("ProductId", "==", id),
        where("user", "==", session.phone)
      );
      const dataSnap = await getDocs(q);
      if (!dataSnap.empty) {
        setWishlisted(dataSnap.docs[0].data());
        console.log(dataSnap.docs[0].data());
      }
    };
    getWishListData();
  }, []);

  const handleOrder = async (e) => {
    setLoading(true);
    e.preventDefault();

    Swal.fire({
      title: "Loading...",
      text: "Please wait while we process your request.",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    const orderData = {
      mainPrice,
      fullName,
      message,
      id,
      weight,
      type: data.type,
      phone,
      city,
      address,
    };

    if (
      isNullOrWhitespace(orderData.mainPrice) ||
      isNullOrWhitespace(orderData.fullName) ||
      isNullOrWhitespace(orderData.message) ||
      isNullOrWhitespace(orderData.id) ||
      isNullOrWhitespace(orderData.weight) ||
      isNullOrWhitespace(orderData.type) ||
      isNullOrWhitespace(phone) ||
      isNullOrWhitespace(orderData.city) ||
      isNullOrWhitespace(orderData.address)
    ) {
      Swal.fire({
        title: "Error!",
        text: "All fields are required.",
        icon: "error",
      });
      return;
    }

    console.log(orderData);
    try {
      const docRef = await addDoc(collection(db, "orders"), orderData);
      console.log("Order Added Here ");
      Swal.fire({
        title: "Good job!",
        text: "You have orderd Successfully  !",
        icon: "success",
      });
      setIsFormOpen(!isFormOpen);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleWishlist = async () => {
    setLoading(true);
    try {
      const session = await getSession();
      console.log(session);
      if (!session || !session.phone) {
        router.push("/login");
        setLoading(false);
        return;
      }

      const q = query(
        collection(db, "wishlists"),
        where("ProductId", "==", id),
        where("user", "==", session.phone)
      );
      const dataSnap = await getDocs(q);

      if (!dataSnap.empty) {
        const docRef = doc(db, "wishlists", dataSnap.docs[0].id);
        await deleteDoc(docRef);
        setWishlisted(false);
        console.log("Removed from wishlist");
        setLoading(false);
      } else {
        const data = {
          ProductId: id,
          user: session.phone,
        };
        await addDoc(collection(db, "wishlists"), data);
        setWishlisted(true);
        console.log("Added into wishlist");
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleDiscountedPrice = (value) => {
    setDiscountedPrice(value);
  };

  return (
    <div className="px-4 md:px-12 space-y-8 md:mr-20">
      <div className="flex flex-col md:flex-row md:gap-6 items-center">
        {data.type === "cake" && (
          <span className="mb-2 md:mb-0">
            <Image alt="eggless" src={img1} height={40} width={40} />
          </span>
        )}
        <h1 className="text-xl md:text-2xl font-semibold text-center md:text-left">
          {data?.title}
        </h1>
        <p className="text-center md:text-left">
          {loading ? (
            <Spinner />
          ) : (
            <Image
              alt="wishlistimage"
              className={`cursor-pointer ${
                wishlisted ? "bg-red-600 rounded-full" : null
              }`}
              onClick={handleWishlist}
              src={img2}
              height={30}
              width={30}
            />
          )}
        </p>
      </div>
      <div>
        <span className=" md:text-2xl mr-2">
          4.5/5 <span className="text-xl md:text-2xl text-yellow-500">★</span>{" "}
          (245)
        </span>
      </div>
      <div className="border-b border-gray-600 border-dotted"></div>
      <div className="md:flex   flex-col md:flex-row gap-2 md:gap-4 text-lg md:text-xl font-semibold items-center">
        <span className="line-through text-gray-500 ml-2">
          ₹{mainPrice || data?.mainPrice}
        </span>
        <span className="text-red-500 ml-2">
          ₹{discountedPrice || data?.discountedPrice}
        </span>
        <span className="text-green-500 ml-2">({data?.discount}% OFF)</span>
        <span className="text-sm ml-2">(inclusive of GST)</span>
      </div>
      {data?.weightPrice?.length > 1 ? (
        <div className="flex flex-wrap gap-2 md:gap-4 font-semibold">
          {data.weightPrice.map((item) => (
            <span
              onClick={() => {
                setWeight(item.weight);
                handleMainPrice(item.mainPrice);
                handleDiscountedPrice(item.discountedPrice);
              }}
              className={`p-2 cursor-pointer rounded-md border-gray-400 border w-20 text-center ${
                weight === item.weight
                  ? "border-red-500 text-black"
                  : "text-gray-400"
              }`}
              key={item.weight}
            >
              {item.weight}KG
            </span>
          ))}
        </div>
      ) : null}
      <div>
        <div className="mt-4 md:mt-9">
          <p className="font-semibold">Delivery Location</p>
          <div className="grid md:grid-cols-3 gap-4 items-center">
            <div className="col-span-2">
              <input
                placeholder="Enter Your City"
                className="w-full p-3 rounded-md focus:outline-none border border-gray-400 focus:border-green-600"
                type="text"
              />
              <p className="text-sm text-[#F5A623]">
                Available in limited city*
              </p>
            </div>
            <div className="col-span-1">
              <button className="bg-[#251D34] p-3 md:mb-4 text-white font-semibold rounded-lg w-full">
                Check Availability
              </button>
            </div>
          </div>
        </div>
      </div>
      <div>
        <h1 className="text-lg font-semibold">Product Description</h1>
        <p>
          {data?.description}
          <span className="text-[#43A1F0] cursor-pointer">Read more</span>
        </p>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="border border-[#F06429] text-[#F06429] flex justify-center items-center py-2 font-bold rounded-md cursor-pointer hover:bg-[#F06429] hover:text-white">
          Add to cart
        </div>
        <div
          onClick={() => setIsFormOpen(!isFormOpen)}
          className="bg-[#F06429] text-white flex justify-center items-center py-2 rounded-md cursor-pointer hover:bg-[#853513]"
        >
          Buy Now {mainPrice}
        </div>
      </div>
      {/* <div className="flex justify-center md:justify-start md:gap-24">
        <Image src={img1} alt="Cake Icon" />
      </div> */}
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
                  City
                </label>
                <select
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-none"
                  name=""
                  id=""
                >
                  <option value="">Select your City </option>
                  <option value="Noida">Noida</option>
                  <option value="Lucknow">Lucknow </option>
                  <option value="Banarash">Banarash</option>
                  <option value="Prayagraj">Prayagraj </option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Address
                </label>
                <input
                  onChange={(e) => setAddress(e.target.value)}
                  type="text"
                  placeholder="Enter Address Here "
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
    </div>
  );
};

export default CakeProductInfo;
