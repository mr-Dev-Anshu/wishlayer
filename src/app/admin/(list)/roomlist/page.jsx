"use client";
import { db } from "@/config/firebase.config";
import { collection, deleteDoc, doc, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import List from "@/components/admin/List";

const page = () => {
  const [cakes, setCakes] = useState([]);
  const router = useRouter();

  const fetchCakes = async () => {
    const q = query(collection(db, "cakes"), where("type" , "==" ,  "room"));
    const cakesSnap = await getDocs(q);
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
    router.push(`/room/${id}`);
  };

  const isLoading = !cakes;
  if (isLoading) {
    return (
      <div>
        <Skeleton count={60} />
      </div>
    );
  }

  return (
    <div>
      <List
        data={cakes}
        handleDelete={handleDelete}
        add={"room"}
        handleView={handleView}
      />
    </div>
  );
};

export default page;
