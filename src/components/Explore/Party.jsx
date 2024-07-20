import React from "react";
import { EventsData } from "@/constant/EventsDecorationsData";
import headingimg from "@/assets/eventsheading.png";
import { offerData } from "@/constant/offerData";
import Explore from "../Explore";
import Category from "../Category";
const Party = () => {
  return (
    <div>
      <Explore
        headingImage={headingimg}
        title={"Explore Party Venue"}
        data={EventsData}
      />

      <div>
        <Category data={offerData} title={'Choose by Event Location '} />
      </div>
    </div>
  );
};
export default Party;