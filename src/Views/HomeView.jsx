import React, { useEffect, useState } from "react";
import Carousel from "../Components/Common/Carousel/Carousel";
import Search from "../Components/Search/Search";
import { HomeSearchTheme } from "../Resources/theme";
import "../App.scss";
import { addDays } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import Home from "../Components/Home/Home";
import { cartDataHandler, roomData } from "../Redux/cart/cart.action";
import MobileSearch from "../Components/Property/Description/MobileSearch/MobileSearch";
import {
  checkInDateHandler,
  checkOutDateHandler,
  numOfGuestHandlers,
  searchTypeHandler,
  cityNameHandler,
} from "../Redux/search/search.action";
import Meta from "../Components/Common/Meta/Meta";
import {
  useGetHostelsList,
  useGetLandingPage,
  useTripsSearchList,
} from "../Services/datasource";
import { dateConverter, sessionStorage } from "../Utils/utils";

function HomeView() {
  const dispatch = useDispatch();
  const { data, loading, error } = useGetLandingPage("hosteller");
  const state = useSelector((state) => state);
  const { boxShadow, borderRadius, zIndex, backgroundColor, marginTop } =
    HomeSearchTheme;
  const [tourDate, setTourDate] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 1),
      key: "selection",
    },
  ]);
  const [loader, setLoader] = useState(false);
  const [Id, setId] = useState("");
  const { data: hostelListData } = useGetHostelsList();
  const { data: tripsListData } = useTripsSearchList();
  const [initialCheckInDate, setInitialCheckInDate] = useState(new Date());
  const [initialCheckOutDate, setInitialCheckOutDate] = useState(
    addDays(new Date(), 1)
  );
  const [searchedType, setSelectedType] = useState("Hostels");
  const [heroImage, setSetHeroImage] = useState([]);

  useEffect(() => {
    window.sessionStorage.removeItem("discountAmount");
    window.sessionStorage.removeItem("bookingId");
    window.scroll(0, 0);
  }, []);

  useEffect(() => {
    dispatch(searchTypeHandler("Hostels"));
  }, []);

  useEffect(() => {
    dispatch(searchTypeHandler(searchedType));
  }, [searchedType]);

  useEffect(() => {
    if (
      hostelListData?.getHostelList?.length &&
      tripsListData?.getTripList?.length
    ) {
      if (searchedType === "Trips") {
        dispatch(cityNameHandler(tripsListData?.getTripList?.[0]?._id));
        setId(tripsListData?.getTripList?.[0]?._id);
      } else {
        dispatch(cityNameHandler(hostelListData?.getHostelList?.[0]?._id));
        setId(hostelListData?.getHostelList?.[0]?._id);
      }
    }
  }, [searchedType, hostelListData, tripsListData]);


  useEffect(() => {
    dispatch(cartDataHandler([]));
    dispatch(roomData([]));
    dispatch(numOfGuestHandlers(1));
  }, [dispatch]);

  useEffect(() => {
    const productType = state?.search?.searchType;
    setInitialCheckOutDate(new Date());
    const checkInDate = dateConverter(new Date(), "dd-mm-yyyy", "home");
    dispatch(checkInDateHandler(checkInDate));
    if (productType === "Hostels") {
      setInitialCheckOutDate(addDays(new Date(), 1));
      const checkOutDate = dateConverter(
        addDays(new Date(), 1),
        "dd-mm-yyyy",
        "home"
      );
      dispatch(checkOutDateHandler(checkOutDate));
      sessionStorage();
    } else if (productType === "Workations") {
      setInitialCheckOutDate(addDays(new Date(), 7));
      const checkOutDate = dateConverter(
        addDays(new Date(), 7),
        "dd-mm-yyyy",
        "home"
      );
      dispatch(checkOutDateHandler(checkOutDate));
    }
  }, [state?.search?.searchType]);

  useEffect(() => {
    if (data?.getLandingPageDetails?.heroImage?.length) {
      let hostelImageArray = data?.getLandingPageDetails?.heroImage?.map(
        (item) => item.url
      );
      setSetHeroImage(hostelImageArray);
    }
  }, [data?.getLandingPageDetails?.heroImage]);

  return (
    <>
      <Meta
        title={"The Hosteller"}
        description={"India's only chain of branded Hostels "}
      />
      <div className='home_main_container'>
        <div className=' sm:hidden home_carousel'>
          <Carousel
            bannerImage={
              heroImage?.length
                ? heroImage
                : [data?.getLandingPageDetails?.heroImage?.[0]?.url]
            }
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
              tourDate={tourDate}
              setTourDate={setTourDate}
              search={state?.search?.searchType}
              initialCheckInDate={initialCheckInDate}
              initialCheckOutDate={initialCheckOutDate}
              searchedType={searchedType}
              setSelectedType={setSelectedType}
              setId={setId}
              Id={Id}
            />
          </div>
          <div className='xl:hidden 2xl:hidden sm:hidden md:hidden'>
            <MobileSearch />
          </div>
          <Home setLoader={setLoader} />
        </div>
      </div>
    </>
  );
}

export default React.memo(HomeView);
