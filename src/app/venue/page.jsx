"use client";
import Venue from "@/components/Explore/Party";
import Products from "@/components/Productpage/Products";
import RatingAndReview from "@/components/Productpage/RatingAndReview";
import VenueInfo from "@/components/Productpage/VenueInfo";
import { db } from "@/config/firebase.config";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";

const MyComponent = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [images, setImages] = useState(null);
  const [productData, setProductData] = useState(null);

  const getData = async () => {
    try {
      const imgQ = query(collection(db, "images"), where("data_id", "==", id));
      const imgDataSnap = await getDocs(imgQ);
      const docRef = doc(db, "cakes", id);
      const productSnap = await getDoc(docRef);

      const allImages = [];
      imgDataSnap.forEach((doc) => {
        allImages.push({ id: doc.id, ...doc.data() });
      });

      setImages(allImages);
      setProductData(productSnap.data());
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (id) {
      getData();
    }
  }, [id]);

  if (!images || !productData) {
    return (
      <div className="px-10">
        <Skeleton count={60} />
      </div>
    );
  }

  return (
    <div className="px-4 md:px-10">
      <div className="grid md:grid-cols-5 gap-4">
        <div className="md:col-span-2">
          {images?.length >= 1 && <Products img={images} />}
        </div>
        <div className="md:col-span-3 md:overflow-y-scroll md:h-screen scroll-hidden">
          <VenueInfo id={id} data={productData} />
          <div className="md:pl-20">
            <RatingAndReview />
          </div>
        </div>
      </div>
      <div className="my-8">
        <p className="px-4 md:px-12 md:text-xl font-semibold">
          You may also like this
        </p>
        <Venue show={true} />
      </div>
    </div>
  );
};

const Page = () => {
  const [shownComponent, setShownComponent] = useState(false);

  useEffect(() => {
    setShownComponent(true);
  }, []);

  return <div>{shownComponent && <MyComponent />}</div>;
};

export default Page;
