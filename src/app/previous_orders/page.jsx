"use client";
import React, { useEffect, useState } from "react";
import { getSession } from "@/authThing/action";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/config/firebase.config";
import { useRouter } from "next/navigation";
import Skeleton from "react-loading-skeleton";
import Image from "next/image";
import Link from "next/link";
import Spinner from "@/components/Spinner";
const page = () => {
  const [allOrders, setAllOrders] = useState([]);
  const router = useRouter();
  const [loading, setLoading] = useState();

  const getData = async () => {
    const session = await getSession();
    setLoading(true);
    console.log("called");
    if (!session || !session.phone) {
      router.push("/login");
      return;
    } else {
      const q = query(
        collection(db, "orders"),
        where("phone", "==", session.phone)
      );
      const orderDataSnpa = await getDocs(q);

      console.log(orderDataSnpa.docs[0].data());
      const allOrderedProducts = [];
      for (const dataSnap of orderDataSnpa.docs) {
        console.log(dataSnap.data().id);

        const docRef = doc(collection(db, "cakes"), dataSnap.data().id);
        const productDataSnap = await getDoc(docRef);

        if (productDataSnap.exists()) {
          allOrderedProducts.push({
            id: productDataSnap.id,
            ...productDataSnap.data(),
            ...dataSnap.data(),
          });
        }
      }
      console.log(allOrderedProducts);
      setAllOrders(allOrderedProducts);
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
    console.log(allOrders) ; 
  }, [router]);
  return (
    <div className="p-4 md:p-10">
      <h1 className="text-2xl font-bold mb-6">Order History</h1>
      {loading ? (
        <div className="flex justify-center items-center md:h-[500px]">
           <Spinner />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {allOrders.map((order , index ) => (
           <Link href={`/${order.type}?id=${order.id}`}>
             <div
              key={index}
              className="p-4 border border-gray-300  rounded-lg"
            >
              <div>
                <Image
                  width={200}
                  height={200}
                  src={order.cover_img}
                  alt={order.title}
                  className="w-full h-[200px] object-cover rounded-md mb-4"
                />
               
                <p className="font-bold text-lg">Title: {order.title}</p>
               
                <p>Address: {order.address}</p>
                <p>City: {order.city}</p>
                <p>Name: {order.fullName}</p>
                 {order.weight ? <p>Weight: {order.weight} KG </p>:null }
                <p>Phone: {order.phone}</p>
                 <p>Price: ₹{ order.price}</p>
                <p>Message: {order.message}</p>
              </div>
              <div>
                status: {order.Confirmed && <span className="text-green-600 font-bold  mt-4">Confirmed</span> } {order.decline && <span className="text-red-600 mt-4 font-bold">Decline</span> } {(!order.Confirmed && !order.decline) ? <span className="text-blue-600 mt-4 font-bold">Pending</span>:null }
              </div>
            </div>
           </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default page;
