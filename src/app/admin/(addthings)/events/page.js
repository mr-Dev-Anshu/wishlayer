"use client";
import { db } from "@/config/firebase.config";
import { notify } from "@/controller/notify";
import { uploadFiles, uploadImage } from "@/controller/upload";
import { addDoc, collection } from "firebase/firestore";
import React, { useState } from "react";
import { ToastContainer } from "react-toastify";

const AddEventPage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [discount, setDiscount] = useState("");
  const [imgs, setImgs] = useState(null);
  const [eventType, setEventType] = useState("general");
  const [location, setLocation] = useState("");
  const [terms, setTerms] = useState([{ term: "" }]);
  const [loading, setLoading] = useState(false);
  const [coverImage, setCoverImage] = useState(null);
  const [mainPrice, setMainPrice] = useState("");
  const [discountedPrice, setDiscountedPrice] = useState("");
  const [type, setType] = useState("event");
  const [startingDate, setStartingDate] = useState();
  const [startingTime, setStartingTimg] = useState();
  const [endTime, setEndTime] = useState();
  const [endDate , setEndDate] = useState() ; 

  const handleFile = (e) => {
    setImgs(e.target.files);
  };

  const handleCoverImage = (e) => {
    setCoverImage(e.target.files[0]);
  };

  const addTerm = () => {
    console.log("running");
    setTerms([...terms, { term: "" }]);
  };

  const handleTerm = (index, value) => {
    const newTerm = [...terms];
    newTerm[index].term = value;
    setTerms(newTerm);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

   

   
    if (!imgs || !coverImage) {
      notify(0, "Please select the Image");
      setLoading(false);
      return;
    }

    const coverImageUrl = await uploadImage(coverImage);
    const eventData = {
      title,
      description,
      mainPrice,
      discountedPrice,
      discount,
      location,
      terms,
      eventType,
      startingDate , 
      type, 
      startingTime ,
      endDate , 
      endTime , 
      cover_img: coverImageUrl,
    };

    try {
      const docRef = await addDoc(collection(db, "cakes"), eventData);
      notify(1, "Event added successfully");
      uploadFiles(imgs, docRef.id);
    } catch (error) {
      console.error("Error adding event: ", error);
      notify(0, "Error in adding event");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 p-6">
      <div className="md:text-2xl text-xl font-medium py-1">Add Event Here</div>
      <div className="grid md:grid-cols-1 gap-4">
        <div>
          <p className="md:text-xl font-bold flex">
            <span>Title</span> <span className="text-red-600">*</span>
          </p>
          <input
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter Event Title"
            className="border border-gray-400 text-xl focus:border-blue-500 focus:outline-none rounded-md px-4 py-1 w-full"
          />
        </div>
        <div>
          <p className="md:text-xl font-bold flex">
            <span>Description</span> <span className="text-red-600">*</span>
          </p>
          <textarea
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter Event Description"
            className="border border-gray-400 text-xl focus:border-blue-500 focus:outline-none rounded-md px-4 py-1 w-full"
            rows="4"
          />
        </div>
        <div>
          <p className="md:text-xl font-bold flex">
            <span>Main Price</span> <span className="text-red-600">*</span>
          </p>
          <input
            onChange={(e) => setMainPrice(e.target.value)}
            placeholder="Enter Event Price"
            type="number"
            className="border border-gray-400 text-xl focus:border-blue-500 focus:outline-none rounded-md px-4 py-1 w-full"
          />
        </div>
        <div>
          <p className="md:text-xl font-bold flex">
            <span>Discounted Price</span>{" "}
            <span className="text-red-600">*</span>
          </p>
          <input
            onChange={(e) => setDiscountedPrice(e.target.value)}
            placeholder="Enter Discounted Price"
            type="number"
            className="border border-gray-400 text-xl focus:border-blue-500 focus:outline-none rounded-md px-4 py-1 w-full"
          />
        </div>
        <div>
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
        <div>
          <p className="md:text-xl font-bold flex">
            <span>Location</span> <span className="text-red-600">*</span>
          </p>
          <input
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter Event Location"
            className="border border-gray-400 text-xl focus:border-blue-500 focus:outline-none rounded-md px-4 py-1 w-full"
          />
        </div>
        <div>
          <p className="md:text-xl font-bold flex">
            <span>Start Date </span> <span className="text-red-600">*</span>
          </p>
          <input
            onChange={(e) => setStartingDate(e.target.value)}
            placeholder="Enter Event Location"
            className="border border-gray-400 text-xl focus:border-blue-500 focus:outline-none rounded-md px-4 py-1 w-full"
            type="date"
          />
        </div>
        <div>
          <p className="md:text-xl font-bold flex">
            <span>Start Time </span> <span className="text-red-600">*</span>
          </p>
          <input
            onChange={(e) => setStartingTimg(e.target.value)}
            placeholder="Enter Event Location"
            className="border border-gray-400 text-xl focus:border-blue-500 focus:outline-none rounded-md px-4 py-1 w-full"
            type="time"
          />
        </div>
        <div>
          <p className="md:text-xl font-bold flex">
            <span>End Time </span> <span className="text-red-600">*</span>
          </p>
          <input
            onChange={(e) => setEndTime(e.target.value)}
            placeholder="Enter Event Location"
            className="border border-gray-400 text-xl focus:border-blue-500 focus:outline-none rounded-md px-4 py-1 w-full"
            type="time"
          />
        </div>
        <div>
          <p className="md:text-xl font-bold flex">
            <span>End Date </span> <span className="text-red-600">*</span>
          </p>
          <input
            onChange={(e) => setEndDate(e.target.value)}
            placeholder="Enter Event Location"
            className="border border-gray-400 text-xl focus:border-blue-500 focus:outline-none rounded-md px-4 py-1 w-full"
            type="date"
          />
        </div>

        <div>
          <p className="md:text-xl font-bold flex">
            <span>Terms and Conditions</span>{" "}
            <span className="text-red-600">*</span>
          </p>
          <div className="space-y-4">
            {terms.map((item, index) => (
              <div className="flex items-center gap-2 ">
                <span className="text-xl ">{index + 1}.</span>
                <input
                  onChange={(e) => handleTerm(index, e.target.value)}
                  placeholder="Enter Terms & Conditions "
                  className="border border-gray-400 text-xl focus:border-blue-500 focus:outline-none rounded-md px-4 py-1 w-full"
                />
              </div>
            ))}
            <button
              onClick={addTerm}
              className="bg-blue-500  px-4 py-1 rounded-md text-white font-semibold cursor-pointer   "
            >
              Add
            </button>
          </div>
        </div>
        <div>
          <p className="md:text-xl font-bold flex">
            <span>Event Type</span> <span className="text-red-600">*</span>
          </p>
          <select
            onChange={(e) => setEventType(e.target.value)}
            className="border border-gray-400 text-xl focus:border-blue-500 focus:outline-none rounded-md px-4 py-1 w-full"
          >
            <option value="general">General</option>
            <option value="workshop">Music</option>
            <option value="concert">Concert</option>
            {/* Add other event types as needed */}
          </select>
        </div>
        <div>
          <p className="md:text-xl font-bold flex">
            <span>Cover Image</span> <span className="text-red-600">*</span>
          </p>
          <input
            onChange={handleCoverImage}
            type="file"
            className="border border-gray-400 text-xl focus:border-blue-500 focus:outline-none rounded-md px-4 py-1 w-full"
          />
        </div>
        <div>
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
      </div>
      <ToastContainer />
    </div>
  );
};

export default AddEventPage;
