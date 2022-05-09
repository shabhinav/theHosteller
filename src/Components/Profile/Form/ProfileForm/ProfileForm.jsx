import React, { useEffect, useState } from "react";
import Input from "../../../Common/Input/Input";
import Grid from "@material-ui/core/Grid";
import { useEditProfile } from "../../../../Services/datasource";
import Button from "../../../Common/Button/Button";
import { colorPallete } from "../../../../Resources/theme";
import Toast from "../../../Common/Toast/Toast";
import { GenderData } from "../../../../Resources/constants/common";
import Dropdown from "../../../Common/DropDown/Dropdown";
import close from "../../../../Assets/Icons/x.png";
import DateFnsUtils from "@date-io/date-fns";
import "./ProfileForm.scss";
import { dateConverter, numberValidator } from "../../../../Utils/utils";

import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";

function ProfileForm({ data: userData, handleClose, refetch }) {
  const { Primary, Black, clear } = colorPallete;
  const [updateData, { loading, error, data }] = useEditProfile();
  const [name, setName] = useState(userData?.fullName);
  const [birthday, setBirthday] = useState(
    userData?.dateOfBirth || "2014-08-18"
  );
  const [gender, setGender] = useState(userData?.gender);
  const [location, setLocation] = useState(userData?.city);
  const [toast, setToast] = useState(false);
  const [err, setErr] = useState("");
  const [phone, setPhone] = useState(userData?.mobile);
  const [selectedDate, setSelectedDate] = React.useState(
    new Date(
      userData?.dateOfBirth
        ? userData?.dateOfBirth + "T21:11:54"
        : "1998-08-18T21:11:54"
    )
  );

  const handleDateChange = (date) => {
    if (date?.toString() !== "Invalid Date") {
      if (new Date(date) <= new Date()) {
        let birthDay = dateConverter(new Date(date), "yyyy-mm-dd");
        if (birthDay?.split("-")[1]?.length === 1) {
          let birthDayClone = birthDay.split("-");
          birthDayClone[1] = "0" + birthDayClone[1];
          if (birthDayClone[2]?.length === 1) {
            birthDayClone[2] = "0" + birthDayClone[2];
          }
          birthDayClone = birthDayClone.join("-");
          setSelectedDate(new Date(birthDayClone + "T21:11:54"));
        } else {
          setSelectedDate(new Date(birthDay + "T21:11:54"));
        }
        setBirthday(birthDay);
      } else {
        setToast(true);
        setErr("Please Enter Correct BirthDate");
      }
    }
  };

  const updateDateHandler = () => {
    if (name && birthday && gender && location && phone.length === 10) {
      // let BirthDay = birthday.split("-").reverse().join("-");
      updateData(name, birthday, gender, location, phone);
    } else {
      setToast(true);
      setErr("Please fill the form");
    }
  };

  useEffect(() => {
    if (data) {
      handleClose();
      refetch();
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      setErr(error?.message);
    }
  }, [error]);

  return (
    <div className='profile_form xs:w-screen '>
      <div className='bg-lightPrimary p-4 flex justify-between'>
        <p className='text-base font-bold'>Edit Profile</p>
        <img
          onClick={handleClose}
          className='cursor-pointer'
          src={close}
          alt='close'
        />
      </div>
      <div className='mx-4'>
        <Grid container spacing={1}>
          <Grid item xs={3} lg={3}>
            <div className='flex items-center h-full'>
              Name <span className='text-danger'>*</span>
            </div>
          </Grid>
          <Grid item xs={9} lg={9}>
            <Input
              isLabel={true}
              type={"text"}
              onChange={(value) => setName(value)}
              width='100%'
              // defaultValue={userData?.fullName}
              value={name}
              //   label={"Guest First Name *"}
              use='payment'
              variant='outlined'
              marginBottom={"8px"}
              placeholder='Name'
            />
          </Grid>
        </Grid>
        <Grid container spacing={1}>
          <Grid item xs={3} lg={3}>
            <div className='flex items-center h-full'>
              Birthday <span className='text-danger'>*</span>
            </div>
          </Grid>
          <Grid item xs={9} lg={9}>
            <div className='profileDate_container'>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  margin='normal'
                  id='date-picker-dialog'
                  format='MM/dd/yyyy'
                  value={selectedDate}
                  onChange={handleDateChange}
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                />
              </MuiPickersUtilsProvider>
            </div>
          </Grid>
        </Grid>
        <Grid container spacing={1}>
          <Grid item xs={3} lg={3}>
            <div className='flex items-center h-full'>
              Gender <span className='text-danger'>*</span>
            </div>
          </Grid>
          <Grid item xs={9} lg={9}>
            <Dropdown
              data={GenderData}
              label={"Gender"}
              handleChange={(val) => {
                setGender(val.target.value);
              }}
              isRequired={false}
              type='outlined'
              isLabel={false}
              margin={"8px 8px 8px 0px"}
              value={gender}
              // placeholder='Gender'
              width={"100%"}
            />
          </Grid>
        </Grid>
        <Grid container spacing={1}>
          <Grid item xs={3} lg={3}>
            <div className='flex items-center h-full'>
              Current Location <span className='text-danger'>*</span>
            </div>
          </Grid>
          <Grid item xs={9} lg={9}>
            <Input
              isLabel={true}
              type={"text"}
              onChange={(value) => setLocation(value)}
              width='100%'
              value={location}
              //   label={"Guest First Name *"}
              use='payment'
              variant='outlined'
              marginBottom={"8px"}
              placeholder='Current Location'
            />
          </Grid>
          <Grid container spacing={1}>
            <Grid item xs={3} lg={3}>
              <div className='flex items-center h-full'>
                Phone Number <span className='text-danger'>*</span>
              </div>
            </Grid>
            <Grid item xs={9} lg={9}>
              <Input
                isLabel={true}
                type={"text"}
                onChange={(value) => {
                  if (!numberValidator(value) && value.length < 11) {
                    setPhone(value);
                  }
                }}
                width='100%'
                value={phone}
                //   label={"Guest First Name *"}
                use='payment'
                variant='outlined'
                marginBottom={"8px"}
                placeholder='Phone Number'
              />
            </Grid>
          </Grid>
        </Grid>
      </div>
      <div className='text-center mt-10 mx-4 mb-4 flex justify-center'>
        <div className='mr-2'>
          <Button
            bgColor={clear}
            color={Black}
            padding={"1.2rem 2rem"}
            fontWeight={600}
            borderRadius={6}
            label={"Cancel"}
            onClick={() => {
              handleClose();
            }}
            width={"100px"}
          />
        </div>
        <Button
          bgColor={Primary}
          color={Black}
          padding={"1.2rem 2rem"}
          fontWeight={600}
          borderRadius={6}
          label={"Confirm"}
          onClick={() => {
            updateDateHandler();
          }}
          width={"100px"}
        />
      </div>
      <div className='absolute'>
        <Toast
          handleClose={() => setToast(false)}
          open={toast}
          severity='error'
          message={err}
        />
      </div>
    </div>
  );
}

export default ProfileForm;

// line number 188
