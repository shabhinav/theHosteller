import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Dropdown from "../../../Common/DropDown/Dropdown";
import Input from "../../../Common/Input/Input";
import "./UserDetails.scss";
import {
  confirmPasswordHandler,
  travelerDetails,
  userAddress,
} from "../../../../Redux/cart/cart.action";
import {
  addressValidator,
  numberValidator,
  useWindowSize,
  validationHandler,
} from "../../../../Utils/utils";
import Grid from "@material-ui/core/Grid";
import { Country, State, City } from "country-state-city";
import { ReactSelect } from "../../../Common/React-Select/React-select";

const title = [
  { name: "Mr", _id: "Mr" },
  { name: "Ms", _id: "Ms" },
  { name: "Mrs", _id: "Mrs" },
];

function UsersDetails({
  userInfoHandler,
  userAddressHandler,
  contactDetailsHandler,
}) {
  const state = useSelector((state) => state);
  const [userState, setState] = useState([]);
  const [addressDetails, setAddressDetails] = useState({});
  const [contactDetails, setContactDetails] = useState({});
  const [cartData, setCartData] = useState([]);
  const [country, setCountry] = useState([]);
  const [countryCode, setCountryCode] = useState("");
  const [userstate, setUserState] = useState([]);
  const [stateId, setStateId] = useState("");
  const [city, setCity] = useState([]);
  const [phoneCode, setPhoneCode] = useState("");
  const [addressLine, setAddressLine] = useState("");
  const [pincode, setPincode] = useState("");
  const [mobile, setMobile] = useState("");
  const [cityId, setCityId] = useState("");

  useEffect(() => {
    let countryList = Country.getAllCountries();
    let country = countryList.map((item) => {
      return { ...item, value: item?.isoCode, label: item?.name };
    });
    setCountry(country);
  }, []);

  useEffect(() => {
    if (countryCode) {
      let stateList = State.getStatesOfCountry(countryCode);
      let state = stateList?.map((item) => {
        return { ...item, value: item?.isoCode, label: item?.name };
      });
      let countryData = country?.filter(
        (item) => item?.isoCode === countryCode
      );
      if (countryData?.length) {
        setPhoneCode(countryData?.[0]?.phonecode);
        sessionStorage.setItem("countryCode", countryData?.[0]?.phonecode);
      }
      setUserState(state);
    }
  }, [countryCode]);

  useEffect(() => {
    if (stateId) {
      let cityList = City.getCitiesOfState(countryCode, stateId);
      let city = cityList?.map((item) => {
        return { ...item, value: item?.isoCode, label: item?.name };
      });
      setCity(city);
    }
  }, [stateId]);

  useEffect(() => {
    let obj = {};
    for (let i = 0; i < state?.cart?.cart?.length; i++) {
      if (state?.cart?.cart[i]?.name) {
        for (let j = 0; j < state?.cart?.cart[i]?.adults; j++) {
          if (i === 0 && j === 0) {
            obj[state?.cart?.cart[i].name] = [
              {
                ...state?.cart?.cart[i],
                mainUser: true,
              },
            ];
          } else if (obj[state?.cart?.cart[i].name]) {
            obj[state?.cart?.cart[i].name].push(state?.cart?.cart[i]);
          } else {
            obj[state?.cart?.cart[i].name] = [state?.cart?.cart[i]];
          }
        }
      }
    }
    setState(obj);
  }, [state, cartData]);

  const onChangehandler = (name, index, value, type) => {
    let dataClone = JSON.parse(JSON.stringify(userState));
    dataClone[name][index][type] = value;
    dataClone[name][index][`validation` + type] = validationHandler(
      value,
      "name"
    );

    setState(JSON.parse(JSON.stringify(dataClone)));
    userInfoHandler(dataClone);
  };

  useEffect(() => {
    if (phoneCode) {
      mainUserInfohandler(phoneCode, "countryCode");
    }
  }, [phoneCode]);

  const addressOnChangeHandler = (name, value) => {
    const address = { ...addressDetails };
    if (name === "addressLine") {
      if (!addressValidator(value)) {
        setAddressLine(value);
        address[name] = value;
      }
    } else if (name === "pincode") {
      if (!numberValidator(value)) {
        setPincode(value);
        address[name] = value;
      }
      address[name] = value;
    } else {
      address[name] = value;
    }
    setAddressDetails(address);
    userAddressHandler(address);
  };

  const mainUserInfohandler = (value, type) => {
    const contactData = { ...contactDetails };
    if (type === "mobile" && value.length < 11) {
      if (!numberValidator(value)) {
        contactData[type] = value;
        setMobile(value);
      }
    } else {
      contactData[type] = value;
    }
    if (type === "email") {
      contactData[`validation` + type] = validationHandler(value, "email");
    }
    setContactDetails(contactData);
    contactDetailsHandler(contactData);
  };

  return (
    <div className='userDetail_container  mb-5'>
      {Object.keys(userState).map((item, index) => (
        <div className='mt-5'>
          {state?.search?.searchType !== "Trips" && (
            <h5 className=' Room_heading p-2.5	font-extrabold'>
              Room {index + 1} : {item}
            </h5>
          )}
          <div className='pb-5 form_container px-5 pt-5 xs:p-2'>
            {userState[item].map((val, innerIndex) =>
              val.mainUser ? (
                <MainUser
                  onChangehandler={onChangehandler}
                  item={item}
                  index={innerIndex}
                  mainUserInfohandler={mainUserInfohandler}
                  val={val}
                  contactDetails={contactDetails}
                  phoneCode={phoneCode}
                  mobile={mobile}
                />
              ) : (
                <DefaultForm
                  onChangehandler={onChangehandler}
                  item={item}
                  index={innerIndex}
                  val={val}
                />
              )
            )}
          </div>
        </div>
      ))}
      <div className='px-5 pb-5 xs:p-2'>
        <AddressForm
          country={country}
          userstate={userstate}
          setStateId={(code) => setStateId(code)}
          addressOnChangeHandler={addressOnChangeHandler}
          setCountryCode={(code) => setCountryCode(code)}
          city={city}
          stateId={stateId}
          countryCode={countryCode}
          addressLine={addressLine}
          pincode={pincode}
          cityId={cityId}
          setCityId={setCityId}
        />
      </div>
    </div>
  );
}

