import React from "react";
import Feature0 from "../../Assets/Icons/feature0.svg";
import Feature1 from "../../Assets/Icons/feature1.svg";
import Feature2 from "../../Assets/Icons/feature2.svg";
import Feature3 from "../../Assets/Icons/feature3.png";
import Feature4 from "../../Assets/Icons/feature4.svg";

const featuredIn = [
  {
    0: Feature0,
    url: "https://www.forbesindia.com/article/take-one-big-story-of-the-day/workfromhostels-makes-room-for-innovation-amid-covid19-slowdown/66533/1",
  },
  {
    1: Feature1,
    url: "https://www.thehindubusinessline.com/companies/startup-hosteller-aims-at-six-operational-properties-by-march/article7723273.ece",
  },
  {
    2: Feature2,
    url: "https://so.city/delhi/article/the-hosteller-has-launched-5-new-breathtaking-hostels-in-uttarakhand-were-on-our-way",
  },
  {
    3: Feature3,
    url: "https://www.tripoto.com/india/trips/the-hosteller-social-accomodation-802661",
  },
  {
    4: Feature4,
    url: "https://www.financialexpress.com/lifestyle/how-clutch-of-enterprises-across-the-country-are-offering-budget-conscious-travellers-the-revamped-hostel-experience/1217750/",
  },
];

function Featured() {
  return (
    <div className='my-32 '>
      <h1 className='mt-32 mb-16'>Featured In</h1>
      <div className='flex overflow-auto items-center justify-between'>
        {featuredIn.map((item: any, index: any) => (
          <div className='mx-4'>
            <a href={item.url} target='_blank' rel='noreferrer'>
              <img
                className='object-contain  xs:text-center'
                src={item[index]}
                alt='Feature In '
              />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Featured;
