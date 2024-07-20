import Link from "next/link";
import React from "react";
import ImageCard from "./ImageCard";

const Category = ({title , data }) => {
  return (
    <div className="md:px-48 md:py-10 ">
      <div className=" ">
        <p className="flex justify-center text-4xl  font-bold mt-4 ">
          {" "}
          {title}
        </p>
        <div className="flex justify-center mt-2 ">
          <div className="w-14 h-2 bg-[#F0642966] rounded-lg"></div>
        </div>
      </div>

      <div className="grid md:pl-10 md:grid-cols-4 items-center space-y-4 mt-12">
        {data.map((item) => (
          <div className="md:col-span-2 ">
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
