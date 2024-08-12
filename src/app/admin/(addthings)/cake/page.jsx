"use client";
import { db } from "@/config/firebase.config";
import { notify } from "@/controller/notify";
import { uploadFiles, uploadImage } from "@/controller/upload";
import { addDoc, collection } from "firebase/firestore";
import React, { useState } from "react";

const AddCakePage = () => {
  
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [discount, setDiscount] = useState("");
  const [imgs, setImgs] = useState(null);
  const [type, setType] = useState("cake");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [coverImage, setCoverImage] = useState(null);
  const [mainPrice, setMainPrice] = useState();
  const [discountedPrice, setDiscountedPrice] = useState();
  const [weightPrice, setWeightPrice] = useState([
    { weight: "", mainPrice: "", discountedPrice: "" },
  ]);
  const handleFile = (e) => {
    setImgs(e.target.files);
  };

  const handleCoverImage = (e) => {
    setCoverImage(e.target.files[0]);
  };

  const handleWeightChange = (index, value) => {
    const newWeightPrice = [...weightPrice];
    newWeightPrice[index].weight = value;
    setWeightPrice(newWeightPrice);
    console.log(weightPrice);
  };
  const handleDiscountedPrice = (index, value) => {
    const newWeightPrice = [...weightPrice];
    newWeightPrice[index].discountedPrice = value;
    setWeightPrice(newWeightPrice);
    console.log(weightPrice);
  };
  const handleMainPriceChange = (index, value) => {
    const newWeightPrice = [...weightPrice];
    newWeightPrice[index].mainPrice = value;
    setWeightPrice(newWeightPrice);
    console.log(weightPrice);
  };

  const addWeightPrice = () => {
    setWeightPrice([
      ...weightPrice,
      { weight: "", mainPrice: "", discountedPrice: "" },
    ]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    if (!imgs || !coverImage) {
      setMessage("Please select an image");
      notify(0, "Please select the Image")
      setLoading(false);
      return;
    }

    const coverImageUrl = await uploadImage(coverImage);
    const cakeData = {
      title,
      description,
      mainPrice,
      discountedPrice,
      weightPrice,
      discount,
      cover_img: coverImageUrl,
      type,
    };
    console.log(cakeData);
    try {
      const docRef = await addDoc(collection(db, "cakes"), cakeData);
      notify(1 , "Cake added successfully")
      console.log(docRef.id);
      uploadFiles(imgs, docRef.id);
    } catch (error) {
      console.error("Error adding cake: ", error);
      notify(0,"Error in adding cake")
      setMessage("Error adding cake");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 p-6">
      <div className="  md:text-2xl text-xl font-medium  py-1">
        Add Cake Here
      </div>
      <div className="grid md:grid-cols-1 gap-4">
        <div className="">
          <p className="md:text-xl font-bold flex">
            <span>Title</span> <span className="text-red-600">*</span>
          </p>
          <input
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter Cake Title"
            className="border border-gray-400 text-xl focus:border-blue-500 focus:outline-none rounded-md px-4 py-1 w-full"
          />
        </div>
        <div className="">
          <p className="md:text-xl font-bold flex">
            <span>Description</span> <span className="text-red-600">*</span>
          </p>
          <textarea
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter Cake Description"
            className="border border-gray-400 text-xl focus:border-blue-500 focus:outline-none rounded-md px-4 py-1 w-full"
            rows="4"
          />
        </div>
        <div className="">
          <p className="md:text-xl font-bold flex">
            <span> Main Price</span> <span className="text-red-600">*</span>
          </p>
          <input
            onChange={(e) => setMainPrice(e.target.value)}
            placeholder="Enter Cake Price"
            type="number"
            className="border border-gray-400 text-xl focus:border-blue-500 focus:outline-none rounded-md px-4 py-1 w-full"
          />
        </div>
        <div className="">
          <p className="md:text-xl font-bold flex">
            <span> Discounted Price</span>{" "}
            <span className="text-red-600">*</span>
          </p>
          <input
            onChange={(e) => setDiscountedPrice(e.target.value)}
            placeholder="Enter Cake Price"
            type="number"
            className="border border-gray-400 text-xl focus:border-blue-500 focus:outline-none rounded-md px-4 py-1 w-full"
          />
        </div>
        <div className="">
          <p className="md:text-xl font-bold flex">
            <span>Weight Prices</span> <span className="text-red-600">*</span>
          </p>
          {weightPrice.map((item, index) => (
            <div className="grid grid-cols-3 space-y-2 items-center  gap-12 ">
              <div className="col-span-1">
                <select
                  onChange={(e) => handleWeightChange(index, e.target.value)}
                  className="border border-gray-400 text-xl focus:border-blue-500 focus:outline-none rounded-md px-4 py-1 w-full"
                >
                  <option value="">Select Weight</option>
                  <option value="0.5">0.5 KG</option>
                  <option value="1">1 KG</option>
                  <option value="2">2 KG</option>
                  <option value="4">4 KG</option>
                </select>
              </div>
              <div className="col-span-1">
                <input
                  onChange={(e) => handleMainPriceChange(index, e.target.value)}
                  placeholder="Enter Cake Main  Price"
                  type="number"
                  className="border mb-1  border-gray-400 text-xl focus:border-blue-500 focus:outline-none rounded-md px-4 py-1 w-full"
                />
              </div>
              <div className="col-span-1">
                <input
                  onChange={(e) => handleDiscountedPrice(index, e.target.value)}
                  placeholder="Enter Cake Discounted  Price"
                  type="number"
                  className="border mb-1  border-gray-400 text-xl focus:border-blue-500 focus:outline-none rounded-md px-4 py-1 w-full"
                />
              </div>
            </div>
          ))}
          <div className="flex justify-end py-2">
            <button
              onClick={addWeightPrice}
              className="bg-blue-500  px-4 py-1 rounded-md text-white font-semibold cursor-pointer   "
            >
              Add
            </button>
          </div>
        </div>
        <div className="">
          <p className="md:text-xl font-bold flex">
            <span>Discount</span> <span className="text-red-600">*</span>
          </p>
          <input
            onChange={(e) => setDiscount(e.target.value)}
            placeholder="Enter Discount"
            type="number"
            className="border border-gray-400 text-xl focus:border-blue-500 focus:outline-none rounded-md px-4 py-1 w-full"
          />
        </div>
        <div className="">
          <p className="md:text-xl font-bold flex">
            <span> Cover Image</span> <span className="text-red-600">*</span>
          </p>
          <input
            onChange={handleCoverImage}
            type="file"
            className="border border-gray-400 text-xl focus:border-blue-500 focus:outline-none rounded-md px-4 py-1 w-full"
          />
        </div>
        <div className="">
          <p className="md:text-xl font-bold flex">
            <span>Image</span> <span className="text-red-600">*</span>
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
export default AddCakePage;
