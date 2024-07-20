// src/components/ExploreSlider.js
"use client";
import Image from "next/image";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function ExploreSlider({ img, heading }) {
  console.log("Rendering ExploreSlider component");

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    vertical: false, // Enable vertical sliding
    verticalSwiping: true, // Enable vertical swiping
  };

  return (
    <div className="slider-container">
      <Slider {...settings}>
        <div className="relative ">
          <Image
            src={img}
            alt="hero"
            objectFit="cover" // Cover the container
            className="object-cover w-full"
          />
          <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white p-4 bg-black bg-opacity-40">
            <h2 className="text-3xl font-bold">{heading}</h2>
          </div>
        </div>
      </Slider>

      <style jsx global>{`
        .slider-container {
          max-width: 100%;
          max-height: 100vh; // Ensure the container fits within viewport height
          overflow: hidden;
        }

        .slick-prev:before,
        .slick-next:before {
          color: black; // Customize the color of the navigation arrows
        }

        .slick-dots li button:before {
          color: black; // Customize the color of the dots
        }

        .slick-dots li.slick-active button:before {
          color: red; // Customize the color of the active dot
        }

        .slick-prev,
        .slick-next,
        .slick-dots li button {
          outline: none;
        }

        .slick-slide > div {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .slick-dots {
          bottom: 10px; // Adjust this value to move the dots up or down
        }
      `}</style>
    </div>
  );
}
