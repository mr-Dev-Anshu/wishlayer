"use client";
import { db } from "@/config/firebase.config";
import { uploadFiles, uploadImage } from "@/controller/upload";
import { addDoc, collection } from "firebase/firestore";
import React, { useState } from "react";

const AddVenuePage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [pincode, setPincode] = useState("");
  const [state, setState] = useState("");
  const [address, setAddress] = useState("");

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
    const venueData = {
      title,
      description,
      pincode,
      state,
      address,
      type: "venue",
      cover_img: coverImageUrl,
    };
    try {
      const docRef = await addDoc(collection(db, "cakes"), venueData);
      setMessage("Venue has been added successfully");
      console.log(docRef.id);
      uploadFiles(imgs, docRef.id);
    } catch (error) {
      console.error("Error adding Venue: ", error);
      setMessage("Error adding Venue");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 p-6">
      <div className="md:text-2xl text-xl font-medium py-1">Add Venue Here</div>
      <div className="grid md:grid-cols-1 gap-4">
        <div className="">
          <p className="md:text-xl font-bold flex">
            <span>Title</span> <span className="text-red-600">*</span>
          </p>
          <input
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter Venue Title"
            className="border border-gray-400 text-xl focus:border-blue-500 focus:outline-none rounded-md px-4 py-1 w-full"
          />
        </div>
        <div className="">
          <p className="md:text-xl font-bold flex">
            <span>Description</span> <span className="text-red-600">*</span>
          </p>
          <textarea
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter Venue Description"
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
export default AddVenuePage;
