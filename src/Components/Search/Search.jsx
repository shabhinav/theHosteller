import React, { useEffect, useLayoutEffect, useState } from "react";
import Dropdown from "../Common/DropDown/Dropdown";
import { colorPallete } from "../../Resources/theme";
import Button from "../Common/Button/Button";
import DateFnsUtils from "@date-io/date-fns";
import "./style.scss";
import {
  useGetHostelsList,
  usePostSearchedData,
  useSeoUrl,
  useTripSearch,
  useTripsSearchList,
  useGetByUrl,
} from "../../Services/datasource";
import {
  dateConverter,
  useWindowSize,
  seoUrlHandler,
  dateSplitter,
  eventTracker,
} from "../../Utils/utils";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import {
  checkInDateHandler,
  checkOutDateHandler,
  cityNameHandler,
  numOfGuestHandlers,
  searchDetailsHandler,
  groupBookingHandler,
  searchTypeHandler,
  searchLoader,
} from "../../Redux/search/search.action";
import { numPax } from "../../Resources/constants/Home";
import Toast from "../Common/Toast/Toast";
import SearchType from "./SearchType/SearchType";
import { addDays } from "date-fns";
import RadioButton from "../Common/Radio/Radio";
import { searchType } from "../../Resources/constants/Home";
import { roomData } from "../../Redux/cart/cart.action";
import { mobileScreen } from "../../Resources/constants/common";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { createTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/core/styles";
import { TextField } from "@material-ui/core";

const materialTheme = createTheme({
  overrides: {
    MuiPickersToolbar: {
      toolbar: {
        backgroundColor: "#ffe700",
        color: "black",
      },
    },
    MuiPickersCalendarHeader: {
      switchHeader: {
        backgroundColor: "white",
        color: "black",
      },
    },
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.up("xs")]: {
      boxShadow: ({ boxShadow }) => boxShadow,
      borderRadius: ({ borderRadius }) => borderRadius,
      backgroundColor: ({ backgroundColor }) => backgroundColor,
    },
    [theme.breakpoints.up("sm")]: {
      boxShadow: ({ boxShadow }) => boxShadow,
      borderRadius: ({ borderRadius }) => borderRadius,
      backgroundColor: ({ backgroundColor }) => backgroundColor,
    },
    [theme.breakpoints.up("lg")]: {
      boxShadow: ({ boxShadow }) => boxShadow,
      borderRadius: ({ borderRadius }) => borderRadius,
      zIndex: ({ zIndex }) => zIndex,
      backgroundColor: ({ backgroundColor }) => backgroundColor,
    },
    [theme.breakpoints.up("xl")]: {
      boxShadow: ({ boxShadow }) => boxShadow,
      borderRadius: ({ borderRadius }) => borderRadius,
      zIndex: ({ zIndex }) => zIndex,
      backgroundColor: ({ backgroundColor }) => backgroundColor,
    },
  },
  mainContainer: {
    [theme.breakpoints.up("lg")]: {
      marginTop: ({ marginTop }) => marginTop,
    },
  },
}));
let counter = 0;

