"use client";
import React, { useEffect, useState } from "react";

import headingimg from "@/assets/venueBanner.png";

import Explore from "../Explore";
import { db } from "@/config/firebase.config";
import { collection, getDocs, limit, query, where } from "firebase/firestore";
import Image from "next/image";

const Venue = (props) => {
  const [venueData, setvenueData] = useState();
  const getData = async () => {
    try {
      const docRef = collection(db, "cakes");
      const q = query(docRef, where("type", "==", "venue"), limit(4));
      const dataSnap = await getDocs(q);
      const allvenue = [];
      dataSnap.forEach((doc) => {
        allvenue.push({ id: doc.id, ...doc.data() });
      });
      console.log(allvenue);
      setvenueData(allvenue);
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
              Explore venue
            </div>
            <div className="flex justify-center mt-2">
              <div className="w-10 h-1 md:w-14 md:h-2 bg-[#F0642966] rounded-lg"></div>
            </div>
          </div>
          <Image
            width={1200}
            height={600}
            className="w-full h-[150px] md:h-[250px] object-cover"
            src="https://firebasestorage.googleapis.com/v0/b/news-f534b.appspot.com/o/upload%2Fbeautiful-view-restaurant-with-tables.jpg?alt=media&token=0c39ade8-3b22-46dc-b5b5-021e1d972d92"
            alt="Cake glass arrangement"
          />
        </div>
      )}
      <Explore data={venueData} />
    </div>
  );
};
export default Venue;
