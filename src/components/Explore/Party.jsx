"use client";
import React, { useEffect, useState } from "react";

import headingimg from "@/assets/eventsheading.png";

import Explore from "../Explore";
import { db } from "@/config/firebase.config";
import { collection, getDocs, limit, query, where } from "firebase/firestore";

const Venue = () => {
  const [venueData, setvenueData] = useState();
  const getData = async () => {
    try {
      const docRef = collection(db, "cakes");
      const q = query(docRef, where("type", "==", "venue"), limit(8)); 
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
      <Explore
        headingImage={headingimg}
        title={"Explore venue  "}
        data={venueData}
      />
    </div>
  );
};
export default Venue;
