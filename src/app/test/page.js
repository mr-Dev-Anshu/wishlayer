import ImageCard from "@/components/ImageCard";
import React from "react";
import offer1 from "@/assets/offer1.png";
import ProductCard2 from "@/components/ProductCard2";
import ImageFooter from "@/components/Footer/ImageFooter";
import Image from "next/image";
const page = () => {
  return (
    <div className="">
      <Image  src={"https://firebasestorage.googleapis.com/v0/b/news-f534b.appspot.com/o/hero.png?alt=media&token=ca07f37d-7331-433b-96e5-012b2a82da2a"} width={400} height={400}/>
    </div>
  );
};

export default page;
