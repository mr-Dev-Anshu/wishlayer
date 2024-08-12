"use client";
import { db } from "@/config/firebase.config";
import { uploadFiles, uploadImage } from "@/controller/upload";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Nagar } from "@/constant/Nagar";

const UpdateVenuePage = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [pincode, setPincode] = useState("");
  const [state, setState] = useState("");
  const [address, setAddress] = useState("");
  const [imgs, setImgs] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [coverImage, setCoverImage] = useState(null);
   const [nagar , setNagar] = useState() ; 
  const router = useRouter();

  useEffect(() => {
    const fetchVenue = async () => {
      try {
        const docRef = doc(db, "cakes", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const venueData = docSnap.data();
          setTitle(venueData.title);
          setDescription(venueData.description);
          setPincode(venueData.pincode);
          setState(venueData.state);
          setAddress(venueData.address);
          setCoverImage(venueData.cover_img);
          setNagar(venueData?.nagar) ; 
        } else {
          setMessage("Venue not found");
        }
      } catch (error) {
        console.error("Error fetching venue: ", error);
        setMessage("Error fetching venue");
      }
    };

    if (id) {
      fetchVenue();
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

    try {
      const docRef = doc(db, "cakes", id);
      let coverImageUrl = coverImage;

      if (typeof coverImage !== "string") {
        coverImageUrl = await uploadImage(coverImage);
      }

      const venueData = {
        title,
        description,
        pincode,
        state,
        address,
        type: "venue",
        cover_img: coverImageUrl,
        nagar
      };

      await updateDoc(docRef, venueData);

      if (imgs) {
        uploadFiles(imgs, id);
      }

      setMessage("Venue has been updated successfully");
      router.push("/venues");
    } catch (error) {
      console.error("Error updating venue: ", error);
      setMessage("Error updating venue");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 p-6">
      <div className="md:text-2xl text-xl font-medium py-1">Update Venue</div>
      <div className="grid md:grid-cols-1 gap-4">
        <div className="">
          <p className="md:text-xl font-bold flex">
            <span>Title</span> <span className="text-red-600">*</span>
          </p>
          <input
            value={title}
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
            value={description}
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
            <span>Ngar</span> <span className="text-red-600">*</span>
          </p>
          <select
            value={nagar}
            onChange={(e) => setNagar(e.target.value)}
            className="border border-gray-400 text-xl focus:border-blue-500 focus:outline-none rounded-md px-4 py-1 w-full"
          >
            <option value="">Select Nagar</option>
            {Nagar.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>
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
export default UpdateVenuePage;
