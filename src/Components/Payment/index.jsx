import React, { useEffect, useState } from "react";
import "./index.scss";
import PayementType from "./Payment/PaymentType/PayementType";
import PaymentFooter from "./Payment/PaymentFooter/PaymentFooter";
import UsersDetails from "./Payment/UsersDetails/UsersDetails";
import { useSelector } from "react-redux";
import { Grid } from "@material-ui/core";
import Amount from "./Amount/Amount";
import Coupon from "./Coupon/Coupon";
import { usePostCoupon } from "../../Services/datasource";
import CircularProgress from "../Common/CircularLoader/CircularLoader";
import { sessionStorage } from "../../Utils/utils";

function Payment() {
  const [userDetails, setUserDetails] = useState([]);
  const [userAddress, setuserAddress] = useState({});
  const [contactDetails, setContactDetails] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalTax, setTotalTax] = useState(0);
  const state = useSelector((state) => state);
  const [couponHandler, { data, loading, error, refetch }] = usePostCoupon();
  const [discount, setDiscount] = useState("");
  const [couponLoading, setCouponLoading] = useState("");

  const discountHandler = (val) => {
    setDiscount(val);
  };

  useEffect(() => {
    if (discount) {
      sessionStorage("discountAmount", discount?.discountAmount);
    } else {
      sessionStorage(
        "discountAmount",
        data?.addCouponCodeDiscount?.discountAmount
      );
    }
  }, [data?.addCouponCodeDiscount?.discountAmount, discount]);

  useEffect(() => {
    let total = 0;
    let totalTax = 0;

    if (state) {
      state?.cart?.cart?.map((item) => {
        if (item?.name) {
          total += +item?.price;
          totalTax += +item?.tax;
        }
      });
    }
    setTotalTax(totalTax);
    setTotalPrice(total);
  }, [state]);

  const userInfoHandler = (data) => {
    setUserDetails(data);
  };

  const userAddressHandler = (data) => {
    setuserAddress(data);
  };

  const contactDetailsHandler = (data) => {
    setContactDetails(data);
  };

  return (
    <div className='payment_view_container'>
      <div className='flex m-3 payment_container'>
        <div className='mr-2 p-3 payment_review_step_one'>
          <h6 className='font-bold'>Review Your Hostel Details</h6>
        </div>
        <div className='p-3 payment_review_step_two'>
          <h6 className='font-bold	'>Guest Details and Payment</h6>
        </div>
      </div>

      <div className='mt-12'>
        <Grid container>
          <Grid lg={8} xs={12}>
            <div className='payment_left_container xl:mr-4 2xl:mr-4'>
              <h4 className='mb-4 font-bold'>Guest Information</h4>
              <UsersDetails
                userInfoHandler={userInfoHandler}
                userAddressHandler={userAddressHandler}
                contactDetailsHandler={contactDetailsHandler}
              />
              <div className='2xl:hidden xl:hidden my-12'>
                <Amount data={discount} />
                <Coupon
                  discountHandler={discountHandler}
                  couponHandler={couponHandler}
                  data={data}
                  setCouponLoading={(val) => setCouponLoading(val)}
                />
              </div>
              {/* <PayementType /> */}
              <PaymentFooter
                userDetails={userDetails}
                userAddress={userAddress}
                contactDetails={contactDetails}
                couponLoading={couponLoading}
              />
            </div>
          </Grid>
          <Grid lg={4} xs={12}>
            <div className='payment_right_container xs:hidden sm:hidden sticky top-28'>
              <Amount data={discount} />
              <Coupon
                discountHandler={discountHandler}
                couponHandler={couponHandler}
                data={data}
                setCouponLoading={(val) => setCouponLoading(val)}
              />
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default Payment;
