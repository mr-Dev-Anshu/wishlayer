"use client";
import React from "react";
import CountUp from "react-countup";
import { TbCategory } from "react-icons/tb";
import { SiPowerpages } from "react-icons/si";
import { GiBreakingChain } from "react-icons/gi";
import { BsCameraReelsFill } from "react-icons/bs";
import { MdAddBox, MdWidgets, MdLogout } from "react-icons/md";
import { FcSurvey } from "react-icons/fc";
import { FaHome, FaComments } from "react-icons/fa";
import { GrUserWorker } from "react-icons/gr";
import { SlSocialFacebook } from "react-icons/sl";

const Dashboard = () => {
  const stats = [
    {
      label: "Total Orders",
      value: 5,
      icon: <TbCategory size={24} className="text-blue-500" />,
    },
    {
      label: "Total Users",
      value: 13,
      icon: <MdAddBox size={24} className="text-green-500" />,
    },
    {
      label: "Total Cakes",
      value: 5,
      icon: <GiBreakingChain size={24} className="text-orange-500" />,
    },
    {
      label: "Total Coupans",
      value: 14,
      icon: <BsCameraReelsFill size={24} className="text-purple-500" />,
    },
    {
      label: "Total Rooms",
      value: 11,
      icon: <MdWidgets size={24} className="text-teal-500" />,
    },
    { label: "Total Venues", value: 4, icon: <FcSurvey size={24} /> },
  ];

  return (
    <div>
      <p className="md:text-3xl font-bold">Dashboard</p>
      <div className="p-5">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="p-5 shadow-md border border-gray-200 rounded-lg text-center"
            >
              <div className="flex flex-col items-center">
                {stat.icon}
                <div className="mt-2">
                  <p className="text-2xl font-bold">
                    <CountUp start={0} end={stat.value} duration={2.75} />
                  </p>
                  <p className="mt-2 text-gray-500">{stat.label}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
