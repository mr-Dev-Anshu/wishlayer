import cake1 from "@/assets/cake1.png";
import cake2 from "@/assets/cake2.png";
import cake3 from "@/assets/cake3.png";
import cake4 from "@/assets/cake4.png";
import cake5 from "@/assets/cake5.png";
import cake6 from "@/assets/cake6.png";

export const CakeData = [
  {
    id: 1,
    title: "Classic Chocolate Cake",
    description: "A rich and moist chocolate cake with a decadent frosting.",
    price: 29.99,
    discount: "15%", // Optional
    img: cake1,
    type: "cake"
  },
  {
    id: 2,
    title: "Strawberry Shortcake",
    description: "Layers of fluffy sponge cake with fresh strawberries and cream.",
    price: 34.99,
    discount: "10%", // Optional
    img: cake2,
    type: "cake"
  },
  {
    id: 3,
    title: "Red Velvet Cake",
    description: "A moist red velvet cake with cream cheese frosting.",
    price: 39.99,
    discount: "20%", // Optional
    img: cake3,
    type: "cake"
  },
  {
    id: 4,
    title: "Lemon Drizzle Cake",
    description: "A zesty lemon cake with a tangy glaze.",
    price: 24.99,
    discount: null, // Optional
    img: cake4,
    type: "cake"
  },
  {
    id: 5,
    title: "Carrot Cake",
    description: "A spiced carrot cake with walnuts and cream cheese frosting.",
    price: 32.99,
    discount: "5%", // Optional
    img: cake5,
    type: "cake"
  },
  {
    id: 6, // Corrected id to be unique
    title: "Carrot Cake",
    description: "A spiced carrot cake with walnuts and cream cheese frosting.",
    price: 32.99,
    discount: "5%", // Optional
    img: cake6,
    type: "cake"
  },
];
