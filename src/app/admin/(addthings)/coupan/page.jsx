"use client";
import { db } from "@/config/firebase.config";
import { uploadImage } from "@/controller/upload";
import { addDoc, collection } from "firebase/firestore";
import React, { useState } from "react";

const AddCouponPage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [discount, setDiscount] = useState("");
  const [coverImage, setCoverImage] = useState(null);
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState();
  const [lastDate, setLastDate] = useState();
  const handleCoverImage = (e) => {
    setCoverImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    if (!coverImage) {
      setMessage("Please select a cover image");
      setLoading(false);
      return;
    }

    const coverImageUrl = await uploadImage(coverImage);
    const couponData = {
      title,
      description,
      discount,
      code,
      lastDate,
      type,
      cover_img: coverImageUrl,
    };
    try {
      const docRef = await addDoc(collection(db, "coupons"), couponData);
      setMessage("Coupon has been added successfully");
      console.log(docRef.id);
    } catch (error) {
      console.error("Error adding coupon: ", error);
      setMessage("Error adding coupon");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 p-6">
      <div className="md:text-2xl text-xl font-medium py-1">
        Add Coupon Here
      </div>
      <div className="grid md:grid-cols-1 gap-4">
        <div className="">
          <p className="md:text-xl font-bold flex">
            <span>Title</span> <span className="text-red-600">*</span>
          </p>
          <input
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter Coupon Title"
            className="border border-gray-400 text-xl focus:border-blue-500 focus:outline-none rounded-md px-4 py-1 w-full"
          />
        </div>
        <div className="">
          <p className="md:text-xl font-bold flex">
            <span>Description</span> <span className="text-red-600">*</span>
          </p>
          <textarea
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter Coupon Description"
            className="border border-gray-400 text-xl focus:border-blue-500 focus:outline-none rounded-md px-4 py-1 w-full"
            rows="4"
          />
        </div>
        <div className="">
          <p className="md:text-xl font-bold flex">
            <span>Valid Till </span> <span className="text-red-600">*</span>
          </p>
          <input
            type="Date"
            onChange={(e) => setLastDate(e.target.value)}
            placeholder="Enter Coupon Description"
            className="border border-gray-400 text-xl focus:border-blue-500 focus:outline-none rounded-md px-4 py-1 w-full"
            rows="4"
          />
        </div>
        <div className="">
          <p className="md:text-xl font-bold flex">
            <span>Discount Percentage</span>{" "}
            <span className="text-red-600">*</span>
          </p>
          <input
            type="number"
            onChange={(e) => setDiscount(e.target.value)}
            placeholder="Enter Discount Percentage"
            className="border border-gray-400 text-xl focus:border-blue-500 focus:outline-none rounded-md px-4 py-1 w-full"
          />
        </div>
        <div className="">
          <p className="md:text-xl font-bold flex">
            <span>Product Type </span> <span className="text-red-600">*</span>
          </p>

          <select
            onChange={(e) => setType(e.target.value)}
            placeholder="Enter Discount Percentage"
            className="border border-gray-400 text-xl focus:border-blue-500 focus:outline-none rounded-md px-4 py-1 w-full"
            name=""
            id=""
          >
            <option value="">Select Type</option>
            <option value="cake">Cake</option>
            <option value="cake">Dacoration</option>
            <option value="venue">Party & Venues </option>
            <option value="room">Rooms</option>
          </select>
        </div>
        <div className="">
          <p className="md:text-xl font-bold flex">
            <span>Coupon Code</span> <span className="text-red-600">*</span>
          </p>
          <input
            onChange={(e) => setCode(e.target.value)}
            placeholder="Enter Coupon Code"
            type="text"
            className="border border-gray-400 text-xl focus:border-blue-500 focus:outline-none rounded-md px-4 py-1 w-full"
          />
        </div>
        <div className="">
          <p className="md:text-xl font-bold flex">
            <span>Cover Image</span> <span className="text-red-600">*</span>
          </p>
          <input
            onChange={handleCoverImage}
            type="file"
            className="border border-gray-400 text-xl focus:border-blue-500 focus:outline-none rounded-md px-4 py-1 w-full"
          />
        </div>
        <div className="flex justify-center">
          <button
            onClick={handleSubmit}
            className="w-[50%] mt-2 bg-teal-500 text-white py-2 px-4 rounded-md hover:bg-teal-600 transition duration-300"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </div>
        {message && <div className="text-center text-red-600">{message}</div>}
      </div>
    </div>
  );
};
export default AddCouponPage;
