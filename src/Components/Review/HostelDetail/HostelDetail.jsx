import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Months } from "../../../Resources/constants/common";
import "./HostelDetail.scss";
import moment from "moment";
import Rules from "./Rules/Rules";
import Cancellations from "./Cancellation/Cancellations";
import { colorPallete } from "../../../Resources/theme";
import Amount from "../Amount/Amount";
import {
  useBookingSuccess,
  useBookingSuccessData,
} from "../../../Services/datasource";
import {
  dateDiffHandler,
  pluralHandler,
  dateDiff,
} from "../../../Utils/utils";
import { useHistory, useParams } from "react-router";

function HostelDetail({ myDatahandler }) {
  let pathname = window.location.pathname;
  const history = useHistory();
  const { id } = useParams();
  const sessionId = sessionStorage.getItem("sessionId");
  let tripId = sessionStorage.getItem("tripId");
  let bookingId = sessionStorage.getItem("bookingId");
  const hostelDetails = useSelector((state) => state.search);
  const cartData = useSelector((state) => state.cart.cart);
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [numOfNights, setNumOfNights] = useState(0);
  const [cart_Data, setCartData] = useState([]);
  const [tripSuccessHandler, { loading, error, data, refetch }] =
    useBookingSuccessData();
  const [hostelBookingSuccess, { data: hostelData }] = useBookingSuccess();

  useEffect(() => {
    if (pathname.includes("/review")) {
      sessionStorage.removeItem("discountAmount");
    }
  }, [pathname]);

  useEffect(() => {
    let cartdata = {};
    for (let i = 0; i < cartData.length; i++) {
      if (cartdata[cartData[i]?.name]) {
        cartdata[cartData[i]?.name].push(cartData[i]);
      } else {
        cartdata[cartData[i]?.name] = [cartData[i]];
      }
    }
    setCartData(cartdata);
  }, [cartData]);

  const refIdHandler = useCallback(() => {
    if (pathname.includes("/orders")) {
      if (hostelDetails?.searchType === "Trips" && tripId) {
        tripSuccessHandler(tripId);
      } else if (bookingId) {
        hostelBookingSuccess(bookingId);
      }
    }
  }, [pathname, hostelDetails?.searchType, bookingId, tripId, ,]);

  useEffect(() => {
    refIdHandler();
  }, [refIdHandler]);

  useEffect(() => {
    if (
      hostelDetails?.searchDetails?.Search &&
      hostelDetails?.searchType !== "Trips" &&
      hostelDetails?.searchDetails?.Search?.checkoutDate
    ) {
      let checkinDate = dateDiffHandler(
        hostelDetails?.searchDetails?.Search?.checkinDate
      );
      setCheckInDate(checkinDate?.myDate);
      let checkoutDate = dateDiffHandler(
        hostelDetails?.searchDetails?.Search?.checkoutDate
      );

      let dateDifference = dateDiff(
        hostelDetails?.searchDetails?.Search?.checkinDate,
        hostelDetails?.searchDetails?.Search?.checkoutDate
      );
      setCheckOutDate(checkoutDate?.myDate);
      setNumOfNights(dateDifference);
    } else if (
      hostelDetails?.searchDetails?.Search &&
      hostelDetails?.searchType === "Trips"
    ) {
      let checkinDate = dateDiffHandler(data?.getTripOnSuccess?.checkinDate);
      setCheckInDate(checkinDate?.myDate);
      let checkoutDate = dateDiffHandler(data?.getTripOnSuccess?.checkoutDay);
      setCheckOutDate(checkoutDate?.myDate);
      let dateDifference = dateDiff(
        data?.getTripOnSuccess?.checkinDate,
        data?.getTripOnSuccess?.checkoutDay
      );
      setNumOfNights(dateDifference);
    }
  }, [hostelDetails?.searchDetails?.Search, data]);

  useEffect(() => {
    if (hostelDetails?.searchType === "Trips") {
      myDatahandler(data?.getTripOnSuccess?.tripRefId);
    } else {
      myDatahandler(hostelData?.getBookingOnSuccess?.providerRefId);
    }
  }, [data, hostelData]);

  return (
    <div className='hostel_detail lg:p-2'>
      <div className='order_description bg-white'>
        <div className='flex justify-between main_heading'>
          <h5 className='text-soil font-bold py-2  px-3'>
            {hostelDetails?.searchType === "Trips" ? "Trip " : "Hostel "}
            Information
          </h5>
          <h5 className='text-soil font-bold py-2  px-3'>
            {pathname.includes("/orders") ? "Confirmation Number - " : ""}
            {hostelDetails?.searchType === "Trips"
              ? data?.getTripOnSuccess?.tripRefId
              : hostelData?.getBookingOnSuccess?.providerRefId}
          </h5>
        </div>
        <div className='flex py-3 justify-between address_container items-center px-3'>
          <div className=''>
            <h5 className=' font-bold  text-base'>
              {hostelDetails?.searchType === "Trips"
                ? hostelDetails?.searchDetails?.Search?.searchResults?.name
                : hostelDetails?.searchedHostelDetails?.getHostelDetails?.name}
            </h5>
            <p className='text-blackShade py-2 text-xs'>
              {hostelDetails?.searchType === "Trips"
                ? hostelDetails?.searchDetails?.Search?.searchResults
                    ?.description
                : hostelDetails?.searchedHostelDetails?.getHostelDetails
                    ?.address?.addressLine1}
            </p>
            <p className='text-blackShade text-xs'>
              Contact:{" "}
              {hostelDetails?.searchedHostelDetails?.getHostelDetails?.phone}
            </p>
          </div>
          <div className='pl-3'>
            <img
              src={
                hostelDetails?.searchType === "Trips"
                  ? hostelDetails?.searchDetails?.Search?.searchResults
                      ?.photos?.[0]
                  : hostelDetails?.searchedHostelDetails?.getHostelDetails
                      ?.images?.[0]?.image
              }
              className='hostel_img'
            />
          </div>
        </div>
        <div className='p-2 flex check_section'>
          <div className='my-5 xs:mx-0 xs:mr-5 mr-10 ml-4  text-right check_in_container pr-8 lg:pr-8 2xl:pr-8	'>
            <h6 className='font-extrabold  text-xs xs:text-left'>
              {hostelDetails?.searchType === "Trips"
                ? "Start Date"
                : "Check-In"}
            </h6>
            <h5 className='font-extrabold  my-2 text-lg xs:text-left xs:text-base'>
              {checkInDate}
            </h5>
            <h6 className='text-soil  xs:text-left'> Check In 1:00 PM</h6>
          </div>
          <div className='interSection my-6 relative'>
            <div
              className={`absolute   ${
                numOfNights?.length > 1
                  ? "num_nights_double_heading"
                  : "num_nights_heading"
              }`}
            >
              {numOfNights + pluralHandler(numOfNights, " Night")}
            </div>
          </div>
          <div className='my-5 xs:ml-5 xl:mx-10  pl-8 lg:pl-8 2xl:pl-16	'>
            <h6 className='font-extrabold  text-xs'>
              {hostelDetails?.searchType === "Trips" ? "End Date" : "Check-Out"}
            </h6>
            <h5 className='font-extrabold  my-2 text-lg xs:text-base'>
              {checkOutDate}
            </h5>
            <h6 className='text-soil '> Check Out 11:00 AM</h6>
          </div>
        </div>
        {hostelDetails?.searchType === "Trips" ? (
          ""
        ) : (
          <div>
            <p className='text-lightgrey mb-2 mt-3'>Room Type</p>

            {Object.keys(cart_Data)?.map((item) => (
              <div>
                <p className='font-semibold text-base my-2'>
                  {cart_Data[item]?.length + " x "}
                  {item}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className='xs:mx-2 mx-5 order_rules'>
        <Rules />
      </div>

      <div className='order_description cancellation_container'>
        <Cancellations
          hostelDetails={hostelDetails}
          checkOutDate={hostelDetails?.searchDetails?.Search?.checkinDate}
        />
      </div>
      <div className=' sm:ml-2 mx-2 xl:hidden 2xl:hidden '>
        <Amount />
      </div>
    </div>
  );
}

export default HostelDetail;
