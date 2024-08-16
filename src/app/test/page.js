'use client'
// pages/realtime.js
import React, { useState, useEffect } from "react";
import { ref, set, onValue } from "firebase/database";
import { db2 } from "@/config/firebase.config";


const RealtimedbExample = () => {
  const [data, setData] = useState("");
  const [fetchedData, setFetchedData] = useState(null);

  // Write data to Firebase Realtime db
  const handleWriteData = () => {
    set(ref(db2 , "exampleData"), {
      text: data,
    })
      .then(() => {
        alert("Data saved successfully!");
      })
      .catch((error) => {
        console.error("Error saving data:", error);
      });
  };

  // Read data from Firebase Realtime db
  useEffect(() => {
    const dataRef = ref(db2, "exampleData/");
    onValue(dataRef, (snapshot) => {
      const value = snapshot.val();
      setFetchedData(value ? value.text : "No data available");
    });
  }, []);

  return (
    <div className="space-y-6 p-6">
      <div className="text-xl font-bold">Firebase Realtime db Example</div>
      <input
        type="text"
        placeholder="Enter some data"
        value={data}
        onChange={(e) => setData(e.target.value)}
        className="border border-gray-400 text-xl focus:border-blue-500 focus:outline-none rounded-md px-4 py-1 w-full"
      />
      <button
        onClick={handleWriteData}
        className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
      >
        Save Data
      </button>
      <div className="text-xl">
        <p>Fetched Data: {fetchedData}</p>
      </div>
    </div>
  );
};

export default RealtimedbExample;
