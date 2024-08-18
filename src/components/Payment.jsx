"use client";
import { useContext, useEffect, useState } from "react";
import QRCode from "qrcode";
import Spinner from "@/components/Spinner";
import { filterContext } from "@/context/FilterContext";
import { FaTimes } from "react-icons/fa";
import { uploadImage } from "@/controller/upload";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/config/firebase.config";
import { useRouter } from "next/navigation";
import { Send_Email } from "@/controller/sendEmail";

const PaymentQRCode = ({ data }) => {
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [utr, setUtr] = useState("");
  const [ss, setSs] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const router = useRouter();

  const { setPaymentToggle, paymentToggle } = useContext(filterContext);

  if (!data) {
    return <Spinner />;
  } else {
    console.log(data);
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(null);
    setLoading(true);
    try {
      if (!utr) {
        setErrorMessage("Please Fill the Utr Number ");
        setLoading(false);
        return;
      }
      if (utr.trim().length !== 12) {
        setErrorMessage("Please Fill the valid  Utr Number ");
        setLoading(false);
        return;
      }

      data.utr = utr;
      let url;
      if (ss) {
        url = await uploadImage(ss);
      }
      data.screenShot = url;
      data.method = "Paid";
      setLoading(true);
      const docRef = await addDoc(collection(db, "orders"), data);
      await Send_Email(data);

      setLoading(false);
      router.push("/success");
    } catch (error) {
      console.error("Submission error:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    const upiLink = `upi://pay?pa=wishlayer@ybl&pn=wishlayer.com&am=${data.price}.00&cu=INR&tn=Order_${data.type}`;
    QRCode.toDataURL(upiLink)
      .then((url) => {
        setQrCodeUrl(url);
      })
      .catch((err) => {
        console.error("Failed to generate QR code:", err);
      });
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-6 px-4 sm:px-6 lg:px-8">
      <div className="bg-white border border-gray-200 rounded-lg shadow-lg py-6 px-4 w-full max-w-md">
        <p className="flex justify-end">
          <span
            className="cursor-pointer"
            onClick={() => setPaymentToggle(!paymentToggle)}
          >
            <FaTimes />
          </span>
        </p>
        <h1 className="text-2xl font-bold mb-4 text-center">Scan to Pay</h1>
        {qrCodeUrl ? (
          <div className="flex justify-center mb-4">
            <img
              src={qrCodeUrl}
              alt="Payment QR Code"
              className="w-64 h-64 object-contain"
            />
          </div>
        ) : (
          <p className="text-lg text-center">Generating QR Code...</p>
        )}

        <form className="space-y-4">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Please Enter The UTR Number or Transaction{" "}
              <span className="text-red-500">*</span>
            </label>
            <input
              onChange={(e) => setUtr(e.target.value)}
              type="text"
              placeholder="Enter The UTR Number or Transaction"
              className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#F06429] transition"
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Please Share the Screenshot of the Payment
            </label>
            <input
              onChange={(e) => setSs(e.target.files[0])}
              type="file"
              className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#F06429] transition"
            />
          </div>

          <button
            onClick={handleSubmit}
            type="submit"
            className="bg-[#F06429] hover:bg-[#d9551d] text-white font-bold py-2 px-4 rounded w-full transition"
          >
            {loading ? <Spinner /> : "Submit"}
          </button>
        </form>
        <p className="text-red-500"> {errorMessage} </p>
      </div>
    </div>
  );
};
export default PaymentQRCode;

// "use client";
// import { useState } from "react";
// import axios from "axios";
// import { load } from "@cashfreepayments/cashfree-js";

// function Payment() {
//   let cashfree;

//   // Initialize Cashfree SDK
//   let insitialzeSDK = async function () {
//     cashfree = await load({
//       mode: "sandbox", // Switch to "production" when deploying live
//     });
//   };

//   insitialzeSDK();

//   const paymentDetails = {
//     name: "Anshu Pandey",
//     phone: "1234567890",
//     amount: 2,
//   };

//   // Get session ID and update orderId in state
//   const getSessionId = async () => {
//     try {
//       let res = await axios.post(
//         "http://localhost:3000/api/createpayment",
//         paymentDetails
//       );
//       if (res.data && res.data.payment_session_id) {
//         console.log(res.data);

//         return {
//           sessionId: res.data.payment_session_id,
//           orderId: res.data.order_id,
//         };
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   // Verify payment using the orderId from state
//   const verifyPayment = async (orderId) => {
//     try {
//       let res = await axios.post("http://localhost:3000/api/verifypayment", {
//         orderId: orderId,
//       });
//       if (res && res.data) {
//         console.log(res);
//         alert("payment verified");
//       }

//       console.log("Verification response: ", res.data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   // Handle payment button click
//   const handleClick = async (e) => {
//     e.preventDefault();
//     try {
//       let { sessionId, orderId } = await getSessionId();
//       let checkoutOptions = {
//         paymentSessionId: sessionId,
//         redirectTarget: "_modal",
//       };

//       cashfree.checkout(checkoutOptions).then((res) => {
//         console.log("payment initialized");
//         verifyPayment(orderId);
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <>
//       <div className="">

//           <button onClick={handleClick}>
//             Pay now
//           </button>

//       </div>
//     </>
//   );
// }

// export default Payment;
