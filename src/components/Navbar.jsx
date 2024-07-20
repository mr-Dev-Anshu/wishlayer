import React from "react";
import TemporaryDrawer from "./Sidebar";
import Image from "next/image";
import logo from "@/assets/logo.png";
const Navbar = () => {
  return (
    <div className="h-[80px] flex justify-between items-center px-4 border-b  border-gray-300">
      <div  >
        <div className="">
          <Image className="w-12" src={logo} alt="logo" />
          <p className="text-[8px] font-black w-fit  flex justify-center ">
            <span className="  ">WISH </span>
            <span className="text-red-600  ">LAYER</span>
          </p>
        </div>
      </div>
      <div>
        <TemporaryDrawer />
      </div>
    </div>
  );
};

export default Navbar;
