"use client";
import { db } from "@/config/firebase.config";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import List from "@/components/admin/List";

const page = () => {
  const [cakes, setCakes] = useState([]);
  const router = useRouter();

  const fetchCakes = async () => {
    const cakesSnap = await getDocs(collection(db, "cakes"));
    let cakesData = [];

    cakesSnap.forEach((doc) => {
      cakesData.push({ id: doc.id, ...doc.data() });
    });
    setCakes(cakesData);
  };

  useEffect(() => {
    fetchCakes();
  }, []);

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "cakes", id));
    setCakes(cakes.filter((item) => item.id !== id));
  };

  const handleView = (id) => {
    router.push(`/cakes/${id}`);
  };

    return(
         <div>
             <List data={cakes} handleDelete={handleDelete} handleView={handleView} />
         </div>
    )
};

export default page;
