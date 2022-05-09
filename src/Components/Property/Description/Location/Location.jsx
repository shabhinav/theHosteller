import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useWindowSize } from "../../../../Utils/utils";
import CustomTabPanel from "../../../Common/TabPanel/TabPanel";
import "./Location.scss";

let panel = [
  {
    name: "About City",
    description: "",
  },
  {
    name: "Location Map",
    description:
      "An adventurous spirit is never satisfied with meagre travel experiences. When one has a desire to travel for experience and learn about the varied cultures and rich history the world has to offer, they will not be able to stop at one destination and forbid themselves to explore the surroundings. And India has uncountable cultural experiences to offer. We have some of the oldest civilizations of the entire world and archives full of vibrant, brutal and invigorating historical happenings. One such city that offers these precious peeks into the past is Jaipur. But this blog is not about Jaipur. This blog is for the travellers whose thirst for exploration cannot be stopped at a base city. After all, when in Jaipur – why not experience the glamorous royal heritage and picturesque beauty of all the places to visit near Jaipur? Here are 5 amazing plans for a road trip from Jaipur to elate the innate explorer in you. Famous for the Pushkar camel fair, this holy city is a pilgrimage site for millions across the country. The sacred shores of the Pushkar lake and the numerous artistically built temples provide religious relief to many, making it one of the places to visit near Jaipur with the heaviest footfall. The Brahma temple is the most well known Brahma temple in all of India and is said to be at least 2000 years old. A very tragic yet interesting thing about Pushkar’s temples is that most of them were destroyed by Muslim conquests in and around the area. These temples were then partially or fully rebuilt by Hindu rulers years later.Being one of the oldest known cities in India, Pushkar has an air of mystic calmness and devotion surrounding it. Out of respect – alcohol, meat and eggs are prohibited in the entire city. If you are looking for a road trip from Jaipur that will stir something within your own faith, then Pushkar is the place to be. And if you are around town during the late October/early November period, then you must visit the grand Pushkar camel fair. It is India’s biggest cattle festival and a true melting pot of Rajasthani food, culture and people. Ghosthunting may have been made popular by Ghostbusters but the adrenaline rush of being on the hunt of a supernatural being is an ancient attraction. And for many seeking the magnetic forces of the paranormal, Bhangarh Fort is a lucrative road trip from Jaipur.Built in the 17th century this fort complex is shrouded in ghost stories of babies crying, women screaming, noises of drums, ladies dressed in white and several ghostly orbs and shadows. Legend says that when Princess Ratnavati of Bhangarh saw through a sorcerer’s ploy to slip her a love potion, it resulted in his death. Before his death, he cursed the entire town and soon the Mughals conquered Bhangarh and killed everyone living in it – even the Princess. Ever since then their souls roam around the vicinity in unrest.",
  },
];

function Location({ locationUrl }) {
  const state = useSelector((state) => state);
  const [innerWidth] = useWindowSize();
  const isMobile = innerWidth < 650;

  useEffect(() => {
    if (state?.search?.searchedHostelDetails?.getHostelDetails?.cityInfo) {
      panel[0].description =
        state?.search?.searchedHostelDetails?.getHostelDetails?.cityInfo;
    }
  }, [state?.search?.searchedHostelDetails?.getHostelDetails?.cityInfo]);

  return (
    <div
      id={`${isMobile ? "" : "location"}`}
      className='mt-10 location_container'
    >
      <CustomTabPanel locationUrl={locationUrl} tabPanel={panel} />
    </div>
  );
}

export default Location;
