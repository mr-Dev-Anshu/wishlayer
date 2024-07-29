"use client";
import React, { useEffect, useState } from "react";
import headingimg from "@/assets/eventsheading.png";
import Explore from "../Explore";
import { db } from "@/config/firebase.config";
import { collection, getDocs, limit, query, where } from "firebase/firestore";
import Image from "next/image";

const Room = (props) => {
  const [roomData, setRoomData] = useState();
  const getData = async () => {
    try {
      const docRef = collection(db, "cakes");
      const q = query(docRef, where("type", "==", "room"), limit(4)); // Apply where and limit
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
        {
           !props?.show &&  <div>
           <div className="my-6 md:my-12">
             <div className="text-2xl md:text-3xl font-bold text-center">
               Explore Rooms
             </div>
             <div className="flex justify-center mt-2">
               <div className="w-10 h-1 md:w-14 md:h-2 bg-[#F0642966] rounded-lg"></div>
             </div>
           </div>
           <Image
             className="w-full h-[150px] md:h-[250px] object-cover"
             src={headingimg}
           />
         </div>
        }
      <Explore  data={roomData} />

      {/* <div>
        <Category data={offerData} title={"Choose by Event Location"} />
      </div> */}
    </div>
  );
};
export default Room;
