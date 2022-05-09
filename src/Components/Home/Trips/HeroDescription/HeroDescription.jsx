import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Camping from "../../../../Assets/Icons/camping.png";
import "./HeroDescription.scss";
import Duration from "../../../../Assets/Icons/duration.png";
import Group from "../../../../Assets/Icons/group.png";
import Height from "../../../../Assets/Icons/height.png";
import Location from "../../../../Assets/Icons/location.png";
import Rating from "../../../../Assets/Icons/rating.png";
import Age from "../../../../Assets/Icons/age.png";
import Difficulty from "../../../../Assets/Icons/def.svg";
import SimpleModal from "../../../Common/Modal/Modal";
import {  useWindowSize } from "../../../../Utils/utils";
import { Link, useHistory, useParams } from "react-router-dom";
import { saveCartDataHandler } from "../../../../Redux/cart/cart.action";
import { useDispatch, useSelector } from "react-redux";
import {
  useIsAuth,
  useTripBooking,
  useTripSearch,
} from "../../../../Services/datasource";
import SignIn from "../../../SignIn/SignIn";
import {
  enquiryText,
  tripsDescContainer,
} from "../../../../Resources/constants/common";
import EnquiryModal from "../EnquiryModal/EnquiryModal";
import GuestLogin from "../../../GuestLogin/GuestLogin";
import DatePicker from "../../../Common/Datepicker/DatePicker";
import { addDays } from "date-fns";
import { colorPallete } from "../../../../Resources/theme";
import Button from "../../../Common/Button/Button";
import { dateConverter } from "../../../../Utils/utils";
import {
  numOfGuestHandlers,
  searchDetailsHandler,
} from "../../../../Redux/search/search.action";
import CustomRating from "../../../Common/Rating/Rating";
import GetAppIcon from "@material-ui/icons/GetApp";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";

