"use client";
import { db } from "@/config/firebase.config";
import { uploadFiles, uploadImage } from "@/controller/upload";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState, useEffect } from "react";

const EditRoomPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
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

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        const docRef = doc(db, "cakes", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setTitle(data.title);
          setDescription(data.description);
          setPincode(data.pincode);
          setState(data.state);
          setAddress(data.address);
          setPrice(data.price);
          setCoverImage(data.cover_img);
        } else {
          console.log("No such document!");
        }
      };
      fetchData();
    }
  }, [id]);

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
    let coverImageUrl = coverImage;
    if (coverImage instanceof File) {
      coverImageUrl = await uploadImage(coverImage);
    }
    const roomData = {
      title,
      description,
      pincode,
      state,
      address,
      price,
      cover_img: coverImageUrl,
      type: "room",
    };
    console.log(roomData);
    try {
      const docRef = doc(db, "cakes", id);
      await updateDoc(docRef, roomData);
      setMessage("Room has been updated successfully");
      if (imgs) {
        uploadFiles(imgs, docRef.id);
      }
    } catch (error) {
      console.error("Error updating room: ", error);
      setMessage("Error updating room");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 p-6">
      <div className="md:text-2xl text-xl font-medium py-1">Edit Room Here</div>
      <div className="grid md:grid-cols-1 gap-4">
        <div className="">
          <p className="md:text-xl font-bold flex">
            <span>Title</span> <span className="text-red-600">*</span>
          </p>
          <input
            value={title}
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
            value={description}
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
            value={pincode}
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
            value={state}
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
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter Address"
            className="border border-gray-400 text-xl focus:border-blue-500 focus:outline-none rounded-md px-4 py-1 w-full"
            rows="2"
          />
        </div>
        <div className="">
          <p className="md:text-xl font-bold flex">
            <span>Price of One Room</span> <span className="text-red-600">*</span>
          </p>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Enter Price"
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
export default EditRoomPage;