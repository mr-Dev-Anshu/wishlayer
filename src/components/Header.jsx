"use client";
import React, { useEffect, useState } from "react";
import logo from "@/assets/logo.png";
import Image from "next/image";
import { NavList } from "@/constant/NavList";
import Link from "next/link";

import { userContext } from "@/context/AuthContext";
import { getSession, logout } from "@/authThing/action";
import { FaUserCircle } from "react-icons/fa";
const Header = () => {
  const { userPhone } = React.useContext(userContext);
  const [phone, setPhone] = useState();

 
  const handleLogOut = async () => {
    await logout();
  };
  return (
    <div>
      <div className="h-[100px] flex justify-between items-center px-16">
        <div className="">
          <Image className="w-14" src={logo} alt="logo" />
          <p className="text-[8px] font-black flex justify-center ">
            <span className="  ">WISH </span>
            <span className="text-red-600  ">LAYER</span>
          </p>
        </div>
        <div>
          <ul className="flex gap-12">
            {NavList.map((item, index) => (
              <li key={index}>
                <Link href={item.to}>{item.title}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex gap-3 items-center">
          {!userPhone ? (
            <Link href={"login"}>
              <p className="cursor-pointer">Login/Register</p>
            </Link>
          ) : (
            <p
              className="cursor-pointer text-red-600 font-semibold"
              onClick={handleLogOut}
            >
              {" "}
              Logout{" "}
            </p>
          )}
          {userPhone  && (
            <p className="text-gray-500 flex  items-center text-2xl gap-2">
              <Link href={"/previous_orders"}>
                <span>
                  <FaUserCircle />
                </span>
              </Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
