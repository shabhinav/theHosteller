import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import { hoverType, productType } from "../Resources/constants/common";
import { useDispatch } from "react-redux";
import {
  useGetByUrl,
  usePostSearchedData,
  useSeoUrl,
  useTripSearch,
} from "../Services/datasource";
import Toast from "../Components/Common/Toast/Toast";
import {
  checkInDateHandler,
  checkOutDateHandler,
  cityNameHandler,
  searchDetailsHandler,
  searchTypeHandler,
} from "../Redux/search/search.action";
import { dateConverter, seoUrlHandler } from "../Utils/utils";
import { addDays } from "date-fns";

let productTypeObj = {
  Hostel: "Hostels",
  Trip: "Trips",
  Workation: "Workations",
};

const SearchView = () => {
  const dispatch = useDispatch();
  const { type, name } = useParams();
  const history = useHistory();
  const { loading, error, data, refetch } = useGetByUrl(`/${type}/${name}`);
  const [openToast, setOpenToast] = useState(false);
  const [
    tripSearchHandler,
    { data: tripData, loading: tripLoading, tripError },
  ] = useTripSearch();
  const [
    sendSearchedData,
    { data: myData, error: hostelData, loading: hostelLoading },
  ] = usePostSearchedData();
  const [seoHandler] = useSeoUrl();

  const urlRedirectHandler = (url) => {
    seoUrlHandler(productTypeObj[data?.getByUrl?.productType], history, url);
  };
  useEffect(() => {
    if (data?.getByUrl?.productType === "Trip" && tripData?.Search) {
      sessionStorage.setItem("sessionId", tripData?.Search?.sessionId);
      dispatch(searchDetailsHandler(tripData));
      urlRedirectHandler(tripData?.Search?.sessionId);
    } else {
      if (myData?.Search) {
        sessionStorage.setItem("sessionId", myData?.Search?.sessionId);
        dispatch(searchDetailsHandler(myData));
        urlRedirectHandler(myData?.Search?.url);
      } else if (error || tripError) {
        dispatch(searchDetailsHandler([]));
        sessionStorage.setItem("sessionId", error?.message);
        setOpenToast(true);
        // setErrorMessage(error?.message);
        urlRedirectHandler(error?.message);
      } else if (
        (tripData && !tripData?.search) ||
        (myData && !myData?.Search)
      ) {
        dispatch(searchDetailsHandler([]));
        sessionStorage.setItem("sessionId", "No room Available");
        error?.message("No room Available");
        urlRedirectHandler("No room Available");
      }
    }
  }, [myData, tripData, error, tripError]);

  useEffect(() => {
    // if (data?.getByUrl?.productType) {
    //   dispatch(cityNameHandler(data?.getByUrl?.id));
    //   let checkindate = dateConverter(new Date(), "dd-mm-yyyy");
    //   dispatch(checkInDateHandler(checkindate));
    //   if (data?.getByUrl?.productType === "Trip") {
    //     dispatch(searchTypeHandler("Trips"));
    //     sendSearchedData(
    //       undefined,
    //       checkindate,
    //       "",
    //       1,
    //       data?.getByUrl?.productType,
    //       data?.getByUrl?.id
    //     );
    //   } else if (data?.getByUrl?.productType === "Workation") {
    //     dispatch(searchTypeHandler("Workations"));
    //     let checkoutdate = dateConverter(addDays(new Date(), 7), "dd-mm-yyyy");
    //     dispatch(checkOutDateHandler(checkoutdate));
    //     sendSearchedData(
    //       data?.getByUrl?.id,
    //       checkindate,
    //       checkoutdate,
    //       1,
    //       data?.getByUrl?.productType
    //     );
    //   } else if (data?.getByUrl?.productType === "Hostel") {
    //     dispatch(searchTypeHandler("Hostels"));
    //     let checkoutdate = dateConverter(addDays(new Date(), 1), "dd-mm-yyyy");
    //     dispatch(checkOutDateHandler(checkoutdate));
    //     sendSearchedData(
    //       data?.getByUrl?.id,
    //       checkindate,
    //       checkoutdate,
    //       1,
    //       data?.getByUrl?.productType
    //     );
    //   }
    // } else if (error) {
    //   setOpenToast(true);
    //   setTimeout(() => {
    //     history.push("/");
    //   }, 2000);
    // }
  }, [data, error]);

  return (
    <div className='h-screen  flex justify-center items-center'>
      <CircularProgress />
      <div className='absolute'>
        <Toast
          handleClose={() => setOpenToast(false)}
          open={openToast}
          severity='error'
          message={"Invalid Url"}
        />
      </div>
    </div>
  );
};

export default SearchView;
