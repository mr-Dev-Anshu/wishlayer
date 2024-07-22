import Products from "@/components/Productpage/Products";
import RatingAndReview from "@/components/Productpage/RatingAndReview";
import RoomInfo from "@/components/Productpage/RoomInfo";
import React from "react";

const page = () => {
    const img = [
        "https://firebasestorage.googleapis.com/v0/b/news-f534b.appspot.com/o/room1.png?alt=media&token=12b8ba4c-1f6c-462c-8f62-b7c42566416f",
        "https://firebasestorage.googleapis.com/v0/b/news-f534b.appspot.com/o/room2.png?alt=media&token=7d885be3-7d1d-4b25-9583-aa330a370452",
        "https://firebasestorage.googleapis.com/v0/b/news-f534b.appspot.com/o/room3.png?alt=media&token=161fd939-3615-48d5-bbd7-797e6526d478",
        "https://firebasestorage.googleapis.com/v0/b/news-f534b.appspot.com/o/room4.png?alt=media&token=e2829749-7646-4ca8-95c4-c2a4d91b888f",
      ];
  return (
    <div className="">
      <div className=" grid md:grid-cols-5 ">
        <div className="col-span-2">
          <Products img={img} />
        </div>
        <div className="col-span-3">
          <RoomInfo />
          <RatingAndReview />
        </div>
        <div className="md:h-20"></div>
      </div>
    </div>
  );
};
export default page;
