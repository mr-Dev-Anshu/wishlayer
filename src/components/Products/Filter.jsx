"use client";
import React, { useState } from "react";
import { LiaGreaterThanSolid } from "react-icons/lia";
import { FaRegCheckSquare } from "react-icons/fa";
import { FaRegSquare } from "react-icons/fa";
const Filter = () => {
  const [selectFilter, setSelectFilter] = useState([]);
  const filter = ["Cake", "Party Venues", "Room Stays", "Decoration"];
  return (
    <div className="space-y-4 px-6">
      <h1 className="text-xl font-bold">Filters</h1>

      <div className="space-y-4">
        {filter.map((item) => (
          <div className="flex  items-center text-xl">
            <div className="flex items-center  gap-1 mt-2 font-semibold w-60 ">
              <span>
                <LiaGreaterThanSolid size={15} />
              </span>
              <span>{item}</span>
            </div>

            <div>
              {selectFilter.includes(item) ? (
                <span
                  onClick={() => {
                    const filtered = selectFilter.filter((ele) => ele !== item);
                    setSelectFilter(filtered);
                  }}
                  className="cursor-pointer"
                >
                  <FaRegCheckSquare />
                </span>
              ) : (
                <span
                  onClick={() => {
                    setSelectFilter([...selectFilter, item]);
                  }}
                  className="cursor-pointer"
                >
                  <FaRegSquare />
                </span>
              )}
            </div>
          </div>
        ))}

        <div className="flex gap-4 mt-6">
          <select
            className="w-28 font-semibold focus:outline-none px-4 py-1 border border-gray-300 rounded-sm"
            name=""
            id=""
          >
            <option value="">Select</option>
            <option value="min">Min</option>
            <option value="max">Max</option>
          </select>
          <select
            className="w-28 focus:outline-none font-semibold px-4 py-1 border border-gray-300 rounded-sm"
            name=""
            id=""
          >
            <option value="250+">250+</option>
            <option value="250+">250+</option>
            <option value="250+">250+</option>
          </select>
        </div>

        {[
          "4★ & above",
          "3★ & above",
          "2★ & above",
          "1★ & above",
          "0★ & above",
        ].map((item) => (
          <div className="flex  items-center  text-xl gap-4 ">
            <div>
              {selectFilter.includes(item) ? (
                <span
                  onClick={() => {
                    const filtered = selectFilter.filter((ele) => ele !== item);
                    setSelectFilter(filtered);
                  }}
                  className="cursor-pointer"
                >
                  <FaRegCheckSquare />
                </span>
              ) : (
                <span
                  onClick={() => {
                    setSelectFilter([...selectFilter, item]);
                  }}
                  className="cursor-pointer"
                >
                  <FaRegSquare />
                </span>
              )}
            </div>
            <div className="flex items-center  gap-1 mt-2 font-semibold w-60 ">
              <span>{item}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Filter;
