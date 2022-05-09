import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";
import {
  useCancelBooking,
  useGetProfileDetails,
  useBookingData,
  useIsAuth,
} from "../../Services/datasource";
import "./Booking.scss";
import { bookingTypeData, Months } from "../../Resources/constants/common";
import SimpleModal from "../Common/Modal/Modal";
import ConfirmCancellation from "./ConfirmCancellation";
import Empty from "../../Assets/Icons/empty.png";
import hostel from "../../Assets/Icons/hostel.png";
import workation from "../../Assets/Icons/workation.png";
import trip from "../../Assets/Icons/trip.png";
import hostelBooking from "../../Assets/Icons/hostelbooking.png";
import workationBooking from "../../Assets/Icons/workationbooking.png";
import tripbooking from "../../Assets/Icons/tripbooking.png";
import { useHistory } from "react-router";
import AddReview from "./AddReview";
import { pluralHandler } from "../../Utils/utils";

let imgArray = [hostel, workation, trip];

const useStyles = makeStyles((theme) => ({
  large: {
    width: "100px",
    height: "100px",
    color: "white",
    backgroundColor: "black",
  },
}));

const bookingTypeImage = {
  WORKATION: workationBooking,
  TRIP: tripbooking,
  HOSTEL: hostelBooking,
};

