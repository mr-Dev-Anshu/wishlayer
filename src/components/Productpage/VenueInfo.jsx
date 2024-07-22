import { FaStar } from "react-icons/fa";
import GuestDetails from "./GuestDetails";
import img1 from "../assests/image 45.png"
import img2 from "../assests/image 46.png"
import { AboutContent } from "../constants/AboutContent";
const VenueInfo = () => {
    return (
        <div className="flex p-10">
            <div className="w-[620px]">
                <p></p>
            </div>
            <div className="p-2">
                <div className="">
                    <p className="text-xl font-medium">Party Hall Comfort Inn</p>
                    <p className="flex text-xs pb-2">
                        4.9 <span className="px-2 text-yellow-500 py-0.5"><FaStar /></span> (2025)
                    </p>
                    <hr />
                </div>
                <div className="flex py-3 pt-10">
                    <div className="flex flex-col border-2 p-2 w-[280px] border-[#F06429] rounded-s-md ">
                        <label htmlFor="event_date" className="text-[#F06429] px-2">Choose Event Date</label>
                        <input type="date" id="event_date" className=" px-2" />
                    </div>
                    <div className="flex flex-col border-2 p-2 w-[280px] border-[#F06429] border-l-0 rounded-e-md">
                        <label htmlFor="event_type" className="text-[#F06429] px-2">Choose Event Type</label>
                        <select id="event_type" className="px-2">
                            <option value="" disabled>
                                Select an option
                            </option>
                            <option value="option1">option 1</option>
                            <option value="option2">option 2</option>
                        </select>
                    </div>
                </div>
                <div>
                    <div className="flex flex-col border-2 border-[#F06429] rounded-md">
                        <label htmlFor="no_of_guests" className="text-[#F06429] px-4 pt-2">
                            Number of Guests
                        </label>
                        <p className="px-4 pb-2">8 guests</p>
                    </div>
                </div>
                <div>
                    <GuestDetails />
                </div>
                <div className="border-2 border-[#F06429] rounded-md mt-6">
                    <p className=" border-b-2 border-[#F06429] text-[#F06429] px-6 py-2">Menu Cards</p>
                    <div className="flex p-6">
                        <div className="mr-6">
                            <img src={img1} alt="" />
                            <p className="text-white bg-[#F06429] px-2">Food Menu</p>
                        </div>
                        <div>
                            <img src={img2} alt="" />
                            <p className="text-white bg-[#F06429] px-2">Bar Menu</p>
                        </div>
                    </div>
                </div>
                <div className="border-2 border-[#F06429] rounded-md mt-6">
                    <p className=" border-b-2 border-[#F06429] px-6 py-2">About</p>
                    <div className="p-6 grid grid-cols-3">   {AboutContent.map((items, index) => {
                        return (
                            <div className="flex p-4">
                                <p className="pr-4 p-1">{items.icon}</p>
                                <p>{items.title}</p>
                            </div>
                        )
                    }
                    )}
                    </div>
                </div>
            </div>

        </div>
    );
};

export default VenueInfo;
