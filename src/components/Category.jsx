import Link from "next/link";
import React from "react";
import ImageCard from "./ImageCard";

const Category = ({ title, data }) => {
  return (
    <div className="px-4 py-6 md:px-48 md:py-10">
      <div>
        <p className="flex justify-center text-2xl md:text-4xl font-bold mt-4">
          {title}
        </p>
        <div className="flex justify-center mt-2">
          <div className="w-8 h-2 md:w-14 bg-[#F0642966] rounded-lg"></div>
        </div>
      </div>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-4 items-center mt-12">
        {data.map((item, index) => (
          <div key={index} className="md:col-span-2">
            <Link href={item.to}>
              <ImageCard img={item.img} heading={item.heading} />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
