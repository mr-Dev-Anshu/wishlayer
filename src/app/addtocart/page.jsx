"use client";
import { db } from "@/config/firebase.config";
import { doc, getDoc } from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";

const MyComponent = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [images, setImages] = useState();
  const [productData, setProductData] = useState();

  console.log(id);

  const getData = async () => {
    try {
      const docRef = doc(db, "orders", id);
      const productSnap = await getDoc(docRef);
      console.log(productSnap.data().allProducts);
      setProductData(productSnap.data().allProducts);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const isLoading = !productData;
  if (isLoading) {
    return (
      <div>
        <Skeleton count={60} />
      </div>
    );
  }

  return (
    <div className="">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">All Orderd Products </h2>
      <div className="bg-white shadow-lg rounded-lg p-6">
        {productData.length > 0 &&
          productData.map((item, index) => (
           
            <div
              key={index}
              className="flex justify-between items-center border-b pb-4 mb-4"
            >
              <div className="flex items-center">
                <img
                  src={item.product_cover}
                  alt={item.product_title}
                  className="w-16 h-16 rounded-lg mr-4"
                />
                <div>
                  <p className="text-lg font-semibold text-gray-700">
                    {item.product_title}
                  </p>
                </div>
              </div>
              <p className="text-lg font-semibold text-gray-700">
                ₹{item.product_price}
              </p>
            </div>
           
          ))}
      </div>
    </div>
  );
};

const page = () => {
  const [shownConponent, setShownComponent] = useState(false);

  useEffect(() => {
    setShownComponent(true);
  }, []);
  return <div>{shownConponent && <MyComponent />}</div>;
};
export default page;
