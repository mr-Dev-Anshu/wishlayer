"use client";
import Image from "next/image";
import React, { useState } from "react";
import img from "@/assets/uploadbg2.png";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/config/firebase.config";
import { uploadImage } from "@/controller/upload";
import { Send_Email } from "@/controller/sendEmail";
import flag from "@/assets/flag.webp";
import { notify } from "@/controller/notify";
import { ToastContainer } from "react-toastify";

const UploadCake = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [message, setMessage] = useState("no message");
  const [weight, setWeight] = useState();
  const [image, setImage] = useState();
  const [loading, setLoading] = useState();
  const [address, setAddress] = useState();
  const [phone, setPhone] = useState();

  const toggleForm = () => {
    setIsFormOpen(!isFormOpen);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!image) {
      setMessage("Please select an image");
      setLoading(false);
      return;
    }

    const cakeImage = await uploadImage(image);
    if (!cakeImage || !phone) {
      notify(0, "Please Provide all the information ");
      return;
    }
    const cakeData = {
      message,
      image: cakeImage,
      phone,
      type: "Customise Cake",
      price: "not Cleared",
    };

    console.log(cakeData);

    try {
      const docRef = await addDoc(collection(db, "uploadedCake"), cakeData);
      setMessage("Cake has been added successfully");
      await Send_Email(cakeData);
      console.log(docRef.id);
      notify(1, "Order Place for Customise Cake ");
    } catch (error) {
      console.log("Error adding cake: ", error);
    } finally {
      setLoading(false);
      setIsFormOpen(!isFormOpen);
    }
  };

  return (
    <div className="relative w-full my-4">
      <div className="my-4">
        <Image
          className="w-full h-[200px] sm:h-[200px] md:h-[250px] lg:h-[411px] object-cover"
          src={img}
          alt="Advertisement"
        />
      </div>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4">
        <h1 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2 text-center">
          Want your own type of cake or decoration?
        </h1>
        <p className="text-xs sm:text-base md:text-lg lg:text-xl mb-4 text-center">
          Just upload the image of any cake you like to order or any type of
          decoration you want.
        </p>
        <button
          onClick={toggleForm}
          className="bg-[#F06429] hover:bg-[#d9551d] text-white font-bold py-2 px-4 rounded"
        >
          Get Started
        </button>
      </div>

      {isFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-2xl mb-4">Upload Your Image</h2>
            <form>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Image
                </label>
                <input
                  onChange={(e) => setImage(e.target.files[0])}
                  type="file"
                  className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-none"
                  accept="image/*"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Weight
                </label>
                <input
                  onChange={(e) => setWeight(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-none"
                  type="Number"
                ></input>
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
                  Address
                </label>
                <input
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-none"
                  type="text"
                ></input>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Message
                </label>
                <textarea
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-none"
                  rows="4"
                ></textarea>
              </div>
              <button
                onClick={handleSubmit}
                type="submit"
                className="bg-[#F06429] hover:bg-[#d9551d] text-white font-bold py-2 px-4 rounded mr-2"
              >
                {loading ? "Loading..." : "Submit"}
              </button>
              <button
                type="button"
                onClick={toggleForm}
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};
export default UploadCake;
