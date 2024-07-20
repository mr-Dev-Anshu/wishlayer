import React from "react";
import Image from "next/image";
import ProductCard2 from "./ProductCard2";

const Explore = ({ headingImage, data, title }) => {
  return (
    <div className="">
      <div className="my-6 md:my-12">
        <div className="text-2xl md:text-3xl font-bold text-center">{title}</div>
        <div className="flex justify-center mt-2">
          <div className="w-10 h-1 md:w-14 md:h-2 bg-[#F0642966] rounded-lg"></div>
        </div>
      </div>
      <Image className="w-full h-[150px] md:h-[250px] object-cover" src={headingImage} />
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4 px-4 md:px-12 py-8 md:py-12">
        {data.map((item, index) => (
          <div key={index} className="col-span-1 md:col-span-2">
            <ProductCard2
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