function Search({
  boxShadow,
  borderRadius,
  zIndex,
  backgroundColor,
  marginTop,
  type,
  buttonText,
  isLabel,
  search,
  setClearCart,
  initialCheckInDate,
  initialCheckOutDate,
  searchedType,
  setSelectedType,
  setId: setHostelId,
  Id,
}) {
  const classes = useStyles({
    boxShadow,
    borderRadius,
    zIndex,
    backgroundColor,
    marginTop,
  });
  const { mobile, tablet, monitor } = mobileScreen;
  let [innerWidth] = useWindowSize();
  const pathname = window.location.pathname;
  const isMobile = innerWidth < mobile;
  const isTablet = innerWidth > mobile && innerWidth < tablet;
  const isMonitor = innerWidth > monitor;
  const { Black, Primary700 } = colorPallete;
  const history = useHistory();
  const dispatch = useDispatch();
  const searchData = useSelector((state) => state.search);
  const state = useSelector((state) => state);
  const { data: hostelListData } = useGetHostelsList();
  const { data: tripsListData } = useTripsSearchList();
  const [sendSearchedData, { data, error, loading }] = usePostSearchedData();
  const [numOfPax, setNumOfPax] = useState(searchData?.numOfGuest);
  const [checkInDate, setCheckInDate] = useState(searchData?.checkInDate);
  const [checkOutDate, setCheckOutDate] = useState(searchData?.checkOutDate);
  const [openToast, setOpenToast] = React.useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [openCheckIn, setOpenCheckIn] = useState(false);
  const [openCheckOut, setOpenCheckOut] = useState(false);
  const [
    sendUrlHandler,
    {
      loading: searchByUrlLoading,
      error: searchByUrlError,
      data: searchByUrlData,
      refetch: searchByUrlRefetch,
    },
  ] = useGetByUrl();

  const [
    tripSearchHandler,
    { loading: tripLoading, error: tripError, data: tripData, refetch },
  ] = useTripSearch();

  useEffect(() => {
    if (pathname && pathname !== "/" && !counter) {
      sendUrlHandler(pathname);
      counter++;
    }
  }, [pathname]);

  useEffect(() => {
    dispatch(searchLoader(tripLoading || loading));
  }, [tripLoading, loading]);

  useEffect(() => {
    if (pathname === "/" && initialCheckInDate && initialCheckOutDate) {
      setCheckIn(initialCheckInDate.toISOString());
      setCheckInDate(dateConverter(initialCheckInDate, "dd-mm-yyyy"));
      setCheckOut(initialCheckOutDate.toISOString());
      setCheckOutDate(dateConverter(initialCheckOutDate, "dd-mm-yyyy"));
    }
  }, [initialCheckInDate, initialCheckOutDate, pathname]);

  useEffect(() => {
    if (isMobile && initialCheckInDate && initialCheckOutDate) {
      setCheckIn(initialCheckInDate.toISOString());
      setCheckInDate(dateConverter(initialCheckInDate, "dd-mm-yyyy"));
      setCheckOut(initialCheckOutDate.toISOString());
      setCheckOutDate(dateConverter(initialCheckOutDate, "dd-mm-yyyy"));
    }
  }, [isMobile, initialCheckInDate, initialCheckOutDate]);

  useEffect(() => {
    let checkin = null;
    let checkout = null;
    if (
      pathname.includes("hostels") ||
      pathname.includes("workations") ||
      pathname.includes("book") ||
      checkInDate ||
      checkOutDate
    ) {
      let checkinDate = checkInDate
        ? new Date(dateSplitter(checkInDate))
        : new Date();
      let checkoutDate = checkOutDate
        ? new Date(dateSplitter(checkOutDate))
        : pathname.includes("hostels")
        ? addDays(new Date(checkinDate), 1)
        : addDays(new Date(checkinDate), 7);
      checkin = new Date(checkinDate);
      checkout = new Date(checkoutDate);
      checkin.setHours(0, 0, 0, 0);
      checkout.setHours(0, 0, 0, 0);
      setCheckIn(checkinDate?.toISOString());
      if (checkin >= checkout) {
        setCheckOut(null);
      } else {
        setCheckOut(checkoutDate.toISOString());
      }
    }
  }, [checkInDate, checkOutDate, pathname, searchData]);

  useEffect(() => {
    dispatch(groupBookingHandler(false));
  }, []);

  useLayoutEffect(() => {
    if (data?.Search?.sessionId && !loading) {
      // setTimeout(() => {
      //   const element = document.getElementById("my_room");
      //   element.scrollIntoView({
      //     block: "start",
      //     behavior: "smooth",
      //   });
      // }, 2500);
    }
  }, [data, loading, pathname]);

  useEffect(() => {
    if (searchData?.checkInDate || searchData?.checkOutDate) {
      setCheckInDate(searchData?.checkInDate);
      setCheckOutDate(searchData?.checkOutDate);
    }
  }, [searchData?.checkInDate, searchData?.checkOutDate]);

  useEffect(() => {
    if (numOfPax) {
      dispatch(numOfGuestHandlers(numOfPax));
    }
  }, [numOfPax, dispatch, data, loading, error]);

  const urlRedirectHandler = (url) => {
    seoUrlHandler(state?.search?.searchType, history, url);
  };

  useEffect(() => {
    if (data) {
      sessionStorage.setItem("sessionId", data?.Search?.sessionId);
      dispatch(searchDetailsHandler(data));
      urlRedirectHandler(data?.Search?.url);
    }
    if (tripData) {
      sessionStorage.setItem("sessionId", tripData?.Search?.sessionId);
      dispatch(searchDetailsHandler(tripData));
      urlRedirectHandler(tripData?.Search?.sessionId);
    }
    if (error || tripError) {
      dispatch(searchDetailsHandler([]));
      sessionStorage.setItem("sessionId", error?.message || tripError?.message);
      setErrorMsg(error.message || error?.tripError);
      setOpenToast(true);
      urlRedirectHandler(error.message || error?.tripError);
    }
  }, [data, tripData]);

  const onChangeDateHandler = (type, date) => {
    let checkin = null;
    let checkout = null;
    if (type === "checkInDate") {
      setCheckIn(date);
      checkin = new Date(date);
      checkout = new Date(checkOut);
      checkin.setHours(0, 0, 0, 0);
      checkout.setHours(0, 0, 0, 0);
      setCheckInDate(dateConverter(date, "dd-mm-yyyy"));
      dispatch(checkInDateHandler(dateConverter(date, "dd-mm-yyyy")));

      if (checkin.getTime() >= checkout.getTime()) {
        setCheckOut(null);
        dispatch(checkOutDateHandler(null));
      }
    } else if (type === "checkOutDate") {
      setCheckOut(date);
      setCheckOutDate(dateConverter(date, "dd-mm-yyyy"));
      dispatch(checkOutDateHandler(dateConverter(date, "dd-mm-yyyy")));
    }
  };

  // useEffect(() => {
  //   if (id) {
  //     dispatch(cityNameHandler(id));
  //   }
  // }, [id]);

  const handleSubmit = () => {
    const searchVal = search.split("");
    searchVal.pop();
    dispatch(roomData([]));

    let productData =
      state?.search?.searchType === "Trips"
        ? tripsListData?.getTripList
        : hostelListData?.getHostelList;

    let findData = productData?.find(
      (item) => item._id === searchData?.cityName
    );

    if (
      searchData?.cityName &&
      (checkInDate || checkOutDate) &&
      numOfPax &&
      findData
    ) {
      eventTracker(
        "webengage",
        !(
          pathname.includes("hostels") ||
          pathname.includes("workations") ||
          pathname.includes("book")
        )
          ? "modify_search"
          : "Product_searchbar_click",
        {
          ProductName: findData?.name,
          ProductType: type,
        }
      );
      if (setClearCart) {
        setClearCart(true);
      }
      if (
        new Date(checkInDate).setHours(0, 0, 0, 0) >=
          new Date(checkOutDate).setHours(0, 0, 0, 0) &&
        search !== "Trips"
      ) {
        setErrorMsg("Check-Out Date should be greater than check-In Date");
        setOpenToast(true);
        return true;
      } else {
        switch (search) {
          case "Trips":
            return sendSearchedData(
              undefined,
              checkInDate,
              "",
              numOfPax,
              searchVal.join(""),
              searchData?.cityName
            );
          case "Hostels":
            return sendSearchedData(
              searchData?.cityName,
              checkInDate,
              checkOutDate,
              numOfPax,
              searchVal.join(""),
              undefined
            );
          default:
            return sendSearchedData(
              searchData?.cityName,
              checkInDate,
              checkOutDate,
              numOfPax,
              searchVal.join(""),
              undefined
            );
        }
      }
    } else {
      setErrorMsg("Please Select All the fields");
      setOpenToast(true);
    }
  };

  return (
    <div
      className={`main_search_container flex justify-center lg:flex-col xl:flex-col 2xl:flex-col  ${classes.mainContainer} `}
    >
      {!(
        pathname.includes("hostels") ||
        pathname.includes("workations") ||
        pathname.includes("book")
      ) ? (
        <SearchType search={setSelectedType} />
      ) : (
        ""
      )}
      <div
        className={`flex items-center  ${
          pathname === "/" ||
          pathname === "/hostels" ||
          pathname === "/workations" ||
          pathname === "/trips"
            ? "justify-center"
            : ""
        }  lg:px-8 py-4 ${
          classes.root
        } w-full sm:flex-col sm:pr-6 sm:pl-2 xs:flex-col xs:pr-6 xs:pl-2`}
      >
        <div
          className={`w-full ${
            !(
              pathname.includes("hostels") ||
              pathname.includes("workations") ||
              pathname.includes("book")
            )
              ? "my-2"
              : ""
          }  xl:hidden   lg:hidden md:hidden 2xl:hidden ml-4`}
        >
          {!(
            pathname.includes("hostels") ||
            pathname.includes("workations") ||
            pathname.includes("book")
          ) ? (
            <RadioButton
              label='Type'
              search={setSelectedType}
              data={searchType}
              defaultValue={
                searchData?.searchType
                  ? searchData?.searchType
                  : searchType[0]?.name
              }
            />
          ) : (
            ""
          )}
        </div>
        <Dropdown
          data={
            search === "Trips"
              ? tripsListData?.getTripList
              : hostelListData?.getHostelList
          }
          label={search === "Trips" ? "Trips" : "Hostel"}
          handleChange={(val) => {
            !(
              pathname.includes("hostels") ||
              pathname.includes("workations") ||
              pathname.includes("book")
            ) && dispatch(cityNameHandler(val.target.value));
          }}
          value={Id ? Id : searchData?.cityName}
          type={type}
          isLabel={isLabel}
          isDisable={true}
          placeholder='Hostel'
          width={
            isMobile || isTablet
              ? "100%"
              : isMonitor
              ? "230px"
              : searchData?.searchType === "Trips"
              ? "200px"
              : "180px"
          }
        />
        <div className='inline-block checkIn_container xs:w-full'>
          <label className='search_dates_label xs:hidden'>
            {search === "Trips" ? "Start Date" : "Check In"}
          </label>

          <ThemeProvider theme={materialTheme}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                format='dd/MM/yyyy'
                margin='normal'
                open={openCheckIn}
                onOpen={() => setOpenCheckIn(true)}
                onClose={() => {
                  setOpenCheckIn(false);
                  setOpenCheckOut(true);
                }}
                error={
                  new Date(checkIn) < new Date().setHours(0, 0, 0, 0) &&
                  "Check-In Date cannot be before todays date"
                }
                id='date-picker-inline'
                value={checkIn}
                onChange={(val) => onChangeDateHandler("checkInDate", val)}
                TextFieldComponent={(props) => (
                  <TextField {...props} onClick={(e) => setOpenCheckIn(true)} />
                )}
                minDate={new Date()}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
            </MuiPickersUtilsProvider>
          </ThemeProvider>
        </div>
        {searchData?.searchType !== "Trips" ? (
          <div className='inline-block checkIn_container xl:ml-2 xs:w-full'>
            <label className='search_dates_label xs:hidden'>
              {search === "Trips" ? "End Date" : "Check Out"}
            </label>
            <ThemeProvider theme={materialTheme}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  format='dd/MM/yyyy'
                  margin='normal'
                  open={openCheckOut}
                  onOpen={() => setOpenCheckOut(true)}
                  onClose={() => setOpenCheckOut(false)}
                  onError={(err) => {
                    if (err) {
                      setCheckOut(null);
                    }
                  }}
                  TextFieldComponent={(props) => (
                    <TextField
                      {...props}
                      onClick={(e) => setOpenCheckOut(true)}
                    />
                  )}
                  id='date-picker-inline'
                  value={checkOut}
                  minDate={
                    search === "Workations"
                      ? addDays(new Date(checkIn), 7)
                      : addDays(new Date(checkIn), 1)
                  }
                  onChange={(val) => onChangeDateHandler("checkOutDate", val)}
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                />
              </MuiPickersUtilsProvider>
            </ThemeProvider>
          </div>
        ) : (
          ""
        )}
        <Dropdown
          data={numPax}
          label='Number of People'
          handleChange={(val) => {
            if (val.target.value === "10+") {
              return dispatch(groupBookingHandler(true));
            }
            setNumOfPax(val.target.value);
          }}
          value={searchData?.numOfGuest}
          defaultValue={numOfPax}
          type={type}
          placeholder='Number of People'
          isLabel={isLabel}
          width={
            isMobile || isTablet
              ? "100%"
              : isMonitor
              ? "230px"
              : searchData?.searchType === "Trips"
              ? "200px"
              : "180px"
          }
        />
        <div
          className={`mt-5 xs:w-full ${
            pathname.includes("hostels") ||
            pathname.includes("workations") ||
            pathname.includes("book")
              ? "mb-4"
              : ""
          }  ${searchData?.searchType === "Trips" ? "ml-2" : ""}`}
        >
          <Button
            bgColor={Primary700}
            color={Black}
            padding={"1.5rem 3rem"}
            fontWeight={800}
            borderRadius={6}
            label={buttonText}
            onClick={handleSubmit}
            isLoading={loading}
            width={isMobile ? "103%" : "200px"}
          />
        </div>
      </div>
      <div className='absolute'>
        <Toast
          handleClose={() => setOpenToast(false)}
          open={openToast}
          severity='error'
          message={errorMsg}
        />
      </div>
    </div>
  );
}

export default React.memo(Search);
