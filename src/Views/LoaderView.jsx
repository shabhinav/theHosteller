import CircularProgress from "@material-ui/core/CircularProgress";
import React, { useEffect } from "react";
import { useBookingStatusHandler } from "../Services/datasource";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

const LoaderView = () => {
  const history = useHistory();
  const { id } = useParams();
  const state = useSelector((state) => state);
  const [bookingStatusHandler] = useBookingStatusHandler();

  useEffect(() => {
    if (state?.search?.searchType === "Trips") {
      handlePolling("", id);
    } else {
      handlePolling(id, "");
    }
  }, []);

  const handlePolling = (bookingId, tripId) => {
    let lapseTime = 420000;

    setInterval(() => {
      lapseTime -= 1000;
    }, 1000);

    let timeout;
    const request = () => {
      clearTimeout(timeout);

      const checkStatus = () => {
        bookingStatusHandler(bookingId, tripId)
          .then((response) => {
            const data = response.data?.getBookingStatusById;
            if (data?.status === "confirm") {
              history.push("/orders?payment=true");
            } else if (data?.status === "failure") {
              history.push("/orders?payment=false");
            } else if (!data?.status || lapseTime <= 0) {
              history.push("/error");
            } else {
              request();
            }
          })
          .catch((error) => {
            if (lapseTime <= 0) {
              history.push("/error");
            } else {
              request();
            }
          });
      };
      timeout = setTimeout(checkStatus, 2000);
    };

    request();
  };

  return (
    <div className='h-screen flex justify-center items-center'>
      <CircularProgress />
    </div>
  );
};

export default LoaderView;
