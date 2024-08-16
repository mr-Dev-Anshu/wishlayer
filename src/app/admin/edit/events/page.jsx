"use client";
import { db } from "@/config/firebase.config";
import { notify } from "@/controller/notify";
import { uploadFiles, uploadImage } from "@/controller/upload";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import { ToastContainer} from "react-toastify";


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
  const [mainPrice, setMainPrice] = useState("");
  const [discountedPrice, setDiscountedPrice] = useState("");
  const [startingDate, setStartingDate] = useState("");
  const [startingTime, setStartingTimg] = useState("");
  const [endTime, setEndTime] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    if (id) {
      const fetchEventData = async () => {
        const docRef = doc(db, "cakes", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setTitle(data.title);
          setDescription(data.description);
          setMainPrice(data.mainPrice);
          setDiscountedPrice(data.discountedPrice);
          setDiscount(data.discount);
          setLocation(data.location);
          setTerms(data.terms || [{ term: "" }]);
          setEventType(data.eventType);
          setStartingDate(data.startingDate);
          setStartingTimg(data.startingTime);
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
      mainPrice,
      discountedPrice,
      discount,
      location,
      terms,
      eventType,
      startingDate,
      startingTime,
      endDate,
      endTime,
      cover_img: coverImageUrl,
    };

    try {
      const docRef = doc(db, "cakes", id);
      await updateDoc(docRef, eventData);
      notify( 1 ,  "Event updated successfully");
      if (imgs) {
        uploadFiles(imgs, docRef.id);
      }
    } catch (error) {
      console.error("Error updating event: ", error);
      toast.error("Error updating event");
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
        <div>
          <p className="md:text-xl font-bold flex">
            <span>Main Price</span> <span className="text-red-600">*</span>
          </p>
          <input
            value={mainPrice}
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
            value={discountedPrice}
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
            onChange={(e) => setStartingTimg(e.target.value)}
            type="time"
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
            <span>Terms and Conditions</span>{" "}
            <span className="text-red-600">*</span>
          </p>
          {terms.map((term, index) => (
            <input
              key={index}
              value={term.term}
              onChange={(e) => handleTerm(index, e.target.value)}
              placeholder="Enter Term and Condition"
              className="border border-gray-400 text-xl focus:border-blue-500 focus:outline-none rounded-md px-4 py-1 w-full my-1"
            />
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
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50"
          />
          {typeof coverImage === "string" && (
            <img src={coverImage} alt="cover" className="mt-4 h-20" />
          )}
        </div>
        <div>
          <p className="md:text-xl font-bold flex">
            <span>Upload Images</span>
          </p>
          <input
            type="file"
            multiple
            onChange={handleFile}
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50"
          />
        </div>
      </div>
      <div className="flex justify-end mt-4">
        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white px-6 py-2 rounded-md"
          disabled={loading}
        >
          {loading ? "Updating..." : "Update Event"}
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default EditEventPage;
