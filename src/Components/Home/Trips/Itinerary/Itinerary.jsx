import React, { useState } from "react";
import "./Itinerary.scss";
import { htmlParserChecker, useWindowSize } from "../../../../Utils/utils";
import SimpleExpand from "../../../Common/Expand/Expand";


function Itinerary({ tripData }) {
  const [innerWidth] = useWindowSize();
  const isMobile = innerWidth < 600;

  return (
    <div className='bg-white xs:px-4 py-4'>
      {isMobile
        ? tripData?.getTrip?.itinerary.map((item) => (
            <SimpleExpand data={item} />
          ))
        : tripData?.getTrip?.itinerary.map((item, index) => (
            <div className='py-9 trip_activity'>
                  <div className='flex'>
                    <div className='mr-3'>
                      <h4 className='font-bold capitalize'>
                        {item.heading || `Day: ${index + 1}`}
                      </h4>
                      <p className='mt-4 text-blogPara'>
                        {htmlParserChecker(item.content)}
                      </p>
                    </div>
                    {item?.image?.imageUrl ? (
                      <div>
                        <img
                          className='iternary_image'
                          src={item?.image?.imageUrl}
                          alt='iternary_image'
                        />
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
            </div>
          ))}
    </div>
  );
}

export default Itinerary;
