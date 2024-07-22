import { CakeData } from "@/constant/CakeData";
import React from "react";
import ProductCard2 from "../ProductCard2";
import { EventsData } from "@/constant/EventsDecorationsData";
import Link from "next/link";

const ProductList = () => {
  return (
    <div className="px-6">
      <div className="grid border border-gray-200 md:grid-cols-3  py-4 gap-4  overflow-y-scroll h-screen scroll-hidden">
        {[...CakeData, ...EventsData].map((item) => (
          <Link href={`/${item.type}`}>
            <div className="md:col-span-1   ">
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
