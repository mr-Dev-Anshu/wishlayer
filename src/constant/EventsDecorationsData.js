import events1 from "@/assets/events1.jpeg";
import events2 from "@/assets/events2.png";
import events3 from "@/assets/events3.jpeg";
import events4 from "@/assets/events4.png";
import events5 from "@/assets/events5.png";
import events6 from "@/assets/events6.png";

export const EventsData = [
  {
    id: 1,
    title: "Classic Chocolate Events",
    description: "A rich and moist chocolate events with a decadent frosting.",
    price: 29.99,
    discount: "15%", // Optional
    img: events1,
    rating: 3,
    type: "room"
  },
  {
    id: 2,
    title: "Strawberry Shortevents",
    description: "Layers of fluffy sponge events with fresh strawberries and cream.",
    price: 34.99,
    discount: "10%", // Optional
    img: events2,
    rating: 3,
    type: "room"
  },
  {
    id: 3,
    title: "Red Velvet Events",
    description: "A moist red velvet events with cream cheese frosting.",
    price: 39.99,
    discount: "20%", // Optional
    img: events3,
    rating: 3,
    type: "room"
  },
  {
    id: 4,
    title: "Lemon Drizzle Events",
    description: "A zesty lemon events with a tangy glaze.",
    price: 24.99,
    discount: null, // Optional
    img: events4,
    rating: 3,
    type: "room"
  },
  {
    id: 5,
    title: "Carrot Events",
    description: "A spiced carrot events with walnuts and cream cheese frosting.",
    price: 32.99,
    discount: "5%", // Optional
    img: events5,
    rating: 3,
    type: "room"
  },
  {
    id: 6, // Corrected id to be unique
    title: "Carrot Events",
    description: "A spiced carrot events with walnuts and cream cheese frosting.",
    price: 32.99,
    discount: "5%", // Optional
    img: events6,
    rating: 3,
    type: "room"
  },
];
