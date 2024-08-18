import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer/Footer";
import { AuthContextProvider } from "@/context/AuthContext";
import { getSession } from "@/authThing/action";
import FilterContextProvider from "@/context/FilterContext";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Wish Layer",
  description: "",
};

export default async function RootLayout({ children }) {
  const session = await getSession();
  if (session.phone) {
    const phone = session.phone;
    console.log(phone);
  }

  return (
    <html lang="en">
      <AuthContextProvider>
        <FilterContextProvider>
          <body className={inter.className}>
            <div className="hidden md:block">
              <Header />
            </div>
            <div className="block md:hidden">
              <Navbar />
            </div>
            {children}
            <div>{session.phone !== "1234567890" && <Footer />}</div>
          </body>
        </FilterContextProvider>
      </AuthContextProvider>
    </html>
  );
}
