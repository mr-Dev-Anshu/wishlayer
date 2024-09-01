"use client";
import React, { useEffect, useState } from "react";

import headingimg from "@/assets/cakeBanner.png";

import Explore from "../Explore";
import { CakeData } from "@/constant/CakeData";
import { db } from "@/config/firebase.config";
import { collection, getDocs, limit, query, where } from "firebase/firestore";
import Image from "next/image";

const Cake = (props) => {
  const [cakeData, setCakeData] = useState();
  const type = props?.type || "cake";
  console.log("this is type of the ", props);
  const getData = async () => {
    try {
      const docRef = collection(db, "cakes");
      const q = query(docRef, where("type", "==", type), limit(4)); // Apply where and limit
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
              Explore Cake
            </div>
            <div className="flex justify-center mt-2">
              <div className="w-10 h-1 md:w-14 md:h-2 bg-[#F0642966] rounded-lg"></div>
            </div>
          </div>
          <Image
            width={1200} // Adjust as per your requirement, usually a good width for banners
            height={600} // Corresponding height to maintain the aspect ratio
            className="w-full h-[150px] md:h-[250px] object-cover"
            src="https://firebasestorage.googleapis.com/v0/b/news-f534b.appspot.com/o/upload%2Fwhipped-cream-chocolate-berries-galore-gourmet-indulgence-generated-by-ai.jpg?alt=media&token=1db8e614-a663-434a-bb1c-3e2e12b0b720"
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
export default Cake;