function Booking() {
  const history = useHistory();
  const data = ["UPCOMING", "CANCELLED", "COMPLETED"];
  const userName = localStorage.getItem("userName");
  const prefix = localStorage.getItem("prefix");
  const classes = useStyles();
  const { data: userData, loading } = useGetProfileDetails();
  const [selected, setSelected] = useState("UPCOMING");
  const [bookingType, setBookingType] = useState("HOSTEL");
  const [bookingData, setBookingData] = useState([]);
  const [showSignUp, setShowSignUp] = useState(false);
  const [reviewModal, setReviewModal] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [id, setId] = useState("");
  const { error: authError, data: isAuth, refetch: authRefetch } = useIsAuth();

  const [bookingDataHandler, { error, data: myBookingData, refetch }] =
    useBookingData();

  const [cancelBookingUserHandler, { data: cancelBookingData }] =
    useCancelBooking();

  useEffect(() => {
    if (!isAuth?.isAuth && !userData && !loading) {
      history.push("/");
    }
  }, [isAuth, history, userData, loading]);

  useEffect(() => {
    if (isAuth?.isAuth) {
      bookingDataHandler(bookingType, selected);
    }
  }, [isAuth?.isAuth]);

  useEffect(() => {
    if (cancelBookingData) {
      bookingDataHandler(bookingType, selected);
    }
  }, [cancelBookingData]);

  useEffect(() => {
    if (myBookingData?.userBookings?.bookingDetails) {
      let myBookingDataClone = JSON.parse(
        JSON.stringify(myBookingData?.userBookings?.bookingDetails)
      );
      myBookingDataClone?.sort((a, b) => {
        return new Date(b?.checkinDate) - new Date(a?.checkinDate);
      });
      setBookingData(myBookingDataClone);
    }
  }, [myBookingData]);

  const dateConverter = (date) => {
    let bookingDate = date.split("-").reverse();
    bookingDate[1] = Months[Number(bookingDate[1]) - 1];
    let booking = bookingDate.join(" ");
    return booking;
  };

  useEffect(() => {
    if (id) {
      let selectedItem = myBookingData?.userBookings?.bookingDetails?.find(
        (item) => {
          if (bookingType !== "TRIP") {
            return item?.bookingId === id;
          } else {
            return item?.tripId === id;
          }
        }
      );
      setSelectedData(selectedItem);
    }
  }, [id, myBookingData]);

  return (
    <div className='view_container'>
      <div>
        <h4 className='mb-8 mt-12 font-bold'>My Bookings</h4>
      </div>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={3}>
          <div className='profile_containers'>
            <div className='py-4 bg-primary'>
              <div className='flex justify-center'>
                {userData?.profile?.profilePhoto ? (
                  <Avatar
                    src={userData?.profile?.profilePhoto}
                    className={classes.large}
                    alt='profile image'
                  />
                ) : (
                  <Avatar className={classes.large}>a</Avatar>
                )}
              </div>
              <p className='mt-4 font-semibold text-center'>{userName}</p>
            </div>
            <div>
              {bookingTypeData?.map((item, index) => (
                <div
                  key={index}
                  onClick={() => {
                    bookingDataHandler(item?.value, selected);
                    setBookingType(item?.value);
                  }}
                  className={`py-3 px-2  cursor-pointer profile_container flex items-center ${
                    bookingType === item?.value ? "bg-primary" : ""
                  }`}
                >
                  <img src={imgArray[index]} alt='Side icons' />
                  <p className='ml-2'>{item?.name}</p>
                </div>
              ))}
            </div>
          </div>
        </Grid>
        <Grid item xs={12} sm={9}>
          <div>
            <div className='booking_grid'>
              {data?.map((item) => (
                <div
                  onClick={() => {
                    setSelected(item);
                    bookingDataHandler(bookingType, item);
                  }}
                  className={`${
                    selected === item ? "bg-primary" : "bg-cement"
                  } py-2 text-center cursor-pointer font-bold rounded-t-md	`}
                >
                  <p className='text-center'>{item}</p>
                </div>
              ))}
            </div>
            <div className='profile_containers'>
              {bookingData?.length ? (
                bookingData?.map((item) => (
                  <div className='w-full mt-4 hosteller_bookings'>
                    <div className='flex items-center justify-between px-4 pt-4'>
                      <div className='flex items-center'>
                        <div>
                          <img src={bookingTypeImage[bookingType]} alt='' />
                        </div>
                        <div className='ml-2 text-xs'>
                          <h5>
                            {bookingType === "TRIP"
                              ? item?.tripName
                              : item?.hostelName}
                          </h5>
                          <p className=' text-xs'>
                            Confirmation No - {item?.providerRefId}
                          </p>
                        </div>
                      </div>
                      <div>
                        <p className='text-grey'>
                          {item?.numberOfRooms}
                          {item?.numberOfRooms
                            ? pluralHandler(item?.numberOfRooms, " Room")
                            : ""}
                          , {item?.numberOfNights}{" "}
                          {item?.numberOfNights
                            ? pluralHandler(item?.numberOfNights, " Night")
                            : ""}
                        </p>
                      </div>
                    </div>
                    <div className='flex  justify-between p-4 items-center'>
                      <div className='flex'>
                        <div>
                          <p className='font-semibold'>CHECK - IN </p>
                          <h5 className='font-semibold py-2'>
                            {dateConverter(item?.checkinDate)}
                          </h5>
                          <p className='text-soil'> from 01:00 PM</p>
                        </div>
                        <div className='ml-4'>
                          <p className='font-semibold'>CHECK - OUT </p>
                          <h5 className='font-semibold py-2'>
                            {dateConverter(item?.checkoutDate)}
                          </h5>
                          <p className='text-soil'>till 11:00 AM</p>
                        </div>
                      </div>
                    </div>
                    <div className='px-4 pb-2'>
                      <p className='text-right'>
                        <span
                          onClick={() => {
                            setReviewModal(true);
                            setId(
                              bookingType === "TRIP"
                                ? item?.tripId
                                : item?.bookingId
                            );
                          }}
                          className='text-link cursor-pointer'
                        >
                          Add Review
                        </span>
                        {selected === "UPCOMING" ? " | " : ""}
                        {selected === "UPCOMING" ? (
                          <span
                            className='text-link cursor-pointer'
                            onClick={() => {
                              setId(
                                bookingType === "TRIP"
                                  ? item?.tripId
                                  : item?.bookingId
                              );
                              setShowSignUp(true);
                            }}
                          >
                            Cancel Booking
                          </span>
                        ) : (
                          ""
                        )}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className='text-center py-10'>
                  <div className='my-10'>
                    <img src={Empty} alt='No Booking' />
                  </div>
                  <div>
                    <h5 className='font-bold text-2xl'>
                      You've got no upcoming bookings
                    </h5>
                    <p className='text-sm text-grey text-center'>
                      When you book a trip, you will see your itinerary here.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Grid>
      </Grid>
      <SimpleModal
        open={showSignUp}
        handleOpen={() => setShowSignUp(true)}
        handleClose={() => setShowSignUp(false)}
      >
        <ConfirmCancellation
          handleClose={() => setShowSignUp(false)}
          cancel={cancelBookingUserHandler}
          id={id}
          item={selectedData}
          bookingType={bookingType}
          checkInDate={selectedData && dateConverter(selectedData?.checkinDate)}
          checkOutDate={
            selectedData && dateConverter(selectedData?.checkoutDate)
          }
        />
      </SimpleModal>
      <SimpleModal
        open={reviewModal}
        handleOpen={() => setReviewModal(true)}
        handleClose={() => setReviewModal(false)}
      >
        <AddReview
          handleClose={() => setReviewModal(false)}
          id={id}
          item={selectedData}
        />
      </SimpleModal>
    </div>
  );
}

export default Booking;

//line number 217

// <div>
//   <a
//     href={item?.invoiceUrl}
//     target='_blank'
//     rel='noreferrer'
//     download
//     className='text-link cursor-pointer'
//   >
//     Download Invoice
//   </a>
// </div>;

// line number 234
