"use client";
import Spinner from "@/components/Spinner";
import { db } from "@/config/firebase.config";
import { uploadImage } from "@/controller/upload";
import { addDoc, collection, doc } from "firebase/firestore";
import React, { useState } from "react";

const page = () => {
  const [loading, setLoading] = useState();
  const [file, setFile] = useState();
  const [message, setMessage] = useState();
  const handleSubmit = async () => {

    try {
        setLoading(true);
        setMessage(null);
        const url = await uploadImage(file);
        await addDoc(collection(db, "reels"), { imageUrl: url });
        setMessage("Reels Uploaded Successfully !!");
        setLoading(false);
    } catch (error) {
        setLoading(false) ; 
        console.log(error)
    }
   
  };

  return (
    <div>
      <div className="md:text-2xl text-xl font-medium py-1">
        Upload Your reels here
      </div>
      <div>
        <input
          className="border border-gray-400 text-xl focus:border-blue-500 focus:outline-none rounded-md px-4 py-1 w-full"
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
        />
      </div>
      <button
        onClick={handleSubmit}
        className="bg-blue-500 mt-3  px-4 py-1 rounded-md text-white font-semibold cursor-pointer"
      >
        {loading ? <Spinner /> : "Upload"}
      </button>
      {message && <div>{message} </div>}
    </div>
  );
};

export default page;
