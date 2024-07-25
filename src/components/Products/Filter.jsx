"use client";
import React, { useState } from "react";
import { LiaGreaterThanSolid } from "react-icons/lia";
import { FaRegCheckSquare, FaRegSquare } from "react-icons/fa";

const Filter = () => {
  const [selectFilter, setSelectFilter] = useState([]);
  const filter = ["Cake", "Party Venues", "Room Stays", "Decoration"];
  const ratings = [
    "4★ & above",
    "3★ & above",
    "2★ & above",
    "1★ & above",
    "0★ & above",
  ];

  const handleFilterClick = (item) => {
    setSelectFilter((prev) =>
      prev.includes(item)
        ? prev.filter((ele) => ele !== item)
        : [...prev, item]
    );
  };

  return (
    <div className="space-y-6 px-4 md:px-6 lg:px-8">
      <h1 className="text-xl md:text-xl font-bold">Filters</h1>

      <div className="space-y-4">
        {filter.map((item) => (
          <div key={item} className="flex items-center md:text-base  lg:text-xl">
            <div className="flex items-center gap-2 md:gap-3 lg:gap-4 font-semibold">
              <LiaGreaterThanSolid size={16} className="text-gray-500" />
              <span>{item}</span>
            </div>

            <div className="ml-auto cursor-pointer" onClick={() => handleFilterClick(item)}>
              {selectFilter.includes(item) ? (
                <FaRegCheckSquare size={20} className="text-green-500" />
              ) : (
                <FaRegSquare size={20} className="text-gray-500" />
              )}
            </div>
          </div>
        ))}

        <div className="flex flex-col md:flex-row gap-4 mt-6">
          <select
            className="w-full md:w-36 lg:w-44 font-semibold focus:outline-none px-4 py-2 border border-gray-300 rounded-sm"
            name=""
            id=""
          >
            <option value="">Select</option>
            <option value="min">Min</option>
            <option value="max">Max</option>
          </select>
          <select
            className="w-full md:w-36 lg:w-44 font-semibold focus:outline-none px-4 py-2 border border-gray-300 rounded-sm"
            name=""
            id=""
          >
            <option value="250+">250+</option>
            <option value="500+">500+</option>
            <option value="1000+">1000+</option>
          </select>
        </div>

        {ratings.map((item) => (
          <div key={item} className="flex items-center md:text-base lg:text-xl gap-4">
            <div
              className="cursor-pointer"
              onClick={() => handleFilterClick(item)}
            >
              {selectFilter.includes(item) ? (
                <FaRegCheckSquare size={20} className="text-green-500" />
              ) : (
                <FaRegSquare size={20} className="text-gray-500" />
              )}
            </div>
            <div className="flex items-center gap-2 font-semibold">
              <span>{item}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Filter;
