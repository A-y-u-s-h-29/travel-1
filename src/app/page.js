import Example from "./user/components/Example";
import GroupOfferSection from "./user/components/GroupOfferSection";
import HeroPage from "./user/components/HeroPage";
import MeetGuideSection from "./user/components/MeetGuideSection";

import PopularDestinations from "./user/components/Packages";
import PopupEnquiry from "./user/components/PopupEnquiry";
import Review from "./user/components/Review";
import SliderPage from "./user/components/SliderPage";
import ExperienceSection from "./user/components/Stats";
import GalleryPage from "./user/components/TopDestinations";

export default function Home() {
  return (
    <div className="bg-white">
    <h1 className="">
   
      <HeroPage/>
      <SliderPage/>
      <ExperienceSection/>
      <PopularDestinations/>
      <GalleryPage/>
      <Example/>
      <MeetGuideSection/>
       <GroupOfferSection/>
      <Review/>
     

      <PopupEnquiry/>
    </h1>
    </div>
  );
}