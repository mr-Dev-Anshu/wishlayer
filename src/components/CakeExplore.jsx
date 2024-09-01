import React from "react";
import explorecake from "@/assets/explorecake.png";
import Image from "next/image";
import { CakeData } from "@/constant/CakeData";
import ProductCard from "./ProductCard";

const CakeExplore = () => {
  return (
    <div className="">
      <div className="my-6 md:my-12">
        <div className="text-2xl md:text-3xl font-bold text-center">
          Explore Our Cakes
        </div>
        <div className="flex justify-center mt-2">
          <div className="w-10 h-1 md:w-14 md:h-2 bg-[#F0642966] rounded-lg"></div>
        </div>
      </div>
      <Image
        className="w-full h-[150px] md:h-[250px] object-cover"
        src={"https://firebasestorage.googleapis.com/v0/b/news-f534b.appspot.com/o/upload%2Fcake-glass-arrangement-with-copy-space.jpg?alt=media&token=45026435-3ce5-4383-89f1-26139c5e24aa"}
      />
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4 px-4 md:px-12 py-8 md:py-12">
        {CakeData.map((item, index) => (
          <div key={index} className="col-span-1 md:col-span-2">
            <ProductCard
              img={item.img}
              discount={item.discount}
              title={item.title}
              price={item.price}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
export default CakeExplore;
