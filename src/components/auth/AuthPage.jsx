"use client";
import Image from "next/image";
import React, { useState } from "react";
import authImage from "@/assets/auth.png";
import flag from "@/assets/flag.webp";
import { login } from "@/authThing/action";
import Swal from "sweetalert2";

const AuthPage = () => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    Swal.fire({
      title: "Loading...",
      text: "Please wait while we process your request.",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    const formData = new FormData(e.target);
    const fullName = formData.get("full_name");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirm_password");

    if (
      !fullName ||
      !password ||
      !confirmPassword ||
      fullName.trim() === "" ||
      password.trim() === "" ||
      confirmPassword.trim() === ""
    ) {
      setErrorMessage("Please fill in the credentials!");
      setLoading(false);
      Swal.fire({
        title: "Error!",
        text: "All fields are required.",
        icon: "error",
      });
      return;
    }

    try {
      await login(formData);
      Swal.fire({
        title: "Good job!",
        text: "You are successfully logged in!",
        icon: "success",
      });
    } catch (error) {
      console.log(error);
      setErrorMessage(error?.message);
      Swal.fire({
        title: "Error!",
        text: error?.message,
        icon: "error",
      });
      setLoading(false);
    }
  };

  return (
    <div className="md:flex h-screen w-full justify-center items-center">
      <div>
        <Image
          className="rounded-md"
          src={authImage}
          width={600}
          height={400}
        />
      </div>
      <form onSubmit={handleLogin} action="">
        <div className="space-y-4 mt-4 md:mt-0 px-4 border border-gray-200">
          <p className="md:text-2xl font-medium text-[#F06429]">
            Create an Account
          </p>
          <p className="font-semibold">
            Hello There let's Start Journey with us ..
          </p>
          <input
            name="full_name"
            type="text"
            placeholder="Full Name"
            className="w-full md:p-3 rounded-md p-2 focus:outline-none border border-gray-400"
          />
          <div className="grid grid-cols-5 items-center">
            <div className="col-span-1 border border-gray-400 md:py-3 py-2 px-1 flex gap-2">
              <Image className="rounded-md" src={flag} width={20} height={20} />
              <span>+91</span>
            </div>
            <div className="col-span-4">
              <input
                name="phone"
                placeholder="Enter Phone Number"
                type="number"
                className="w-full md:p-3 p-2 focus:outline-none rounded-md border border-gray-400"
              />
            </div>
          </div>
          <input
            name="password"
            type="password"
            placeholder="Password"
            className="w-full md:p-3 rounded-md p-2 focus:outline-none border border-gray-400"
          />
          <input
            name="confirm_password"
            type="password"
            placeholder="Confirm Password"
            className="w-full md:p-3 rounded-md p-2 focus:outline-none border border-gray-400"
          />
          <button
            type="submit"
            className="text-xl md:font-bold bg-[#F06429] px-4 py-2 w-full text-white rounded-md"
          >
            Sign Up
          </button>
          <p>
            Already have an Account{" "}
            <span className="text-[#F06429] px-3 cursor-pointer">
              Login now
            </span>
          </p>
        </div>
      </form>
    </div>
  );
};

export default AuthPage;
