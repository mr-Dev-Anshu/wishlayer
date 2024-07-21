"use client";
import Image from "next/image";
import React from "react";
import Slider from "react-slick";
import hero1 from "@/assets/hero.png";
import hero2 from "@/assets/hero.png";
import hero3 from "@/assets/hero.png";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


export default function SimpleSlider() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 3000,
      arrows: true, 
    };
  
    return (
      <>
        <Slider {...settings} className="slider-container">
          <div>
            <Image src={'https://firebasestorage.googleapis.com/v0/b/news-f534b.appspot.com/o/hero.png?alt=media&token=ca07f37d-7331-433b-96e5-012b2a82da2a'} alt="hero1" layout="responsive" width={800} height={400} />
          </div>
          <div>
            <Image src={'https://firebasestorage.googleapis.com/v0/b/news-f534b.appspot.com/o/hero.png?alt=media&token=ca07f37d-7331-433b-96e5-012b2a82da2a'} alt="hero2" layout="responsive" width={800} height={400} />
          </div>
          <div>
            <Image src={'https://firebasestorage.googleapis.com/v0/b/news-f534b.appspot.com/o/hero.png?alt=media&token=ca07f37d-7331-433b-96e5-012b2a82da2a'} alt="hero3" layout="responsive" width={800} height={400} />
          </div>
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
      </>
    );
  }