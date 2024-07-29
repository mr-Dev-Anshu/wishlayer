import CakeExplore from "@/components/CakeExplore";
import Hero from "@/components/Hero";
import OfferPage from "@/components/OfferPage";
import EventsDecoration from "@/components/EventsDecoration";
import Ads from "@/components/Ads";
import Party from "@/components/Explore/Party";
import Room from "@/components/Explore/Room";
import Cake from "@/components/Explore/Cake";
import CoupanList from "@/components/coupan/CupanList";
import CardSlider from "@/components/location/CardSlider";
import { LocationData } from "@/constant/Location";
export default function Home() {
  return (
    <div>
      <Hero
        image={
          "https://firebasestorage.googleapis.com/v0/b/news-f534b.appspot.com/o/hero.png?alt=media&token=ca07f37d-7331-433b-96e5-012b2a82da2a"
        }
        height={400}
        weight={800}
        autoPlay={true}
      />
      <OfferPage />
      <Cake />
      <Ads />
      <Party />
      <Room />
      <div className="bg-[#FFE7DD] py-10 ">
        <p className="md:text-xl font-semibold text-center">
          {" "}
          Create Experience with{" "}
          <span className="text-[#F06429] pb-2">Top Lucknow nawabi's</span>{" "}
          Activities{" "}
        </p>
        <CardSlider images={LocationData} />
      </div>
      <CoupanList />

      {/* <EventsDecoration />
       */}
    </div>
  );
}
