"use client";
import Image from "next/image";
import React, { useState } from "react";
import { FaArrowLeft, FaArrowRight, FaTimes } from "react-icons/fa";

const Products = ({ img, location }) => {
  console.log(img[0].url);

  img.forEach((im) => {
    console.log(im.url);
  });

  const [bigImage, setBigImage] = useState(img[0]?.url);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openModal = (index) => {
    setCurrentIndex(index);
    setBigImage(img[index].url);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const showPrevImage = () => {
    const newIndex = (currentIndex - 1 + img.length) % img.length;
    setCurrentIndex(newIndex);
    setBigImage(img[newIndex].url);
  };

  const showNextImage = () => {
    const newIndex = (currentIndex + 1) % img.length;
    setCurrentIndex(newIndex);
    setBigImage(img[newIndex].url);
  };

  return (
    <>
      <div className="flex flex-col md:flex-row gap-2 px-4 md:px-10">
        <div className="flex flex-row gap-2 md:flex-col overflow-x-auto md:overflow-visible">
          {img.map((item, index) => (
            <Image
              className="rounded-md mt-2 cursor-pointer"
              key={index}
              src={item.url}
              width={80}
              height={80}
              onClick={() => openModal(index)}
            />
          ))}
        </div>
        <div className="flex justify-center md:block">
          <Image
            className="rounded-md cursor-pointer"
            src={bigImage}
            width={400}
            height={400}
            onClick={() => openModal(currentIndex)}
          />
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
            <button
              className="absolute top-4 right-4 text-white text-2xl"
              onClick={closeModal}
            >
              <FaTimes />
            </button>
            <button
              className="absolute left-4 text-white text-2xl"
              onClick={showPrevImage}
            >
              <FaArrowLeft />
            </button>
            <Image
              className="rounded-md"
              src={bigImage}
              width={800}
              height={800}
            />
            <button
              className="absolute right-4 text-white text-2xl"
              onClick={showNextImage}
            >
              <FaArrowRight />
            </button>
          </div>
        )}
      </div>
      {location && (
        <div className="mt-3  md:px-10 px-5">
          <p className="text-xl font-medium text-[#F06429] ">Address</p>
          <div className="">{location}</div>
        </div>
      )}
    </>
  );
};

export default Products;
