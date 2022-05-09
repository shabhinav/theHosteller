import React from "react";
import Meta from "../Components/Common/Meta/Meta.jsx";
import ReviewContainer from "../Components/Review/index.jsx";

function ReviewView() {
  return (
    <div className='2xl:container mx-auto'>
      <Meta
        title={"Review your Booking"}
        description='Check your Booking Details here'
      />
      <ReviewContainer />
    </div>
  );
}

export default ReviewView;