function HeroDescription({ tripData }) {
  const { id } = useParams();
  const sessionId = sessionStorage.getItem("sessionId");
  const { Primary, Black, clear } = colorPallete;
  const history = useHistory();
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const [tripBookingHandler, { loading, data, refetch }] = useTripBooking();
  const [tripSearchHandler, { data: mytripData }] = useTripSearch();

  const [showSignUp, setShowSignUp] = useState(false);
  const { data: isAuth, refetch: authRefetch } = useIsAuth();
  const [isEnquiry, setIsEnquiry] = useState(false);
  const [tripDescData, setTripDescData] = useState([]);
  const [guestLogin, setGuestLogin] = useState(false);
  const [openDateModal, setOpenDateModal] = useState(false);
  const [bestLocation, setBestLocation] = useState();
  const [numPax, setNumPax] = useState(state?.search?.numOfGuest);
  const [value, setValue] = React.useState("");
  const [pickUpPrice, setPickUpPrice] = useState(0);
  const [startPoint, SetStartPoint] = useState("");

  const [tourDate, setTourDate] = useState([
    {
      startDate: new Date(
        state?.search?.checkInDate.split("/").reverse().join("/")
      ),
      endDate: addDays(
        new Date(state?.search?.checkInDate.split("/").reverse().join("/")),
        0
      ),
      key: "selection",
    },
  ]);
  useEffect(() => {
    if (data && isAuth?.isAuth) {
      sessionStorage.setItem("tripId", data?.tripBooking?.tripId);
      sessionStorage.setItem(
        "tripCheckoutDate",
        data?.tripBooking?.tripResponse?.checkoutDay
      );
      sessionStorage.setItem(
        "tripPayableAmount",
        data?.tripBooking?.tripResponse?.payableAmount
      );
      sessionStorage.setItem(
        "triptotalAmount",
        data?.tripBooking?.tripResponse?.totalAmount
      );
      sessionStorage.setItem(
        "triptotalTax",
        data?.tripBooking?.tripResponse?.totalTax
      );
      sessionStorage.setItem("sessionId", mytripData?.Search?.sessionId);
      history.push("/payment/" + mytripData?.Search?.sessionId);
    }
  }, [data, isAuth]);

  useEffect(() => {
    if (mytripData) {
      dispatch(searchDetailsHandler(mytripData));
      dispatch(saveCartDataHandler([{ name: "a", adults: numPax }]));
      let checkInDate = dateConverter(tourDate[0]?.startDate, "dd-mm-yyyy");
      tripBookingHandler(
        checkInDate,
        state.search.cityName,
        Number(numPax),
        startPoint
      );
    }
  }, [mytripData]);

  useEffect(() => {
    if (tripData?.getTrip) {
      let tripsDescContainerClone = JSON.parse(
        JSON.stringify(tripsDescContainer)
      );

      Object.keys(tripsDescContainerClone)?.map((key) =>
        tripsDescContainerClone[key].map((item, index) => {
          item.value = tripData?.getTrip[item.val];
          if (item.val === "location") {
            setBestLocation(item?.value?.timeToVisit);
          }
          switch (item.val) {
            case "location":
              return (item.img = Location);
            case "durationDays":
              return (item.img = Duration);
            case "level":
              return (item.img = Difficulty);
            case "minAge":
              return (item.img = Age);
            case "altitude":
              return (item.img = Height);
            case "paxGroup":
              return (item.img = Group);
            case "rating":
              return (item.img = Rating);
            default:
              return (item.img = "");
          }
          // }
        })
      );
      setTripDescData(tripsDescContainerClone);
    }
  }, [tripData]);

  const sendDataHandler = () => {
    if (isAuth?.isAuth) {
      setOpenDateModal(true);
    } else {
      setShowSignUp(true);
    }
  };

  const bookTripHandler = () => {
    const searchVal = state.search.searchType.split("");
    searchVal.pop();
    let checkInDate = dateConverter(tourDate[0]?.startDate, "dd-mm-yyyy");
    // tripSearchHandler(state?.search?.cityName, checkInDate, searchVal.join(""));
  };

  const tourhandler = (val) => {
    let dateRange = [...val];
    dateRange[0].startDate = dateRange[0].endDate;
    setTourDate(dateRange);
  };

  const numOfPaxHandler = (type) => {
    let pax = numPax;
    if (type === "add") {
      setNumPax(+numPax + 1);
      pax += 1;
    } else {
      setNumPax(+numPax - 1);
      pax -= 1;
    }
    dispatch(numOfGuestHandlers(pax));
  };

  const handleChange = (event) => {
    let data = tripData?.getTrip?.startPoint.find(
      (item) => item?.name === event.target.value
    );

    if (startPoint === data._id) {
      setValue(null);
      setPickUpPrice(null);
      SetStartPoint(null);
    } else {
      setValue(event.target.value);
      setPickUpPrice(data?.price);
      SetStartPoint(data._id);
    }
  };

  return (
    <div className='hero_description'>
      <div className=' flex  justify-between items-center'>
        <div className='trip_hero_description mr-4'>
          <h1 className='text-primary font-bold font-Mulish'>
            {tripData?.getTrip?.name}
          </h1>
          <p className='text-primary text-base font-bold'>
            {tripData?.getTrip?.description}
          </p>
        </div>
        <div className='rounded trip_hero_amount '>
          <div className='bg-jetBlack p-2 pl-4 rounded'>
            <p className=' font-extrabold text-white text-base'>Starts @ </p>
            <h6 className=' font-semibold text-primary'>
              ₹{" "}
              <span className='text-xl font-extrabold'>
                {+tripData?.getTrip?.amount * numPax}
              </span>
            </h6>
          </div>
          <p
            onClick={() => setIsEnquiry(true)}
            className='bg-primary font-extrabold cursor-pointer text-base	px-4 py-1 trip_booking'
          >
            Enquire Now
          </p>
        </div>
      </div>
      <div className='bg-lightRed mt-8 rounded-lg	tripDesc_Container'>
        <div>
          <div className='factbox_container'>
            <div>
              <div className='flex flex-col justify-around items-center h-full hero_desc_left_container'>
                <p className='font-semibold my-2'>
                  {tripData?.getTrip?.name} Includes
                </p>
                <div className='mt-2 w-full flex justify-center'>
                  {tripData?.getTrip?.services?.map((item) => (
                    <div className='mx-2 text-center '>
                      <img
                        className='trip_desc_icons'
                        src={item?.icon}
                        alt={item?.name + "-icon"}
                      />
                      <p className='text-xs font-semibold'>{item?.name}</p>
                    </div>
                  ))}
                </div>
                <p className='my-2 text-soil opacity-0'>Know More</p>
              </div>
            </div>
            <div>
              <div className='flex flex-col hero_desc_right_container h-full'>
                {Object.keys(tripDescData)?.map((key) =>
                  key === "upperDesc" ? (
                    <div className='upper_desc grid grid-cols-4'>
                      {tripDescData[key]?.map((value) => (
                        <div className='flex p-3 inner_desc'>
                          <Grid container>
                            <Grid lg={3} xl={3}>
                              <div className='h-full flex justify-center items-center'>
                                <img
                                  className='trips_icons'
                                  src={value?.img}
                                  alt='duration'
                                />
                              </div>
                            </Grid>
                            <Grid lg={9} xl={9}>
                              <div>
                                <p className='font-semibold'>{value?.name}</p>
                                <h6 className='font-semibold  text-base'>
                                  {value?.value}
                                  {value?.val === "durationDays"
                                    ? " Days"
                                    : value?.val === "paxGroup"
                                    ? " Pax"
                                    : value?.val === "altitude"
                                    ? " Ft"
                                    : ""}
                                </h6>
                              </div>
                            </Grid>
                          </Grid>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className='lower_desc flex grid grid-cols-4'>
                      {tripDescData[key]?.map((value) =>
                        value?.name === "Location" ? (
                          <div className='flex p-3 pb-1 inner_desc '>
                            <Grid container>
                              <Grid lg={3} xl={3}>
                                <div className='h-full flex justify-center items-center'>
                                  <img
                                    className='trips_icons'
                                    src={value?.img}
                                    alt='location'
                                  />
                                </div>
                              </Grid>
                              <Grid lg={9} xl={9}>
                                <div>
                                  <p className='font-semibold trip_location_dex'>
                                    Location
                                  </p>
                                  <div className=' '>
                                    <h6 className='font-semibold  text-base mt-1'>
                                      {value?.value?.region}{" "}
                                    </h6>
                                  </div>
                                </div>
                              </Grid>
                            </Grid>
                          </div>
                        ) : (
                          <div className='flex p-3 inner_desc'>
                            <Grid container>
                              <Grid lg={3} xl={3}>
                                <div className='h-full flex justify-center items-center'>
                                  {value?.val === "it-eq" ? (
                                    <GetAppIcon
                                      fontSize='large'
                                      className='text-orange'
                                    />
                                  ) : (
                                    <img
                                      className='trips_icons'
                                      src={value?.img}
                                      alt='trips_icons'
                                    />
                                  )}
                                </div>
                              </Grid>
                              <Grid lg={9} xl={9}>
                                <div>
                                  <p className='font-semibold'>{value?.name}</p>
                                  {value?.val === "it-eq" ? (
                                    <a
                                      className='font-semibold  text-base text-soil download_link'
                                      target='_blank'
                                      rel='noreferrer'
                                      href={
                                        tripData?.getTrip?.itineraryDetails?.url
                                      }
                                      download
                                    >
                                      Download
                                    </a>
                                  ) : (
                                    <h6 className='font-semibold  text-base '>
                                      {value?.val === "rating"
                                        ? ""
                                        : value?.val === "minAge"
                                        ? bestLocation
                                        : value?.value}
                                      {value?.val === "minAge" ? (
                                        <p className='text-xs trip_location_dex'></p>
                                      ) : value?.val === "rating" ? (
                                        <CustomRating rating={value?.value} />
                                      ) : (
                                        ""
                                      )}
                                    </h6>
                                  )}
                                </div>
                              </Grid>
                            </Grid>
                          </div>
                        )
                      )}
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        onClick={() => setIsEnquiry(true)}
        className='fixed right-0	top-1/3	bg-primary rounded-tl-sm rounded-bl-sm font-bold z-10 cursor-pointer'
      >
        {enquiryText?.map((item) => (
          <div className=''>
            <p className='py-0.5 px-2 text-base text-center'>{item}</p>
          </div>
        ))}
      </div>
      <EnquiryModal isEnquiry={isEnquiry} setIsEnquiry={setIsEnquiry} />
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
      <SimpleModal
        open={openDateModal}
        handleOpen={() => setOpenDateModal(true)}
        handleClose={() => setOpenDateModal(false)}
      >
        <div className=' flex'>
          <div className='p-4'>
            <div className='flex items-center justify-between'>
              <h4>Select Date</h4>
              <div className='flex items-center'>
                <p className='mr-1'>No. of Pax</p>
                <div className='flex items-center'>
                  <p
                    onClick={() => numPax > 1 && numOfPaxHandler("sub")}
                    className='remove_button'
                  >
                    -
                  </p>
                  <p className='p-1'>{numPax}</p>
                  <p
                    onClick={() => numOfPaxHandler("add")}
                    className='add_remove_button bg-primary'
                  >
                    +
                  </p>
                </div>
              </div>
            </div>
            <div>
              <DatePicker
                tourDate={tourDate}
                onChange={(val) => tourhandler(val)}
              />
            </div>
            <div className='flex items-center justify-between'>
              <div className='flex items-center'>
                <p className='font-bold text-xl'>
                  ₹ {(tripData?.getTrip?.amount + pickUpPrice) * numPax}
                </p>
              </div>
              <div className='flex'>
                <div className='mr-2'>
                  <Button
                    bgColor={clear}
                    color={Black}
                    padding={"1.2rem 1rem"}
                    fontWeight={800}
                    borderRadius={6}
                    label='Cancel'
                    onClick={() => setOpenDateModal(false)}
                    width={"100%"}
                  />
                </div>
                <Button
                  bgColor={Primary}
                  color={Black}
                  padding={"1.2rem 1rem"}
                  fontWeight={800}
                  borderRadius={6}
                  label='Book'
                  onClick={() => bookTripHandler()}
                  width={"100%"}
                  isLoading={loading}
                />
              </div>
            </div>
          </div>
          <div className='bg-primary p-4 '>
            <div>
              <p className='font-bold text-lg mb-4'>Starting Point</p>
            </div>

            <RadioGroup aria-label='gender' name='gender1' value={value}>
              {tripData?.getTrip?.startPoint?.map((item) => (
                <FormControlLabel
                  value={item?.name}
                  control={<Radio onClick={handleChange} />}
                  label={item?.name}
                />
              ))}
            </RadioGroup>
          </div>
        </div>
      </SimpleModal>
    </div>
  );
}

export default HeroDescription;

// <p
//   onClick={() => sendDataHandler()}
//   className='bg-primary font-extrabold cursor-pointer text-base	px-4 py-1 trip_booking'
// >
//   BOOK NOW
// </p>;
