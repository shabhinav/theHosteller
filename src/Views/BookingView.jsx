import React from "react";
import Booking from "../Components/Booking/Booking";
import Meta from "../Components/Common/Meta/Meta";

function BookingView() {
  return (
    <div className='2xl:container 2xl:mx-auto'>
      <Meta
        title={"Your Booking Data"}
        description={"Your Booking is Successfull"}
      />
      <Booking />
    </div>
  );
}

export default BookingView;
