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
  const userid = formData.get("full_name");
//   const password = formData.get("password");
//   const email = formData.get("email");
  console.log(userid);
  throw new Error("this is Error")
//   if (userid) {
//     console.log("this is user id ", userid, password);
//     const q = query(collection(db, "admin"), where("userid", "==", userid));
//     const dataSnap = await getDocs(q);
//     let user;
//     dataSnap.forEach((doc) => {
//       console.log(doc.data());
//       user = doc.data();
//     });
//     if (!user) {
//       throw new Error("Admin not Found ");
//     }

//     if (password !== user.password) {
//       throw new Error("Incorrect Password ! Please try again ");
//     }
//     session.userid = user.userid;
//     console.log(session);

//     await session.save();
//     redirect("/admin");
//   }

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

export const userSignUp = async (formData) => {
  const email = formData.get("email");
  const password = formData.get("password");

  if (!email || !password) {
    throw new Error("Email and password are required for sign-up.");
  }

  try {
    const userDocRef = await addDoc(collection(db, "user"), {
      email: email,
      password: password,
    });

    const userSnap = await getDoc(userDocRef);
    const user = userSnap.data();

    const session = await getSession();
    session.email = user.email;
    await session.save();
    console.log("User signed up successfully:", userDocRef.id);
  } catch (error) {
    console.error("Error signing up user:", error);
    throw new Error("Error signing up user: " + error.message);
  }
};
