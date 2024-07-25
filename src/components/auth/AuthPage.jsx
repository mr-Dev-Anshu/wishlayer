import Image from "next/image";
import React from "react";
import authImage from "@/assets/auth.png";
const AuthPage = () => {
  return (
    <div className="md:flex h-screen w-full    justify-center items-center ">
      <div>
        <Image src={authImage} width={400} height={400} />
      </div>
      <div>asdfasdf</div>
    </div>
  );
};

export default AuthPage;
