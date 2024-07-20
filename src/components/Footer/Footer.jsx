import React from "react";
import ImageFooter from "./ImageFooter";

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
      </div>
    </div>
  );
};

export default Footer;
