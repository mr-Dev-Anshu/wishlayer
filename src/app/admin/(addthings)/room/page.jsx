"use client";
import { db } from "@/config/firebase.config";
import { uploadFiles, uploadImage } from "@/controller/upload";
import { addDoc, collection } from "firebase/firestore";
import React, { useState } from "react";

const AddRoomPage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [pincode, setPincode] = useState("");
  const [state, setState] = useState("");
  const [address, setAddress] = useState("");
  const [price3h, setPrice3h] = useState("");
  const [price6h, setPrice6h] = useState("");
  const [price12h, setPrice12h] = useState("");
  const [price2Guest1Room, setPrice2Guest1Room] = useState("");
  const [price1Guest1Room, setPrice1Guest1Room] = useState("");
  const [imgs, setImgs] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [coverImage, setCoverImage] = useState(null);

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
      setMessage("Please select an image");
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
      price_3h: price3h,
      price_6h: price6h,
      price_12h: price12h,
      price_2guest_1room: price2Guest1Room,
      price_1guest_1room: price1Guest1Room,
      cover_img: coverImageUrl,
    };

    try {
      const docRef = await addDoc(collection(db, "cakes"), roomData);
      setMessage("Room has been added successfully");
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
            <span>3h Price</span> <span className="text-red-600">*</span>
          </p>
          <input
            onChange={(e) => setPrice3h(e.target.value)}
            placeholder="Enter Price for 3 hours"
            type="number"
            className="border border-gray-400 text-xl focus:border-blue-500 focus:outline-none rounded-md px-4 py-1 w-full"
          />
        </div>
        <div className="">
          <p className="md:text-xl font-bold flex">
            <span>6h Price</span> <span className="text-red-600">*</span>
          </p>
          <input
            onChange={(e) => setPrice6h(e.target.value)}
            placeholder="Enter Price for 6 hours"
            type="number"
            className="border border-gray-400 text-xl focus:border-blue-500 focus:outline-none rounded-md px-4 py-1 w-full"
          />
        </div>
        <div className="">
          <p className="md:text-xl font-bold flex">
            <span>12h Price</span> <span className="text-red-600">*</span>
          </p>
          <input
            onChange={(e) => setPrice12h(e.target.value)}
            placeholder="Enter Price for 12 hours"
            type="number"
            className="border border-gray-400 text-xl focus:border-blue-500 focus:outline-none rounded-md px-4 py-1 w-full"
          />
        </div>
        <div className="">
          <p className="md:text-xl font-bold flex">
            <span>2 Guests 1 Room Price</span>{" "}
            <span className="text-red-600">*</span>
          </p>
          <input
            onChange={(e) => setPrice2Guest1Room(e.target.value)}
            placeholder="Enter Price for 2 Guests 1 Room"
            type="number"
            className="border border-gray-400 text-xl focus:border-blue-500 focus:outline-none rounded-md px-4 py-1 w-full"
          />
        </div>
        <div className="">
          <p className="md:text-xl font-bold flex">
            <span>1 Guest 1 Room Price</span>{" "}
            <span className="text-red-600">*</span>
          </p>
          <input
            onChange={(e) => setPrice1Guest1Room(e.target.value)}
            placeholder="Enter Price for 1 Guest 1 Room"
            type="number"
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
    </div>
  );
};
export default AddRoomPage;
