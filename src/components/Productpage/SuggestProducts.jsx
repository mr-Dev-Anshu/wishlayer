import React from "react";
import Image from "next/image";
import Link from "next/link";

const ProductSuggestionCard = ({ product }) => {
  return (
    <div className="max-w-xs bg-white border rounded-lg shadow-md overflow-hidden">
      {" "}
      <div className="flex justify-center items-center p-4">
        <Image
          src={product[0].img}
          alt={product[0].title}
          width={150}
          height={150}
          className="object-contain"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold">{product.title}</h3>
      </div>
    </div>
  );
};

export default ProductSuggestionCard;
