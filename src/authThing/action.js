"use server";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import {
  addDoc,
  collection,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/config/firebase.config";
import { sessionOptions } from "./lib";

export const getSession = async () => {
  const session = await getIronSession(cookies(), sessionOptions);
  session.res?.setHeader("Cache-Control", "no-store, must-revalidate");
  return session;
};

export const login = async (formData) => {
  const session = await getSession();
  const password = formData.get("password");
  const phone = formData.get("phone");
  console.log(password, phone);
  if (phone) {
    const q = query(collection(db, "users"), where("phone", "==", phone));
    const dataSnap = await getDocs(q);
    let user;
    dataSnap.forEach((doc) => {
      console.log(doc.data());
      user = doc.data();
    });
    if (!user) {
      throw new Error("Admin not Found ");
    }

    if (password !== user.password) {
      throw new Error("Incorrect Password ! Please try again ");
    }
    session.phone = user.phone;
    console.log(session);
    await session.save();
    // notify(1,"Login Success full ")
    redirect("/");
  }

  //   if (email) {
  //     const q = query(collection(db, "user"), where("email", "==", email));
  //     const dataSnap = await getDocs(q);
  //     let user;
  //     dataSnap.forEach((doc) => {
  //       console.log(doc.data());
  //       user = doc.data();
  //     });
  //     if (!user) {
  //       throw new Error("User  not Found ");
  //     }

  //     if (password !== user.password) {
  //       throw new Error("Incorrect Password ! Please try again ");
  //     }
  //     session.email = user.email;
  //     console.log(session);
  //     await session.save();
  //     redirect("/");
  //   }
};

export const logout = async () => {
  const session = await getSession();
  session.destroy();
  redirect("/");
};

export const signup = async (formData) => {
    const phone = formData.get("phone");
    const password = formData.get("password");
    const fullName = formData.get("full_name");
    if (!phone || !password || !fullName) {
      throw new Error("Phone, full name, and password are required for sign-up.");
    }
  
    console.log(phone, password, fullName);
   
    try {
      const userDocRef = await addDoc(collection(db, "users"), {
        phone,
        full_name: fullName,
        password,
      });

      const userSnap = await getDoc(userDocRef);
      const user = userSnap.data();
  
     console.log(user)
      // Save session data
      const session = await getSession();
      session.phone = user.phone;
      await session.save();
  
      console.log("User signed up successfully:", userDocRef.id);
     
    } catch (error) {
      console.error("Error signing up user:", error);
      throw new Error("Error signing up user: " + error.message);
    }
  };
  
