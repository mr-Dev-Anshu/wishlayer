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
];
 
   
    getSession().then((session)=> {
      console.log("this is session" , session)
      console.log(process.env.ADMIN_PHONE) ; 
        if(session.phone==='1234567890')  {
            NavList.push({
              title:"Admin" , 
              to:"/admin"
            })
        }
    })
 

export { NavList };
