import React, { useEffect, useState } from "react";
import "./HomeCard.css";
import featureCamping from "../../../Assets/Icons/featurecamping.png";
import featureWifi from "../../../Assets/Icons/featurewifi.png";
import featureFood from "../../../Assets/Icons/featurefood.png";
import {
  usePostSearchedData,
  useSeoUrl,
  useTripSearch,
} from "../../../Services/datasource";
import { addDays } from "date-fns";
import {
  dateConverter,
  eventTracker,
  seoUrlHandler,
} from "../../../Utils/utils";
import { useDispatch, useSelector } from "react-redux";
import {
  searchDetailsHandler,
  checkInDateHandler,
  checkOutDateHandler,
  cityNameHandler,
  numOfGuestHandlers,
  searchTypeHandler,
} from "../../../Redux/search/search.action";
import { useHistory } from "react-router-dom";
import userImg from "../../../Assets/Icons/carduser.png";
import { productType } from "../../../Resources/constants/common";
import CircularProgress from "@material-ui/core/CircularProgress";

function HomeCard({ item, index, name, setLoader }) {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const history = useHistory();
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [loader, setLoading] = useState(false);
  const [sendSearchedData, { data, error, loading }] = usePostSearchedData();
  const [
    tripSearchHandler,
    { loading: tripLoading, error: tripError, data: tripData, refetch },
  ] = useTripSearch();
  const [seoHandler] = useSeoUrl();

  useEffect(() => {
    setLoading(loading);
  }, [loading]);

  useEffect(() => {
    setLoading(tripLoading); // setTimeout(() => {
  }, [tripLoading]);

  const handleOnClickHandler = () => {
    let startDate = new Date();
    let endDate = addDays(new Date(), +item?.duration);
    let checkInDate = dateConverter(startDate, "dashed");
    let checkOutDate = dateConverter(endDate, "dashed");
    setCheckInDate(checkInDate);
    setCheckOutDate(checkOutDate);
    eventTracker("webengage", "card_clicked", {
      ProductName: item?.name,
      ProductType: name,
    });
    if (name === "Trips") {
      sendSearchedData(undefined, checkInDate, "", 1, "Trip", item?.tripId);
      // tripSearchHandler(item?.tripId, checkInDate, "Trip");
      dispatch(searchTypeHandler("Trips"));
    } else if (name === "Workations") {
      sendSearchedData(
        item?.hostelId,
        checkInDate,
        checkOutDate,
        item?.paxNumber.toString(),
        "Workation"
      );
      dispatch(searchTypeHandler("Workations"));
    } else {
      dispatch(searchTypeHandler("Hostels"));
      sendSearchedData(
        item?.hostelId,
        checkInDate,
        checkOutDate,
        item?.paxNumber.toString(),
        "Hostel"
      );
    }
  };

  const urlRedirectHandler = (url) => {
    seoUrlHandler(name, history, url);
  };

  useEffect(() => {
    if (data?.Search && !error) {
      dispatch(searchDetailsHandler(data));
      dispatch(cityNameHandler(item?.hostelId));
      dispatch(checkInDateHandler(checkInDate));
      dispatch(checkOutDateHandler(checkOutDate));
      dispatch(numOfGuestHandlers(1));
      sessionStorage.setItem("sessionId", data?.Search?.sessionId);
      urlRedirectHandler(data?.Search?.url);
    }
    if (tripData?.Search && !tripError) {
      dispatch(cityNameHandler(item?.tripId));
      dispatch(numOfGuestHandlers(1));
      dispatch(checkInDateHandler(checkInDate));
      sessionStorage.setItem("sessionId", tripData?.Search?.sessionId);
      dispatch(searchDetailsHandler(tripData));
      urlRedirectHandler(tripData?.Search?.sessionId, item?.tripId);
    }
    if (error || tripError) {
      dispatch(searchDetailsHandler([]));
      sessionStorage.setItem("sessionId", error?.message);
      if (state?.search?.searchType === "Trips") {
        urlRedirectHandler(tripError?.message, item?.tripId);
      } else {
        urlRedirectHandler(error?.message, item?.hostelId);
      }
    }
  }, [data, dispatch, history, error, tripData, tripError]);

  return (
    <div
      onClick={() => handleOnClickHandler()}
      className='h-full cursor-pointer recommendation_card'
      id={`${name}card${index}`}
    >
      {loader ? (
        <div className='loading_card '>
          <div className='flex justify-center items-center h-full'>
            <CircularProgress />
          </div>
        </div>
      ) : (
        <div>
          <div>
            <img
              className='card_img'
              src={item?.image?.url}
              alt='hostels type'
            />
          </div>
          <div className='flex align-center justify-end -mt-6'>
            <img className='feature_icon' src={featureFood} alt='food' />
            <img className='feature_icon' src={featureCamping} alt='camping' />
            <img className='feature_icon' src={featureWifi} alt='wifi' />
          </div>
          <div className='mt-2 py-3 px-8  xs:px-6 relative '>
            <h6 className='font-extrabold text-lg card_heading'>
              {item?.name}
            </h6>
            <p className='mt-2 text-lightgrey font-semibold text-base'></p>
            <p className='mt-2 text-lightgrey card_short_desc'>
              {item?.shortDesc}
            </p>
            <div className='flex justify-between items-center mt-6'>
              <div className='flex items-center'></div>
              <h5 className='text-soil font-extrabold  text-xl'>
                <span className='text-lightgrey text-base font-semibold'>
                  starts @
                </span>{" "}
                ₹{item?.price}
              </h5>
            </div>
          </div>
        </div>
      )}{" "}
    </div>
  );
}

export default HomeCard;
