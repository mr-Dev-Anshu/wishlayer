"use client";
import Image from "next/image";
import React, { useState } from "react";

const Products = ({ img }) => {
  const [bigImage, setBigImage] = useState(img[0].url);
  return (
    <div className="flex flex-col  md:flex-row gap-2 px-4 md:px-10">
      <div className="flex flex-row gap-2 md:flex-col overflow-x-auto md:overflow-visible">
        {img.map((item, index) => (
          <Image
            className="rounded-md mt-2 cursor-pointer"
            key={index}
            src={item.url}
            width={80}
            height={80}
            onClick={() => setBigImage(item.url)}
          />
        ))}
      </div>
      <div className="flex justify-center md:block">
        <Image className="rounded-md" src={bigImage} width={400} height={400} />
      </div>
    </div>
  );
};
export default Products;
