"use client";
import Spinner from "@/components/Spinner";
import { db } from "@/config/firebase.config";
import { handleAvailablity } from "@/controller/handleAvailablelity";
import { addDoc, collection } from "firebase/firestore";
import React, { useState } from "react";

const page = () => {
  const [loading, setLoading] = useState();
  const handleClick = async () => {
    try {
      setLoading(true);
      console.log("clicked");
      const check = await handleAvailablity("226002");
      console.log(check);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <button onClick={handleClick} className="bg-blue-600 text-white  p-3">
        {loading ? <Spinner /> : "Click"}
      </button>
    </div>
  );
};
export default page;
