import { Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Input from "../../../Common/Input/Input";
import Button from "../../../Common/Button/Button";
import { colorPallete } from "../../../../Resources/theme";
import {
  useAddTraveller,
  useEditTravel,
} from "../../../../Services/datasource";
import Toast from "../../../Common/Toast/Toast";
import close from "../../../../Assets/Icons/x.png";
import Dropdown from "../../../Common/DropDown/Dropdown";
import { GenderData } from "../../../../Resources/constants/common";
import { numberValidator } from "../../../../Utils/utils";

function TravelForm({
  data: userData,
  type,
  travellerId,
  handleClose,
  refetch,
}) {
  const { Primary, Black, clear } = colorPallete;
  const [addTravellerHandler, { loading, error, data }] = useAddTraveller();
  const [
    editProfileHandler,
    { loading: editLoader, error: editError, data: editData },
  ] = useEditTravel();
  const [name, setName] = useState(userData?.guestFullName);
  const [gender, setGender] = useState(userData?.guestGender);
  const [age, setAge] = useState(userData?.guestAge);
  const [toast, setToast] = useState(false);
  const [err, setErr] = useState("");

  useEffect(() => {
    if (error) {
      setErr(error?.message);
    } else if (editError) {
      setErr(editError?.message);
    }
  }, [error, editError]);

  const submitDataHandler = () => {
    if (type === "add" && name && gender && age ) {
      addTravellerHandler(name, gender, age, );
    } else if (name && gender && age  && travellerId) {
      editProfileHandler(name, gender, age, travellerId);
    } else {
      setErr("Please enter all details");
      setToast(true);
    }
  };

  useEffect(() => {
    if (data || editData) {
      refetch();
      handleClose();
    }
  }, [data, editData]);

  const agehandler = (age) => {
    if (!numberValidator(age) && age.length < 3) {
      setAge(age);
    }
  };

  return (
    <div className='xs:w-screen	'>
      <div className='bg-lightPrimary p-4 flex justify-between'>
        <p className='text-base font-bold'>
          {type === "edit" ? "Edit" : "Add"} Traveller
        </p>
        <img
          className='cursor-pointer'
          onClick={handleClose}
          src={close}
          alt='close'
        />
      </div>{" "}
      <div className='mx-4 mt-4'>
        <Grid container spacing={1}>
          <Grid item xs={3} lg={3}>
            <div className='flex items-center h-full'>FullName*</div>
          </Grid>
          <Grid item xs={9} lg={9}>
            <Input
              isLabel={true}
              type={"text"}
              onChange={(value) => setName(value)}
              width='100%'
              value={name}
              use='payment'
              variant='outlined'
              marginBottom={"8px"}
              placeholder='FullName'
            />
          </Grid>
        </Grid>
        <Grid container spacing={1}>
          <Grid item xs={3} lg={3}>
            <div className='flex items-center h-full'>Gender*</div>
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
            <div className='flex items-center h-full'>Age*</div>
          </Grid>
          <Grid item xs={9} lg={9}>
            <Input
              isLabel={true}
              type={"text"}
              onChange={(value) => agehandler(value)}
              width='100%'
              value={age}
              //   label={"Guest First Name *"}
              use='payment'
              variant='outlined'
              marginBottom={"8px"}
              placeholder='Age'
            />
          </Grid>
        </Grid>
      </div>
      <div className='text-center my-4 flex justify-center items-center'>
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
            submitDataHandler();
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

export default TravelForm;
