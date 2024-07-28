"use client";
import React, { useEffect, useState } from "react";
import headingimg from "@/assets/eventsheading.png";
import Explore from "../Explore";
import { db } from "@/config/firebase.config";
import { collection, getDocs, limit, query, where } from "firebase/firestore";

const Cake = () => {
  const [roomData, setRoomData] = useState();
  const getData = async () => {
    try {
      const docRef = collection(db, "cakes");
      const q = query(docRef, where("type", "==", "room"), limit(8)); // Apply where and limit
      const dataSnap = await getDocs(q);
      const allRoom = [];
      dataSnap.forEach((doc) => {
        allRoom.push({ id: doc.id, ...doc.data() });
      });
      console.log(allRoom);
      setRoomData(allRoom);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
        
      <Explore headingImage={headingimg} title={"Explore Rooms"} data={roomData} />

      {/* <div>
        <Category data={offerData} title={"Choose by Event Location"} />
      </div> */}
    </div>
  );
};
export default Cake;
