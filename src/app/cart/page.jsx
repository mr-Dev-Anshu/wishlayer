"use client";
import React, { useEffect, useState } from "react";
import flag from "@/assets/flag.webp";

import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "@/config/firebase.config";
import { getSession } from "@/authThing/action";
import { useRouter } from "next/navigation";
import { ToastContainer } from "react-toastify";
import { notify } from "@/controller/notify";
import Spinner from "@/components/Spinner";
import { getCurrentTime } from "@/controller/Time";
import Swal from "sweetalert2";
import { Send_Email } from "@/controller/sendEmail";
import Image from "next/image";
import PaymentQRCode2 from "@/components/Payment2";
const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState();
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [submitLoading, setSubmitLoading] = useState();
  const [isFormOpen, setIsFormOpen] = useState();

  const [fullName, setFullName] = useState();
  const [message, setMessage] = useState();
  const [phone, setPhone] = useState();
  const [paymentToggle, setPayToggle] = useState();
  const [payOrderData, setPayOrderData] = useState();
  const [discountMessage, setDiscountMessage] = useState();

  useEffect(() => {
    const fetchWishlistItems = async () => {
      try {
        const session = await getSession();
        if (!session || !session.phone) {
          router.push("/login");
          return;
        }
        setLoading(true);
        const q = query(
          collection(db, "cart"),
          where("phone", "==", session.phone)
        );
        const dataSnap = await getDocs(q);
        const items = [];
        let Tprice = 0;
        const proId = [];
        dataSnap.forEach((doc) => {
          items.push({ id2: doc.id, ...doc.data() });
          let price = +doc.data().price;
          console.log("this is price", price);
          Tprice += price;
          proId.push({
            product_title: doc.data().title,
            product_cover: doc.data().cover,
            product_price: doc.data().price,
            product_id: doc.data().id,
          });
        });

        if (Tprice >= 6000) {
          Tprice = Tprice - Tprice * 0.1;
          setDiscountMessage(true);
        }
        console.log(items);
        setTotalPrice(Tprice);
        console.log("this is total price ", Tprice);
        setCartItems(items);
        setLoading(false);
        setProducts(proId);
        console.log(proId);
      } catch (error) {
        console.error("Error fetching wishlist items: ", error);
        setLoading(false);
      }
    };
    fetchWishlistItems();
  }, [router]);
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );
  }

  const isNullOrWhitespace = (input) => {
    return !input || input.trim().length === 0;
  };

  const handleOrder = async (e) => {
    e.preventDefault();
    const orderData = {
      title: "Add To Cart",
      price: totalPrice + "",
      fullName: fullName,
      phone,
      message,
      allProducts: products,
      type: "addtocart",
    };
    if (
      isNullOrWhitespace(orderData.phone) ||
      isNullOrWhitespace(orderData.price) ||
      isNullOrWhitespace(orderData.fullName) ||
      isNullOrWhitespace(orderData.type)
    ) {
      notify(0, "Plese fill the reqired field");
      setLoading(false);
      return;
    }
    orderData.time = getCurrentTime();
    try {
      Swal.fire({
        title: "Loading...",
        text: "Please wait while we process your request.",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
      const docRef = await addDoc(collection(db, "orders"), orderData);
      orderData.id = docRef.id;
      await Send_Email(orderData);
      console.log("Order Added Here ");
      Swal.fire({
        title: "Good job!",
        text: "You have orderd Successfully  !",
        icon: "success",
      });
      setIsFormOpen(!isFormOpen);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    const orderData = {
      title: "Add To Cart",
      price: totalPrice + "",
      fullName: fullName,
      phone,
      message,
      allProducts: products,
      type: "addtocart",
    };
    if (
      isNullOrWhitespace(orderData.phone) ||
      isNullOrWhitespace(orderData.price) ||
      isNullOrWhitespace(orderData.fullName) ||
      isNullOrWhitespace(orderData.type)
    ) {
      notify(0, "Plese fill the reqired field");
      setLoading(false);
      return;
    }
    orderData.time = getCurrentTime();

    setPayOrderData(orderData);
    setPayToggle(true);
  };

  const handleRemoveFromCart = async (itemId) => {
    console.log(itemId) ; 
    try {
      await deleteDoc(doc(db, "cart", itemId));
      setCartItems(cartItems.filter((item) => item.id2 !== itemId));
      const updatedTotalPrice = cartItems.reduce((total, item) => {
        if (item.id2 !== itemId) {
          return total + +item.price;
        }
        return total;
      }, 0);
      setTotalPrice(updatedTotalPrice);
      notify(1, "Item removed from cart");
    } catch (error) {
      console.log("Error removing item from cart: ", error);
      notify(0, "Failed to remove item from cart");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Your Cart</h2>
      <div className="bg-white shadow-lg rounded-lg p-6">
        {cartItems.length > 0 ? (
          cartItems.map((item, index) => (
            <div
              key={index}
              className="flex justify-between items-center border-b pb-4 mb-4"
            >
              <div className="flex items-center">
                <img
                  src={item.cover}
                  alt={item.title}
                  className="w-16 h-16 rounded-lg mr-4"
                />
                <div>
                  <p className="text-lg font-semibold text-gray-700">
                    {item.title}
                  </p>
                </div>
              </div>
              <div className="md:flex md:gap-10">
                <p className="text-lg font-semibold text-gray-700">
                  ₹{item.price}
                </p>
                <button
                  onClick={() => handleRemoveFromCart(item.id2)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                >
                  Remove
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No items in your cart.</p>
        )}
        <div className="mt-6">
          <div className="flex justify-between items-center text-lg font-semibold text-gray-800">
            <span>Total Price:</span>
            <span>₹{totalPrice}</span>
          </div>
          <button
            onClick={() => setIsFormOpen(true)}
            className="w-full mt-4 bg-[#F06429] text-white py-2 px-4 rounded-lg hover:bg-blue-600"
          >
            Place Order
          </button>
        </div>
      </div>
      {isFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl  mb-4">For Order Please Fill this form </h2>
            <form>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Full Name
                </label>
                <input
                  onChange={(e) => setFullName(e.target.value)}
                  type="text"
                  placeholder="Enter your full Name "
                  className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Phone Number
                </label>
                <div className="grid grid-cols-5 items-center">
                  <div className="col-span-1 border  border-gray-400 md:py-3 py-2 px-1  flex gap-2">
                    <Image
                      className="rounded-md"
                      src={flag}
                      width={20}
                      height={20}
                    />
                    <span>+91</span>
                  </div>
                  <div className="col-span-4">
                    <input
                      onChange={(e) => setPhone(e.target.value)}
                      name="phone"
                      placeholder="Enter Phone Number"
                      type="number"
                      className="w-full md:p-3 p-2 focus:outline-none rounded-md border border-gray-400"
                    />
                  </div>
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Message
                </label>
                <textarea
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-none"
                  rows="4"
                  placeholder="Enter Message Here "
                ></textarea>
              </div>
              <button
                onClick={handleOrder}
                type="submit"
                className="bg-[#F06429] hover:bg-[#d9551d] text-white font-bold py-2 px-4 rounded mr-2"
              >
                {submitLoading ? "Loading..." : "Submit"}
              </button>
              <button
                onClick={handlePayment}
                type="submit"
                className="bg-[#F06429] hover:bg-[#d9551d] text-white font-bold py-2 px-4 rounded mr-2"
              >
                {loading ? "Loading..." : "Pay Now"}
              </button>
              <button
                type="button"
                onClick={() => setIsFormOpen(!isFormOpen)}
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
              >
                Cancel
              </button>
            </form>
          </div>
          {paymentToggle ? (
            <div className="fixed inset-0  bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div>
                <PaymentQRCode2 data={payOrderData} />
              </div>
            </div>
          ) : null}
        </div>
      )}
      <div>
        {discountMessage && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg p-6 text-center max-w-md w-full">
              <button
                onClick={() => setDiscountMessage(false)}
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              >
                ✖️
              </button>
              <img
                src="https://media.giphy.com/media/xT0xeJpnrWC4XWblEk/giphy.gif"
                alt="Congratulations"
                className="w-32 h-32 mx-auto mb-4"
              />
              <h2 className="text-2xl font-semibold mb-4">Congratulations!</h2>
              <p className="text-gray-700">
                You are ordering more than ₹6000, so you got a 10% discount!
              </p>
              <button
                onClick={() => setDiscountMessage(false)}
                className="mt-6 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>

      <ToastContainer />
    </div>
  );
};
export default CartPage;
