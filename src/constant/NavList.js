import { getSession } from "@/authThing/action";

const NavList = [
  {
    title: "Home",
    to: "/",
  },

  {
    title: "Shop",
    to: "/allproducts",
  },

  {
    title: "Wishlist",
    to: "/wishlist",
  },
  {
    title: "Cart",
    to: "/cart",
  },
  {
    title: "Admin",
    to: "/admin",
  },
];

export { NavList };
