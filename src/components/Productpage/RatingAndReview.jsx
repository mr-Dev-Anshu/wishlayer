import Image from "next/image";
import React from "react";
import { MdOutlineVerified } from "react-icons/md";

const RatingAndReview = () => {
  const rating = 4.5;
  const images = [
    "https://firebasestorage.googleapis.com/v0/b/news-f534b.appspot.com/o/cake2.png?alt=media&token=a4cbecd2-163e-4611-a824-8d9b1c82763a",
    "https://firebasestorage.googleapis.com/v0/b/news-f534b.appspot.com/o/cake3.png?alt=media&token=dc524eff-b5d3-4ac3-990a-cf99d3aa1cf5",
    "https://firebasestorage.googleapis.com/v0/b/news-f534b.appspot.com/o/cake4.png?alt=media&token=ef29acd8-9733-48f6-8400-0000d44b89f6",
    "https://firebasestorage.googleapis.com/v0/b/news-f534b.appspot.com/o/cake5.png?alt=media&token=076025a1-226f-40e0-a0ea-e8cc81afffa4",
    "https://firebasestorage.googleapis.com/v0/b/news-f534b.appspot.com/o/offer2.png?alt=media&token=ffeadaac-eaba-4bad-a456-4e07c5a690aa",
  ];
  const reviews = [
    {
      name: "John Doe",
      review: "Great product!",
      stars: 5,
      date: "2024-07-20",
    },
    {
      name: "Jane Smith",
      review: "Very useful.",
      stars: 4,
      date: "2024-07-18",
    },
    {
      name: "Bob Johnson",
      review: "Good value for money.",
      stars: 4,
      date: "2024-07-15",
    },
  ];

  return (
    <div className="p-6">
      <p className="text-2xl font-medium my-2">Ratings & Reviews </p>
      <div className="flex items-center mb-6">
        <span className="text-2xl mr-2">
          <span className={`text-2xl text-yellow-500`}>★</span>
          {rating}/5
        </span>
      </div>

      <div className="flex items-center mb-6 gap-4">
        {images.map((image, index) => (
          <div key={index} className="relative">
            <Image
              src={image}
              alt={`Review ${index + 1}`}
              width={80}
              height={80}
              className="rounded-md"
            />
            {index === 4 && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white font-bold rounded-md cursor-pointer">
                See More
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="space-y-4">
        {reviews.map((review, index) => (
          <div key={index} className="border-b pb-4 border-gray-300 space-y-2">
            <div className=" mb-2 flex gap-4 ">
              <span className="font-bold">{review.name}</span>
            </div>
            <div className="flex gap-6  items-center ">
              <span className="text-2xl mr-2">
                <span
                  className={`text-xl text-[#1C9550] bg-gray-200 p-1 rounded-md font-medium  `}
                >
                  ★ {rating}
                </span>
              </span>
              <span className="text-gray-500 font-medium flex items-center gap-2 ">
                <span
                  className="text-white bg-[#42A5F5] rounded-full"
                >
                  <MdOutlineVerified />
                </span>
                <span>Verified User</span>{" "}
              </span>
            </div>
            <div className="text-gray-400 font-bold flex  gap-12">
              <span>Posted on 2/2/2024</span>
              <ul>
                <li className="list-disc">Noida</li>
              </ul>
              <ul>
                <li className="list-disc">Ocassion : Birthday </li>
              </ul>
            </div>
            <div className="flex justify-between">
              <span className="max-w-xl font-bold">{review.review}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RatingAndReview;
