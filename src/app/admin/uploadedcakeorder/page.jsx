"use client";
import React, { useState, useEffect } from "react";
import { collection, getDoc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "@/config/firebase.config";

const Page = () => {
  const [cakeData, setCakeData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "uploadedCake"));
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
      });

      setCakeData(data);
      console.log("This is cake data", data);
    } catch (error) {
      console.error("Error fetching data: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleStatusUpdate = async (orderId, statusType) => {
    const orderRef = doc(db, "uploadedCake", orderId);
    const docSnapshot = await getDoc(orderRef);
    if (!docSnapshot.exists()) {
      console.error("Document does not exist:", orderId);
      return;
    }
    await updateDoc(orderRef, {
      [statusType]: true,
    });

    fetchData();
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!cakeData) {
    return <div>No data available</div>;
  }

  return (
    <div className="p-4 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
      {cakeData.map((item, index) => (
        <div key={index} className="bg-white rounded-lg shadow-lg p-4">
          <img
            src={item.image}
            alt="Cake"
            className="w-full h-48 object-cover rounded-lg"
          />
          <div className="mt-4">
            <h2 className="text-xl font-semibold">Message</h2>
            <p className="text-gray-700">{item.message}</p>
            <h2 className="mt-2 text-xl font-semibold">Weight</h2>
            <p className="text-gray-700">{item.weight}Kg</p>
            <h2 className="mt-2 text-xl font-semibold">Phone</h2>
            <p className="text-gray-700">{item.phone}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Page;
