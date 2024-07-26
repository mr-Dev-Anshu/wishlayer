// components/layouts/AdminLayout.js
import React from "react";
import Head from "next/head";

import Sidebar from "@/components/admin/Sidebar";
import { redirect } from "next/navigation";
import { getSession } from "@/authThing/action";
const AdminLayout = async ({ children }) => {
  const session = await getSession();
  if (!session.phone) {

    redirect("/");

  }

  if(session.phone!=='1234567890') {
     redirect('/') ; 
  }
  return (
    <>
      <Head>
        <title>Admin Dashboard</title>
      </Head>
      <div className="flex h-screen">
        <div className="md:w-[20%]">
          <Sidebar />
        </div>
        <div className=" md:px-10 md:w-[80%]">{children}</div>
      </div>
    </>
  );
};

export default AdminLayout;
