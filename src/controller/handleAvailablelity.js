import { db } from "@/config/firebase.config";
import { collection, getDocs, query, where } from "firebase/firestore";

export const handleAvailablity = async (pincode) => {
  const q = query(
    collection(db, "availablity"),
    where("pincode", "==", pincode)
  );
  const dataSnap = await getDocs(q);
  const data = [];
  dataSnap.forEach((doc) => {
    data.push(doc.data());
  });
  return data ; 
};
