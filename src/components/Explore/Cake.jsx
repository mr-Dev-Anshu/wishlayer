"use client";
import React, { useEffect, useState } from "react";

import headingimg from "@/assets/eventsheading.png";

import Explore from "../Explore";
import { CakeData } from "@/constant/CakeData";
import { db } from "@/config/firebase.config";
import { collection, getDocs, limit, query, where } from "firebase/firestore";

const Cake = () => {
  const [cakeData, setCakeData] = useState();
  const getData = async () => {
    try {
      const docRef = collection(db, "cakes");
      const q = query(docRef, where("type", "==", "cake"), limit(8)); // Apply where and limit
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
        
      <Explore headingImage={headingimg} title={"Explore Cake  "} data={cakeData} />

      {/* <div>
        <Category data={offerData} title={"Choose by Event Location"} />
      </div> */}
    </div>
  );
};
export default Cake;
