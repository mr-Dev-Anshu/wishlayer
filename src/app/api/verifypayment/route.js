import { Cashfree } from "cashfree-pg";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  try {
    Cashfree.XClientId = process.env.CASHFREE_APP_ID;
    Cashfree.XClientSecret = process.env.CASHFREE_SECRET_KEY;
    Cashfree.XEnvironment = process.env.NEXT_PUBLIC_CASHFREE_TEST_URL;
    // Cashfree.XClientId = process.env.CASHFREE_APP_ID2;
    // Cashfree.XClientSecret = process.env.CASHFREE_SECRET_KEY2;
    // Cashfree.XEnvironment = process.env.NEXT_PUBLIC_CASHFREE_PORD_URL;
    const { orderId } = await req.json();
    console.log("This is order data:", orderId);
    const res = await Cashfree.PGOrderFetchPayments("2023-08-01", orderId);
    console.log("Response from payment verify  data:", res.data);
    return NextResponse.json(res.data);
  } catch (error) {
    console.error("Error while verifying the payment:", error);
    return NextResponse.json({
      status: 500,
      message: "Error while verifying the Payment: " + error.message,
    });
  }
};