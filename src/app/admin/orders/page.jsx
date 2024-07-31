"use client";
import { useEffect, useState } from "react";
import { db } from "@/config/firebase.config";
import {
  collection,
  getDocs,
  doc,
  getDoc,
  updateDoc,
  query,
  where,
} from "firebase/firestore";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [orderType, setOrderType] = useState("venue");
  const [loading, setLoading] = useState(true);

  const fetchOrders = async (type) => {
    setLoading(true);
    const ordersCollection = collection(db, "orders");
    const q = query(ordersCollection, where("type", "==", type));
    const ordersSnapshot = await getDocs(q);
    const ordersList = await Promise.all(
      ordersSnapshot.docs.map(async (doc1) => {
        const order = { orderId: doc1.id, ...doc1.data() };
        if (order.delivered || order.declined) return null; // Skip delivered or declined orders

        let productDetails = null;
        let productRef = null;

        if (
          order.type === "venue" ||
          order.type === "room" ||
          order.type === "cake"
        ) {
          productRef = doc(db, "cakes", order.id);
          if (order.type !== "cake") {
            productRef = doc(db, "cakes", order.id);
          }
          const productSnapshot = await getDoc(productRef);
          if (productSnapshot.exists()) {
            productDetails = productSnapshot.data();
          }
        }

        return { ...order, productDetails };
      })
    );
    setOrders(ordersList.filter((order) => order !== null)); // Remove null values
    setLoading(false);
  };

  useEffect(() => {
    fetchOrders(orderType);
  }, [orderType]);

  const handleStatusUpdate = async (orderId, statusType) => {
    const orderRef = doc(db, "orders", orderId);
    const docSnapshot = await getDoc(orderRef);
    if (!docSnapshot.exists()) {
      console.error("Document does not exist:", orderId);
      return;
    }
    await updateDoc(orderRef, {
      [statusType]: true,
    });
    fetchOrders(orderType);
  };

  return (
    <div className="p-4 md:p-10">
      <div className="flex justify-center mb-6">
        <button
          className={`mx-2 px-4 py-2 rounded ${
            orderType !== "venue"
              ? "bg-white text-[#F06429]"
              : "bg-[#F06429] text-white"
          }`}
          onClick={() => setOrderType("venue")}
        >
          Venue Orders
        </button>
        <button
          className={`mx-2 px-4 py-2 rounded ${
            orderType !== "room"
              ? "bg-white text-[#F06429]"
              : "bg-[#F06429] text-white"
          }`}
          onClick={() => setOrderType("room")}
        >
          Room Orders
        </button>
        <button
          className={`mx-2 px-4 py-2 rounded ${
            orderType !== "cake"
              ? "bg-white text-[#F06429]"
              : "bg-[#F06429] text-white"
          }`}
          onClick={() => setOrderType("cake")}
        >
          Cake Orders
        </button>
      </div>

      {loading ? (
        <Skeleton count={10} height={100} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2  gap-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="p-4 border border-gray-300 rounded-lg"
            >
              {order.type === "venue" && order.productDetails && (
                <div className="space-y-2">
                  <p className="font-bold text-lg">Venue Order</p>
                  <img
                    src={order.productDetails.cover_img}
                    alt={order.productDetails.title}
                    className="w-full h-48 object-cover rounded-lg mb-2"
                  />
                  <p className="font-semibold ">{order.productDetails.title}</p>
                  <p>Description: {order.productDetails.description}</p>
                  <p>Address: {order.productDetails.address}</p>
                  <p>State: {order.productDetails.state}</p>
                  <p>Pincode: {order.productDetails.pincode}</p>
                  <p>Date: {order.eventDate}</p>
                  <p>Type: {order.eventType}</p>
                  <p>Name: {order.fullName}</p>
                  <p>Guests: {order.numberOfGuest}</p>
                  <p>Phone: {order.phone}</p>
                  <p>Message: {order.message}</p>
                </div>
              )}
              {order.type === "room" && order.productDetails && (
                <div>
                  <p className="font-bold text-lg">Room Order</p>
                  <img
                    src={order.productDetails.cover_img}
                    alt={order.productDetails.title}
                    className="w-full h-48 object-cover rounded-lg mb-2"
                  />
                  <p className="font-semibold ">{order.productDetails.title}</p>
                  <p>Description: {order.productDetails.description}</p>
                  <p>Check-in: {order.checkInDate}</p>
                  <p>Check-out: {order.checkOutDate}</p>
                  <p>Name: {order.fullName}</p>
                  <p>Rooms: {order.numberOfRoom}</p>
                  <p>Phone: {order.phone}</p>
                  <p>Price: ₹{order.price}</p>
                  <p>Message: {order.message}</p>
                </div>
              )}
              {order.type === "cake" && order.productDetails && (
                <div>
                  <p className="font-bold text-lg">Cake Order</p>
                  <img
                    src={order.productDetails.cover_img}
                    alt={order.productDetails.title}
                    className="w-full h-48 object-cover rounded-lg mb-2"
                  />
                  <p className="font-semibold ">{order.productDetails.title}</p>
                  <p>Description: {order.productDetails.description}</p>
                  <p>Address: {order.address}</p>
                  <p>City: {order.city}</p>
                  <p>Name: {order.fullName}</p>
                  <p>Weight: {order.weight} KG </p>
                  <p>Phone: {order.phone}</p>
                  <p>Price: ₹{order.mainPrice}</p>
                  <p>Message: {order.message}</p>
                </div>
              )}
              <div className="flex justify-between mt-4">
                <button
                  className="px-4 py-2 bg-green-500 text-white rounded"
                  onClick={() => handleStatusUpdate(order.orderId, "delivered")}
                >
                  Delivered
                </button>
                <button
                  className="px-4 py-2 bg-red-500 text-white rounded"
                  onClick={() => handleStatusUpdate(order.orderId, "declined")}
                >
                  Decline
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default OrdersPage;
