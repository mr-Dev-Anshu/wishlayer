import Image from "next/image";
import React from "react";
import ads1 from "@/assets/ads1.png";

const Ads = () => {
  return (
    <div className="my-4">
      <Image
        className="w-full h-[150px] sm:h-[200px] md:h-[250px] object-cover"
        src={ads1}
        alt="Advertisement"
      />
    </div>
  );
};

export default Ads;
