"use client";
import { CakeData } from "@/constant/CakeData";
import React, { useEffect, useState } from "react";
import ProductCard2 from "../ProductCard2";
import { EventsData } from "@/constant/EventsDecorationsData";
import Link from "next/link";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/config/firebase.config";
import Skeleton from "react-loading-skeleton";

const ProductList = () => {
  const [data, setData] = useState();

  const getData = async () => {
    const docRef = collection(db, "cakes");
    const dataSnap = await getDocs(docRef);

    const allCake = [];
    dataSnap.forEach((doc) => {
      allCake.push({ id: doc.id, ...doc.data() });
    });
    console.log(allCake);
    setData(allCake);
  };

  useEffect(() => {
    getData();
  }, []);

  const isLoading = !data;

  if (isLoading) {
    return (
      <div>
        <Skeleton count={60} />
      </div>
    );
  }

  return (
    <div className="md:flex md:justify-center ">
      <div className="grid border px-4 border-gray-200 md:grid-cols-2 lg:grid-cols-2 py-4 gap-6 overflow-y-auto scroll-hidden   h-screen">
        {data?.map((item, index) => (
          <Link href={`/${item.type}?id=${item.id}`} key={index}>
            <div className="md:col-span-1">
              <ProductCard2
                img={item.cover_img}
                discount={item.discount}
                title={item.title}
                price={item.price}
                id={item.id}
                type={item.type}
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
