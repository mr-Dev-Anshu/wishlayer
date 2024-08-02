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
  const [toggle, setToggle] = useState(false);

  const handleLogOut = async () => {
    await logout();
  };
  return (
    <div>
      <div
        onClick={() => {
          if (toggle) {
            setToggle(!toggle);
          }
        }}
        className="h-[100px] flex justify-between items-center px-16"
      >
        <Link href={'/'}>
          <div className="">
            <Image className="w-14" src={logo} alt="logo" />
            <p className="text-[8px] font-black flex justify-center ">
              <span className="  ">WISH </span>
              <span className="text-red-600  ">LAYER</span>
            </p>
          </div>
        </Link>
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
          ) : null}
          {userPhone && (
            <p className="text-gray-500 flex relative  items-center text-2xl gap-2">
              <span
                className="cursor-pointer text-[#F06429]"
                onClick={() => setToggle(!toggle)}
              >
                <FaUserCircle />
              </span>
            </p>
          )}
        </div>

        {toggle && (
          <div className="absolute  text-sm z-50 w-[140px] text-white   rounded-md  bg-[#F06429]  right-0 mx-10  top-8 bg-">
            <ul className="p-4 font-semibold space-y-4">
              <Link href={"/previous_orders"}>
                <li> View Orders </li>
              </Link>

              <li className="cursor-pointer" onClick={handleLogOut}>
                Logout{" "}
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
