const GuestDetails = () => {
  return (
    <div className="px-4 py-6 md:px-10 md:py-8">
      <p className="text-[#F06429] pt-2">Enter Guest Details</p>
      <form className="bg-[#FFF3EE] p-4 md:p-6 rounded-md">
        <div className="flex flex-col md:flex-row md:gap-4 mb-4">
          <div className="flex flex-col md:w-1/2 mb-4 md:mb-0">
            <label htmlFor="num_guests" className="py-2">
              Number of Guests
            </label>
            <input
              placeholder="Enter Number of Guests"
              type="number"
              id="num_guests"
              className="rounded-md p-2 focus:outline-none border border-gray-300"
            />
          </div>
          <div className="flex flex-col md:w-1/2">
            <label htmlFor="first_name" className="py-2">
              First Name
            </label>
            <input
              placeholder="Enter First Name"
              type="text"
              id="first_name"
              className="rounded-md p-2 focus:outline-none border border-gray-300"
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row md:gap-4 mb-4">
          <div className="flex flex-col md:w-1/2 mb-4 md:mb-0">
            <label htmlFor="phone_number" className="py-2">
              Phone Number
            </label>
            <input
              placeholder="Enter Phone Number"
              type="text"
              id="phone_number"
              className="rounded-md p-2 focus:outline-none border border-gray-300"
            />
          </div>
          <div className="flex flex-col md:w-1/2">
            <label htmlFor="preferred_timings" className="py-2">
              Your Preferred Timings
            </label>
            <input
              placeholder="Enter Your Preferred Timings"
              type="text"
              id="preferred_timings"
              className="rounded-md p-2 focus:outline-none border border-gray-300"
            />
          </div>
        </div>
        <div className="flex flex-col mb-4">
          <label htmlFor="special_request" className="py-2">
            Any Special Request
          </label>
          <input
            placeholder="Enter any Special Request"
            type="text"
            id="special_request"
            className="rounded-md p-2 h-20 focus:outline-none border border-gray-300"
          />
        </div>
      </form>
      <div className="flex justify-center md:justify-end mt-4">
        <button className="bg-[#F06429] rounded-md text-white p-2 w-full md:w-auto">
          Reserve Now
        </button>
      </div>
    </div>
  );
};
export default GuestDetails;
