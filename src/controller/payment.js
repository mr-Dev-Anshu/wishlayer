import axios from "axios";
import { load } from "@cashfreepayments/cashfree-js";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/config/firebase.config";

export async function initializePayment(data) {
  let cashfree = await load({
    mode: "sandbox",
  });

  const paymentDetails = {
    name: data.fullName,
    phone: data.phone,
    amount: data.price,
  };
  console.log("this is payment details ", paymentDetails);
  async function getSessionId() {
    try {
      let res = await axios.post(
        "http://localhost:3000/api/createpayment",
        paymentDetails
      );
      if (res.data && res.data.payment_session_id) {
        console.log(res.data);
        return {
          sessionId: res.data.payment_session_id,
          orderId: res.data.order_id,
        };
      }
    } catch (error) {
      console.error("Error getting session ID:", error);
    }
  }

  // Function to verify payment using the order ID
  async function verifyPayment(orderId) {
    try {
      let res = await axios.post("http://localhost:3000/api/verifypayment", {
        orderId: orderId,
      });
      if (res && res.data) {
        console.log("Verification response:", res.data);
        console.log("this is order data ", data);
        const docRef = await addDoc(collection(db, "orders"), data);
        console.log("Data is saved ")
      }
    } catch (error) {
      console.error("Error verifying payment:", error);
    }
  }

  async function handlePayment() {
    try {
      let { sessionId, orderId } = await getSessionId();
      let checkoutOptions = {
        paymentSessionId: sessionId,
        redirectTarget: "_modal",
      };

      cashfree.checkout(checkoutOptions).then(() => {
        console.log("Payment initialized");
        verifyPayment(orderId);
      });
    } catch (error) {
      console.error("Error handling payment:", error);
    }
  }

  await handlePayment();
}
