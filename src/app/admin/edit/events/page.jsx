"use client";
import { db } from "@/config/firebase.config";
import { notify } from "@/controller/notify";
import { uploadFiles, uploadImage } from "@/controller/upload";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";

const EditEventPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [discount, setDiscount] = useState("");
  const [imgs, setImgs] = useState(null);
  const [eventType, setEventType] = useState("general");
  const [location, setLocation] = useState("");
  const [terms, setTerms] = useState([{ term: "" }]);
  const [loading, setLoading] = useState(false);
  const [coverImage, setCoverImage] = useState(null);
  const [type, setType] = useState("event");
  const [startingDate, setStartingDate] = useState("");
  const [startingTime, setStartingTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [endDate, setEndDate] = useState("");
  const [eventPrice, setEventPrice] = useState([
    { person: "", discountedPrice: "", mainPrice: "" },
  ]);

  useEffect(() => {
    if (id) {
      const fetchEventData = async () => {
        const docRef = doc(db, "cakes", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setTitle(data.title);
          setDescription(data.description);
          setEventPrice(
            data.eventPrice || [
              { person: "", discountedPrice: "", mainPrice: "" },
            ]
          );
          setDiscount(data.discount);
          setLocation(data.location);
          setTerms(data.terms || [{ term: "" }]);
          setEventType(data.eventType);
          setStartingDate(data.startingDate);
          setStartingTime(data.startingTime);
          setEndTime(data.endTime);
          setEndDate(data.endDate);
          setCoverImage(data.cover_img);
        } else {
          console.log("No such document!");
        }
      };
      fetchEventData();
    }
  }, [id]);

  const handleFile = (e) => {
    setImgs(e.target.files);
  };

  const handleCoverImage = (e) => {
    setCoverImage(e.target.files[0]);
  };

  const handleTerm = (index, value) => {
    const newTerm = [...terms];
    newTerm[index].term = value;
    setTerms(newTerm);
  };

  const addTerm = () => {
    setTerms([...terms, { term: "" }]);
  };

  const handleEventPriceChange = (index, field, value) => {
    const newPrices = [...eventPrice];
    newPrices[index][field] = value;
    setEventPrice(newPrices);
  };

  const addEventPrice = () => {
    setEventPrice([
      ...eventPrice,
      { person: "", discountedPrice: "", mainPrice: "" },
    ]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    

    let coverImageUrl = coverImage;
    if (coverImage instanceof File) {
      coverImageUrl = await uploadImage(coverImage);
    }

    const eventData = {
      title,
      description,
      eventPrice,
      discount,
      location,
      terms,
      eventType,
      startingDate,
      type,
      startingTime,
      endDate,
      endTime,
      cover_img: coverImageUrl,
    };

    try {
      const docRef = doc(db, "cakes", id);
      await updateDoc(docRef, eventData);
      notify(1, "Event updated successfully");
      if (imgs) {
        uploadFiles(imgs, docRef.id);
      }
    } catch (error) {
      console.error("Error updating event: ", error);
      notify(0, "Error updating event");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 p-6">
      <div className="md:text-2xl text-xl font-medium py-1">Edit Event</div>
      <div className="grid md:grid-cols-1 gap-4">
        <div>
          <p className="md:text-xl font-bold flex">
            <span>Title</span> <span className="text-red-600">*</span>
          </p>
          <input
            value={title}
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
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter Event Description"
            className="border border-gray-400 text-xl focus:border-blue-500 focus:outline-none rounded-md px-4 py-1 w-full"
            rows="4"
          />
        </div>
        <div className="">
          <p className="md:text-xl font-bold flex">
            <span> Event Prices</span> <span className="text-red-600">*</span>
          </p>
          {eventPrice.map((item, index) => (
            <div className="grid grid-cols-3 space-y-2 items-center  gap-12 ">
              <div className="col-span-1">
                <select
                  onChange={(e) =>
                    handleEventPriceChange(index, "person", e.target.value)
                  }
                  className="border border-gray-400 text-xl focus:border-blue-500 focus:outline-none rounded-md px-4 py-1 w-full"
                >
                  <option value="">Select Option</option>
                  <option value="king">King</option>
                  <option value="queen">Queen </option>
                  <option value="couple">Coupel's Price </option>
                </select>
              </div>
              <div className="col-span-1">
                <input
                  onChange={(e) =>
                    handleEventPriceChange(index, "mainPrice", e.target.value)
                  }
                  placeholder="Enter Cake Main  Price"
                  type="number"
                  className="border mb-1  border-gray-400 text-xl focus:border-blue-500 focus:outline-none rounded-md px-4 py-1 w-full"
                />
              </div>
              <div className="col-span-1">
                <input
                  onChange={(e) =>
                    handleEventPriceChange(
                      index,
                      "discountedPrice",
                      e.target.value
                    )
                  }
                  placeholder="Enter Cake Discounted  Price"
                  type="number"
                  className="border mb-1  border-gray-400 text-xl focus:border-blue-500 focus:outline-none rounded-md px-4 py-1 w-full"
                />
              </div>
            </div>
          ))}
          <div className="flex justify-end py-2">
            <button
              onClick={addEventPrice}
              className="bg-blue-500  px-4 py-1 rounded-md text-white font-semibold cursor-pointer   "
            >
              Add
            </button>
          </div>
        </div>
        <div>
          <p className="md:text-xl font-bold flex">
            <span>Discount</span> <span className="text-red-600">*</span>
          </p>
          <input
            value={discount}
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
            value={location}
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
            value={startingDate}
            onChange={(e) => setStartingDate(e.target.value)}
            type="date"
            className="border border-gray-400 text-xl focus:border-blue-500 focus:outline-none rounded-md px-4 py-1 w-full"
          />
        </div>
        <div>
          <p className="md:text-xl font-bold flex">
            <span>Start Time </span> <span className="text-red-600">*</span>
          </p>
          <input
            value={startingTime}
            onChange={(e) => setStartingTime(e.target.value)}
            type="time"
            className="border border-gray-400 text-xl focus:border-blue-500 focus:outline-none rounded-md px-4 py-1 w-full"
          />
        </div>
        <div>
          <p className="md:text-xl font-bold flex">
            <span>End Date </span> <span className="text-red-600">*</span>
          </p>
          <input
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            type="date"
            className="border border-gray-400 text-xl focus:border-blue-500 focus:outline-none rounded-md px-4 py-1 w-full"
          />
        </div>
        <div>
          <p className="md:text-xl font-bold flex">
            <span>End Time </span> <span className="text-red-600">*</span>
          </p>
          <input
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            type="time"
            className="border border-gray-400 text-xl focus:border-blue-500 focus:outline-none rounded-md px-4 py-1 w-full"
          />
        </div>
        <div>
          <p className="md:text-xl font-bold flex">
            <span>Terms</span>
          </p>
          {terms.map((term, index) => (
            <div key={index} className="space-y-2">
              <input
                value={term.term}
                onChange={(e) => handleTerm(index, e.target.value)}
                placeholder="Enter Term"
                className="border border-gray-400 text-xl focus:border-blue-500 focus:outline-none rounded-md px-4 py-1 w-full my-1"
              />
            </div>
          ))}
          <button
            type="button"
            onClick={addTerm}
            className="bg-blue-500 text-white px-3 py-1 rounded-md mt-2"
          >
            Add Term
          </button>
        </div>
        <div>
          <p className="md:text-xl font-bold flex">
            <span>Cover Image</span> <span className="text-red-600">*</span>
          </p>
          <input
            type="file"
            onChange={handleCoverImage}
            className="border border-gray-400 text-xl focus:border-blue-500 focus:outline-none rounded-md px-4 py-1 w-full"
          />
          {coverImage && typeof coverImage === "string" && (
            <img
              src={coverImage}
              alt="Cover"
              className="mt-4 w-48 h-32 object-cover rounded-lg"
            />
          )}
        </div>
        <div>
          <p className="md:text-xl font-bold flex">
            <span>Upload Images</span> <span className="text-red-600">*</span>
          </p>
          <input
            type="file"
            multiple
            onChange={handleFile}
            className="border border-gray-400 text-xl focus:border-blue-500 focus:outline-none rounded-md px-4 py-1 w-full"
          />
        </div>
      </div>
      <div className="flex justify-end">
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-blue-500 text-white px-6 py-2 rounded-md mt-4"
        >
          {loading ? "Updating..." : "Update Event"}
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default EditEventPage;
