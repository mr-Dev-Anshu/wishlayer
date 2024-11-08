"use client";
import React, { useContext, useEffect, useState } from "react";
import headingimg from "@/assets/roomBanner.png";
import Explore from "../Explore";
import { db } from "@/config/firebase.config";
import { collection, getDocs, limit, query, where } from "firebase/firestore";
import Image from "next/image";
import EventCard from "../EventCard";
import Link from "next/link";
import { filterContext } from "@/context/FilterContext";
import { useRouter } from "next/navigation";

const Event = (props) => {
  const [roomData, setRoomData] = useState();
  const getData = async () => {
    try {
      const docRef = collection(db, "cakes");
      const q = query(docRef, where("type", "==", "event"), limit(4)); // Apply where and limit
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

  const router = useRouter();

  const { setFilterData, filterData } = useContext(filterContext);
  const handleMore = () => {
    // console.log("this is for more ", data);
    setFilterData([...filterData, roomData[0]?.type]);
    router.push("/allproducts");
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
              Explore Events
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
      )}
      <div className="flex justify-end text-red-400 mx-10 my-4  ">
        {" "}
        <span onClick={handleMore} className="cursor-pointer">
          More
        </span>{" "}
      </div>
      {/* <Explore data={roomData} /> */}
      <div className="grid md:grid-cols-3  md:mx-6 md:my-4 mx-4 my-2 gap-4 space-y-6 md:space-y-0  items-center   ">
        {roomData?.map((item) => (
          <a href={`/${item.type}?id=${item.id}`}>
            <div className="">
              <EventCard
                img={item.cover_img}
                heading={item.title}
                data={item}
              />
            </div>
          </a>
        ))}
      </div>
      {/* <div>
        <Category data={offerData} title={"Choose by Event Location"} />
      </div> */}
    </div>
  );
};
export default Event;
