"use client";
import { FaGift } from "react-icons/fa";

const SuccessPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-lg text-center">
        <FaGift className="text-[#F06429] text-6xl mb-4 mx-auto" />
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Thank you for your order!
        </h1>
        <p className="text-gray-600 mb-6">
          Your order will be confirmed Soon . We will message you with the
          details.
        </p>
        <p className="text-gray-600 mb-4">We appreciate your patience!</p>
        <div className="flex justify-center">
          <FaGift className="text-[#F06429] text-4xl mx-2" />
          <FaGift className="text-[#F06429] text-4xl mx-2" />
          <FaGift className="text-[#F06429] text-4xl mx-2" />
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
