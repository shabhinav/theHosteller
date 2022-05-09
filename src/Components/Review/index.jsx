import React, { useEffect, useState } from "react";
import "./index.scss";
import HostelDetail from "./HostelDetail/HostelDetail";
import Amount from "./Amount/Amount";
import Frame from "../../Assets/images/Frame.png";
import { eventTracker, extractUrl } from "../../Utils/utils";
import { useSelector } from "react-redux";

function Review() {
  const location = window.location.href;
  const countryCode = sessionStorage.getItem("countryCode");
  const hostelDetails = useSelector((state) => state.search);
  const [url, setUrl] = useState();
  const [id, setId] = useState("");

  let path = window.location.pathname;
  let email = sessionStorage.getItem("userEmail");
  let phone = sessionStorage.getItem("userNum");

  useEffect(() => {
    let url = extractUrl(location);
    if (url) {
      eventTracker("webengage", "booking_completed", {
        status: url === "true" ? "Success" : "Failure",
        ProductName:
          hostelDetails?.searchedHostelDetails?.getHostelDetails?.name,
        ProductType: hostelDetails?.searchType,
      });
    }
    setUrl(url);
  }, [location]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const myDatahandler = (id) => {
    setId(id);
  };

  return (
    <div>
      {path !== "/orders" ? (
        <div className='flex  m-3 view_container xs:hidden mt-5'>
          <div className='-ml-4 mr-2 p-3 review_step_one'>
            <h6 className='font-bold'>Review Your Hostel Details</h6>
          </div>
          <div className='p-3 review_step_two'>
            <h6 className='font-bold	'>Guest Details and Payment</h6>
          </div>
        </div>
      ) : (
        url && (
          <div
            className={`2xl:container 2xl:mx-auto relative ${
              url === "true" ? "bg-primary700" : "bg-danger"
            } justify-between`}
          >
            <div className='  view_container  flex justify-between items-end'>
              <div className='xl:pl-32 pb-16 xs:pt-8'>
                <h3 className='font-semibold  text-black'>
                  Booking {url === "true" ? "Successful" : "Failed"}
                </h3>
                <h5 className='text-black font-bold my-2'>
                  Thank you for booking{" "}
                  {hostelDetails?.searchType === "Trips"
                    ? hostelDetails?.searchDetails?.Search?.searchResults?.name
                    : hostelDetails?.searchedHostelDetails?.getHostelDetails
                        ?.name}
                </h5>
                <p className='text-black'>Confirmation Sent to {email}.</p>
              </div>
              <div>
                <img className='pr-32 xs:hidden' src={Frame} alt='bg_imag' />
              </div>
            </div>
          </div>
        )
      )}
      {path !== "/orders" && (
        <div className='view_container'>
          <h4 className='font-bold mt-12 mb-4 -ml-4 xs:hidden'>
            Review Itinerary
          </h4>
        </div>
      )}
      <div
        className={`flex review_container 	 ${path === "/orders" && "-mt-9"}`}
      >
        <div className='hostel_details_container'>
          <HostelDetail myDatahandler={myDatahandler} />
        </div>
        <div className='hostel_price_container xs:hidden sm:hidden'>
          <Amount />
        </div>
      </div>
    </div>
  );
}

export default Review;
