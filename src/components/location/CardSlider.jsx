"use client";
import Image from "next/image";
import React from "react";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function CardSlider({ images }) {
 
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5, // Number of images shown at a time
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    centerMode: true, // Center the current slide
    centerPadding: "0", // Adjust padding to fit content
   
  };

  return (
    <>
      <Slider {...settings} className="slider-container">
        {images.map((item, index) => (
          <div key={index} className="image-slide h-[300px] w-24 relative">
            <Image
              src={item.img}
              alt={`image-${index}`}
              layout="responsive"
              width={200}
              height={100}
            />
            <div className="overlay">
              <h3 className="overlay-text">{item.heading}</h3>
            </div>
          </div>
        ))}
      </Slider>

      <style jsx global>{`
        .slider-container {
          max-width: 100%;
          margin: 0 auto;
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

        .slick-slide > div {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .slick-dots {
          bottom: 10px; // Adjust this value to move the dots up or down
        }

        .image-slide {
          padding: 0 10px; // Add padding to the slides if needed
          position: relative;
        }

        .slick-prev {
          left: 10px; // Customize the left position
        }

        .slick-next {
          right: 10px; // Customize the right position
        }

        .slick-arrow:focus {
          outline: none;
        }

        .overlay {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background-color: rgba(0, 0, 0, 0.5);
          color: white;
          padding: 10px;
          border-radius: 5px;
        }

        .overlay-text {
          margin: 0;
          font-size: 16px;
          text-align: center;
        }
      `}</style>
    </>
  );
}
