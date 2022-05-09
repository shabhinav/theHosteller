import React, { useEffect, useState } from "react";
import Carousel from "../Components/Common/Carousel/Carousel";
import bannerImage from "../Assets/images/banner.png";
import { Grid } from "@material-ui/core";
import Card from "../Components/Common/Card/Card";
import { policyType } from "../Resources/constants/common";
import Meta from "../Components/Common/Meta/Meta";
import Expand from "react-expand-animated";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {
  Link,
  Button,
  Element,
  Events,
  animateScroll as scroll,
  scrollSpy,
  scroller,
} from "react-scroll";

const policies = [
  {
    name: "Booking and Guest Policy",
    id: "GP",
    heading: [
      "Check In - Check Out Policy",
      "Booking Policy",
      "Hostel Cancellation Policy",
      "Workation Cancellation Policy",
      "Trip Cancellation Policy",
      "Pet Policy",
      "General Policies",
    ],
  },
  {
    name: "Privacy Policy",
    id: "PP",
    heading: [
      "Company Registration",
      "Use Of Your Information",
      "Reservation Data",
      "Credit Card Data",
      "Guest Personal Data",
      "Keeping Our Information Up To Date",
      "How We Use Cookies",
      "Google Analytics And Demographical Data",
      "Website Security",
      "Third Party Websites",
      "Photography And Film",
      "Disclosing Your Information To Third Parties",
      "Your Rights",
    ],
  },
  {
    name: "Terms  and Conditions",
    id: "TC",
    heading: [
      "Introduction",
      "Use of Website",
      "Proprietary Rights Information",
      "Restrictions on Use of Materials",
      "Submissions",
      "Promotional Information",
      "Links",
      "Access And Interference",
      "Termination",
      "General",
    ],
  },
];

function PolicyView() {
  const [selectedPolicy, setSelectedPolicy] = useState(
    "Booking and Guest Policy"
  );
  const [toggle, setToggle] = useState({ GP: true, PP: false, TC: false });

  const [policyData, setPolicyData] = useState("GP");

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  const onClickHandler = (val) => {
    const toggleClone = { ...toggle };
    Object.keys(toggleClone)?.forEach((item) => {
      if (val === item) {
        toggleClone[item] = !toggle[item];
      } else {
        toggleClone[item] = false;
      }
    });
   setToggle(toggleClone);
  };

  return (
    <div className='policies'>
      <Meta title={"Policies"} description={"Hosteller's Policy"} />
      <div className='relative'>
        <div className='bg_mask absolute h-full w-full z-10 -mt-1'></div>
        <Carousel bannerImage={[bannerImage]} autoPlay={false} />
        <div className=' absolute w-full bottom-6 z-10'>
          <div className='view_container '>
            <h1 className='text-primary font-extrabold '>Policies</h1>
          </div>
        </div>
      </div>
      <div className='view_container my-14'>
        <Grid container spacing={4}>
          <Grid xs={12} lg={3}>
            <div className='mr-4'>
              <Card>
                <div className='p-4 '>
                  <h6 className='font-semibold mb-4'>Policies</h6>
                  <div>
                    {policies.map((val) => (
                      <h6
                        className={`${
                          val.name === selectedPolicy ? "" : ""
                        } policies_list py-2 pl-2 rounded  cursor-pointer `}
                        onClick={() => {
                          setSelectedPolicy(val.name);
                          setPolicyData(val.id);
                        }}
                      >
                        <div
                          onClick={() => onClickHandler(val.id)}
                          className='flex justify-between trip_activity items-center'
                        >
                          {val.name}
                          <ExpandMoreIcon />
                        </div>
                        <Expand open={toggle[val.id]} duration={1000}>
                          {val?.heading?.map((item) => (
                            <p className='my-2 text-left	pr-2 text-semibold'>
                              <Link
                                activeClass='active'
                                to={item}
                                spy={true}
                                smooth={true}
                                offset={-100}
                                duration={500}
                              >
                                {item}
                              </Link>
                            </p>
                          ))}
                        </Expand>
                      </h6>
                    ))}
                  </div>
                </div>
              </Card>
            </div>
          </Grid>
          <Grid xs={12} lg={8}>
            {policyType[policyData]?.map((item) => (
              <div className='mt-8'>
                <Element className='element'>
                  <h4 id={item?.heading} className='font-bold'>
                    {item?.heading}
                  </h4>
                </Element>

                {Array.isArray(item?.para) ? (
                  <ul className='pl-5'>
                    {item?.para?.map((val) => (
                      <li className='text-tiny leading-para'>{val}</li>
                    ))}
                  </ul>
                ) : (
                  <p className='mt-4 '>{item?.para}</p>
                )}
              </div>
            ))}
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default PolicyView;
