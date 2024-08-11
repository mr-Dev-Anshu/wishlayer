import { db } from "@/config/firebase.config";
import { addDoc, collection } from "firebase/firestore";

export const handleAddToCart = async (data) => {
  try {
    const cartRef = collection(db, "cart");
    await addDoc(cartRef, {
      ...data,
    });
    console.log("Product added to cart");
  } catch (error) {
    console.error("Error adding product to cart: ", error);
  }
};
