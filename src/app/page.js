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
import UploadCake from "@/components/UploadCake";
import AboutUsPage from "@/components/About";
import Link from "next/link";
import Decoration from "@/components/Explore/Decoration";
export default function Home() {
  return (
    <>
      <Link href={"allproducts"}>
        <Hero
          image={
            "https://firebasestorage.googleapis.com/v0/b/news-f534b.appspot.com/o/hero.png?alt=media&token=ca07f37d-7331-433b-96e5-012b2a82da2a"
          }
          height={400}
          weight={800}
          autoPlay={true}
        />
      </Link>

      <div className="space-y-12">
        <OfferPage />
        <Cake />
        <Decoration/>
        <UploadCake />
        <Ads />
        <Party />
        <Room />
      </div>

      <div className="bg-[#FFE7DD] py-10 my-12">
        <p className="md:text-xl font-semibold text-center pb-4">
          {" "}
          Create Experience with{" "}
          <span className="text-[#F06429]">Top Lucknow nawabi's</span>{" "}
          Activities{" "}
        </p>
        <CardSlider images={LocationData} />
      </div>
      <CoupanList />

      <AboutUsPage />

      {/* <EventsDecoration />
       */}
    </>
  );
}
