import React, { useEffect, useState } from "react";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import Input from "../Common/Input/Input";
import { colorPallete } from "../../Resources/theme";
import Button from "../Common/Button/Button";
import close from "../../Assets/Icons/x.svg";
import {
  useEnquiryHandler,
  useGetHostelsList,
  useGroupBooking,
  useTripsSearchList,
} from "../../Services/datasource";
import { useDispatch } from "react-redux";
import { groupBookingHandler } from "../../Redux/search/search.action";
import { useSelector } from "react-redux";
import Dropdown from "../Common/DropDown/Dropdown";
import Toast from "../Common/Toast/Toast";
import { Country } from "country-state-city";
import { ReactSelect } from "../Common/React-Select/React-select";
import Grid from "@material-ui/core/Grid";
import { phone as phonePackage } from "phone";

import {
  dateConverter,
  emailHandler,
  nameHandler,
  numberValidator,
  useWindowSize,
} from "../../Utils/utils";
import { createTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";

const productType = {
  Hostels: "HOSTEL",
  Workations: "WORKATION",
  Trips: "TRIP",
};

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

const GroupModalForms = ({ setGrpDetails }) => {
  const state = useSelector((state) => state);
  let [innerWidth] = useWindowSize();
  const isMobile = innerWidth < 640;

  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [grpSize, setgrpSize] = useState("");
  const [start, setStart] = useState("");
  const [selectedId, setSelectedId] = useState("");
  const [openToast, setOpenToast] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [country, setCountry] = useState("");
  const [validNum, setValidNum] = useState("");
  const [isError, setIsError] = useState("");
  const [validEmail, setValidEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [departureDate, setDepartureDate] = useState(
    new Date("2014-08-18T21:11:54")
  );
  const [arrivalDate, setArrivalDate] = useState(
    new Date("2014-08-18T21:11:54")
  );
  const { data: hostelListData } = useGetHostelsList();
  const { data: tripsListData } = useTripsSearchList();

  const [sendGrpBookingHandler, { loading, error, data, refetch }] =
    useGroupBooking();

  const [enquiryDataHandler, { data: tripData }] = useEnquiryHandler();

  const { Grey, Primary, Black } = colorPallete;

  useEffect(() => {
    let currentDate = dateConverter(new Date(), "dd-mm-yyy", "groupModal");
    setDepartureDate(new Date(currentDate + "T21:11:54"));
    setArrivalDate(new Date(currentDate + "T21:11:54"));
  }, []);

  useEffect(() => {
    let countryList = Country.getAllCountries();
    let country = countryList.map((item) => {
      return { ...item, value: item?.phonecode, label: item?.phonecode };
    });
    setCountry(country);
  }, []);

  useEffect(() => {
    if (countryCode) {
      let isValid;
      if (countryCode?.phonecode?.includes("+")) {
        isValid = phonePackage(countryCode?.phonecode + phone, {
          country: null,
        });
      } else {
        isValid = phonePackage("+" + countryCode?.phonecode + phone, {
          country: null,
        });
      }
      setValidNum(isValid?.isValid);
    }
  }, [phone, countryCode?.phonecode]);

  const submitDataHandler = () => {
    if (state?.search?.searchType !== "Trips") {
      sendGrpBookingHandler({
        email: email,
        checkinDate: arrivalDate,
        checkoutDate: departureDate,
        mobile: phone,
        numberOfPassanger: +grpSize,
        fullName: name,
        searchType: productType[state?.search?.searchType?.toUpperCase()],
        hostelId: selectedId,
      });
    } else {
      enquiryDataHandler({
        name,
        email,
        mobile: phone,
        departureDate,
        arrivalDate,
        groupSize: +grpSize,
        startingPoint: start,
        tripId: selectedId,
      });
    }
  };

  const checkOutDateCheckHandler = (date) => {
    if (new Date(departureDate) > new Date(date)) {
      setIsError(true);
      setOpenToast(true);
      setErrorMessage(
        `Please select correct ${
          state?.search?.searchType === "Trips" ? "end" : "checkOut"
        } Date`
      );
    } else {
      setArrivalDate(date);
    }
  };

  const checkInDateCheckHandler = (date) => {
    if (new Date(date) > new Date(arrivalDate)) {
      setArrivalDate(null);
    } else {
      setDepartureDate(date);
    }
  };
  useEffect(() => {
    if (data?.createGroupBooking || tripData?.createTripEnquiry) {
      setIsError(false);
      setOpenToast(true);
      setErrorMessage("Your form submitted successfully");
      setTimeout(() => {
        dispatch(groupBookingHandler(false));
      }, 2000);
    }
  }, [data, tripData]);

  return (
    <div>
      <div>
        <div className='bg-lightPrimary p-4 flex justify-between'>
          <p className='text-base font-bold'>Group Booking</p>
          <img
            onClick={() => dispatch(groupBookingHandler(false))}
            className='cursor-pointer'
            src={close}
            alt='close'
          />
        </div>
      </div>
      <div className='w-2/4 grp_form flex justify-center'>
        <div className='p-4'>
          <Input
            isLabel={true}
            type={"text"}
            onChange={(value) => {
              if (nameHandler(value)) {
                setName(value);
              }
            }}
            value={name}
            width='100%'
            label={"Name* "}
            use='payment'
            variant='outlined'
          />
          <Input
            isLabel={true}
            type={"Email*"}
            onChange={(value) => {
              setValidEmail(emailHandler(value));
              setEmail(value);
            }}
            isError={email && !validEmail}
            width='100%'
            label={"Email "}
            use='payment'
            variant='outlined'
          />
          <div className='flex items-center'>
            <Grid container>
              <Grid xs={12} md={12} lg={4}>
                <label className='mb-2'>Phone Code</label>
                <ReactSelect
                  value={countryCode}
                  handleChange={(value) => {
                    setCountryCode(value);
                  }}
                  options={country}
                />
              </Grid>
              <Grid xs={12} md={12} lg={8}>
                <div className='xl:ml-2 2xl:ml-2 lg:ml-2'>
                  <Input
                    isLabel={true}
                    type={"text"}
                    onChange={(value) => {
                      if (!numberValidator(value) && value.length < 11) {
                        setPhone(value);
                      }
                    }}
                    isError={phone ? (!validNum ? true : false) : ""}
                    value={phone}
                    width='100%'
                    label={"Phone Number* "}
                    use='payment'
                    variant='outlined'
                  />
                </div>
              </Grid>
            </Grid>
          </div>

          <div className='enquiry_modal_container mt-1'>
            <label>
              {state?.search?.searchType === "Trips"
                ? "Start Date*"
                : "Check In"}
            </label>
            <ThemeProvider theme={materialTheme}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  format='dd/MM/yyyy'
                  margin='normal'
                  id='date-picker-inline'
                  value={departureDate}
                  onChange={(val) => checkInDateCheckHandler(val)}
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                />
              </MuiPickersUtilsProvider>
            </ThemeProvider>
          </div>
          <div className='enquiry_modal_container mt-1'>
            <label>
              {state?.search?.searchType === "Trips"
                ? "End Date*"
                : "Check Out"}
            </label>
            <ThemeProvider theme={materialTheme}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  format='dd/MM/yyyy'
                  margin='normal'
                  id='date-picker-inline'
                  value={arrivalDate}
                  onChange={(val) => checkOutDateCheckHandler(val)}
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                />
              </MuiPickersUtilsProvider>
            </ThemeProvider>
          </div>
        </div>
        <div className='p-4'>
          <Input
            isLabel={true}
            type={"text"}
            onChange={(value) => {
              if (!numberValidator(value)) {
                setgrpSize(value);
              }
            }}
            value={grpSize}
            width='100%'
            label={"Group Size*"}
            use='payment'
            variant='outlined'
          />
          {state?.search?.searchType === "Trips" ? (
            <div className='mt-1'>
              <Input
                isLabel={true}
                type={"text"}
                onChange={(value) => {
                  if (nameHandler(value)) {
                    setStart(value);
                  }
                }}
                value={start}
                width='100%'
                label={"Starting Point*"}
                use='payment'
                variant='outlined'
              />
            </div>
          ) : (
            ""
          )}
          <div className='mt-1'>
            <Dropdown
              handleChange={(value) => {
                setSelectedId(value.target.value);
              }}
              data={
                state?.search?.searchType === "Trips"
                  ? tripsListData?.getTripList
                  : hostelListData?.getHostelList
              }
              label={state?.search?.searchType === "Trips" ? "Trips" : "Hostel"}
              isRequired={true}
              type='outlined'
              isLabel={true}
              margin={"8px 8px 8px 0px"}
              use='payment'
              width={"100%"}
            />
          </div>
          <div className='mt-8'>
            <Button
              bgColor={
                !(
                  name &&
                  email &&
                  grpSize &&
                  departureDate &&
                  arrivalDate &&
                  selectedId &&
                  validNum
                )
                  ? Grey
                  : Primary
              }
              color={Black}
              padding={isMobile ? "0.5rem rem" : "1.2rem 2rem"}
              fontWeight={600}
              borderRadius={6}
              label={
                state?.search?.searchType === "Trips"
                  ? "Enquire"
                  : "Submit Request"
              }
              onClick={() => submitDataHandler()}
              isDisable={
                !(
                  name &&
                  email &&
                  grpSize &&
                  departureDate &&
                  arrivalDate &&
                  selectedId &&
                  validNum
                )
              }
              width={"100%"}
            />
          </div>
        </div>
      </div>
      <div className='absolute'>
        <Toast
          handleClose={() => setOpenToast(false)}
          open={openToast}
          severity={isError ? "error" : "success"}
          message={errorMessage}
        />
      </div>
    </div>
  );
};

export default GroupModalForms;
