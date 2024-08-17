"use client";
import React, { useContext, useState } from "react";
import { LiaGreaterThanSolid } from "react-icons/lia";
import { FaRegCheckSquare, FaRegSquare } from "react-icons/fa";
import { filterContext } from "@/context/FilterContext";
import { Nagar } from "@/constant/Nagar";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";

const Filter = () => {
  const filter = ["cake", "venue", "room", "decoration", "event"];
  const { filterData, setFilterData } = useContext(filterContext);
  const [openPlace, setOpenPlace] = useState();

  const handleFilterClick = (item) => {
    setFilterData((prev) =>
      prev.includes(item) ? prev.filter((ele) => ele !== item) : [...prev, item]
    );
    console.log(filterData);
    setOpenPlace(false);
  };

  return (
    <div className="space-y-6 px-1 md:px-2">
      <h1 className="text-lg md:text-xl lg:text-2xl font-semibold">Filters</h1>

      <div className="space-y-4">
        {filter.map((item) => (
          <div
            key={item}
            className="flex items-center text-sm md:text-base lg:text-lg font-semibold"
          >
            <div className="flex items-center gap-2 md:gap-3 lg:gap-4">
              <LiaGreaterThanSolid size={16} className="text-gray-500 " />
              <span className="capitalize">
                {item.charAt(0).toUpperCase() + item.slice(1).toLowerCase()}
              </span>
            </div>
            <div
              className="ml-auto cursor-pointer"
              onClick={() => handleFilterClick(item)}
            >
              {filterData.includes(item) ? (
                <FaRegCheckSquare size={20} className="text-green-500" />
              ) : (
                <FaRegSquare size={20} className="text-gray-500" />
              )}
            </div>
          </div>
        ))}

        <div
          onClick={() => setOpenPlace(!openPlace)}
          className="flex justify-between  cursor-pointer   border border-gray-300 py-2 px-6 md:mx-0 md:px-1 items-center"
        >
          <p className="font-semibold">Filter by Nagar</p>
          {!openPlace ? (
            <span className="text-3xl">
              {" "}
              <IoMdArrowDropup />{" "}
            </span>
          ) : (
            <span className="text-3xl">
              {" "}
              <IoMdArrowDropdown />
            </span>
          )}
        </div>
        {openPlace &&
          Nagar.map((item) => (
            <div
              key={item}
              className="flex items-center text-sm md:text-base lg:text-lg gap-4 font-semibold"
            >
              <div
                className="cursor-pointer"
                onClick={() => handleFilterClick(item)}
              >
                {filterData.includes(item) ? (
                  <FaRegCheckSquare size={20} className="text-green-500" />
                ) : (
                  <FaRegSquare size={20} className="text-gray-500" />
                )}
              </div>
              <div className="flex items-center gap-2">
                <span>{item}</span>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Filter;
