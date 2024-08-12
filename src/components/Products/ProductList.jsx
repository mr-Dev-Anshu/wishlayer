"use client";
import React, { useContext, useEffect, useState } from "react";
import ProductCard2 from "../ProductCard2";
import Link from "next/link";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/config/firebase.config";
import { filterContext } from "@/context/FilterContext";
import Spinner from "../Spinner";

const ProductList = () => {
  const [originalData, setOriginalData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { filterData } = useContext(filterContext);

  const getData = async () => {
    try {
      const docRef = collection(db, "cakes");
      const dataSnap = await getDocs(docRef);
      const allCake = [];
      dataSnap.forEach((doc) => {
        allCake.push({ id: doc.id, ...doc.data() });
      });
      setOriginalData(allCake);
      setFilteredData(allCake); // Initially set both to all data
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (filterData.length > 0) {
      const newFilteredData = originalData.filter(
        (d) => filterData.includes(d.type) || filterData.includes(d?.nagar)
      );
      setFilteredData(newFilteredData);
    } else {
      setFilteredData(originalData);
    }
  }, [filterData, originalData]);

  if (isLoading) {
    return (
      <div className="mt-[200px]">
        <div className="text-center">
          <Spinner />
        </div>
      </div>
    );
  }
  return (
    <div className="md:flex md:justify-center ">
      <div className="grid grid-cols-2 w-full  border px-4  border-gray-200 md:grid-cols-2 lg:grid-cols-3 py-4 gap-6 scroll-hidden">
        {filteredData?.map((item, index) => (
          <Link href={`/${item.type}?id=${item.id}`} key={index}>
            <div className="md:col-span-1">
              <ProductCard2
                img={item.cover_img}
                discount={item.discount}
                title={item.title}
                price={item.mainPrice || item.price}
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