export default UsersDetails;

const DefaultForm = ({ onChangehandler, item, index, val }) => {
  const [innerWidth] = useWindowSize();
  const isMobile = innerWidth < 640;
  const isTablet = innerWidth > 640 && innerWidth < 770;

  return (
    <Grid container>
      <Grid xs={12} lg={2}>
        <div className='mt-3'>
          <Dropdown
            handleChange={(value) => {
              onChangehandler(item, index, value.target.value, "title");
            }}
            data={title}
            label={"Salutation"}
            isRequired={true}
            type='outlined'
            isLabel={true}
            margin={"8px 8px 8px 0px"}
            use='payment'
            width={isMobile || isTablet ? "100%" : "100px"}
          />
        </div>
      </Grid>
      <Grid xs={12} lg={4}>
        <div className='2xl:mr-3 xl:mr-3 mt-3'>
          <Input
            isLabel={true}
            type={"text"}
            onChange={(value) =>
              onChangehandler(item, index, value, "firstname")
            }
            width='100%'
            label={"Guest First Name "}
            placeholder={"First Name"}
            use='payment'
            variant='outlined'
            isRequired={true}
            // marginBottom={"8px"}
            isError={val?.firstname ? !val?.validationfirstname : false}
          />
        </div>
      </Grid>
      <Grid xs={12} lg={6}>
        <div className='mt-3'>
          <Input
            type={"text"}
            isLabel={true}
            onChange={(value) =>
              onChangehandler(item, index, value, "lastName")
            }
            width='100%'
            label={"Guest Last Name "}
            placeholder={"Last Name"}
            isRequired={true}
            use='payment'
            variant='outlined'
            marginBottom={"8px"}
            isError={val?.lastName ? !val?.validationlastName : false}
          />
        </div>
      </Grid>
    </Grid>
  );
};

