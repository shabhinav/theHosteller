import { exit } from "process";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import {
  cancellationPolicy,
  hostel_policy,
  panel,
  trip_policy,
  workation_policy,
} from "../../../../Resources/constants/common";
import { colorPallete } from "../../../../Resources/theme";
import {
  useGetProfileDetails,
  useIsAuth,
  usePostBookingDetails,
  usePostTripBookingDetails,
  useRazorPayInit,
  useTripRazorPayInit,
} from "../../../../Services/datasource";
import {
  addressValidator,
  emailHandler,
  eventTracker,
  nameErrorMsg,
  razorPayInit,
  validationErrorMsg,
} from "../../../../Utils/utils";
import Button from "../../../Common/Button/Button";
import SimpleExpand from "../../../Common/Expand/Expand";
import SimpleModal from "../../../Common/Modal/Modal";
import CustomTabPanel from "../../../Common/TabPanel/TabPanel";
import Toast from "../../../Common/Toast/Toast";
import GuestLogin from "../../../GuestLogin/GuestLogin";
import SignIn from "../../../SignIn/SignIn";
import "./PaymentFooter.scss";

function PaymentFooter({
  contactDetails,
  userDetails,
  userAddress,
  discountHandler,
  couponLoading,
}) {
  const history = useHistory();
  const { id } = useParams();
  const sessionId = sessionStorage.getItem("sessionId");
  const { Primary, Black, Grey } = colorPallete;
  const [roomsData, setRoomsData] = useState([]);
  const [usersAddress, setUsersAddress] = useState({});
  const [contactData, setContactData] = useState({});
  const [open, setOpen] = useState(false);
  const [policy, setPolicy] = useState(true);
  const [terms, setTerms] = useState(true);
  const [err, setErr] = useState("");
  const [validName, setValidName] = useState(false);
  const [nameError, setNameError] = useState("");
  const [workationId, setWorkationId] = useState([]);
  const [isDisable, setDisable] = useState(true);
  const state = useSelector((state) => state.search);
  const cart = useSelector((state) => state);
  const [showSignUp, setShowSignUp] = useState(false);
  const [guestLogin, setGuestLogin] = useState(false);
  const [sendBookingData, { loading, error, data, refetch }] =
    usePostBookingDetails();
  const [
    sendTripBookingData,
    { loading: tripLoading, data: tripData, error: tripError },
  ] = usePostTripBookingDetails();
  const [
    sendBookedData,
    { loading: loadingBooking, error: errorBooking, data: bookedData },
  ] = useRazorPayInit();
  const { error: authError, data: isAuth, refetch: authRefetch } = useIsAuth();
  const { data: userData, refetch: profileRefetch } = useGetProfileDetails();

  const [sendTripBookedData, { data: tripsBookedData }] = useTripRazorPayInit();

  useEffect(() => {
    let rooms = [];
    let obj = {};
    let quantity = 1;
    let isValid = true;

    Object.keys(userDetails).map((item, index) => {
      if (state.searchType !== "Trips") {
        obj = {
          roomName: item,
          roomUniqueId: userDetails[item][0].roomUniqueId,
        };
      }

      userDetails[item].forEach((item) => {
        if (quantity < item.quantity) {
          quantity = item.quantity;
        }
      });

      obj.quantity = quantity;
      quantity = 1;

      for (let i = 0; i < userDetails[item].length; i++) {
        if (
          userDetails[item]?.[i]?.validationlastName &&
          userDetails[item]?.[i]?.validationfirstname &&
          isValid
        ) {
          isValid = true;
        } else {
          isValid = false;
          break;
        }
      }
      setValidName(isValid);

      let a = userDetails[item].map((val) => {
        return {
          firstName: val?.firstname,
          lastName: val?.lastName,
          salutation: val?.title,
        };
      });

      obj.travellers = a;
      rooms.push(obj);
      obj = {};
    });
    setRoomsData(rooms);
  }, [userDetails]);

  useEffect(() => {
    if (error?.message) {
      setErr(error?.message);
      setOpen(true);
    }
  }, [error]);

  useEffect(() => {
    let isDisableName = false;
    let isDisableContact = false;
    let isDisableAddress = false;

    if (userDetails && state.searchType !== "Trips") {
      Object.keys(userDetails)?.map((item) => {
        for (let i = 0; i < userDetails[item].length; i++) {
          if (
            userDetails[item][i]?.firstname &&
            userDetails[item][i]?.lastName &&
            !isDisableName
          ) {
            isDisableName = false;
          } else {
            isDisableName = true;
            break;
          }
        }
      });
    }
    if (contactDetails) {
      if (
        !contactDetails?.countryCode ||
        !contactDetails?.email ||
        contactDetails?.mobile?.length < 10
      ) {
        isDisableContact = true;
      }
    } else {
      isDisableContact = false;
    }

    if (
      !userAddress?.addressLine ||
      !userAddress?.city ||
      !userAddress?.country ||
      !userAddress?.state ||
      !userAddress?.pincode
    ) {
      isDisableAddress = true;
    } else {
      isDisableAddress = false;
    }

    setDisable(isDisableAddress || isDisableContact || isDisableName);
  }, [userDetails, userAddress, contactDetails]);

  useEffect(() => {
    let workationId = [];
    cart?.cart?.cart.map((item) => {
      workationId.push(item.workationId);
    });
    setWorkationId([...workationId]);
  }, [cart?.cart?.cart]);

  useEffect(() => {
    setUsersAddress(userAddress);
  }, [userAddress]);

  useEffect(() => {
    setContactData(contactDetails);
  }, [contactDetails]);

  function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }

  useEffect(() => {
    if (bookedData) {
      let options = razorPayInit(
        bookedData,
        userData?.profile,
        data.bookingInit.bookingId
      );
      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    }
  }, [bookedData]);

  useEffect(() => {
    if (tripsBookedData && state?.searchType === "Trips") {
      let options = razorPayInit(
        tripsBookedData,
        userData?.profile,
        tripData.bookingInit.tripId
      );
      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    }
  }, [tripsBookedData, state]);

  useEffect(() => {
    (async () => {
      if (data?.bookingInit?.bookingId || data || tripData) {
        const res = await loadScript(
          "https://checkout.razorpay.com/v1/checkout.js"
        );

        if (!res) {
          alert("Razorpay SDK failed to load. Are you online?");
          return;
        }
        if (state?.searchType === "Trips" && tripData?.bookingInit) {
          sessionStorage.setItem("bookingId", tripData?.bookingInit?.tripId);
          sendTripBookedData(tripData.bookingInit.tripId);
        } else if (data?.bookingInit) {
          sessionStorage.setItem("bookingId", data?.bookingInit?.bookingId);
          sendBookedData(data.bookingInit.bookingId);
        }
      }
    })();
  }, [data, state, tripData]);

  const submitHandler = () => {
    let checkInDate = sessionStorage.getItem("checkInDate");
    let data = {};
    const contactObj = { ...contactData };
    let confirmEmail = contactObj?.confirmEmail;
    delete contactObj?.validationemail;
    delete contactObj?.confirmEmail;
    contactObj.address = usersAddress;
    data.sessionId = state.searchDetails.Search.sessionId;
    data.rooms = roomsData;
    data.couponId = cart.cart?.couponId;
    data.contactDetails = contactObj;
    if (state.searchType === "Workations") {
      data.workationId = workationId;
      data.hostelId = state.cityName;
      data.checkinDate = state.searchDetails.Search.checkinDate;
      data.checkoutDate = state.searchDetails.Search.checkoutDate;
    } else if (state.searchType === "Trips") {
      data.tripPackageId = state.cityName;
      data.tripId = sessionStorage.getItem("tripId");
      data.checkinDate = checkInDate.split("/").reverse().join("-");
    } else {
      data.hostelId = state.cityName;
      data.checkoutDate = state.searchDetails.Search.checkoutDate;
      data.checkinDate = state.searchDetails.Search.checkinDate;
    }
    let errorMsg = validationErrorMsg(data?.contactDetails?.email, validName);
    let isValidEmail = emailHandler(data?.contactDetails?.email);
    if (!validName || !isValidEmail) {
      setErr(errorMsg);
      setOpen(true);
    } else {
      if (!isAuth?.isAuth) {
        setShowSignUp(true);
      } else {
        eventTracker("webengage", "Proceed To Pay", {
          TravelersDetails: roomsData,
          city: usersAddress.city,
          country: usersAddress.country,
        });
        if (state?.searchType === "Trips") {
          sendTripBookingData(data);
        } else {
          sendBookingData(data);
        }
      }
    }
  };

  useEffect(() => {
    if (state?.searchType === "Hostels") {
      panel[2].description = hostel_policy;
    } else if (state?.searchType === "Workations") {
      panel[2].description = workation_policy;
    } else {
      panel[2].description = trip_policy;
    }
  }, [state?.searchType]);

  return (
    <div className='paymentfooter_container'>
      <div className='paymentfooter_policy_container'>
        <h6 className='mb-6 text-xl '>Hostel Policy & Booking Conditions</h6>
        <div className='xs:hidden'>
          <CustomTabPanel tabPanel={panel} />
        </div>
        <div className='xl:hidden 2xl:hidden'>
          {panel.map((item) => (
            <SimpleExpand data={item} />
          ))}
        </div>
      </div>
      <div className='mt-4'>
        <input
          type='checkbox'
          checked={terms}
          onChange={() => setTerms(!terms)}
        />{" "}
        Yes, please send me special offers via email.
      </div>
      <div className='my-4'>
        <input
          type='checkbox'
          checked={policy}
          onChange={() => setPolicy(!policy)}
        />{" "}
        I acknowledge and accept the{" "}
        <a
          href={process.env.REACT_APP_FRONTEND_URL + "/policies"}
          className='text-link cursor-pointer'
          target='_blank'
          rel='noreferrer'
        >
          Terms of Booking Conditions, Cancellation Policy & Hostel Policy.
        </a>
      </div>
      <div className='my-4 text-center'>
        <Button
          bgColor={
            isDisable || couponLoading || !policy || tripLoading
              ? Grey
              : Primary
          }
          color={Black}
          padding={"1.5rem 2rem"}
          fontWeight={600}
          borderRadius={6}
          label='Proceed to Pay'
          disabled={loading || tripLoading}
          onClick={submitHandler}
          isDisable={isDisable || couponLoading || tripLoading || !policy}
          isLoading={loading || couponLoading || tripLoading}
          width={"200px"}
        />
      </div>
      <div className='absolute'>
        <Toast
          handleClose={() => setOpen(false)}
          open={open}
          severity='error'
          message={err}
        />
      </div>
      <SimpleModal
        open={guestLogin}
        handleOpen={() => setGuestLogin(true)}
        handleClose={() => setGuestLogin(false)}
      >
        <GuestLogin
          refetch={authRefetch}
          handleClose={() => setGuestLogin(false)}
          showSignIn={() => setShowSignUp(true)}
        />
      </SimpleModal>
      <SimpleModal
        open={showSignUp}
        handleOpen={() => setShowSignUp(true)}
        handleClose={() => setShowSignUp(false)}
      >
        <SignIn
          refetch={authRefetch}
          handleClose={() => setShowSignUp(false)}
          showGuestLogin={() => setGuestLogin(true)}
        />
      </SimpleModal>
    </div>
  );
}

export default PaymentFooter;
