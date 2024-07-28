"use client";
import { createContext, useState } from "react";
import React from "react";

export const filterContext = createContext();

const FilterContextProvider = ({ children }) => {
  const [filterData, setFilterData] = useState([]);

  return (
    <filterContext.Provider value={{ filterData, setFilterData }}>
      {children}
    </filterContext.Provider>
  );
};

export default FilterContextProvider;
