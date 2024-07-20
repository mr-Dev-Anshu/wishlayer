import React from "react";
import { EventsData } from "@/constant/EventsDecorationsData";
import headingimg from "@/assets/eventsheading.png";
import { offerData } from "@/constant/offerData";
import Explore from "../Explore";
import Category from "../Category";
const Room = () => {
  return (
    <div>
      <Explore
        headingImage={headingimg}
        title={"Room Stays"}
        data={EventsData}
      />

      <div>
        <Category data={offerData} title={"Choose by Event Location"} />
      </div>
    </div>
  );
};
export default Room;
