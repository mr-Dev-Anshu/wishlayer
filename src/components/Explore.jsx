import React from "react";
import ProductCard2 from "./ProductCard2";
import Image from "next/image";
import Link from "next/link";

const Explore = ({ headingImage, data, title }) => {
  const isLoading = !data;
  if (isLoading) {
    return <div className="text-green-500">Loading...</div>;
  }
  return (
    <div className="">
      <div className="my-6 md:my-12">
        <div className="text-2xl md:text-3xl font-bold text-center">
          {title}
        </div>
        <div className="flex justify-center mt-2">
          <div className="w-10 h-1 md:w-14 md:h-2 bg-[#F0642966] rounded-lg"></div>
        </div>
      </div>
      <Image
        className="w-full h-[150px] md:h-[250px] object-cover"
        src={headingImage}
      />
      <Link href={"/allproducts"}>
        <div className="flex justify-end mr-6 text-red-600 py-2  ">More</div>
      </Link>
      <div className="grid grid-cols-2 md:grid-cols-8 gap-4 px-4 md:px-12 md:py-2">
        {data.map((item, index) => (
          <div key={index} className="col-span-1 md:col-span-2">
            <Link href={`/${item.type}?id=${item.id}`}>
            <ProductCard2
              img={item.cover_img}
              discount={item.discount}
              title={item.title}
              price={item.mainPrice || item.price }
              rating={item.rating}
            />
          </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Explore;
