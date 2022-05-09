import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { dateInMonthCal, dateReverse } from "../../../Utils/utils";

function Amount({ data }) {
  const triptotalTax = sessionStorage.getItem("triptotalTax");
  const tripPayableAmount = sessionStorage.getItem("tripPayableAmount");
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalTax, setTotalTax] = useState(0);
  const state = useSelector((state) => state);
  const tripCheckOutDate = sessionStorage.getItem("tripCheckoutDate");

  useEffect(() => {
    let total = 0;
    let totalTax = 0;

    if (state) {
      if (state?.search?.searchType !== "Trips") {
        state?.cart?.cart?.map((item) => {
          if (item?.name) {
            total += +item?.price;
            totalTax += +item?.tax;
          }
        });
        setTotalTax(totalTax);
        setTotalPrice(total);
      } else {
        setTotalTax(Number(triptotalTax));
        setTotalPrice(Number(tripPayableAmount));
      }
    }
  }, [state]);

  return (
    <div>
      <h4 className='mb-4 font-bold'>Your Booking Summary</h4>
      <div className='bg-primary p-3 payment_right_inner_container'>
        <h6 className='font-bold text-xl text-Mulish'>
          {state?.search?.searchType !== "Trips"
            ? state?.search?.searchedHostelDetails?.getHostelDetails?.name
            : state?.search?.searchDetails?.Search?.searchResults?.name}
        </h6>
        <p className='mt-3 pb-3 payment-contact'>
          {state?.search?.searchType !== "Trips"
            ? state?.search?.searchedHostelDetails?.getHostelDetails?.address
                ?.addressLine1
            : state?.search?.searchDetails?.Search?.searchResults?.description}
        </p>
        <div className='flex justify-center right_payment_container my-3'>
          <div className='mx-8 my-3 right_payment_checkIn'>
            <h6 className='font-semibold mb-2'>
              {state?.search?.searchType === "Trips"
                ? "Start Date"
                : "Check In"}
            </h6>
            <p>
              {" "}
              {dateInMonthCal(
                state?.search?.searchDetails?.Search?.checkinDate
              )}
            </p>
          </div>
          <div className='payment_intersection'></div>
          <div className='mx-8 my-3 '>
            <h6 className='font-semibold mb-2'>
              {" "}
              {state?.search?.searchType === "Trips" ? "End Date" : "Check Out"}
            </h6>
            <p>
              {state?.search?.searchType === "Trips"
                ? dateInMonthCal(tripCheckOutDate)
                : dateInMonthCal(
                    state?.search?.searchDetails?.Search?.checkoutDate
                  )}
            </p>
          </div>
        </div>
        <div className='grid grid-cols-2 mt-2'>
          <p>Total Price</p>
          <p className='font-bold text-right'>
            ₹{" "}
            {(Number(totalPrice) - Number(totalTax ? totalTax : 0))
              .toFixed(1)
              .toLocaleString("en-IN")}
          </p>
        </div>
        <div className='grid grid-cols-2 mt-2'>
          <p>Total Taxes</p>
          <p className='font-bold text-right'>
            ₹{" "}
            {Number(totalTax) ? totalTax.toFixed(1).toLocaleString("en-IN") : 0}
          </p>
        </div>
        {data?.discountAmount ? (
          <div className='grid grid-cols-2 mt-2'>
            <p>Discounted Amount</p>
            <p className='font-bold text-right'>
              ₹{" "}
              {(Number(totalPrice) - Number(data?.discountAmount))
                .toFixed(1)
                .toLocaleString("en-IN")}
            </p>
          </div>
        ) : (
          ""
        )}
        <div className='grid grid-cols-2 mt-2'>
          <p className='text-xl font-bold'>Total Price</p>
          <p className='font-bold text-right text-xl'>
            ₹{" "}
            {`${
              data?.discountAmount
                ? +Number(data?.discountAmount)
                    .toFixed(1)
                    .toLocaleString("en-IN")
                : +Number(totalPrice).toFixed(1).toLocaleString("en-IN")
            }`}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Amount;
