"use client";
import { useState, useEffect } from "react";
import { db } from "@/config/firebase.config";
import { collection, getDocs } from "firebase/firestore";
import CoupanCard from "./Cupans";

const CoupanList = () => {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "coupons"));
        const couponsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCoupons(couponsData);
      } catch (error) {
        console.error("Error fetching coupons: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCoupons();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Available Coupons</h1>
      <div className="grid  md:px-0  gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {coupons.map((coupon) => (
          <div>
            <CoupanCard
              key={coupon.id}
              img={coupon.cover_img}
              description={coupon.description}
              title={coupon.title}
              code={coupon.code}
              lastDate={coupon.lastDate}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoupanList;
