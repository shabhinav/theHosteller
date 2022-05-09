import { Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { couponIdHandler } from "../../../Redux/cart/cart.action";
import {
  useGetCoupon,
  useCustomCouponHandler,
  useTripCoupon,
  useTripCustomCoupon,
  useWorkationCoupon,
  useWorkationCustomCoupon,
  usePostCoupon,
} from "../../../Services/datasource";
import Toast from "../../Common/Toast/Toast";
import "./Coupon.scss";
import Button from "../../Common/Button/Button";
import { colorPallete } from "../../../Resources/theme";
import Input from "../../Common/Input/Input";
import close from "../../../Assets/Icons/close.svg";
import { eventTracker } from "../../../Utils/utils";

function Coupon({
  // data: couponData,
  discountHandler,
  setCouponLoading,
}) {
  const state = useSelector((state) => state);
  const tripId = sessionStorage.getItem("tripId");
  let searchVal = state?.search?.searchType?.split("");
  searchVal.pop();
  const { data } = useGetCoupon(searchVal.join("").toUpperCase());
  const [roomsData, setRoomsData] = useState([]);
  const [selectedIndex, setIndex] = useState("");
  const [openToast, setOpenToast] = useState(false);
  const [customPromo, setCustomPromo] = useState("");
  const [myData, setMyData] = useState("");
  const [err, setErr] = useState();
  const [status, setStatus] = useState(false);
  const [couponType, setCouponType] = useState("");
  const [couponMyLoading, setCouponMyLoading] = useState(false);
  const dispatch = useDispatch();
  const { Black, Primary, Grey } = colorPallete;
  const [couponHandler, { data: couponData, loading, error, refetch }] =
    usePostCoupon();
  const [customCouponHandler, { data: customData, loading: customLoading }] =
    useCustomCouponHandler();
  const [tripCouponHandler, { data: tripCoupon, loading: tripLoading }] =
    useTripCoupon();
  const [
    tripCustomCouponHandler,
    { data: tripCustomCoupon, loading: tripCustomLoading },
  ] = useTripCustomCoupon();
  const [workationCoupon, { data: workationData, loading: workationLoading }] =
    useWorkationCoupon();
  const [
    workationCustomCoupon,
    { data: workationCustomData, loading: wokationCustomLoading },
  ] = useWorkationCustomCoupon();

  useEffect(() => {
    if (!customPromo?.length) {
      dispatch(couponIdHandler(""));
      setErr("");
      setStatus("");
      discountHandler("");
      setIndex("");
    }
  }, [customPromo]);

  useEffect(() => {
    if (
      customLoading ||
      tripLoading ||
      tripCustomLoading ||
      workationLoading ||
      wokationCustomLoading ||
      loading
    ) {
      setCouponLoading(true);
      setCouponMyLoading(true);
      setMyData("");
    } else {
      setCouponLoading(false);
      setCouponMyLoading(false);
    }
  }, [
    customLoading,
    tripLoading,
    tripCustomLoading,
    workationLoading,
    wokationCustomLoading,
    setCouponLoading,
    loading,
  ]);

  const eventHandler = (discount) => {
    eventTracker("webengage", "coupon_applied", {
      Coupon: customPromo,
      DiscountedAmount: discount,
    });
  };

  useEffect(() => {
    if (state?.search?.searchType === "Trips") {
      if (couponType === "normal") {
        if (tripCoupon?.addCouponCodeDiscountToTrip) {
          eventHandler(tripCoupon?.addCouponCodeDiscountToTrip?.discountAmount);
          setMyData(tripCoupon?.addCouponCodeDiscountToTrip);
          discountHandler(tripCoupon?.addCouponCodeDiscountToTrip);
        }
      } else {
        if (tripCustomCoupon?.applyCouponByPromoCodeForTrips) {
          eventHandler(
            tripCustomCoupon?.applyCouponByPromoCodeForTrips?.discountAmount
          );
          dispatch(
            couponIdHandler(
              tripCustomCoupon?.applyCouponByPromoCodeForTrips?.couponId
            )
          );
          setCouponType("");
          setMyData(tripCustomCoupon?.applyCouponByPromoCodeForTrips);
          discountHandler(tripCustomCoupon?.applyCouponByPromoCodeForTrips);
        }
      }
    } else if (state?.search?.searchType === "Workations") {
      if (couponType === "normal") {
        if (workationData?.addCouponCodeDiscountForWorkation) {
          eventHandler(
            workationData?.addCouponCodeDiscountForWorkation?.discountAmount
          );
          setMyData(workationData?.addCouponCodeDiscountForWorkation);
          discountHandler(workationData?.addCouponCodeDiscountForWorkation);
        }
      } else if (couponType === "custom") {
        if (workationCustomData?.applyCouponByPromoCodeForWorkation) {
          eventHandler(
            workationCustomData?.applyCouponByPromoCodeForWorkation
              ?.discountAmount
          );
          dispatch(
            couponIdHandler(
              workationCustomData?.applyCouponByPromoCodeForWorkation?.couponId
            )
          );
          setMyData(workationCustomData?.applyCouponByPromoCodeForWorkation);
          discountHandler(
            workationCustomData?.applyCouponByPromoCodeForWorkation
          );
        }
      }
    } else {
      if (couponType === "normal") {
        if (couponData?.addCouponCodeDiscount) {
          eventHandler(couponData?.addCouponCodeDiscount?.discountAmount);
          setCouponType("");
          setMyData(couponData?.addCouponCodeDiscount);
          discountHandler(couponData?.addCouponCodeDiscount);
        }
      } else {
        if (customData?.applyCouponByPromoCode) {
          eventHandler(customData?.applyCouponByPromoCode?.discountAmount);
          dispatch(
            couponIdHandler(customData?.applyCouponByPromoCode?.couponId)
          );
          setCouponType("");
          setMyData(customData?.applyCouponByPromoCode);
          discountHandler(customData?.applyCouponByPromoCode);
        }
      }
    }
  }, [
    couponData,
    customData?.applyCouponByPromoCode,
    tripCoupon?.addCouponCodeDiscountToTrip,
    tripCustomCoupon?.applyCouponByPromoCodeForTrips,
    workationData?.addCouponCodeDiscountForWorkation,
    workationCustomData?.applyCouponByPromoCodeForWorkation,
  ]);

  useEffect(() => {
    if (myData) {
      setOpenToast(true);
    }
  }, [myData]);

  useEffect(() => {
    if (state?.search?.searchType === "Trips") {
      if (couponType === "normal") {
        if (tripCoupon?.addCouponCodeDiscountToTrip?.couponError) {
          dispatch(couponIdHandler(""));
          setErr("");
          setStatus("");
          discountHandler("");
          setIndex("");
        }
      } else {
        if (tripCustomCoupon?.applyCouponByPromoCodeForTrips?.couponError) {
          dispatch(couponIdHandler(""));
          setErr("");
          setStatus("");
          discountHandler("");
          setIndex("");
        }
      }
    } else if (state?.search?.searchType === "Workations") {
      if (couponType === "normal") {
        if (workationData?.addCouponCodeDiscountForWorkation?.couponError) {
          dispatch(couponIdHandler(""));
          setErr("");
          setStatus("");
          discountHandler("");
          setIndex("");
        }
      } else {
        if (
          workationCustomData?.applyCouponByPromoCodeForWorkation?.couponError
        ) {
          dispatch(couponIdHandler(""));
          setErr("");
          setStatus("");
          discountHandler("");
          setIndex("");
        }
      }
    } else {
      if (couponType === "normal") {
        if (couponData?.addCouponCodeDiscount?.couponError) {
          dispatch(couponIdHandler(""));
          setErr("");
          setStatus("");
          discountHandler("");
          setIndex("");
        }
      } else {
        if (customData?.applyCouponByPromoCode?.couponError) {
          dispatch(couponIdHandler(""));
          setErr("");
          setStatus("");
          discountHandler("");
          setIndex("");
        }
      }
    }
  }, [
    couponData?.addCouponCodeDiscount?.couponError,
    customData?.applyCouponByPromoCode?.couponError,
    tripCoupon?.addCouponCodeDiscountToTrip?.couponError,
    tripCustomCoupon?.applyCouponByPromoCodeForTrips?.couponError,
    workationData?.addCouponCodeDiscountForWorkation?.couponError,
    workationCustomData?.applyCouponByPromoCodeForWorkation?.couponError,
    dispatch,
  ]);

  useEffect(() => {
    let rooms = [];
    let obj = {};
    for (let i = 0; i < state.cart.cart.length; i++) {
      if (obj[state.cart.cart[i]?.name]) {
        obj[state.cart.cart[i]?.name] = {
          ...obj[state.cart.cart[i]?.name],
          quantity: obj[state.cart.cart[i]?.name].quantity + 1,
        };
      } else {
        obj[state.cart.cart[i]?.name] = {
          roomUniqueId: state.cart.cart[i].roomUniqueId,
          roomName: state.cart.cart[i].name,
          quantity: 1,
        };
        if (state?.search?.searchType === "Workations") {
          obj[state.cart.cart[i]?.name] = {
            ...obj[state.cart.cart[i]?.name],
            workationId: state.cart.cart[i].workationId,
          };
        }
      }
    }
    Object.keys(obj).map((item) => rooms.push(obj[item]));
    setRoomsData(rooms);
  }, [state.cart.cart, state?.search?.searchType]);

  useEffect(() => {
    dispatch(couponIdHandler(""));
  }, [dispatch]);

  useEffect(() => {
    if (state?.search?.searchType === "Trips") {
      if (couponType === "normal") {
        setErr(tripCoupon?.addCouponCodeDiscountToTrip?.couponError);
        setStatus(tripCoupon?.addCouponCodeDiscountToTrip?.couponStatus);
      } else {
        setErr(tripCustomCoupon?.applyCouponByPromoCodeForTrips?.couponError);
        setStatus(
          tripCustomCoupon?.applyCouponByPromoCodeForTrips?.couponStatus
        );
      }
    } else if (state?.search?.searchType === "Workations") {
      if (couponType === "normal") {
        setErr(workationData?.addCouponCodeDiscountForWorkation?.couponError);
        setStatus(
          workationData?.addCouponCodeDiscountForWorkation?.couponStatus
        );
      } else {
        setErr(
          workationCustomData?.applyCouponByPromoCodeForWorkation?.couponError
        );
        setStatus(
          workationCustomData?.applyCouponByPromoCodeForWorkation?.couponStatus
        );
      }
    } else {
      if (couponType === "normal") {
        setErr(couponData?.addCouponCodeDiscount?.couponError);
        setStatus(couponData?.addCouponCodeDiscount?.couponStatus);
      } else {
        setErr(customData?.applyCouponByPromoCode?.couponError);
        setStatus(customData?.applyCouponByPromoCode?.couponStatus);
      }
    }
  }, [
    state?.search?.searchType,
    couponData,
    customData,
    tripCoupon,
    tripCustomCoupon,
    workationData,
    workationCustomData,
  ]);

  const couponDataHandler = (id) => {
    setErr("");
    setStatus("");
    let checkInDate = state.search?.checkInDate.split("/").reverse().join("-");

    if (state?.search?.searchType === "Trips") {
      dispatch(couponIdHandler(id));
      tripCouponHandler(id, tripId);
    } else if (state?.search?.searchType === "Workations") {
      let checkOutDate = state.search?.searchDetails?.Search?.checkoutDate;
      dispatch(couponIdHandler(id));
      workationCoupon({
        hostelId: state?.search?.cityName,
        checkinDate: checkInDate,
        checkoutDate: checkOutDate,
        rooms: roomsData,
        couponId: id,
        sessionId: state?.search?.searchDetails?.Search?.sessionId,
      });
    } else {
      let checkOutDate = state.search?.checkOutDate
        .split("/")
        .reverse()
        .join("-");

      dispatch(couponIdHandler(id));
      couponHandler({
        hostelId: state?.search?.cityName,
        checkinDate: state?.search?.searchDetails?.Search?.checkinDate,
        checkoutDate: state?.search?.searchDetails?.Search?.checkoutDate,
        rooms: roomsData,
        couponId: id,
        sessionId: state?.search?.searchDetails?.Search?.sessionId,
      });
    }
  };

  const customPromoHandler = () => {
    setCouponType("custom");
    let checkInDate = state.search?.checkInDate.split("/").reverse().join("-");
    let checkOutDate = state.search?.checkOutDate
      .split("/")
      .reverse()
      .join("-");
    if (state?.search?.searchType === "Trips") {
      tripCustomCouponHandler(tripId, customPromo);
    } else if (state?.search?.searchType === "Workations") {
      let checkOutDate = state.search?.searchDetails?.Search?.checkoutDate;
      workationCustomCoupon({
        hostelId: state?.search?.cityName,
        checkinDate: checkInDate,
        checkoutDate: checkOutDate,
        rooms: roomsData,
        promoCode: customPromo,
        sessionId: state?.search?.searchDetails?.Search?.sessionId,
      });
    } else {
      customCouponHandler({
        hostelId: state?.search?.cityName,
        checkinDate: checkInDate,
        checkoutDate: checkOutDate,
        rooms: roomsData,
        promoCode: customPromo,
        sessionId: state?.search?.searchDetails?.Search?.sessionId,
      });
    }
  };

  return (
    <div className='p-4 mt-6 coupon_container'>
      <h5 className='font-semibold '>Got a discount code?</h5>
      <div className='hidden'>
        {data?.getCouponList?.coupons.map((item, index) => (
          <div
            onClick={() => {
              couponDataHandler(item?._id);
              setIndex(index);
              setCouponType("normal");
            }}
            className={` mt-4 coupon_select p-4 cursor-pointer flex ${
              selectedIndex === index ? "bg-coupon" : "bg-white"
            }`}
          >
            <div>
              <div className='flex justify-between'>
                <h6 className='font-semibold '>{item?.promoCode} </h6>
                <h6 className='font-semibold '>{item?.discount}%</h6>
              </div>
              <div>
                <p className='text-blogHeading mt-3'>
                  Discount of {item?.name} .Please make payment using ICICI
                  credit card or EMI option
                </p>
              </div>
            </div>
            <div
              onClick={(e) => e.stopPropagation()}
              className='flex items-center ml-4'
            >
              {selectedIndex === index && !couponMyLoading ? (
                <img
                  onClick={() => {
                    dispatch(couponIdHandler(""));
                    discountHandler("");
                    setIndex("");
                  }}
                  src={close}
                  alt='close'
                />
              ) : null}
            </div>
          </div>
        ))}
      </div>
      <div className='mt-4'>
        <Grid container spacing>
          <Grid xs={12} lg={9}>
            <div className='mr-2 apply_coupon'>
              <Input
                type={"email"}
                isLabel={true}
                width='100%'
                onChange={(value) => setCustomPromo(value)}
                // label={"Email Address "}
                // isRequired={true}
                // placeholder={"Email Address"}
                use='payment'
                variant='outlined'
              />
            </div>
          </Grid>
          <Grid xs={12} lg={3}>
            <div className='flex items-center h-full'>
              <Button
                bgColor={!customPromo ? Grey : Primary}
                color={Black}
                isDisable={!customPromo}
                isLoading={customLoading || wokationCustomLoading}
                padding={"1.5rem 0.5rem"}
                fontWeight={800}
                borderRadius={6}
                label='Apply'
                onClick={() => customPromoHandler()}
                width={"100%"}
              />
            </div>
          </Grid>
        </Grid>
      </div>
      <div className='absolute'>
        <Toast
          handleClose={() => setOpenToast(false)}
          open={openToast}
          severity={err ? "error" : "success"}
          message={status}
        />
      </div>
    </div>
  );
}

export default Coupon;
