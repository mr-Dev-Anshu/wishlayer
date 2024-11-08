import emailjs from "emailjs-com";

export const Send_Email = async (data) => {
  console.log(data);
  const emailData = {
    to_name: "Admin",
    from_name: "Wishlayer",
    utr: data.utr || "N/A",
    screenshot_url: data.screenShot || "N/A",
    name: data.name || data.fullName || "N/A",
    paid_status: data.method || "Cash on Delivery",
    price: `₹${data.price}.00 INR`,
    product_type: data.type || "N/A",
    product_title: data.title || "N/A",
    product_page_url: "https://www.wishlayer.com/admin/orders" || "N/A", // Ensure this is a complete URL
    see_product_url: `https://www.wishlayer.com/${data.type}?id=${data.id}`, // Use the correct key
    see_product: `See Product`, // This will be the link text
    message: `A new order has been placed. You can review it here: https://www.wishlayer.com/admin/orders`,
    phone_number: data.phone || "N/A",
    address: data.address,
    user_message: data.message,
  };

  await emailjs.send(
    "service_sj8774p",
    "template_cno2aha",
    emailData,
    "yU3FZndr9lP_iraqt"
  );
};
