"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  query,
  where,
  deleteDoc,
  doc,
  getDoc,
} from "firebase/firestore";
import { db } from "@/config/firebase.config";
import { getSession } from "@/authThing/action";
import { useRouter } from "next/navigation";
import { IoIosRemoveCircleOutline } from "react-icons/io";
import Link from "next/link";

const WishlistPage = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchWishlistItems = async () => {
      try {
        const session = await getSession();
        if (!session || !session.phone) {
          router.push("/login");
          return;
        }

        const q = query(
          collection(db, "wishlists"),
          where("user", "==", session.phone)
        );
        const dataSnap = await getDocs(q);

        const items = [];
        for (const docSnap of dataSnap.docs) {
          const productRef = doc(db, "cakes", docSnap.data().ProductId); // Assuming cakes for now, you can adjust as needed
          const productSnap = await getDoc(productRef);
          if (productSnap.exists()) {
            items.push({
              id: docSnap.id,
              ...productSnap.data(),
            });
          }
        }
        setWishlistItems(items);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching wishlist items: ", error);
      }
    };

    fetchWishlistItems();
  }, [router]);

  const handleRemoveFromWishlist = async (wishlistId) => {
    try {
      const docRef = doc(db, "wishlists", wishlistId);
      await deleteDoc(docRef);
      setWishlistItems(wishlistItems.filter((item) => item.id !== wishlistId));
    } catch (error) {
      console.error("Error removing from wishlist: ", error);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="p-4 md:p-10">
      <h1 className="text-2xl font-bold mb-6">My Wishlist</h1>
      {wishlistItems.length === 0 ? (
        <p>Your wishlist is empty.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-1  gap-4">
          {wishlistItems.map((item) => (
           <Link href={`/${item.type}?id=${item.id}`}>
            <div key={item.id} className="p-4 flex items-center   gap-4  bg-white rounded-lg shadow-md">
              <Image
                src={item.cover_img}
                alt={item.title}
                width={100}
                height={100}
                className="rounded-lg"
              />
              <div className="flex items-center justify-between w-full " >
                <h2 className="md:text-xl font-semibold  mt-2">{item.title}</h2>

                <button
                  onClick={() => handleRemoveFromWishlist(item.id)}
                  className="mt-4 text-red-500   px-4 py-2 rounded-md"
                >
                  <IoIosRemoveCircleOutline size={35}/>
                </button>
              </div>
            </div>
           </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
