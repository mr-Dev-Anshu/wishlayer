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
      <div className="bg-[#092143] h-auto md:h-[530px]">
        <div className="h-[60px] border-[#183968] border-b">
          <ul className="flex flex-wrap justify-between items-center h-full text-gray-300 px-10 text-sm">
            {[
              "Free Shipping",
              "24/7 Support",
              "Online Payment",
              "Fast Delivery",
            ].map((item, index) => (
              <li key={index} className="flex-1 text-center md:text-left">
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-wrap justify-between border-b border-[#183968] px-10 text-gray-300 py-4">
          <div className="w-full md:w-auto space-y-2 mb-4 md:mb-0">
            <div className="">
              <Image className="w-14" src={logo} alt="logo" />
              <p className="text-[8px] pl-1 w-fit font-black flex justify-center">
                <span className="">WISH</span>
                <span className="text-red-600">LAYER</span>
              </p>
            </div>
            <div className="">
              <p className="text-gray-400">Contact: +91 7027463786</p>
              <p className="text-gray-400">Email: floriwish.in@gmail.com</p>
            </div>
          </div>
          <div className="w-full md:w-auto space-y-2 mb-4 md:mb-0">
            <h1 className="text-xl font-black">Contact</h1>
            <p className="text-gray-400">About us</p>
            <p className="text-gray-400">Contact us</p>
          </div>
          <div className="w-full md:w-auto space-y-2 mb-4 md:mb-0">
            <h1 className="text-xl font-black">Policy & Security</h1>
            <p className="text-gray-400">Privacy Policy</p>
            <p className="text-gray-400">Return Policy</p>
            <p className="text-gray-400">Delivery Policy</p>
            <p className="text-gray-400">Terms & Conditions</p>
          </div>
          <div className="w-full md:w-auto space-y-2 mb-4 md:mb-0">
            <h1 className="text-xl font-black">Quick Links</h1>
            {[
              "Flowers",
              "Cake",
              "Chocolates",
              "Weddings",
              "Balloon Decoration",
              "Haldi Decoration",
              "Room Decoration",
              "Jaimala",
            ].map((item, index) => (
              <p className="text-gray-400" key={index}>
                {item}
              </p>
            ))}
          </div>
        </div>

        <div className="flex justify-center items-center border-b border-[#183968]">
          <div className="py-2">
            <div className="text-xl font-semibold text-gray-300">
              Our Social Links
            </div>
            <div className="flex gap-2 text-2xl md:pl-8 pl-6 mt-2">
              <span className="text-white bg-[#365493] p-1 rounded-full">
                <FaFacebookF />
              </span>
              <span className="text-white bg-[#774430] p-1 rounded-full">
                <FaInstagram />
              </span>
            </div>
          </div>
        </div>

        <div className="flex justify-center border-b border-[#183968] px-10 text-gray-300 pt-2">
          <div>
            <p className="text-gray-300 md:pl-4 ">
              Floriwish 2024 | All Rights Reserved
            </p>
            <p className="text-gray-300 text-sm  md:text-xl">
              Designed and Developed By DesignxJatin
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
