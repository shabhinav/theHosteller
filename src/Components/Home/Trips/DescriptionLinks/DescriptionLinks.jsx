import React, { useState } from "react";
import "./DescriptionLinks.scss";
import Overview from "../Overview/Overview";
import Gallery from "../Gallery/Gallery";
import Itinerary from "../Itinerary/Itinerary";
import Includes from "../Includes/Includes";
import Cancellations from "../Cancellation/Cancellation";
import Reviews from "../Reviews/Reviews";
import Map from "../Map/Map";

const links = [
  "Overview",
  "Photos",
  "Itinerary",
  "Inclusion/Exclusion",
  "Policies",
  "Reviews",
  "FAQs",
];

function DescriptionLinks({ tripData }) {
  const [selectedTab, setSelectedTab] = useState("Overview");
  return (
    <div>
      <div className='view_container trip_desc_links z-10 flex pt-6 xs:overflow-x-auto	xs:pt-4 sticky xs:top-0 xl:top-20 2xl:top-20 bg-white'>
        {links.map((item) => (
          <p
            onClick={() => setSelectedTab(item)}
            className={`mx-3 trips_desc_links font-semibold text-orange pb-2 text-base ${
              selectedTab === item ? "selectedTab" : ""
            }`}
          >
            {item}
          </p>
        ))}
      </div>
      <hr className='m-0 ' />
      <div className='xs:bg-greyShade'>
        <div className='view_container xs:py-8'>
          {(() => {
            switch (selectedTab) {
              case "Overview":
                return <Overview tripData={tripData} />;
              case "Photos":
                return <Gallery tripData={tripData} />;
              case "Itinerary":
                return <Itinerary tripData={tripData} />;
              case "Inclusion/Exclusion":
                return <Includes tripData={tripData} />;
              case "Policies":
                return <Cancellations tripData={tripData} />;
              case "Reviews":
                return <Reviews data={tripData?.getTrip?.reviews} />;
              default:
                return <Map tripData={tripData} />;
            }
          })()}
        </div>
      </div>
    </div>
  );
}

export default DescriptionLinks;
