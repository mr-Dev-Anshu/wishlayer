"use client";
import React, { useState, useRef } from "react";
import { CiMenuFries } from "react-icons/ci";
import { RxCross1 } from "react-icons/rx";
import {
  FaTags,
  FaLocationDot,
  FaLanguage,
  FaCircleUser,
} from "react-icons/fa6";
import { SiPowerpages } from "react-icons/si";
import { GiBreakingChain } from "react-icons/gi";
import { BsCameraReelsFill } from "react-icons/bs";
import { MdAddBox, MdWidgets, MdLogout } from "react-icons/md";
import { FcSurvey } from "react-icons/fc";
import { FaHome, FaComments } from "react-icons/fa";
import Link from "next/link";
import { GrUserWorker } from "react-icons/gr";
import { SlSocialFacebook } from "react-icons/sl";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const sidebarRef = useRef(null);

  const handleToggle = () => {
    const collapsed = !isCollapsed;
    setIsCollapsed(collapsed);
    localStorage.setItem("sidebarCollapsed", collapsed.toString());
  };

  // Effect to close sidebar when clicking outside

  return (
    <div
      ref={sidebarRef}
      className={`fixed h-screen scroll-hidden  border border-gray-300 ${
        isCollapsed ? "w-16" : "w-64"
      }  transition-all duration-300 h-screen overflow-y-scroll`}
    >
      {/* Navigation links */}
      <ul className="text-gray-900 list-none flex flex-col gap-2 p-4">
        {[
          { to: "/admin", icon: <FaHome />, label: "Home" },
          { to: "/admin/cakelist", icon: <MdAddBox />, label: "Cake" },
          { to: "/admin/venuelist", icon: <MdWidgets />, label: "Venue" },
          {
            to: "/admin/roomlist",
            icon: <GiBreakingChain />,
            label: "Room",
          },
          {
            to: "/admin/orders",
            icon: <MdAddBox />,
            label: "Orders",
          },
        ].map((item) => (
          <Link
            key={item.to}
            href={item.to}
            className={`text-gray-700 py-4 flex items-center hover:border-r-4 hover:border-white`}
          >
            <div className="text-2xl">{item.icon}</div>
            <span
              className={`ml-4 text-xl ${isCollapsed ? "hidden" : "block"}`}
            >
              {item.label}
            </span>
          </Link>
        ))}
      </ul>

      {/* User and logout section */}
    </div>
  );
};
export default Sidebar;
