const GuestDetails = () => {
    return (
        <div>
            <p className="text-[#F06429] pt-2">Enter Guest Details</p>
            <form className="bg-[#FFF3EE]">
            <div className="flex flex-col pl-6 py-2 pr-16">
                    <label htmlFor="first_name" className="py-2">
                        First Name
                    </label>
                    <input type="text" id="first_name" className="rounded-md p-2" />
                </div>
                <div className="flex flex-col pl-6 py-2 pr-16">
                    <label htmlFor="first_name">
                        Phone Number
                    </label>
                    <input type="text" id="first_name" className="rounded-md p-2" />
                </div>
                <div className="flex flex-col pl-6 py-2 pr-16">
                    <label htmlFor="first_name">
                        Your Preferred Timings 
                    </label>
                    <input type="text" id="first_name" className="rounded-md p-2" />
                </div>
                <div className="flex flex-col pl-6 py-2 pr-16 pb-16">
                    <label htmlFor="first_name">
                        Any Special Request 
                    </label>
                    <input type="text" id="first_name" className="rounded-md p-2 h-20" />
                </div>           
            </form>
            <div className="flex justify-end">
                    <button className="bg-[#F06429] rounded-md  text-white p-2 mt-6 ">Reserve Now</button>
            </div>
            
        </div>
    )
}

export default GuestDetails