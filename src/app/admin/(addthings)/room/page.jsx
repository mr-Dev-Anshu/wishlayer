"use client";
import { db } from "@/config/firebase.config";
import { Nagar } from "@/constant/Nagar";
import { notify } from "@/controller/notify";
import { uploadFiles, uploadImage } from "@/controller/upload";
import { addDoc, collection } from "firebase/firestore";
import React, { useState } from "react";
import { ToastContainer } from "react-toastify";

const AddRoomPage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [pincode, setPincode] = useState("");
  const [state, setState] = useState("");
  const [address, setAddress] = useState("");
  const [price, setPrice] = useState();
  const [imgs, setImgs] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [coverImage, setCoverImage] = useState(null);
  const [nagar, setNagar] = useState();

  const handleFile = (e) => {
    setImgs(e.target.files);
  };

  const handleCoverImage = (e) => {
    setCoverImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    if (!imgs || !coverImage) {
      notify(0, "Please select the images");

      setLoading(false);
      return;
    }

    const coverImageUrl = await uploadImage(coverImage);
    const roomData = {
      title,
      description,
      pincode,
      state,
      address,
      price,
      type: "room",
      cover_img: coverImageUrl,
      nagar,
    };
    try {
      const docRef = await addDoc(collection(db, "cakes"), roomData);
      notify(1, "Room  added successfully");

      console.log(docRef.id);
      uploadFiles(imgs, docRef.id);
    } catch (error) {
      console.error("Error adding room: ", error);
      setMessage("Error adding room");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 p-6">
      <div className="md:text-2xl text-xl font-medium py-1">Add Room Here</div>
      <div className="grid md:grid-cols-1 gap-4">
        <div className="">
          <p className="md:text-xl font-bold flex">
            <span>Title</span> <span className="text-red-600">*</span>
          </p>
          <input
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter Room Title"
            className="border border-gray-400 text-xl focus:border-blue-500 focus:outline-none rounded-md px-4 py-1 w-full"
          />
        </div>
        <div className="">
          <p className="md:text-xl font-bold flex">
            <span>Description</span> <span className="text-red-600">*</span>
          </p>
          <textarea
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter Room Description"
            className="border border-gray-400 text-xl focus:border-blue-500 focus:outline-none rounded-md px-4 py-1 w-full"
            rows="4"
          />
        </div>
        <div className="">
          <p className="md:text-xl font-bold flex">
            <span>Pincode</span> <span className="text-red-600">*</span>
          </p>
          <input
            onChange={(e) => setPincode(e.target.value)}
            placeholder="Enter Pincode"
            type="text"
            className="border border-gray-400 text-xl focus:border-blue-500 focus:outline-none rounded-md px-4 py-1 w-full"
          />
        </div>
        <div className="">
          <p className="md:text-xl font-bold flex">
            <span>State</span> <span className="text-red-600">*</span>
          </p>
          <input
            onChange={(e) => setState(e.target.value)}
            placeholder="Enter State"
            type="text"
            className="border border-gray-400 text-xl focus:border-blue-500 focus:outline-none rounded-md px-4 py-1 w-full"
          />
        </div>
        <div className="">
          <p className="md:text-xl font-bold flex">
            <span>Nagar</span> <span className="text-red-600">*</span>
          </p>
          <select
            onChange={(e) => setNagar(e.target.value)}
            className="border border-gray-400 text-xl focus:border-blue-500 focus:outline-none rounded-md px-4 py-1 w-full"
          >
            <option value="">Select Nagar</option>
            {Nagar.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <div className="">
          <p className="md:text-xl font-bold flex">
            <span>Address</span> <span className="text-red-600">*</span>
          </p>
          <textarea
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter Address"
            className="border border-gray-400 text-xl focus:border-blue-500 focus:outline-none rounded-md px-4 py-1 w-full"
            rows="2"
          />
        </div>
        <div className="">
          <p className="md:text-xl font-bold flex">
            <span>Price of One Room </span>{" "}
            <span className="text-red-600">*</span>
          </p>
          <input
            type="Number"
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Enter Address"
            className="border border-gray-400 text-xl focus:border-blue-500 focus:outline-none rounded-md px-4 py-1 w-full"
            rows="2"
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
        <div className="">
          <p className="md:text-xl font-bold flex">
            <span>Images</span> <span className="text-red-600">*</span>
          </p>
          <input
            onChange={handleFile}
            type="file"
            multiple
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
      <ToastContainer />
    </div>
  );
};
export default AddRoomPage;
