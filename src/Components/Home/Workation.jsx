import React, { useEffect, useState } from "react";
import { FeaturesDetails, tabPanel } from "../../Resources/constants/Home";
import MultiCarousel from "../Common/Multi-Carousel/Multi-Carousel";
import CustomTabPanel from "../Common/TabPanel/TabPanel";
import ZigZag from "../Common/ZigZag/ZigZag";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import "./index.scss";
import { colorPallete, HomeSearchTheme } from "../../Resources/theme";
import { addDays } from "date-fns";
import Carousel from "../Common/Carousel/Carousel";
import { bannerImage } from "../../Resources/constants/demoBanner";
import Search from "../Search/Search";
import { useDispatch, useSelector } from "react-redux";
import { cartDataHandler, roomData } from "../../Redux/cart/cart.action";
import MobileSearch from "../Property/Description/MobileSearch/MobileSearch";
import Button from "../Common/Button/Button";
import {
  bannerPage,
  tourData,
  zigZagData,
} from "../../Resources/constants/common";
import {
  useGetAllRecommendation,
  useGetLandingPage,
  useGetRecommendationByProductType,
} from "../../Services/datasource";
import { dateConverter, recommendationDataConverter } from "../../Utils/utils";
import {
  checkInDateHandler,
  checkOutDateHandler,
  searchTypeHandler,
} from "../../Redux/search/search.action";
import HomeCard from "./Card/Card";

const useStyles = makeStyles((theme) => ({
  large: {
    width: "100px",
    height: "100px",
  },
}));

let limit = 6;

function Workation() {
  const { para, heading, subHeading } = FeaturesDetails;
  const { upper, lower } = zigZagData;
  const { data, loading, error } = useGetLandingPage("workation");
  const classes = useStyles();
  const dispatch = useDispatch();
  const { data: workationData } =
    useGetRecommendationByProductType("Workation");
  const { boxShadow, borderRadius, zIndex, backgroundColor, marginTop } =
    HomeSearchTheme;
  const state = useSelector((state) => state);
  const [workationsData, setWorkationData] = useState([]);
  const [page, setPage] = useState(1);
  const [initialCheckInDate, setInitialCheckInDate] = useState(new Date());
  const [initialCheckOutDate, setInitialCheckOutDate] = useState(
    addDays(new Date(), 7)
  );
  const {
    data: recommendedData,
    refetch,
    loading: workationLoading,
  } = useGetAllRecommendation(limit, page, "Workation");

  const { Primary, Black } = colorPallete;

  useEffect(() => {
    if (workationData?.getRecommendationByProductType?.length) {
      let tabPanel = recommendationDataConverter(
        workationData?.getRecommendationByProductType
      );
    }
  }, [workationData]);

  useEffect(() => {
    dispatch(roomData([]));
    dispatch(cartDataHandler([]));
  }, [dispatch]);

  useEffect(() => {
    if (recommendedData?.getAllRecommendations?.data) {
      let workationsDataClone = [
        ...workationsData,
        ...recommendedData?.getAllRecommendations?.data,
      ];
      setWorkationData(workationsDataClone);
    }
  }, [recommendedData?.getAllRecommendations?.data]);

  useEffect(() => {
    const checkInDate = dateConverter(new Date(), "dd-mm-yyyy", "home");
    dispatch(checkInDateHandler(checkInDate));
    setInitialCheckOutDate(addDays(new Date(), 7));
    const checkOutDate = dateConverter(
      addDays(new Date(), 7),
      "dd-mm-yyyy",
      "home"
    );
    dispatch(checkOutDateHandler(checkOutDate));
  }, []);

  useEffect(() => {
    dispatch(searchTypeHandler("Workations"));
  }, []);

  return (
    <>
      <div>
        <Carousel
          bannerImage={[data?.getLandingPageDetails?.heroImage?.[0]?.url]}
          autoPlay={false}
        />
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
            search={"Workations"}
            initialCheckInDate={initialCheckInDate}
            initialCheckOutDate={initialCheckOutDate}
            searchedType={"Workations"}
          />
        </div>
      </div>
      <div className='2xl:container mx-auto'>
        <div>
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
          <div className='view_container mt-24'>
            <Grid container spacing={3}>
              {workationsData?.map((item) => (
                <Grid item xs={12} lg={4} xl={4}>
                  <div className='product_search_card'>
                    <HomeCard item={item} name={"Workations"} />
                  </div>
                </Grid>
              ))}
            </Grid>
          </div>
          {limit * page < recommendedData?.getAllRecommendations?.count ||
          workationLoading ? (
            <div className='text-center my-12'>
              <Button
                bgColor={Primary}
                color={Black}
                isLoading={workationLoading}
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

          <div className='view_container my-36'>
            <h1 className='text-center'>Why Choose Us For Workation?</h1>
            <p className='text-lightgrey text-center'>
              Voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed
              quia consequuntur magni dolores eos qui.
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
      </div>
    </>
  );
}

export default Workation;
