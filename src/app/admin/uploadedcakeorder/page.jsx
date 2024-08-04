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

    fetchData() ; 
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!cakeData) {
    return <div>No data available</div>;
  }

  return (
    <div className="p-4 max-w-md mx-auto">
      {cakeData.map((item, index) => (
        <div>
          <img
            src={item.image}
            alt="Cake"
            className="w-full h-[200px] rounded-lg shadow-lg"
          />
          <div className="mt-4">
            <h2 className="text-xl font-semibold">Message</h2>
            <p className="text-gray-700">{item.message}</p>
            <h2 className="mt-2 text-xl font-semibold">Weight</h2>
            <p className="text-gray-700">{item.weight}</p>
          </div>
          <div className="flex justify-between mt-4">
            <button
              className="px-4 py-2 bg-green-500 text-white rounded"
              onClick={() => handleStatusUpdate(order.orderId, "Confirmed")}
            >
              Confirm
            </button>
            <button
              className="px-4 py-2 bg-red-500 text-white rounded"
              onClick={() => handleStatusUpdate(order.orderId, "declined")}
            >
              Decline
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Page;
