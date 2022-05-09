import React, { useEffect, useState } from "react";
import MultiCarousel from "../../../Common/Multi-Carousel/Multi-Carousel";
import "./ThingsToKnow.scss";
import Card from "../../../Common/Card/Card";
import { htmlParserChecker } from "../../../../Utils/utils";

const TTKData = [
  {
    heading: "House rules",
    rules: [
      "Check-in: After 11:00 am",
      "Check Out: 3:00 pm",
      "No smoking",
      "No parties or events",
      "Pets are allowed",
    ],
  },
  {
    heading: "Health & safety",
    rules: [
      "Committed to enhanced cleaning process.",
      "Social distancing and other COVID-19-related guidelines apply.",
      "Nearby lake, river, other body of water",
    ],
  },
  {
    heading: "Cancellation policy",
    rules: [
      "Non-refundable: Cancel before check-in and get back only the cleaning fee, if you've paid one.",
    ],
  },
];

function ThingsToKnow({ hostelData }) {
  const [ttkData, setTtkData] = useState([]);
  const [htrData, setHtrData] = useState([]);

  useEffect(() => {
    let tTkData = hostelData?.thingsToKnow?.map((item) => {
      return { ...item, textlist: item?.textlist };
    });

    setTtkData(tTkData);

    let htrData = hostelData?.howToReach?.map((item) => {
      return { ...item, textlist: item?.textlist };
    });

    setHtrData(htrData);
  }, [hostelData]);

  return (
    <div id='thtok' className='thtok'>
      <h4 className='my-3 mt-8 font-bold xs:mx-3'>Things to Know</h4>
      <div className='things_container xs:hidden xl:mb-4'>
        {ttkData?.map((item, index) => (
          <div className='things_content'>
            <Card height={"100%"} overflow={"auto"}>
              <div className='p-4 overflow-y-auto'>
                <h6 className='font-semibold my-2 xs:text-center capitalize '>
                  {item?.heading}
                </h6>
                <div className='xs:text-center pr-4 text-blogPara block'>
                  {htmlParserChecker(item?.textlist)}
                </div>
              </div>
            </Card>
          </div>
        ))}
      </div>
      <div className='xl:hidden 2xl:hidden '>
        <MultiCarousel>
          {ttkData?.map((item, index) => (
            <div className='things_content'>
              <Card height={"100%"} overflow={"auto"}>
                <div className='p-4 '>
                  <h6 className='font-semibold my-3 xs:text-center capitalize'>
                    {item?.heading}
                  </h6>
                  <p className='xs:text-center  text-blogPara block'>
                    {htmlParserChecker(item?.textlist)}
                  </p>
                </div>
              </Card>
            </div>
          ))}
        </MultiCarousel>
      </div>
      <h4 className='mb-3 mt-8 font-bold xs:mx-3'>How to Reach</h4>
      <div className=' things_container xs:hidden xl:mb-4'>
        {htrData?.map((item, index) => (
          <div className='things_content'>
            <Card height={"100%"} overflow={"auto"}>
              <div className='p-4 '>
                <h6 className='font-semibold my-2 xs:text-center capitalize'>
                  {item?.heading}
                </h6>
                <p className='xs:text-center pr-4 text-blogPara'>
                  {htmlParserChecker(item?.textlist)}
                </p>
              </div>
            </Card>
          </div>
        ))}
      </div>
      <div className='xl:hidden 2xl:hidden'>
        <MultiCarousel>
          {htrData?.map((item, index) => (
            <div className='things_content'>
              <Card height={"100%"} overflow={"auto"}>
                <div className='p-4'>
                  <h6 className='font-semibold my-2 xs:text-center capitalize'>
                    {item?.heading}
                  </h6>
                  <p className='xs:text-center text-blogPara'>
                    {htmlParserChecker(item?.textlist)}
                  </p>
                </div>
              </Card>
            </div>
          ))}
        </MultiCarousel>
      </div>
    </div>
  );
}

export default ThingsToKnow;
