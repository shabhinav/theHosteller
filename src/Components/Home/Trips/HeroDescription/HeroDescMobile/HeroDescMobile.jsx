import React, { useEffect, useState } from "react";
import Camping from "../../../../../Assets/Icons/camping.png";
import Duration from "../../../../../Assets/Icons/duration.png";
import Group from "../../../../../Assets/Icons/group.png";
import Height from "../../../../../Assets/Icons/height.png";
import Location from "../../../../../Assets/Icons/location.png";
import Rating from "../../../../../Assets/Icons/rating.png";
import Age from "../../../../../Assets/Icons/age.png";
import Difficulty from "../../../../../Assets/Icons/def.svg";
import { tripsDescContainer } from "../../../../../Resources/constants/common";
import "./HeroDescMobile.scss";
import Grid from "@material-ui/core/Grid";
import { saveCartDataHandler } from "../../../../../Redux/cart/cart.action";
import {
  useIsAuth,
  useTripBooking,
  useTripSearch,
} from "../../../../../Services/datasource";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import SimpleModal from "../../../../Common/Modal/Modal";
import GuestLogin from "../../../../GuestLogin/GuestLogin";
import SignIn from "../../../../SignIn/SignIn";
import CustomDrawer from "../../../../Common/Drawer/Drawer";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import EnquiryModal from "../../EnquiryModal/EnquiryModal";
import GetAppIcon from "@material-ui/icons/GetApp";
import { addDays } from "date-fns";
import {
  numOfGuestHandlers,
  searchDetailsHandler,
} from "../../../../../Redux/search/search.action";
import DatePicker from "../../../../Common/Datepicker/DatePicker";
import Button from "../../../../Common/Button/Button";
import { dateConverter } from "../../../../../Utils/utils";
import { useParams } from "react-router-dom";
import { colorPallete } from "../../../../../Resources/theme";
import Dropdown from "../../../../Common/DropDown/Dropdown";
import CustomRating from "../../../../Common/Rating/Rating";

