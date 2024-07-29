"use client";
import Venue from "@/components/Explore/Party";
import Products from "@/components/Productpage/Products";
import RatingAndReview from "@/components/Productpage/RatingAndReview";
import RoomInfo from "@/components/Productpage/RoomInfo";
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
  const [images, setImages] = useState();
  const [productData, setProductData] = useState();

  console.log(id);

  const getData = async () => {
    const imgQ = query(collection(db, "images"), where("data_id", "==", id));
    const imgDataSnap = await getDocs(imgQ);
    const docRef = doc(db, "cakes", id);
    const productSnap = await getDoc(docRef);

    const allImages = [];

    imgDataSnap.forEach((doc) => {
      allImages.push({ id: doc.id, ...doc.data() });
    });

    console.log(allImages);
    setImages(allImages);
    console.log(productSnap.data());
    setProductData(productSnap.data());
  };

  useEffect(() => {
    getData();
  }, []);

  const isLoading = !images;
  if (isLoading) {
    return (
      <div>
        <Skeleton count={60} />
      </div>
    );
  }

  return (
    <div className="">
      <div className=" grid md:grid-cols-5 ">
        <div className="md:col-span-2">
          <Products img={images} />
        </div>
        <div className="md:col-span-3">
          <VenueInfo data={productData} />
          <RatingAndReview />
        </div>
        <div className="md:h-20"></div>
      </div>
      <div>
        <p className="px-12 md:text-xl font-semibold">
          You may also like this{" "}
        </p>
        <Venue show={true} />
      </div>
    </div>
  );
};

const page = () => {
  const [shownConponent, setShownComponent] = useState(false);

  useEffect(() => {
    setShownComponent(true);
  }, []);
  return <div>{shownConponent && <MyComponent />}</div>;
};
export default page;
