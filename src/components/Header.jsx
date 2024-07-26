"use client";
import React from "react";
import logo from "@/assets/logo.png";
import Image from "next/image";
import { NavList } from "@/constant/NavList";
import Link from "next/link";
import { CiHeart } from "react-icons/ci";
import { GiCupcake } from "react-icons/gi";
import { userContext } from "@/context/AuthContext";
import { logout } from "@/authThing/action";
const Header = () => {
  const { userPhone } = React.useContext(userContext);
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
            {NavList.map((item) => (
              <li>
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
            <p className="cursor-pointer" onClick={handleLogOut}>
              {" "}
              Log Out{" "}
            </p>
          )}
          <p className="text-red-500 flex  items-center text-2xl gap-2">
            <span>
              <CiHeart />
            </span>
            <span>
              <GiCupcake />
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Header;
