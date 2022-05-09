import React, { useEffect, useState } from "react";
import Input from "../Common/Input/Input";
import Button from "../Common/Button/Button";
import { colorPallete } from "../../Resources/theme";
import "./GuestLogin.scss";
import { useSendOtp, useSignUpUser } from "../../Services/datasource";
import "./GuestLogin.scss";
import remove from "../../Assets/images/remove.png";
import Toast from "../Common/Toast/Toast";
import {
  validationHandler,
  numberRegex,
  numberValidator,
  eventTracker,
} from "../../Utils/utils";
import PasswordInput from "../Common/passwordInput/Input";
import { guestLoginText } from "../../Resources/constants/common";
import { useHistory, useParams } from "react-router";

function GuestLogin({ handleClose, refetch, showSignIn }) {
  const history = useHistory();
  const { id } = useParams();
  const pathname = window.location.pathname;
  const { Primary, Black, Grey } = colorPallete;
  const [fullname, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [openToast, setOpenToast] = useState(false);
  const [err, setErr] = useState("");
  const [nameError, setNameError] = useState(true);
  const [phoneError, setPhoneError] = useState(true);
  const [emailError, setEmailError] = useState(true);
  const [passError, setPassError] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [sendSignUpData, { loading, error, data }] = useSignUpUser();
  const [
    sendOtpHandler,
    {
      loading: sendLoading,
      error: sendError,
      data: sendOtp,
      refetch: sendRefetch,
    },
  ] = useSendOtp();

  useEffect(() => {
    if (data?.signupUser) {
      sessionStorage.setItem("token", data?.signupUser?.token);
      handleClose();
      refetch();
      if (pathname.includes("/review")) {
        history.push("/payment");
      }
    }
  }, [data]);

  useEffect(() => {
    if (sendOtp) {
      setOpenToast(true);
      setIsSuccess(true);
      setErr("Otp Send to your email");
      setTimeout(() => {
        setOpenToast(false);
      }, 2000);
      setTimeout(() => {
        setIsSuccess(false);
      }, 2500);
    }
  }, [sendOtp]);

  useEffect(() => {
    if (sendError?.message) {
      setOpenToast(true);
      setErr(sendError?.message);
      setTimeout(() => {
        setOpenToast(false);
      }, 2000);
    }
  }, [sendError]);

  useEffect(() => {
    if (error) {
      setErr(error?.message);
      setOpenToast(true);
    }
  }, [error]);

  const guestLoginHandler = () => {
    let fullName = validationHandler(fullname, "name");
    let emailDetails = validationHandler(email, "email");
    let phoneDetails = validationHandler(phone, "phone");
    let errorMsg = "Please Enter Valid ";

    setNameError(fullName);
    setPhoneError(phoneDetails);
    setEmailError(emailDetails);
    if (!password) {
      setPassError(false);
    }

    if (fullName && emailDetails && phoneDetails) {
      eventTracker("webengage", "signup", {
        name: fullName,
        email: email,
        phone: phone,
      });
      return sendSignUpData(fullname, email, phone, password, verificationCode);
    } else {
      if (!fullName) {
        errorMsg += "Name ";
      }
      if (!emailDetails) {
        errorMsg += "Email ";
      }
      if (!phoneDetails) {
        errorMsg += "Phone Number ";
      }
      setErr(errorMsg);
      setOpenToast(true);
    }
  };

  const numberHandler = (number) => {
    if (!numberValidator(number) && number.length < 11) {
      setPhone(number);
    }
    // if (number.length < 11 && number> 0) {
    // }
  };

  return (
    <div className='flex guestLogin'>
      <div className='left_container guest_left_container bg-primary'>
        <div className='p-4 xs:hidden sm:hidden'>
          <h6 className='text-xl font-semibold mt-6'>Sign up Benefits</h6>
          <ul>
            {guestLoginText.map((val) => (
              <li className='my-2'>{val}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className='right_container p-4'>
        <div className='text-right '>
          <img onClick={handleClose} src={remove} alt='remove' />
        </div>

        <h4 className='text-soil font-bold text-2xl '>
          The Hosteller : India's only branded chain of backpacker hostels
        </h4>
        <h6 className='font-semibold my-4 '>Sign Up With Your Email</h6>
        <div className='mt-2'>
          <Input
            value={fullname}
            label={"Full Name"}
            type={"text"}
            use={"login"}
            labelAlign={"left"}
            width='100%'
            onChange={(value) => setFullName(value)}
            isLabel={true}
            variant='outlined'
            isError={fullname ? !nameError : false}
            isRequired={true}
            // helpertext={}
          />
        </div>
        <div className='mt-2 flex items-center'>
          <div className='input_container'>
            <Input
              value={email}
              label={"Email Address"}
              type={"email"}
              use={"login"}
              labelAlign={"left"}
              width='100%'
              onChange={(value) => setEmail(value)}
              isLabel={true}
              variant='outlined'
              isError={email ? !emailError : false}
              isRequired={true}

              // helpertext={}
            />
          </div>
          <div className='mt-5'>
            <Button
              bgColor={email ? Primary : Grey}
              color={Black}
              padding={"1.3rem 2rem"}
              fontWeight={600}
              borderRadius={6}
              label='Verify'
              onClick={() => sendOtpHandler(email)}
              width='100px'
              isDisable={!email}
            />
          </div>
        </div>
        <div className='mt-2'>
          <Input
            value={verificationCode}
            label={"Verification Code"}
            type={"email"}
            use={"login"}
            labelAlign={"left"}
            width='100%'
            onChange={(value) => setVerificationCode(value)}
            isLabel={true}
            variant='outlined'
            isError={email ? !emailError : false}
            isRequired={true}

            // helpertext={}
          />
        </div>
        <div className='mt-2'>
          <Input
            value={phone}
            label={"Mobile Number"}
            type={"text"}
            use={"login"}
            labelAlign={"left"}
            width='100%'
            onChange={(value) => numberHandler(value)}
            isLabel={true}
            variant='outlined'
            isError={phone ? !phoneError : false}
            isRequired={true}

            // helpertext={}
          />
        </div>
        <div className='mt-2'>
          <PasswordInput
            onChange={(val) => setPassword(val)}
            label='Password'
          />
        </div>
        <div className='text-center'>
          <div className='my-2'>
            <Button
              bgColor={
                !(fullname && email && phone && password && verificationCode)
                  ? Grey
                  : Primary
              }
              color={Black}
              padding={"1.3rem 2rem"}
              fontWeight={600}
              borderRadius={6}
              label='Sign Up'
              isDisable={
                !(fullname && email && phone && password && verificationCode)
              }
              onClick={() => guestLoginHandler()}
              width='170px'
            />
          </div>
          <p className='mt-2'>
            By clicking sign up, you agree to our
            <a
              href={process.env.REACT_APP_FRONTEND_URL + "/policies"}
              target='_blank'
              rel='noreferrer'
              className='text-soil cursor-pointer'
            >
              {" "}
              Terms of Use{" "}
            </a>
            and
            <a
              href={process.env.REACT_APP_FRONTEND_URL + "/policies"}
              target='_blank'
              rel='noreferrer'
              className='text-soil cursor-pointer'
            >
              {" "}
              Privacy Policy
            </a>
            .
          </p>
          <p className='mt-3 text-center'>
            Already Have An Account?
            <span
              onClick={() => {
                handleClose();
                showSignIn();
              }}
              className='text-soil font-semibold cursor-pointer'
            >
              {" "}
              Please Login
            </span>
          </p>
        </div>
      </div>
      <div className='absolute'>
        <Toast
          handleClose={() => setOpenToast(false)}
          open={openToast}
          severity={isSuccess ? "success" : "error"}
          message={err}
        />
      </div>
    </div>
  );
}

export default GuestLogin;
