"use client";
import React, { useEffect, useState } from "react";

import headingimg from "@/assets/decoration.png";

import Explore from "../Explore";
import { CakeData } from "@/constant/CakeData";
import { db } from "@/config/firebase.config";
import { collection, getDocs, limit, query, where } from "firebase/firestore";
import Image from "next/image";

const Decoration = (props) => {
  const [cakeData, setCakeData] = useState();
  const getData = async () => {
    try {
      const docRef = collection(db, "cakes");
      const q = query(docRef, where("type", "==", "decoration"), limit(4)); // Apply where and limit
      const dataSnap = await getDocs(q);
      const allCake = [];
      dataSnap.forEach((doc) => {
        allCake.push({ id: doc.id, ...doc.data() });
      });
      console.log(allCake);
      setCakeData(allCake);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      {!props?.show && (
        <div>
          <div className="my-6 md:my-12">
            <div className="text-2xl md:text-3xl font-bold text-center">
              Explore Decorations
            </div>
            <div className="flex justify-center mt-2">
              <div className="w-10 h-1 md:w-14 md:h-2 bg-[#F0642966] rounded-lg"></div>
            </div>
          </div>
          <Image
            width={1200}
            height={600}
            className="w-full h-[150px] md:h-[250px] object-cover"
            src="https://firebasestorage.googleapis.com/v0/b/news-f534b.appspot.com/o/upload%2Fvalentine-s-day-background-with-decor-details-flat-lay.jpg?alt=media&token=120e40b3-8082-4d71-9cce-0fa6ab5f17c1"
            alt="Cake glass arrangement"
          />
        </div>
      )}
      <Explore data={cakeData} />
      {/* <div>
        <Category data={offerData} title={"Choose by Event Location"} />
      </div> */}
    </div>
  );
};
export default Decoration;
