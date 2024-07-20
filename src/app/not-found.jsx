"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import notfound from "@/assets/notfound.gif";
const NotFoundPage = () => {
  useEffect(() => {
    // Example: Track page view with a logging or analytics service
    console.log("404 page viewed");
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-100">
      <div className="text-center">
        <Image
          src={notfound}
          alt="Funny Gift"
          width={400}
          height={400}
          className="mx-auto mb-4"
        />
        <h1 className="text-4xl font-bold text-red-600 mb-4">
          Oops! Page Not Found
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          It looks like you’ve found a page that doesn’t exist. Don’t worry, it
          happens to the best of us!
        </p>
        <Link href="/">
          <p className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-600">
            Go Back Home
          </p>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
