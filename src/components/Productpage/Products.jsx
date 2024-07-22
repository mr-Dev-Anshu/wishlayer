"use client";
import Image from "next/image";
import React, { useState } from "react";

const Products = ({ img }) => {
  const [bigImage, setBigImage] = useState(img[0]);
  return (
    <div className="flex gap-2 px-10">
      <div>
        {img.map((item, index) => (
          <Image
            className="rounded-md mt-2 cursor-pointer"
            key={index}
            src={item}
            width={80}
            height={80}
            onClick={() => setBigImage(item)}
          />
        ))}
      </div>
      <div>
        <Image className="rounded-md" src={bigImage} width={400} height={400} />
      </div>
    </div>
  );
};

export default Products;
