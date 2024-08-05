"use client";
import { db } from "@/config/firebase.config";
import { uploadFiles, uploadImage } from "@/controller/upload";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState, useEffect } from "react";

const EditDecorationPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [discount, setDiscount] = useState("");
  const [imgs, setImgs] = useState(null);
  const [type, setType] = useState("decoration");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [coverImage, setCoverImage] = useState(null);
  const [mainPrice, setMainPrice] = useState();
  const [discountedPrice, setDiscountedPrice] = useState();

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        const docRef = doc(db, "cakes", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          console.log( "this is data from decoration " ,  data)
          setTitle(data.title);
          setDescription(data.description);
          setMainPrice(data.mainPrice);
          setDiscountedPrice(data.discountedPrice);
          setDiscount(data.discount);
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
    const decorationData = {
      title,
      description,
      mainPrice,
      discountedPrice,
      discount,
      cover_img: coverImageUrl,
      type,
    };
    console.log(decorationData);

    try {
      const docRef = doc(db, "cakes", id);
      await updateDoc(docRef, decorationData);
      setMessage("Decoration has been updated successfully");
      if (imgs) {
        uploadFiles(imgs, docRef.id);
      }
    } catch (error) {
      console.error("Error updating decoration: ", error);
      setMessage("Error updating decoration");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 p-6">
      <div className="md:text-2xl text-xl font-medium py-1">
        Edit Decoration Here
      </div>
      <div className="grid md:grid-cols-1 gap-4">
        <div className="">
          <p className="md:text-xl font-bold flex">
            <span>Title</span> <span className="text-red-600">*</span>
          </p>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter Decoration Title"
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
            placeholder="Enter Decoration Description"
            className="border border-gray-400 text-xl focus:border-blue-500 focus:outline-none rounded-md px-4 py-1 w-full"
            rows="4"
          />
        </div>
        <div className="">
          <p className="md:text-xl font-bold flex">
            <span>Main Price</span> <span className="text-red-600">*</span>
          </p>
          <input
            value={mainPrice}
            onChange={(e) => setMainPrice(e.target.value)}
            placeholder="Enter Decoration Price"
            type="number"
            className="border border-gray-400 text-xl focus:border-blue-500 focus:outline-none rounded-md px-4 py-1 w-full"
          />
        </div>
        <div className="">
          <p className="md:text-xl font-bold flex">
            <span>Discounted Price</span> <span className="text-red-600">*</span>
          </p>
          <input
            value={discountedPrice}
            onChange={(e) => setDiscountedPrice(e.target.value)}
            placeholder="Enter Discounted Price"
            type="number"
            className="border border-gray-400 text-xl focus:border-blue-500 focus:outline-none rounded-md px-4 py-1 w-full"
          />
        </div>
        <div className="">
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
export default EditDecorationPage;