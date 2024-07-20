// src/components/Explore.js
import React from "react";
import explorecake from "@/assets/explorecake.png";
import Image from "next/image";
import ProductCard from "./ProductCard";

const Explore = ({headingImage , data , title }) => {
  return (
    <div className="">
      <div className="my-12">
        <div className="flex text-3xl font-bold justify-center">
          Explore Our {title}
        </div>
        <div className="flex justify-center mt-2 ">
          <div className="w-14 h-2 bg-[#F0642966] rounded-lg"></div>
        </div>
      </div>
      <Image className="w-full h-[250px] object-cover" src={headingImage} />
      <div className="grid md:grid-cols-6 px-12 py-12">
        {data.map((item) => (
          <div className="md:col-span-2">
            <ProductCard
              img={item.img}
              discount={item.discount}
              title={item.title}
              price={item.price}
              rating={item.rating}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Explore;
