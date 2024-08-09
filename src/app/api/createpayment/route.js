import { NextResponse } from "next/server";
import { Cashfree } from "cashfree-pg";

Cashfree.XClientId = process.env.CASHFREE_APP_ID;
Cashfree.XClientSecret = process.env.CASHFREE_SECRET_KEY;
Cashfree.XEnvironment = process.env.NEXT_PUBLIC_CASHFREE_TEST_URL;
// Cashfree.XClientId = process.env.CASHFREE_APP_ID2;
// Cashfree.XClientSecret = process.env.CASHFREE_SECRET_KEY2;
// Cashfree.XEnvironment = process.env.NEXT_PUBLIC_CASHFREE_PROD_URL;

export const POST = async (req) => {
  const { phone, name, amount } = await req.json();

  const request = {
    order_amount: amount,
    order_id: "AnshuPandey" + Date.now(),
    order_currency: "INR",
    customer_details: {
      customer_id: "anshu" + Date.now(),
      customer_phone: phone,
      customer_name: name,
    },
  };

  try {
    const response = await Cashfree.PGCreateOrder("2023-08-01", request);
    const resData = response.data;
    return NextResponse.json(resData);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    );
  }
};
