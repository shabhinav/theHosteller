import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import WorkationView from "../../Assets/images/workationview.png";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import "./index.scss";
import { colorPallete, HomeSearchTheme } from "../../Resources/theme";
import { addDays } from "date-fns";
import Carousel from "../Common/Carousel/Carousel";
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
import HomeCard from "../Home/Card/Card";

const useStyles = makeStyles((theme) => ({
  large: {
    width: "100px",
    height: "100px",
  },
}));

let limit = 6;

function Hostel() {
  const { data, loading, error } = useGetLandingPage("hostel");
  const { upper, lower } = zigZagData;
  const classes = useStyles();
  const dispatch = useDispatch();
  const { data: hostelData } = useGetRecommendationByProductType("Hostel");
  const { boxShadow, borderRadius, zIndex, backgroundColor, marginTop } =
    HomeSearchTheme;
  const state = useSelector((state) => state);
  const [hostelsData, setHostelData] = useState([]);
  const [initialCheckInDate, setInitialCheckInDate] = useState(new Date());
  const [initialCheckOutDate, setInitialCheckOutDate] = useState(
    addDays(new Date(), 1)
  );
  const [page, setPage] = useState(1);
  const {
    loading: hostelLoading,
    data: recommendedData,
    refetch,
  } = useGetAllRecommendation(limit, page, "Hostel");
  const { Primary, Black } = colorPallete;

  useEffect(() => {
    if (hostelData?.getRecommendationByProductType?.length) {
      let tabPanel = recommendationDataConverter(
        hostelData?.getRecommendationByProductType
      );
    }
  }, [hostelData]);

  useEffect(() => {
    dispatch(searchTypeHandler("Hostels"));
  }, []);

  useEffect(() => {
    refetch();
  }, [page]);

  useEffect(() => {
    if (recommendedData?.getAllRecommendations?.data) {
      let hostelDataClone = [
        ...hostelsData,
        ...recommendedData?.getAllRecommendations?.data,
      ];
      setHostelData(hostelDataClone);
    }
  }, [recommendedData?.getAllRecommendations?.data]);


  useEffect(() => {
    setInitialCheckOutDate(new Date());
    const checkInDate = dateConverter(new Date(), "dd-mm-yyyy", "home");
    dispatch(checkInDateHandler(checkInDate));
    setInitialCheckOutDate(addDays(new Date(), 1));
    const checkOutDate = dateConverter(
      addDays(new Date(), 1),
      "dd-mm-yyyy",
      "home"
    );
    dispatch(checkOutDateHandler(checkOutDate));
  }, []);

  useEffect(() => {
    dispatch(roomData([]));
    dispatch(cartDataHandler([]));
  }, [dispatch]);

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
            search={"Hostels"}
            initialCheckInDate={initialCheckInDate}
            initialCheckOutDate={initialCheckOutDate}
            searchedType={"Hostels"}
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

          <div className='my-24'>
            <div className='view_container'>
              <Grid container spacing={3}>
                {hostelsData?.map((item) => (
                  <Grid item xs={12} lg={4} xl={4}>
                    <div className='product_search_card'>
                      <HomeCard item={item} />
                    </div>
                  </Grid>
                ))}
              </Grid>
            </div>
            {limit * page < recommendedData?.getAllRecommendations?.count ||
            hostelLoading ? (
              <div className='text-center my-12'>
                <Button
                  bgColor={Primary}
                  color={Black}
                  padding={"1.4rem 1rem"}
                  fontWeight={500}
                  borderRadius={6}
                  isLoading={hostelLoading}
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

          <div className='view_container'>
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

export default Hostel;

// <div className='bg-cement text-center flex justify-center items-center my-12 xs:flex-wrap'>
//   {tourData.map((item) => (
//     <div className='mx-9 py-6'>
//       <h6 className=' font-semibold'>{item.val}</h6>
//       <p className='text-lightgrey'>{item.heading}</p>
//     </div>
//   ))}
// </div>
