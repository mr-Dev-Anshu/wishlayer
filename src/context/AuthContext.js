"use client";
import { getSession } from "@/authThing/action";
import { createContext, useEffect, useState } from "react";

export const userContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [userPhone, setUserPhone] = useState();

  const getUser = async () => {
    const session = await getSession();
    console.log(session.phone);
    setUserPhone(session.phone);
  };
  useEffect(() => {
    getUser();
  });

  return (
    <userContext.Provider value={{ userPhone, setUserPhone }}>
      {children}
    </userContext.Provider>
  );
};