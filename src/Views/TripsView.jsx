import React, { useEffect, useState } from "react";
import Carousel from "../Components/Common/Carousel/Carousel";
import { bannerImage } from "../Resources/constants/demoBanner";
import Search from "../Components/Search/Search";
import { colorPallete, HomeSearchTheme } from "../Resources/theme";
import "../App.scss";
import { addDays } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import Home from "../Components/Home/Home";
import Button from "../Components/Common/Button/Button";
import { cartDataHandler, roomData } from "../Redux/cart/cart.action";
import MobileSearch from "../Components/Property/Description/MobileSearch/MobileSearch";
import {
  numOfGuestHandlers,
  searchTypeHandler,
} from "../Redux/search/search.action";
import Meta from "../Components/Common/Meta/Meta";
import {
  useGetAllRecommendation,
  useGetLandingPage,
} from "../Services/datasource";
import HomeCard from "../Components/Home/Card/Card";
import { Grid } from "@material-ui/core";
import { bannerPage } from "../Resources/constants/common";

let limit = 6;

function TripsView() {
  const dispatch = useDispatch();
  const { data, loading, error } = useGetLandingPage("trip");
  const state = useSelector((state) => state);
  const { boxShadow, borderRadius, zIndex, backgroundColor, marginTop } =
    HomeSearchTheme;
  const [initialCheckInDate, setInitialCheckInDate] = useState(new Date());
  const [initialCheckOutDate, setInitialCheckOutDate] = useState(
    addDays(new Date(), 1)
  );
  const [page, setPage] = useState(1);
  const [tripData, setTripData] = useState([]);
  const {
    data: recommendedData,
    refetch,
    loading: tripsLoading,
  } = useGetAllRecommendation(limit, page, "Trip");
  const { Primary, Black } = colorPallete;

  useEffect(() => {
    sessionStorage.removeItem("discountAmount");
    sessionStorage.removeItem("bookingId");
  }, []);

  useEffect(() => {
    dispatch(searchTypeHandler("Trips"));
  }, []);

  useEffect(() => {
    if (recommendedData?.getAllRecommendations?.data) {
      let TripDataClone = [
        ...tripData,
        ...recommendedData?.getAllRecommendations?.data,
      ];
      setTripData(TripDataClone);
    }
  }, [recommendedData?.getAllRecommendations?.data]);

  useEffect(() => {
    dispatch(cartDataHandler([]));
    dispatch(roomData([]));
    dispatch(numOfGuestHandlers(1));
  }, [dispatch]);

  return (
    <div className='home_main_container'>
      <Meta
        title={"Hosteller trips"}
        description='Check Hosteller Trips Here'
      />
      <div className=' sm:hidden home_carousel'>
        <Carousel
          bannerImage={[data?.getLandingPageDetails?.heroImage?.[0]?.url]}
          autoplay={true}
        />
      </div>
      <div className='2xl:container mx-auto'>
        <div className='home_Screen_view_container xs:hidden'>
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
            search={"Trips"}
            initialCheckInDate={initialCheckInDate}
            initialCheckOutDate={initialCheckOutDate}
            searchedType={"Trips"}
          />
        </div>
        <div className='xl:hidden 2xl:hidden sm:hidden md:hidden'>
          <div className='first_container relative'>
            <div className='first_container_bg absolute w-full'></div>
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
          </div>
          <MobileSearch />
        </div>

        <div className='my-24'>
          <div className='view_container mt-24'>
            <Grid container spacing={3}>
              {tripData?.map((item) => (
                <Grid item xs={12} lg={4} xl={4}>
                  <div className='product_search_card'>
                    <HomeCard item={item} name={"Trips"} />
                  </div>
                </Grid>
              ))}
            </Grid>
          </div>
          {limit * page < recommendedData?.getAllRecommendations?.count ||
          tripsLoading ? (
            <div className='text-center mt-12'>
              <Button
                bgColor={Primary}
                color={Black}
                isLoading={tripsLoading}
                padding={"1.4rem 1rem"}
                fontWeight={500}
                borderRadius={6}
                label={"Load More"}
                onClick={() => setPage(page + 1)}
                width={"150px"}
                height='20px'
                opacity='0.8'
              />
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
      <div className='view_container my-36'>
        <h1 className='text-center'>Why Choose Us For Workation?</h1>
        <p className='text-lightgrey text-center'>
          Voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia
          consequuntur magni dolores eos qui.
        </p>
        <div className='mt-12'>
          <Grid container spacing={3}>
            {bannerPage.map((item) => (
              <Grid item xs={12} lg={4}>
                <div className='text-center'>
                  <h6>{item?.heading}</h6>
                  <p className='mt-3'>{item?.para}</p>
                </div>
              </Grid>
            ))}
          </Grid>
        </div>
      </div>
    </div>
  );
}

export default React.memo(TripsView);