const AddressForm = ({
  addressOnChangeHandler,
  country,
  setCountryCode,
  userstate,
  setStateId,
  stateId,
  addressLine,
  pincode,
  countryCode,
  cityId,
  setCityId,
  city,
}) => {
  const [innerWidth] = useWindowSize();
  const isMobile = innerWidth < 600;

  return (
    <div className='address_container'>
      <Grid container>
        <Grid xs={12} lg={6}>
          <div className='2xl:mr-3 xl:mr-3 mt-3'>
            <Input
              type={"text"}
              isLabel={true}
              onChange={(value) => addressOnChangeHandler("addressLine", value)}
              width={"100%"}
              label={"Address "}
              value={addressLine}
              isRequired={true}
              placeholder={"Address"}
              use='payment'
              variant='outlined'
            />
          </div>
        </Grid>
        <Grid xs={12} lg={6}>
          <div className='mt-3 '>
            <label className='mb-2 '>
              Country<span className='text-danger'>*</span>
            </label>
            <ReactSelect
              value={countryCode}
              handleChange={(value) => {
                addressOnChangeHandler("country", value?.name);
                setCountryCode(value?.isoCode);
              }}
              options={country}
            />
          </div>
        </Grid>
      </Grid>
      <Grid container>
        <Grid xs={12} lg={4}>
          <div className='mt-3 form_container'>
            <label className=' reselect_label'>
              State<span className='text-danger'>*</span>
            </label>
            <ReactSelect
              value={stateId}
              handleChange={(value) => {
                addressOnChangeHandler("state", value?.name);
                setStateId(value?.isoCode);
              }}
              options={userstate}
            />
          </div>
        </Grid>
        <Grid xs={12} lg={4}>
          <div className='2xl:mx-3 xl:mx-3 mt-3 form_container'>
            <label className=' reselect_label'>
              City<span className='text-danger'>*</span>
            </label>
            <ReactSelect
              value={cityId}
              handleChange={(value) => {
                addressOnChangeHandler("city", value.name);
                setCityId(value?.isoCode);
              }}
              options={city}
            />
          </div>
        </Grid>
        <Grid xs={12} lg={4}>
          <div className='mt-3'>
            <Input
              type={"text"}
              isLabel={true}
              onChange={(value) => addressOnChangeHandler("pincode", value)}
              width='100%'
              value={pincode}
              label={"PinCode "}
              isRequired={true}
              placeholder={"PinCode"}
              use='payment'
              variant='outlined'
            />
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

const MainUser = ({
  onChangehandler,
  item,
  index,
  mainUserInfohandler,
  val,
  contactDetails,
  phoneCode,
  mobile: userNumber,
}) => {
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isConfirmEmailValid, setIsConfirmEmailValid] = useState("");
  const [mobile, setMobile] = useState(false);
  const [countryCode, setCountryCode] = useState("");
  const dispatch = useDispatch();
  const [innerWidth] = useWindowSize();
  const isMobile = innerWidth < 600;

  useEffect(() => {
    if (confirmPassword) {
      setIsConfirmEmailValid(validationHandler(confirmPassword, "email"));
    }
  }, [confirmPassword]);

  return (
    <div>
      <DefaultForm
        onChangehandler={onChangehandler}
        item={item}
        index={index}
        val={val}
      />
      <Grid container>
        <Grid xs={12} lg={6}>
          <div className='mt-3'>
            <Input
              type={"text"}
              isLabel={true}
              onChange={(value) => {
                value.length < 11 && mainUserInfohandler(value, "mobile");
                setMobile(+value);
                sessionStorage.setItem("userNum", +value);
              }}
              value={userNumber}
              width='100%'
              label={"Mobile Number "}
              isRequired={true}
              placeholder={"Mobile Number"}
              use='payment'
              variant='outlined'
              isError={mobile.length < 10 || mobile < 0 ? true : false}
            />
          </div>
        </Grid>
        <Grid xs={12} lg={6}>
          <div className='2xl:mr-3 xl:mr-3 mt-3 xl:ml-3'>
            <Input
              type={"email"}
              isLabel={true}
              onChange={(value) => {
                mainUserInfohandler(value, "email");
                sessionStorage.setItem("userEmail", value);
              }}
              width='100%'
              label={"Email Address "}
              isRequired={true}
              placeholder={"Email Address"}
              use='payment'
              variant='outlined'
              isError={
                contactDetails?.email ? !contactDetails?.validationemail : false
              }
            />
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

// <Dropdown
//   handleChange={(value) => {
//     addressOnChangeHandler(
//       "country",
//       value.target.value
//         ? country.filter(
//             (item) => item?.isoCode === value.target.value
//           )?.[0]?.name
//         : ""
//     );
//     setCountryCode(value.target.value);
//   }}
//   data={country}
//   label={"Country "}
//   isRequired={true}
//   type='outlined'
//   isLabel={true}
//   use='payment'
//   width='100%'
//   margin={"8px 8px 8px 0px"}
// />
