import React, { useEffect, useState } from "react";
import Input from "../../../Common/Input/Input";
import Toast from "../../../Common/Toast/Toast";
import SimpleModal from "../../../Common/Modal/Modal";
import Button from "../../../Common/Button/Button";
import { colorPallete } from "../../../../Resources/theme";
import "./EnquiryModal.scss";
import close from "../../../../Assets/Icons/x.svg";
import {
  nameHandler,
  emailHandler,
  dateConverter,
  numberValidator,
  eventTracker,
} from "../../../../Utils/utils";
import {
  useEnquiryHandler,
  useTripsSearchList,
} from "../../../../Services/datasource";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import Dropdown from "../../../Common/DropDown/Dropdown";

function EnquiryModal({ isEnquiry, setIsEnquiry, name: tripName }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [grpSize, setgrpSize] = useState("");
  const [start, setStart] = useState("");
  const [departureDate, setDepartureDate] = useState();
  const [arrivalDate, setArrivalDate] = useState();
  const [validEmail, setvalidEmail] = useState("");
  const [openToast, setOpenToast] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedId, setSelectedId] = useState("");
  const [isError, setIsError] = useState(false);
  const { data: tripsListData } = useTripsSearchList();

  const [enquiryDataHandler, { loading, error, data, refetch }] =
    useEnquiryHandler();

  useEffect(() => {
    let currentDate = dateConverter(new Date(), "dd-mm-yyy", "enq");
    setDepartureDate(new Date(currentDate + "T21:11:54"));
    setArrivalDate(new Date(currentDate + "T21:11:54"));
  }, []);

  useEffect(() => {
    if (data?.createTripEnquiry) {
      setOpenToast(true);
      setIsError(false);
      setErrorMessage("Your form submitted successfully");
      eventTracker("facebook", "Trip Enquiry", {
        name,
        email,
        mobile: phone,
        departureDate,
        arrivalDate,
        groupSize: +grpSize,
        startingPoint: start,
        tripId: selectedId,
      });
      setTimeout(() => {
        setIsEnquiry(false);
        setOpenToast(false);
        setName("");
        setPhone("");
        setgrpSize("");
        setEmail("");
        setStart("");
      }, 2000);
    }
  }, [data]);

  useEffect(() => {
    if (error?.message) {
      setOpenToast(true);
      setErrorMessage(error?.message);
      setIsError(true);
    }
  }, [error]);

  const { Primary, Black, Grey } = colorPallete;

  const handleSubmitHandler = () => {
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
  };

  return (
    <SimpleModal
      open={isEnquiry}
      handleOpen={() => setIsEnquiry(true)}
      handleClose={() => setIsEnquiry(false)}
    >
      <div>
        <div className='bg-lightPrimary p-4 flex justify-between'>
          <p className='text-base font-bold'>Enquire Now</p>
          <img
            onClick={() => setIsEnquiry(false)}
            className='cursor-pointer'
            src={close}
            alt='close'
          />
        </div>
      </div>
      <div className='w-2/4 enq_form flex'>
        <div className='p-4'>
          <Input
            isLabel={true}
            type={"text"}
            onChange={(value) => {
              if (nameHandler(value) || value === "") {
                setName(value);
              }
            }}
            value={name}
            width='100%'
            label={"Name "}
            use='payment'
            variant='outlined'
          />
          <Input
            isLabel={true}
            type={"email"}
            onChange={(value) => {
              setvalidEmail(emailHandler(value));
              setEmail(value);
            }}
            value={email}
            width='100%'
            label={"Email "}
            use='payment'
            variant='outlined'
            isError={email && !validEmail}
          />
          <Input
            isLabel={true}
            type={"text"}
            onChange={(value) => {
              if (!numberValidator(value) && value.length < 11) {
                setPhone(value);
              }
            }}
            value={phone}
            width='100%'
            label={"Phone Number "}
            use='payment'
            variant='outlined'
          />
          <div className='enquiry_modal_container'>
            <label>Start Date</label>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                format='dd/MM/yyyy'
                margin='normal'
                id='date-picker-dialog'
                value={departureDate}
                onChange={(e, val) => setDepartureDate(e)}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
            </MuiPickersUtilsProvider>
          </div>
          <div className='enquiry_modal_container'>
            <label>End Date</label>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                format='dd/MM/yyyy'
                margin='normal'
                id='date-picker-dialog'
                value={arrivalDate}
                onChange={(e, val) => setArrivalDate(e)}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
            </MuiPickersUtilsProvider>
          </div>
        </div>
        <div className='p-4'>
          <Input
            isLabel={true}
            type={"text"}
            onChange={(value) => {
              if (!numberValidator(value) && value.length < 11) {
                setgrpSize(value);
              }
            }}
            value={grpSize}
            width='100%'
            label={"Group Size "}
            use='payment'
            variant='outlined'
          />
          <Input
            isLabel={true}
            type={"text"}
            onChange={(value) => {
              if (nameHandler(value) || value === "") {
                setStart(value);
              }
            }}
            value={start}
            width='100%'
            label={"Starting Point "}
            use='payment'
            variant='outlined'
          />
          <Dropdown
            handleChange={(value) => {
              setSelectedId(value.target.value);
            }}
            data={tripsListData?.getTripList}
            label={"Trips"}
            isRequired={true}
            type='outlined'
            isLabel={true}
            margin={"8px 8px 8px 0px"}
            use='payment'
            width={"100%"}
          />
          <div className='mt-8'>
            <Button
              bgColor={
                !(
                  name &&
                  email &&
                  phone.length === 10 &&
                  grpSize.length > 0 &&
                  start &&
                  departureDate &&
                  validEmail &&
                  selectedId
                )
                  ? Grey
                  : Primary
              }
              color={Black}
              padding={"0rem 2rem"}
              height={"100%"}
              fontWeight={600}
              borderRadius={6}
              label={"Enquire Now"}
              onClick={handleSubmitHandler}
              isDisable={
                !(
                  name &&
                  email &&
                  phone.length === 10 &&
                  grpSize.length > 0 &&
                  start &&
                  departureDate &&
                  validEmail &&
                  selectedId
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
    </SimpleModal>
  );
}

export default EnquiryModal;
