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
import { GiHamburgerMenu } from "react-icons/gi";

import { userContext } from "@/context/AuthContext";
import { getSession, logout } from "@/authThing/action";
import { FaUserCircle } from "react-icons/fa";

export default function TemporaryDrawer() {
  const [open, setOpen] = React.useState(false);
  const { userPhone } = React.useContext(userContext);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const handleLogOut = async () => {
    await logout();
  };
  const [phone, setPhone] = React.useState();

  React.useEffect(() => {
    const getPhone = async () => {
      const session = await getSession();
      setPhone(session?.phone);
    };
    getPhone();
  }, []);

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
          <ListItem  key={index} disablePadding>
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
        <Link href={"/login"}>
          <p className="cursor-pointer px-4 font-semibold">Login/Register</p>
        </Link>
      ) : (
        <p
          onClick={handleLogOut}
          className="mx-2 w-fit text-red-600 font-bold "
        >
          logout{" "}
        </p>
      )}
      <div className="flex gap-3 mt-2 items-center">
        {phone && (
          <p className="text-blue-500 flex px-4  items-center text-2xl gap-2">
            <Link href={"/previous_orders"}>
              <span>
                <FaUserCircle />
              </span>
            </Link>
          </p>
        )}
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


