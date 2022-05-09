import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "./HoverDropdown.scss";
import { useHistory } from "react-router";
import {
  checkInDateHandler,
  checkOutDateHandler,
  cityNameHandler,
  numOfGuestHandlers,
  searchDetailsHandler,
  searchTypeHandler,
  searchLoader,
} from "../../../Redux/search/search.action";
import { roomData } from "../../../Redux/cart/cart.action";

import { useDispatch } from "react-redux";
import {
  usePostSearchedData,
  useSeoUrl,
  useTripSearch,
} from "../../../Services/datasource";
import {
  dateConverter,
  eventTracker,
  seoUrlHandler,
} from "../../../Utils/utils";
import { addDays } from "date-fns";
import { hoverType, searchType } from "../../../Resources/constants/common";
import Toast from "../Toast/Toast";
import { useSelector } from "react-redux";

const productType = {
  HOSTELS: "Hostels",
  TRIPS: "Trips",
  WORKATIONS: "Workations",
};

function HoverDropdown({ refetch, data, type, profileDropwdown, children }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const [id, setId] = useState("");
  const state = useSelector((state) => state);
  const [bookingType, setBookingType] = useState("");
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [openToast, setOpenToast] = useState(false);
  const [display, setDisplay] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [
    tripSearchHandler,
    { data: tripData, loading: tripLoading, tripError },
  ] = useTripSearch();
  const [sendSearchedData, { data: myData, error, loading }] =
    usePostSearchedData();
  const [seoHandler] = useSeoUrl();

  const onChangehandler = (type) => {
    switch (type) {
      case "Profile":
        return "/profile";
      case "Bookings":
        return "/booking";
      case "Logout":
        return "/";
      default:
        return "/";
    }
  };

  useEffect(() => {
    dispatch(searchLoader(tripLoading || loading));
  }, [tripLoading, loading]);

  const urlRedirectHandler = (url) => {
    seoUrlHandler(productType[bookingType], history, url);
  };

  useEffect(() => {
    if (bookingType === "TRIPS" && tripData?.Search) {
      sessionStorage.setItem("sessionId", tripData?.Search?.sessionId);
      dispatch(searchDetailsHandler(tripData));
      urlRedirectHandler(tripData?.Search?.sessionId);
    } else {
      if (myData?.Search) {
        sessionStorage.setItem("sessionId", myData?.Search?.sessionId);
        dispatch(searchDetailsHandler(myData));
        urlRedirectHandler(myData?.Search?.url);
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
        dispatch(searchDetailsHandler([]));
        sessionStorage.setItem("sessionId", "error");
        error?.message("error");
      }
    }
  }, [id, bookingType, myData, tripData]);

  useEffect(() => {
    dispatch(numOfGuestHandlers(1));
  }, []);

  const onClickHandler = (name, selectedtId, type) => {
    setDisplay(true);
    dispatch(roomData([]));
    if (name === "Logout") {
      localStorage.clear();
      history.push("/");
      refetch();
    } else {
      eventTracker("webengage", "Product_dropdown_click", {
        ProductName: name,
        ProductType: type,
      });
      setId(selectedtId);
      setBookingType(type);
      dispatch(cityNameHandler(selectedtId));
      let checkindate = dateConverter(new Date(), "dd-mm-yyyy");
      setCheckInDate(dateConverter(new Date()));
      dispatch(checkInDateHandler(checkindate));
      if (type === "TRIPS") {
        dispatch(searchTypeHandler("Trips"));
        sendSearchedData(
          undefined,
          checkindate,
          "",
          1,
          hoverType[type],
          selectedtId
        );
      } else if (type === "WORKATIONS") {
        dispatch(searchTypeHandler("Workations"));
        let checkoutdate = dateConverter(addDays(new Date(), 7), "dd-mm-yyyy");
        setCheckOutDate(dateConverter(addDays(new Date(), 7)));
        dispatch(checkOutDateHandler(checkoutdate));
        sendSearchedData(
          selectedtId,
          checkindate,
          checkoutdate,
          1,
          hoverType[type]
        );
        setTimeout(() => {
          const element = document.getElementById("my_room");
          element.scrollIntoView({
            block: "start",
            behavior: "smooth",
          });
        }, 2500);
      } else if (type === "HOSTELS") {
        dispatch(searchTypeHandler("Hostels"));
        let checkoutdate = dateConverter(addDays(new Date(), 1), "dd-mm-yyyy");
        setCheckOutDate(dateConverter(addDays(new Date(), 1)));
        dispatch(checkOutDateHandler(checkoutdate));
        sendSearchedData(
          selectedtId,
          checkindate,
          checkoutdate,
          1,
          hoverType[type]
        );
      }
      // setTimeout(() => {
      //   const element = document.getElementById("my_room");
      //   element.scrollIntoView({
      //     block: "start",
      //     behavior: "smooth",
      //   });
      // }, 2500);
      setTimeout(() => {
        setDisplay(false);
      }, 2000);
    }
  };

  return (
    <div>
      <div className='dropdown'>
        {children}
        <div
          className={`dropdown-content ${
            display ? "display_dropdown_content" : ""
          } ${profileDropwdown ? "profile_dropdown" : ""}`}
        >
          {data?.map((item) =>
            type === "TRIPS" || type === "WORKATIONS" || type === "HOSTELS" ? (
              <p
                className='dropdown_links text-base cursor-pointer'
                onClick={() => onClickHandler(item?.name, item._id, type)}
              >
                {item?.name}
              </p>
            ) : (
              <NavLink
                onClick={() => onClickHandler(item?.name, item._id, type)}
                to={() => onChangehandler(type ? type : item?.name)}
              >
                {item?.name}
              </NavLink>
            )
          )}
        </div>
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

export default HoverDropdown;
