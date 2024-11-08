import { FaStar, FaTimes } from "react-icons/fa";
import img1 from "@/assets/menu1.png";
import img2 from "@/assets/menu2.png";
import flag from "@/assets/flag.webp";
import { AboutContent } from "@/constant/AboutContent";
import Image from "next/image";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/config/firebase.config";
import { getCurrentTime } from "@/controller/Time";
import { Send_Email } from "@/controller/sendEmail";

const VenueInfo = ({ id, data }) => {
  console.log(id);
  console.log(data);
  const [menuImage, setMenuImage] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [eventDate, setEventDate] = useState("");
  const [eventType, setEventType] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [numberOfGuest, setNumberOfGuest] = useState("");
  const [fullName, setFullName] = useState("");
  const [eventArrivalTime, setEventArrivalTime] = useState();
  const [menu, setMenu] = useState();
  const [isExpend, setIsExpend] = useState(false);
  const handleMenuImage = (img) => {
    setMenuImage(img);
  };

  const isNullOrWhitespace = (input) => {
    return !input || input.trim().length === 0;
  };

  useEffect(() => {
    const getMenuData = async () => {
      let menuData;
      if (id) {
        const q = query(collection(db, "menu"), where("productId", "==", id));
        const menuDataSnap = await getDocs(q);
        menuDataSnap.forEach((doc) => {
          menuData = { id: doc.id, ...doc.data() };
        });
      }
      console.log(menuData?.urls);
      setMenu(menuData?.urls);
    };
    getMenuData();
  }, []);

  const handleOrder = async (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Loading...",
      text: "Please wait while we process your request.",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    const venueData = {
      eventDate,
      eventType,
      phone,
      fullName,
      message: message || "No Message Provided ",
      id,
      eventArrivalTime,
      numberOfGuest,
      type: "venue",
    };
    if (
      isNullOrWhitespace(venueData.eventDate) ||
      isNullOrWhitespace(venueData.eventType) ||
      isNullOrWhitespace(venueData.phone) ||
      isNullOrWhitespace(venueData.fullName) ||
      isNullOrWhitespace(venueData.id) ||
      isNullOrWhitespace(venueData.numberOfGuest) ||
      isNullOrWhitespace(venueData.eventArrivalTime) ||
      isNullOrWhitespace(venueData.type)
    ) {
      Swal.fire({
        title: "Error!",
        text: "All fields are required.",
        icon: "error",
      });
      return;
    }
    console.log(venueData);
    venueData.time = getCurrentTime();
    try {
      const docRef = await addDoc(collection(db, "orders"), venueData);
      console.log(docRef);
      Swal.fire({
        title: "Good job!",
        text: "Your Party Venue  is Booked now ! ",
        icon: "success",
      });
      await Send_Email(venueData);
      setIsFormOpen(!isFormOpen);
    } catch (error) {
      console.log(error);
    }
  };
  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return (
    <>
      <div className="flex flex-col lg:flex-row p-4 lg:p-10">
        <div className="w-full lg:w-[620px] mb-6 lg:mb-0">
          <p></p>
        </div>
        <div className="p-2 w-full lg:w-auto">
          <div>
            <p className="text-xl font-medium">{data?.title}</p>

            <hr />
          </div>
          <div className="flex flex-col lg:flex-row py-3 pt-10">
            <div className="flex flex-col border-2 p-2 w-full lg:w-[280px] border-[#F06429] rounded-t-md lg:rounded-s-md lg:rounded-t-none">
              <label htmlFor="event_date" className="text-[#F06429] px-2">
                Choose Event Date
              </label>
              <input
                onChange={(e) => setEventDate(e.target.value)}
                type="date"
                id="event_date"
                className="px-2 focus:outline-none"
                min={getTodayDate()}
              />
            </div>
            <div className="flex flex-col border-2 p-2 w-full lg:w-[280px] border-[#F06429] lg:border-t-none lg:border-l-0 rounded-b-md lg:rounded-e-md lg:rounded-b-none">
              <label htmlFor="event_type" className="text-[#F06429] px-2">
                Choose Event Type
              </label>
              <select
                onChange={(e) => setEventType(e.target.value)}
                id="event_type"
                className="px-2 focus:outline-none"
              >
                <option value="">Select an option</option>
                {[
                  "Birthday Party",
                  "Corporate Party",
                  "Bachelor Party",
                  "Farewell Party",
                  "Candle light Dinner-Couples",
                ].map((item, index) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex flex-col border-2 p-2 w-full mb-4 lg:w-[280px] border-[#F06429] rounded-t-md lg:rounded-s-md lg:rounded-t-none">
            <label htmlFor="event_date" className="text-[#F06429] px-2">
              Choose Event Arrival time
            </label>
            <input
              onChange={(e) => setEventArrivalTime(e.target.value)}
              type="time"
              id="event_date"
              className="px-2 focus:outline-none"
            />
          </div>
          <div>
            <div
              onClick={() => setIsFormOpen(!isFormOpen)}
              className="bg-[#F06429] text-white flex justify-center items-center py-2 rounded-md cursor-pointer hover:bg-[#853513]"
            >
              Reserve Now
            </div>
          </div>
          <div className="border-2 border-[#F06429] rounded-md mt-6 ">
            <p className="border-b-2 border-[#F06429] text-[#F06429] px-6 py-2">
              Menu Cards
            </p>
            <div className="flex gap-3 overflow-x-scroll flex-nowrap p-6">
              {menu?.length > 0 &&
                menu?.map((item, index) => (
                  <Image
                    onClick={() => handleMenuImage(item)}
                    width={120}
                    src={item}
                    alt="Food Menu"
                    height={120}
                    className="cursor-pointer"
                  />
                ))}
            </div>
          </div>
          {isExpend ? (
            <div>
              {data?.description}{" "}
              <span
                onClick={() => setIsExpend(!isExpend)}
                className="text-red-600 cursor-pointer"
              >
                show less{" "}
              </span>
            </div>
          ) : (
            <div>
              {data?.description?.substring(0, 100)} ...{" "}
              <span
                onClick={() => setIsExpend(!isExpend)}
                className="text-red-600 cursor-pointer"
              >
                read more
              </span>
            </div>
          )}
          
        </div>
        {isFormOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
              <h2 className="text-xl mb-4">For Order Please Fill this form</h2>
              <form>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Full Name
                  </label>
                  <input
                    onChange={(e) => setFullName(e.target.value)}
                    type="text"
                    placeholder="Enter your full Name"
                    className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-none"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Number of Guests
                  </label>
                  <input
                    onChange={(e) => setNumberOfGuest(e.target.value)}
                    type="number"
                    placeholder="Enter Number of Guests"
                    className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Phone Number
                  </label>
                  <div className="grid grid-cols-5 items-center">
                    <div className="col-span-1 border border-gray-400 md:py-3 py-2 px-1 flex gap-2">
                      <Image
                        className="rounded-md"
                        src={flag}
                        width={20}
                        height={20}
                        alt="Flag"
                      />
                      <span>+91</span>
                    </div>
                    <div className="col-span-4">
                      <input
                        onChange={(e) => setPhone(e.target.value)}
                        name="phone"
                        placeholder="Enter Phone Number"
                        type="number"
                        className="w-full md:p-3 p-2 focus:outline-none rounded-md border border-gray-400"
                      />
                    </div>
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Message
                  </label>
                  <textarea
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-none"
                    rows="4"
                    placeholder="Enter Message Here"
                  ></textarea>
                </div>
                <button
                  onClick={handleOrder}
                  type="submit"
                  className="bg-[#F06429] hover:bg-[#d9551d] text-white font-bold py-2 px-4 rounded mr-2"
                >
                  Reserve Now
                </button>
                <button
                  type="button"
                  onClick={() => setIsFormOpen(!isFormOpen)}
                  className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                >
                  Cancel
                </button>
              </form>
            </div>
          </div>
        )}

        {menuImage && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
            <button
              className="absolute top-4 right-4 text-white text-2xl"
              onClick={() => setMenuImage(null)}
            >
              <FaTimes />
            </button>
            <Image
              className="rounded-md"
              src={menuImage}
              width={400}
              height={400}
              alt="Menu"
            />
          </div>
        )}
      </div>
    </>
  );
};
export default VenueInfo;
