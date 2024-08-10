"use client";
import React, { useState } from "react";
import emailjs from "emailjs-com";
import Spinner from "@/components/Spinner";

const SendEmailButton = () => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSendEmail = async () => {
    setErrorMessage(null);
    setLoading(true);

    try {
      const emailData = {
        to_name: "Admin",
        from_name: "Wishlayer",
        name: data.name || "N/A",
        paid_status: data.method || "N/A",
        utr: utr || "N/A",
        screenshot_url: "sadfasdf", 
        price: `${data.price}.00 INR`,
        product_type: data.type || "N/A",
        product_title: data.title || "N/A",
        product_page_url: data.productPageUrl || "N/A",
        message: `A new order has been placed. You can review it here: www.wishlayer.com/admin/order`,
        phone_number: data.phone || "N/A",
      };

      await emailjs.send(
        "service_sj8774p", 
        "template_cno2aha", 
        emailData,
        "yU3FZndr9lP_iraqt" 
      );
      setLoading(false);
      alert("Email sent successfully!");
    } catch (error) {
      console.error("Error sending email:", error);
      setErrorMessage("Failed to send email. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <button
        onClick={handleSendEmail}
        className="bg-[#F06429] hover:bg-[#d9551d] text-white font-bold py-2 px-4 rounded w-full max-w-xs transition"
      >
        {loading ? <Spinner /> : "Send Email"}
      </button>
      {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
    </div>
  );
};

export default SendEmailButton;
