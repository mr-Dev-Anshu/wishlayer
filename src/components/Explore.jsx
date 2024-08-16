"use client";
import React, { useContext } from "react";
import ProductCard2 from "./ProductCard2";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { filterContext } from "@/context/FilterContext";

const Explore = ({ headingImage, data, title, suggetion }) => {
  const isLoading = !data;

  if (isLoading) {
    return <div className="text-green-500">Loading...</div>;
  }

  const router = useRouter();
  const { setFilterData, filterData } = useContext(filterContext);

  const handleMore = () => {
    // console.log("this is for more ", data);
    setFilterData([...filterData, data[0]?.type]);
    router.push("/allproducts");
  };

  return (
    <div className="">
      <div
        onClick={handleMore}
        className="flex cursor-pointer justify-end mr-6 text-red-600 py-2"
      >
        More
      </div>

      <div className="grid grid-cols-2 md:grid-cols-8 gap-4 px-4 md:px-12 md:py-2">
        {data.map((item, index) => (
          <div key={index} className="col-span-1 md:col-span-2">
            <a href={`/${item.type}?id=${item.id}`}>
              <ProductCard2
                img={item.cover_img}
                discount={item.discount}
                title={item.title}
                price={item.mainPrice || item.price}
                rating={item.rating}
              />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Explore;