function HeroDescMobile({ tripData }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  const [tripSearchHandler, { data: mytripData }] = useTripSearch();
  const { error: authError, data: isAuth, refetch: authRefetch } = useIsAuth();
  const [tripBookingHandler, { loading, error, data, refetch }] =
    useTripBooking();

  const sessionId = sessionStorage.getItem("sessionId");
  const state = useSelector((state) => state);
  const [tripDescData, setTripDescData] = useState([]);
  const [showSignUp, setShowSignUp] = useState(false);
  const [guestLogin, setGuestLogin] = useState(false);
  const [isEnquiry, setIsEnquiry] = useState(false);
  const [openDateModal, setOpenDateModal] = useState(false);
  const [bestLocation, setBestLocation] = useState();
  const [startPoint, SetStartPoint] = useState("");
  const [value, setValue] = React.useState("");
  const [pickUpPrice, setPickUpPrice] = useState(0);

  const [numPax, setNumPax] = useState(state?.search?.numOfGuest);
  const [drawer, setDrawer] = useState({
    bottom: false,
  });

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

  const { Black, Primary, clear } = colorPallete;

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
    if (tripData?.getTrip) {
      let tripsDescContainerClone = JSON.parse(
        JSON.stringify(tripsDescContainer)
      );
      Object.keys(tripsDescContainerClone)?.map((key) =>
        tripsDescContainerClone[key]?.map((item, index) => {
          item.value = tripData.getTrip[item.val];
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
        })
      );
      setTripDescData(tripsDescContainerClone);
    }
  }, [tripData]);

  // useEffect(() => {
  //   if (mytripData) {
  //     dispatch(searchDetailsHandler(mytripData));
  //     dispatch(saveCartDataHandler([{ name: "a", adults: numPax }]));
  //     let checkInDate = dateConverter(tourDate[0]?.startDate, "dd-mm-yyyy");
  //     tripBookingHandler(
  //       checkInDate,
  //       state.search.cityName,
  //       Number(numPax),
  //       startPoint
  //     );
  //   }
  // }, [mytripData]);

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

  const tourhandler = (val) => {
    let dateRange = [...val];
    dateRange[0].startDate = dateRange[0].endDate;
    setTourDate(dateRange);
  };

  const bookTripHandler = () => {
      const searchVal = state.search.searchType.split("");
      searchVal.pop();
      let checkInDate = dateConverter(tourDate[0]?.startDate, "dd-mm-yyyy");
      // tripSearchHandler(
      //   state?.search?.cityName,
      //   checkInDate,
      //   searchVal.join("")
      // );
  };

  const sendDataHandler = () => {
    if (isAuth?.isAuth) {
      setOpenDateModal(true);
    } else {
      setShowSignUp(true);
    }
  };

  const handleChange = (val) => {
    let data = tripData?.getTrip?.startPoint.find((item) => item?._id === val);
    setValue(val);
    setPickUpPrice(data?.price);
    SetStartPoint(data._id);
  };

  return (
    <div>
      <div>
        <h4>{tripData?.getTrip?.name}</h4>
        <p className='mt-2'> {tripData?.getTrip?.description} </p>
      </div>
      <div className='grid grid-cols-2 gap-2 mt-3'>
        <div className=' flex flex-col items-center justify-center upper-Container py-2'>
          <p>From</p>
          <h4 className=''>₹ {tripData?.getTrip?.amount}</h4>
        </div>
        <div className='grid grid-rows-1 gap-1 text-center'>
          <div
            onClick={() => setIsEnquiry(true)}
            className='bg-primary font-extrabold flex flex-col items-center justify-center upper-Container'
          >
            Enquire Now
          </div>
        </div>
      </div>
      <div className='fact_box_container mt-3'>
        <div className='grid grid-cols-2  '>
          {Object.keys(tripDescData)?.map((item) =>
            tripDescData[item]?.map((val) =>
              val?.val === "minAge" ||
              val?.val === "paxGroup" ||
              val?.val === "it-eq" ||
              val?.val === "level" ? (
                <div className='bg-lightRed  fact_box_grp py-1'>
                  <p className='text-center font-bold'>{val?.name}</p>

                  {val?.val === "it-eq" ? (
                    <p className='text-center -mt-1'>
                      <a
                        className='font-semibold  text-base text-soil download_link text-center'
                        target='_blank'
                        rel='noreferrer'
                        href={tripData?.getTrip?.itineraryDetails?.url}
                        download
                      >
                        Download
                      </a>
                    </p>
                  ) : val?.val === "minAge" ? (
                    <p className='text-center'>{bestLocation}</p>
                  ) : (
                    <p className='text-center'>
                      {val?.value} {val?.postfix}
                    </p>
                  )}
                </div>
              ) : (
                ""
              )
            )
          )}
        </div>
        <div className='grid grid-cols-3 '>
          {Object.keys(tripDescData)?.map((item) =>
            tripDescData[item]?.map((val) =>
              val?.val === "rating" ||
              val?.val === "durationDays" ||
              val?.val === "altitude" ? (
                <div className='bg-lightRed factbox_lower_desc  py-1'>
                  <p className='text-center font-bold'>{val?.name}</p>

                  {val?.val === "it-eq" ? (
                    <p className='text-center'>Download</p>
                  ) : (
                    <p className='text-center'>
                      {val?.value} {val?.postfix}
                    </p>
                  )}
                </div>
              ) : (
                ""
              )
            )
          )}
        </div>
      </div>
      <CustomDrawer
        position={"bottom"}
        state={drawer}
        setState={(val) => setDrawer(val)}
        label={""}
      >
        <div>
          <div className='flex items-center py-4 ml-2'>
            <ArrowBackIcon
              className='mr-2'
              onClick={() => setDrawer({ bottom: false })}
            />
            <h5>Details</h5>
          </div>
          <div className='grid grid-cols-2 gap-2 pb-40 mx-4'>
            {Object.keys(tripDescData).map((item) =>
              tripDescData[item].map((val) => (
                <div className='bg-lightRed mobile_grid_styling flex flex-col items-center'>
                  <Grid container>
                    <Grid item xs={3}>
                      {val?.val === "it-eq" ? (
                        <GetAppIcon fontSize='large' className='text-orange' />
                      ) : (
                        <img src={val?.img} alt='Camping' />
                      )}
                    </Grid>
                    <Grid item xs={9}>
                      <p className='ml-3 text-base font-semibold'>
                        {val?.name}
                      </p>
                    </Grid>
                  </Grid>
                  <Grid container>
                    <Grid item xs={3}></Grid>
                    <Grid item xs={9}>
                      {val?.name === "Location" ? (
                        <div>
                          <div className=' '>
                            <p className='text-left ml-3 text-xs'>
                              {val?.value?.region}
                            </p>
                          </div>
                        </div>
                      ) : val?.val === "it-eq" ? (
                        <a
                          className='font-semibold -ml-5  text-base text-soil download_link'
                          target='_blank'
                          rel='noreferrer'
                          href={tripData?.getTrip?.itineraryDetails?.url}
                          download
                        >
                          Download
                        </a>
                      ) : val?.val === "minAge" ? (
                        <p className='text-left ml-3'>{bestLocation}</p>
                      ) : val?.val === "rating" ? (
                        <CustomRating rating={val?.value} />
                      ) : (
                        <p className='text-left ml-3'>
                          {val?.value} {val?.postfix}
                        </p>
                      )}
                    </Grid>
                  </Grid>
                </div>
              ))
            )}
          </div>
        </div>
      </CustomDrawer>

      <SimpleModal
        open={guestLogin}
        handleOpen={() => setGuestLogin(true)}
        handleClose={() => setGuestLogin(false)}
      >
        <GuestLogin
          refetch={refetch}
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
      <EnquiryModal isEnquiry={isEnquiry} setIsEnquiry={setIsEnquiry} />
      <SimpleModal
        open={openDateModal}
        handleOpen={() => setOpenDateModal(true)}
        handleClose={() => setOpenDateModal(false)}
      >
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
          <div className='mt-4'>
            <Dropdown
              handleChange={(value) => {
                handleChange(value.target.value);
              }}
              data={tripData?.getTrip?.startPoint}
              label={"Starting Point "}
              type='outlined'
              isLabel={true}
              use='payment'
              width='100%'
              margin={"8px 8px 8px 0px"}
            />
          </div>
          <DatePicker
            tourDate={tourDate}
            onChange={(val) => tourhandler(val)}
          />
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
                  onClick={() => {
                    setOpenDateModal(false);
                    setValue(null);
                    setPickUpPrice(null);
                    SetStartPoint(null);
                  }}
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
      </SimpleModal>
    </div>
  );
}

export default HeroDescMobile;

// <div
//   onClick={() => sendDataHandler()}
//   className='bg-lightRed border-solid border border-light-blue-400 py-3 font-extrabold'
// >
//   BOOK NOW
// </div>;

// {tripData?.getTrip?.services?.map((item) => (
//   <div className='bg-lightRed mobile_grid_styling flex items-center justify-center'>
//     <img src={item?.icon} alt='Camping' />
//     <p className='ml-2'>{item?.name}</p>
//   </div>
// ))}
