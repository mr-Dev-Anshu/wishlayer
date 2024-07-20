import React from "react";
import Explore from "./Explore";
import { EventsData } from "@/constant/EventsDecorationsData";
import headingimg from "@/assets/eventsheading.png";
import Category from "./Category";
import { offerData } from "@/constant/offerData";
const EventsDecoration = () => {
  return (
    <div>
      <Explore
        headingImage={headingimg}
        title={"Get Event Decoration"}
        data={EventsData}
      />

      <div>
        <Category data={offerData} title={'Choose by Event Category'} />
      </div>
    </div>
  );
};
export default EventsDecoration;