import React, { useEffect, useState } from "react";
import Amenties from "./Amenties/Amenties";
import Overview from "./Overview/Overview";
import RoomDetails from "./RoomDetails/RoomDetails";
import Location from "./Location/Location";
import ThingsToKnow from "./ThingsToKnow/ThingsToKnow";
import MobileSearch from "./MobileSearch/MobileSearch";
import PropertyCard from "../Card/Card";
import "./index.scss";
import { useWindowSize } from "../../../Utils/utils";

function PropertyContent({ content, hostelData, clearCart }) {
  const [innerWidth] = useWindowSize();
  const isMobile = innerWidth < 600;
  const [primaryAmenties, setPrimaryAmneties] = useState([]);

  useEffect(() => {
    let primaryAmenties = [];
    if (hostelData?.amenities.length) {
      hostelData?.amenities?.map((item, index) => {
        if (index < 4) {
          primaryAmenties.push(item);
        }
      });
      setPrimaryAmneties(primaryAmenties);
    }
  }, [hostelData]);

  return (
    <div className='content_container'>
      <Overview
        otherInfo={hostelData?.otherInfo}
        hostelData={hostelData}
        description={hostelData?.description}
        amenities={hostelData?.aminities}
      />
      <div id='my_room'></div>
      <Amenties
        amenities={isMobile ? hostelData?.amenities : hostelData?.amenities}
      />
      <RoomDetails data={content} clearCart={clearCart} />
      <div className='xl:hidden 2xl:hidden'>
        <PropertyCard data={content} clearCart={clearCart} />
      </div>
      <ThingsToKnow hostelData={hostelData} />
      {/* <Location /> */}
    </div>
  );
}

export default PropertyContent;
