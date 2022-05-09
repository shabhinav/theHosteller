import React, { useEffect } from "react";
import {
  FeaturesHostelDetails,
  FeaturesTripsDetails,
  FeaturesWorkationDetails,
  tabPanel,
} from "../../Resources/constants/Home";
import Blog from "./Blog/Blog";
import MultiCarousel from "../Common/Multi-Carousel/Multi-Carousel";
import CustomTabPanel from "../Common/TabPanel/TabPanel";
import ZigZag from "../Common/ZigZag/ZigZag";
import Featured from "../Featured/Featured";
import BGDesign from "../../Assets/images/bgdesign.png";
import MobileBlog from "./Blog/MobileBlog";
import {
  useGetRecommendationByProductType,
} from "../../Services/datasource";
import { recommendationDataConverter } from "../../Utils/utils";

function Home({ setLoader }) {
  const pathname = window.location.pathname;
  const { data: hostelData } = useGetRecommendationByProductType("Hostel");
  const { data: workationData } =
    useGetRecommendationByProductType("Workation");
  const { data: tripData } = useGetRecommendationByProductType("Trip");
  const [hostelsData, setHostelData] = React.useState([]);
  const [workationsData, setWorkationData] = React.useState([]);
  const [tripsData, setTripData] = React.useState([]);
  const { para, heading, subHeading } = FeaturesHostelDetails;
  const {
    para: workationPara,
    heading: workationHeading,
    subHeading: workationSubheading,
  } = FeaturesWorkationDetails;
  const {
    para: tripsPara,
    heading: tripsHeading,
    subHeading: tripsSubheading,
  } = FeaturesTripsDetails;

  useEffect(() => {
    if (hostelData?.getRecommendationByProductType?.length) {
      let tabPanel = recommendationDataConverter(
        hostelData?.getRecommendationByProductType
      );
      setHostelData(tabPanel);
    }
    if (workationData?.getRecommendationByProductType?.length) {
      let tabPanel = recommendationDataConverter(
        workationData?.getRecommendationByProductType
      );
      setWorkationData(tabPanel);
    }
    if (tripData?.getRecommendationByProductType?.length) {
      let tabPanel = recommendationDataConverter(
        tripData?.getRecommendationByProductType
      );
      setTripData(tabPanel);
    }
  }, [hostelData, workationData, tripData]);

  return (
    <div className='home_main_container'>
      <div className='first_container relative'>
        <div className='first_container_bg absolute w-full'></div>
        <div className='view_container relative '>
          <ZigZag
            para={para}
            heading={heading}
            subHeading={subHeading}
            redirectUrl={"/hostel"}
          />
          <div className='home_select_container'>
            <CustomTabPanel
              setLoader={setLoader}
              tabPanel={hostelsData}
              name='Hostels'
            >
              <MultiCarousel data={hostelsData} name='hostel' />
            </CustomTabPanel>
          </div>
        </div>
      </div>
      <div className='second_container py-4 mt-20 relative'>
        <div className='absolute right-0'>
          <img src={BGDesign} alt='bg-design' />
        </div>
        <div className='view_container pb-10'>
          <ZigZag
            para={workationPara}
            heading={workationHeading}
            subHeading={workationSubheading}
            redirectUrl={"/workation"}
          />
          <div className='home_select_container'>
            <CustomTabPanel
              tabPanel={workationsData}
              setLoader={setLoader}
              name='Workations'
            >
              <MultiCarousel data={workationsData} name='workation' />
            </CustomTabPanel>
          </div>
        </div>
      </div>
      <div className='third_container py-4 mt-5'>
        <div className='view_container'>
          <ZigZag
            type='trips'
            para={tripsPara}
            heading={tripsHeading}
            subHeading={tripsSubheading}
            redirectUrl={"/trip"}
          />
          <div className='home_select_container'>
            <CustomTabPanel
              setLoader={setLoader}
              tabPanel={tripsData}
              name='Trips'
            >
              <MultiCarousel data={tripsData} name='trip' />
            </CustomTabPanel>
          </div>
        </div>
      </div>
      <div>
        {pathname === "/trip" ? (
          ""
        ) : (
          <div className='view_container'>
            <Featured />
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;

// line numebr 120
// <div className='pt-12  xs:hidden relative '>
//   <div className='absolute left-0 home_blog_container'>
//     <img src={BGDesign} alt='bg-design' />
//   </div>
//   <div className='view_container'>
//     <Blog />
//   </div>
// </div>;

// <div
//   className=' view_container xl:hidden 2xl:hidden md:hidden
// '
// >
//   <MobileBlog />
// </div>
