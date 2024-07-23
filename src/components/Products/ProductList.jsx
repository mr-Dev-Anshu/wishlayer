import { CakeData } from "@/constant/CakeData";
import React from "react";
import ProductCard2 from "../ProductCard2";
import { EventsData } from "@/constant/EventsDecorationsData";
import Link from "next/link";

const ProductList = () => {
  return (
    <div className="px-4 md:px-8 lg:px-12">
      <div className="grid border border-gray-200 md:grid-cols-2 lg:grid-cols-3 py-4 gap-6 overflow-y-auto h-screen">
        {[...CakeData, ...EventsData].map((item, index) => (
          <Link href={`/${item.type}`} key={index}>
            <div className="md:col-span-1">
              <ProductCard2
                img={item.img}
                discount={item.discount}
                title={item.title}
                price={item.price}
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
