import React, { useEffect, useState } from "react";
import "./Card.scss";
import {
  usePostSearchedData,
  useSeoUrl,
  useTripSearch,
} from "../../../Services/datasource";
import { useHistory } from "react-router-dom";
import {
  checkInDateHandler,
  checkOutDateHandler,
  cityNameHandler,
  numOfGuestHandlers,
  searchDetailsHandler,
  searchTypeHandler,
} from "../../../Redux/search/search.action";
import { useDispatch, useSelector } from "react-redux";
import { dateConverter, seoUrlHandler } from "../../../Utils/utils";
import { addDays } from "date-fns";
import Toast from "../../Common/Toast/Toast";
import { productType } from "../../../Resources/constants/common";

function Card({ data, type }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [openToast, setOpenToast] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [sendSearchedData, { data: myData, error, loading }] =
    usePostSearchedData();
  const [
    tripSearchHandler,
    { loading: tripLoading, error: tripError, data: tripData, refetch },
  ] = useTripSearch();
  const [seoHandler] = useSeoUrl();

  const urlRedirectHandler = (url) => {
    seoUrlHandler(state?.search?.searchType, history, url);
  };

  useEffect(() => {
    if (type === "Trip" && tripData?.Search) {
      sessionStorage.setItem("sessionId", tripData?.Search?.sessionId);
      dispatch(searchDetailsHandler(tripData));
      urlRedirectHandler(tripData?.Search?.sessionId);
      window.scroll(0, 0);
    } else {
      if (myData?.Search) {
        urlRedirectHandler(myData?.Search?.url);
        sessionStorage.setItem("sessionId", myData?.Search?.sessionId);
        dispatch(searchDetailsHandler(myData));
        window.scroll(0, 0);
      } else if (error || tripError) {
        dispatch(searchDetailsHandler([]));
        sessionStorage.setItem("sessionId", error?.message);
        setOpenToast(true);
        setErrorMessage(error?.message);
        urlRedirectHandler(error?.message);
      } else if (
        (tripData && !tripData?.search) ||
        (myData && !myData?.Search)
      ) {
        sessionStorage.setItem("sessionId", "error");
        dispatch(searchDetailsHandler([]));
        urlRedirectHandler("error");
      }
    }
  }, [myData, tripData, tripError, error]);

  useEffect(() => {
    if (checkInDate) {
      dispatch(checkInDateHandler(checkInDate));
    }
  }, [checkInDate]);

  useEffect(() => {
    if (checkOutDate) {
      dispatch(checkOutDateHandler(checkOutDate));
    }
  }, [checkOutDate]);

  useEffect(() => {
    dispatch(numOfGuestHandlers(1));
  }, []);

  const onClickHandler = () => {
    let checkindate = dateConverter(new Date(), "dd-mm-yyyy");
    setCheckInDate(dateConverter(new Date()));
    if (type === "Hostels") {
      dispatch(searchTypeHandler("Hostels"));
      let checkoutdate = dateConverter(addDays(new Date(), 1), "dd-mm-yyyy");
      setCheckOutDate(dateConverter(addDays(new Date(), 1)));
      sendSearchedData(data.id, checkindate, checkoutdate, 1, "Hostel");
      dispatch(cityNameHandler(data.id));
    } else if (type === "Trip") {
      dispatch(cityNameHandler(data.id));
      dispatch(searchTypeHandler("Trips"));
      sendSearchedData(undefined, checkindate, "", 1, "Trip", data.id);
    } else {
      dispatch(searchTypeHandler("Workations"));
      dispatch(cityNameHandler(data.id));
      let checkoutdate = dateConverter(addDays(new Date(), 7), "dd-mm-yyyy");
      setCheckOutDate(dateConverter(addDays(new Date(), 7)));
      sendSearchedData(data.id, checkindate, checkoutdate, 1, "Workation");
    }
  };

  return (
    <div
      onClick={() => onClickHandler(data)}
      className='bg-primary rounded h-full cursor-pointer recommendation_card'
    >
      <img
        className='w-full rounded recommended_img'
        src={data?.heroImage}
        alt='property_image'
      />
      <div className='p-3'>
        <h6 className='text-Mulish text-xl font-semibold '>{data?.name}</h6>
        <p className='text-sm my-1 recommended_para'>{data?.shortDesc}</p>
        <h5 className='text-lg my-1  font-semibold mt-2 text-right'>
          ₹ {data?.price}
        </h5>
      </div>
      <div className='absolute'>
        <Toast
          handleClose={() => setOpenToast(false)}
          open={openToast}
          severity='error'
          message={errorMessage}
        />
      </div>
    </div>
  );
}

export default Card;
