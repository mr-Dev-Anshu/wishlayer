"use client";
import { getSession } from "@/authThing/action";
import { db } from "@/config/firebase.config";
import { getCurrentTime } from "@/controller/Time";
import { notify } from "@/controller/notify";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { MdOutlineVerified } from "react-icons/md";
import Spinner from "../Spinner";

const RatingAndReview = ({ id }) => {
  const [reviews, setReviews] = useState([]);
  const [canType, setCanType] = useState();
  const [phone, setPhone] = useState();
  const [name, setName] = useState();
  const [review, setReview] = useState();
  const [occasion, setOccasion] = useState();
  const [loading, setLoading] = useState();
  const [reviewLoading, setReviewLoading] = useState();
  const getReviews = async () => {
    try {
      setReviewLoading(true);
      if (id) {
        const q2 = query(
          collection(db, "reviews"),
          where("productId", "==", id)
        );
        const reviewsSnap = await getDocs(q2);
        const allReview = [];
        reviewsSnap.forEach((doc) => {
          allReview.push({ id: doc.id, ...doc.data() });
        });
        setReviews(allReview);
      }
      setReviewLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const handleCanType = async () => {
      try {
        const session = await getSession();
        const phone = session?.phone;
        if (phone) {
          const q = query(
            collection(db, "orders"),
            where("phone", "==", phone),
            where("id", "==", id)
          );
          const dataSnap = await getDocs(q);
          setCanType(!dataSnap.empty);
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (id) {
      handleCanType();
      getReviews();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const currentTime = getCurrentTime();
    try {
      const reviewData = {
        review,
        name,
        occasion,
        productId: id,
        date: currentTime,
      };
      console.log(reviewData);

      const docRef = collection(db, "reviews");
      await addDoc(docRef, reviewData);
      notify(1, "Thanks for your  feedback ");
      getReviews();
    } catch (error) {
      console.log(error);
    }
  };

  if (reviewLoading) {
    return <Spinner />;
  }

  return (
    <div className="md:pl-12 md:mt-12 my-6 px-10">
      <p className="md:text-xl  md:font-medium font-semibold  my-2">
        Ratings & Reviews{" "}
      </p>
      {canType && (
        <form onSubmit={handleSubmit} className="mt-8">
          <div className="mb-4">
            <label className="block text-gray-700">Name:</label>
            <input
              onChange={(e) => setName(e.target.value)}
              type="text"
              name="name"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Review:</label>
            <textarea
              onChange={(e) => setReview(e.target.value)}
              name="review"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Occasion:</label>
            <input
              onChange={(e) => setOccasion(e.target.value)}
              type="text"
              name="occasion"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Submit Review
          </button>
        </form>
      )}

      <div className="space-y-4 ">
        {reviews.map((review, index) => (
          <div key={index} className="border-b pb-4 border-gray-300 space-y-2">
            <div className=" mb-2 flex gap-4 ">
              <span className="font-medium md:font-semibold ">
                {review.name}
              </span>
            </div>
            <div className="flex gap-6  items-center ">
              <span className="text-2xl mr-2"></span>
              <span className="text-gray-500  flex items-center gap-2 ">
                <span className="text-white bg-[#42A5F5] rounded-full">
                  <MdOutlineVerified />
                </span>
                <span>Verified User</span>{" "}
              </span>
            </div>
            <div className="text-gray-400  flex  gap-12">
              <span>Posted on {review.date}</span>

              <ul>
                <li className="list-disc">Ocassion : {review.occasion} </li>
              </ul>
            </div>
            <div className="flex justify-between">
              <span className="max-w-xl ">{review.review}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default RatingAndReview;