import CakeProductInfo from "@/components/Productpage/CakeProductInfo";
import Products from "@/components/Productpage/Products";
import RatingAndReview from "@/components/Productpage/RatingAndReview";
import React from "react";

const page = () => {
  const img = [
    "https://firebasestorage.googleapis.com/v0/b/news-f534b.appspot.com/o/cake2.png?alt=media&token=a4cbecd2-163e-4611-a824-8d9b1c82763a",
    "https://firebasestorage.googleapis.com/v0/b/news-f534b.appspot.com/o/cake3.png?alt=media&token=dc524eff-b5d3-4ac3-990a-cf99d3aa1cf5",
    "https://firebasestorage.googleapis.com/v0/b/news-f534b.appspot.com/o/cake4.png?alt=media&token=ef29acd8-9733-48f6-8400-0000d44b89f6",
    "https://firebasestorage.googleapis.com/v0/b/news-f534b.appspot.com/o/cake5.png?alt=media&token=076025a1-226f-40e0-a0ea-e8cc81afffa4",
    "https://firebasestorage.googleapis.com/v0/b/news-f534b.appspot.com/o/offer2.png?alt=media&token=ffeadaac-eaba-4bad-a456-4e07c5a690aa",
  ];
  return (
    <div className="">
      <div className=" grid md:grid-cols-5 ">
        <div className="col-span-2">
          <Products img={img} />
        </div>
        <div className="col-span-3">
          <CakeProductInfo />
          <RatingAndReview />
        </div>
        <div className="md:h-20"></div>
      </div>
    </div>
  );
};
export default page;
