import React, { useEffect, useState } from "react";
import { FeaturesDetails, tabPanel } from "../../Resources/constants/Home";
import MultiCarousel from "../Common/Multi-Carousel/Multi-Carousel";
import CustomTabPanel from "../Common/TabPanel/TabPanel";
import ZigZag from "../Common/ZigZag/ZigZag";
import Grid from "@material-ui/core/Grid";
import WorkationView from "../../Assets/images/workationview.png";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import "./index.scss";
import { HomeSearchTheme } from "../../Resources/theme";
import { addDays } from "date-fns";
import Carousel from "../Common/Carousel/Carousel";
import { bannerImage } from "../../Resources/constants/demoBanner";
import Search from "../Search/Search";
import { useDispatch, useSelector } from "react-redux";
import { cartDataHandler, roomData } from "../../Redux/cart/cart.action";
import MobileSearch from "../Property/Description/MobileSearch/MobileSearch";
import {
  bannerPage,
  tourData,
  zigZagData,
} from "../../Resources/constants/common";
import map from "../../Assets/Icons/map.png";
import money from "../../Assets/Icons/monetization_on.png";
import volunteer from "../../Assets/Icons/volunteer_activism.png";
import { searchTypeHandler } from "../../Redux/search/search.action";

const reasonsImage = {
  0: map,
  1: money,
  2: volunteer,
  3: map,
  4: money,
  5: volunteer,
};

const useStyles = makeStyles((theme) => ({
  large: {
    width: "100px",
    height: "100px",
  },
}));

function Trip() {
  const { para, heading, subHeading } = FeaturesDetails;
  const { upper, lower } = zigZagData;
  const classes = useStyles();
  const dispatch = useDispatch();
  const { boxShadow, borderRadius, zIndex, backgroundColor, marginTop } =
    HomeSearchTheme;
  const state = useSelector((state) => state);
  const [initialCheckInDate, setInitialCheckInDate] = useState(new Date());
  const [initialCheckOutDate, setInitialCheckOutDate] = useState();

  useEffect(() => {
    dispatch(roomData([]));
    dispatch(cartDataHandler([]));
  }, [dispatch]);

    useEffect(() => {
      dispatch(searchTypeHandler("Trips"));
    }, []);

  return (
    <>
      <div>
        <Carousel bannerImage={bannerImage} autoPlay={false} />
      </div>
      <div className='2xl:container mx-auto'>
        <div className='home_Screen_view_container product_screen_container xs:hidden'>
          <Search
            boxShadow={boxShadow}
            borderRadius={borderRadius}
            zIndex={zIndex}
            backgroundColor={backgroundColor}
            marginTop={marginTop}
            type='outlined'
            buttonText='BOOK NOW'
            isLabel={"Home"}
            variant='outlined'
            search={state?.search?.searchType}
            initialCheckInDate={initialCheckInDate}
            initialCheckOutDate={initialCheckOutDate}
            searchedType={"Trips"}
          />
        </div>
      </div>
      <div className='2xl:container mx-auto'>
        <div>
          <div className='mt-6 view_container'>
            <h1 className='text-center xl:pt-9 2xl:pt-9 xs:text-5xl'>
              Tired Of Working From Home Or Looking For A Change In Scenery?
            </h1>
            <p className='mt-8 text-center text-lightgrey text-base'>
              Voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed
              quia consequuntur magni dolores eos qui.
            </p>
          </div>
          <div className='xl:hidden 2xl:hidden sm:hidden md:hidden py-4'>
            <MobileSearch />
          </div>
          <div className='view_container'>
            <div className='mt-20'>
              <ZigZag para={para} heading={heading} subHeading={subHeading} />
            </div>
            <div className='home_select_container'>
              <CustomTabPanel tabPanel={tabPanel} name='hostel'>
                <MultiCarousel data={tabPanel} name='hostel' />
              </CustomTabPanel>
            </div>
            <div className='mt-20'>
              <h1>Our Backpacker Workation</h1>
              <p className='text-lightgrey'>
                An evolving chain of backpacker hostels changing the way YOU
                travel
              </p>
              <div className='mt-9'>
                <Grid container spacing={3}>
                  <Grid item xs={12} lg={5}>
                    <img
                      className='workation_view xs:w-full'
                      alt='WorkationView'
                      src={WorkationView}
                    />
                  </Grid>
                  <Grid item xs={12} lg={7}>
                    <h4 className=' font-semibold mt-2 text-lightgrey'>
                      {upper.heading}
                    </h4>
                    <p className='my-4 text-lightgrey'>{upper.subHeading}</p>
                    <p>{upper.para}</p>
                  </Grid>
                </Grid>
              </div>
              <div className='mt-9'>
                <Grid container spacing={3}>
                  <Grid item xs={12} lg={7}>
                    <h4 className=' font-semibold mt-2 text-lightgrey'>
                      {lower.heading}
                    </h4>
                    <p className='my-4 text-lightgrey'>{lower.subHeading}</p>
                    <p>{lower.para}</p>
                  </Grid>
                  <Grid item xs={12} lg={5}>
                    <img
                      className='workation_view xs:w-full'
                      alt='WorkationView'
                      src={WorkationView}
                    />
                  </Grid>
                </Grid>
              </div>
            </div>
          </div>
          <div className='workation_bcg_img my-8 relative'>
            <div className='bg_mask absolute'></div>
            <div className='pt-12 '>
              <div className='w-6/12 mx-auto flex flex-col items-center text-white py-12'>
                <Avatar
                  alt='Remy Sharp'
                  src='https://images.unsplash.com/photo-1634726383175-4af931b68565?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMnx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
                  className={classes.large}
                />
                <p className='py-5 z-10 text-base fon-bold'>
                  "Qerspeciatis unde omnis iste natus doxes sit voluptatem
                  accusantium doloremque laudantium, totam aperiam eaque ipsa
                  quae ab illo inventore veritatis et quasi architecto
                </p>
                <h6 className='py-5 z-10 text-base font-bold'>
                  ALBERT DOWSON, COMPANY DIRECTOR
                </h6>
              </div>
            </div>
          </div>
          <div className='view_container'>
            <h1 className='text-center'>Why Choose Us For Workation?</h1>
            <p className='text-lightgrey text-center'>
              Voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed
              quia consequuntur magni dolores eos qui.
            </p>
            <div className='mt-12'>
              <Grid container spacing={3}>
                {bannerPage.map((item, index) => (
                  <Grid item xs={12} lg={4}>
                    <div className='text-center'>
                      <img src={reasonsImage[index]} alt='' />
                      <h6 className='font-bold mt-2'>{item?.heading}</h6>
                      <p className='mt-3'>{item?.para}</p>
                    </div>
                  </Grid>
                ))}
              </Grid>
            </div>
          </div>
          <div className='bg-cement text-center flex justify-center items-center my-12 xs:flex-wrap'>
            {tourData.map((item) => (
              <div className='mx-9 py-6'>
                <h6 className=' font-semibold'>{item.val}</h6>
                <p className='text-lightgrey'>{item.heading}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Trip;
