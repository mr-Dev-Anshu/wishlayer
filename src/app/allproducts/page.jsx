import Filter from "@/components/Products/Filter";
import ProductList from "@/components/Products/ProductList";
import Image from "next/image";
import React from "react";
import img1 from "@/assets/cakeIcons.png";

const page = () => {
  return (
    <div>
      <div className="flex justify-between mt-6">
        <div>
          <Filter />
        </div>
        <div>
          <ProductList />
        </div>
      </div>
      <div className="grid  px-24 md:grid-cols-2 items-center  md:my-24">
        <div className="md:col-span-1">
          <Image src={img1} />
        </div>
        <div className=" col-span-1">
          <div className="flex gap-4 ">
            <input
              placeholder="Enter Your Email ..."
              className="w-[80%]  p-3 rounded-md focus:outline-none border border-gray-400 focus:border-green-600"
              type="text"
            />
            <button className="bg-[#F35C5C] p-3 w-fit  text-white font-semibold rounded-lg">
              Subscribe
            </button>{" "}
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
