import React from "react";
import ImageFooter from "./ImageFooter";
import logo from "@/assets/logo.png";
import Image from "next/image";
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
const Footer = () => {
  return (
    <div>
      <ImageFooter />
      <div className="bg-[#092143] h-[530px]   ">
        <div className="h-[60px] border-[#183968] border-b ">
          <ul className="flex justify-between  items-center h-full text-gray-300 px-10 text-sm ">
            {[
              "Free Shipping",
              "24/7 Support",
              "Online Payment",
              "Fast Delivery",
            ].map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="flex justify-between border-b border-[#183968]  px-10 text-gray-300 py-4">
          <div className="space-y-2 ">
            <div className="">
              <Image className="w-14" src={logo} alt="logo" />
              <p className="text-[8px]  pl-1 w-fit font-black flex justify-center ">
                <span className="  ">WISH </span>
                <span className="text-red-600  ">LAYER</span>
              </p>
            </div>
            <div className="">
              <p className="text-gray-400">Contact : +91 7027463786 </p>
              <p className="text-gray-400">Email : floriwish.in@gmail.com </p>
            </div>
          </div>
          <div className="space-y-2 ">
            <h1 className="text-xl font-black ">Contect </h1>
            <p className="text-gray-400">About us </p>
            <p className="text-gray-400">Contect us </p>
          </div>
          <div className="space-y-2 ">
            <h1 className="text-xl font-black ">Policy & Security </h1>
            <p className="text-gray-400">Privecy Policy </p>
            <p className="text-gray-400">Return Policy </p>
            <p className="text-gray-400">Delivery Policy </p>
            <p className="text-gray-400">Term & Conditions </p>
          </div>
          <div className="space-y-2">
            <h1 className="text-xl font-black">Quick Links </h1>
            {[
              "flowers",
              "Cake",
              "Chocolates",
              "Weddings",
              "Balloon Decoration",
              "Haldi Decoration",
              "Room Dacoration",
              "Jaimala",
            ].map((item, index) => (
              <p className="text-gray-400" key={index}>
                {item}
              </p>
            ))}
          </div>
        </div>

        <div className="flex justify-center items-center  border-b border-[#183968]">
          <div className="py-2">
            <div className="text-xl font-semibold text-gray-300 ">
              Our Social Links
            </div>
            <div className="flex gap-2 text-2xl md:pl-8 mt-2 ">
              <span className="text-white bg-[#365493] p-1 rounded-full">
                <FaFacebookF />
              </span>
              <span className="text-white bg-[#774430]  p-1 rounded-full">
                <FaInstagram />
              </span>
            </div>
          </div>
        </div>
        <div  className="flex justify-center  border-b border-[#183968]  px-10 text-gray-300 pt-2">
          <div>
          <p className="text-gray-300 pl-4">Floriwish 2024 | All Rights Reserved</p>
          <p className="text-gray-300">Designed and Developed By DesignxJatin</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
