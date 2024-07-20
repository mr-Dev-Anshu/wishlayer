import CakeExplore from "@/components/CakeExplore";
import Hero from "@/components/Hero";
import OfferPage from "@/components/OfferPage";
import EventsDecoration from "@/components/EventsDecoration";
import Ads from "@/components/Ads";
import Party from "@/components/Explore/Party";
import Room from "@/components/Explore/Room";
import ImageFooter from "@/components/Footer/ImageFooter";
import Footer from "@/components/Footer/Footer";
export default function Home() {
  return (
    <div>
      <Hero />
      <OfferPage />
      <CakeExplore />
      <EventsDecoration />
      <Ads />
      <Party /> 
      <Room/>
     <Footer/>
    </div>
  );
}
