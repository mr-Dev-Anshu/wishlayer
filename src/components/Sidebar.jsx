"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { NavList } from "@/constant/NavList";
import Link from "next/link";
import { GiCupcake, GiHamburgerMenu } from "react-icons/gi";
import { CiHeart } from "react-icons/ci";
import { userContext } from "@/context/AuthContext";
import { logout } from "@/authThing/action";

export default function TemporaryDrawer() {
  const [open, setOpen] = React.useState(false);
  const { userPhone } = React.useContext(userContext);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const handleLogOut = async () => {
    await logout();
  };

  React.useEffect(() => {
    console.log(userPhone, "this is from Sidebar ");
  }, []);

  const DrawerList = (
    <Box
      className="py-6"
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
    >
      <List>
        {NavList.map((item, index) => (
          <ListItem key={index} disablePadding>
            <Link href={item.to}>
              {" "}
              <ListItemButton>
                <ListItemText primary={item.title} />
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>
      {!userPhone ? (
        <Link href={'/login'}>
        <p className="cursor-pointer">Login/Register</p>
      </Link>
      ) : (
        <p onClick={handleLogOut} className="mx-2 w-fit">
          Log Out{" "}
        </p>
      )}
      <div className="flex gap-3 mt-2 items-center">
        <p className="text-red-500 flex  px-2 items-center text-2xl gap-2">
          <span>
            <CiHeart />
          </span>
          <span>
            <GiCupcake />
          </span>
        </p>
      </div>
    </Box>
  );

  return (
    <div>
      <button onClick={toggleDrawer(true)}>
        <GiHamburgerMenu size={30} />
      </button>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
}
