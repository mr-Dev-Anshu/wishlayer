import Filter from "@/components/Products/Filter";
import ProductList from "@/components/Products/ProductList";
import Image from "next/image";
import React from "react";
import img1 from "@/assets/cakeIcons.png";

const Page = () => {
  return (
    <div className="px-4 md:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row gap-6 mt-6">
        <div className="w-full  lg:w-1/6">
          <Filter />
        </div>
        <div className="w-full  ">
          <ProductList />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-12 px-4 md:px-24 lg:px-32">
        <div className="flex items-center justify-center">
          <Image
            src={img1}
            alt="Cake Icons"
            className="object-cover rounded-lg"
          />
        </div>
        <div className="flex items-center justify-center">
          <div className="flex flex-col md:flex-row gap-4">
            <input
              placeholder="Enter Your Email ..."
              className="w-full md:w-[80%] p-3 rounded-md border border-gray-400 focus:border-green-600 focus:outline-none"
              type="text"
            />
            <button className="bg-[#F35C5C] text-white font-semibold rounded-lg px-6 py-3 w-full md:w-auto">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;