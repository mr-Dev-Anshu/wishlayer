"use client";
import { createContext, useState } from "react";
import React from "react";

export const filterContext = createContext();

const FilterContextProvider = ({ children }) => {
  const [filterData, setFilterData] = useState([]);
  const [paymentToggle, setPaymentToggle] = useState();
  const [showPass , setShowPass ] = useState(false )  ; 
  return (
    <filterContext.Provider
      value={{ filterData, setFilterData, paymentToggle, setPaymentToggle , showPass , setShowPass }}
    >
      {children}
    </filterContext.Provider>
  );
};

export default FilterContextProvider;
