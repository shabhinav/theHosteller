import React, { useEffect, useState } from "react";
import Input from "../Common/Input/Input";
import Button from "../Common/Button/Button";
import { colorPallete } from "../../Resources/theme";
import {
  useFacebookLogin,
  useForgetPassword,
  useGoogleLogin,
  useSignInUser,
  useSendOtp,
} from "../../Services/datasource";
import "./SignIn.scss";
import remove from "../../Assets/images/remove.png";
import Toast from "../Common/Toast/Toast";
import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login";
import { eventTracker, validationHandler } from "../../Utils/utils";
import PasswordInput from "../Common/passwordInput/Input";
import FB from "../../Assets/Icons/fb.svg";
import { useHistory, useParams } from "react-router";
import ForgetPassword from "./ForgetPassword";

const FacebookHandler = () => {
  return <img className='mr-2' src={FB} alt='facebook' />;
};

function SignIn({ handleClose, refetch: authRefetch, showGuestLogin }) {
  const history = useHistory();
  const { id } = useParams();
  const pathname = window.location.pathname;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [openToast, setOpenToast] = useState(false);
  const [err, setErr] = useState("");
  const [emailError, setEmailError] = useState(true);
  const [step, setStep] = useState(0);
  const [passError, setPassError] = useState(true);
  const { Primary, Black, Grey } = colorPallete;
  const [isError, setIsError] = useState(false);
  const [googleLoginHandler, { data: googleData }] = useGoogleLogin();
  const [faceBookLoginHandler, { data: facebookData }] = useFacebookLogin();

  const [sendSignInData, { loading, error, data, refetch }] = useSignInUser(
    email,
    password
  );

  const [
    userForgetPasswordHandler,
    { data: forgetPassword, errorForgetPassword },
  ] = useForgetPassword();

  const saveUserDataHandler = (token, condition) => {
    localStorage.setItem("token", token);
    if (condition) {
      condition();
    }
    handleClose();
    authRefetch();
  };

  useEffect(() => {
    if (forgetPassword?.forgotPassword?.message) {
      if (forgetPassword?.forgotPassword?.error) {
        setIsError(true);
        setErr(forgetPassword?.forgotPassword?.message);
        setOpenToast(true);
      } else {
        setIsError(false);
        setErr(forgetPassword?.forgotPassword?.message);
        setOpenToast(true);
        setTimeout(() => {
          setStep(1);
        }, 2000);
      }
    }
  }, [forgetPassword]);

  useEffect(() => {
    if (data?.login?.token) {
      saveUserDataHandler(data?.login?.token, () => {
        if (pathname.includes("/review")) {
          history.push("/payment");
        }
      });
    } else if (googleData?.GoogleSignup?.token) {
      saveUserDataHandler(googleData?.GoogleSignup?.token, () => {
        if (pathname.includes("/review")) {
          history.push("/payment");
        }
      });
    } else if (facebookData?.facebookSignup?.token) {
      saveUserDataHandler(facebookData?.facebookSignup?.token, () => {
        if (pathname.includes("/review")) {
          history.push("/payment");
        }
      });
    }
  }, [data, googleData, facebookData, pathname]);

  useEffect(() => {
    if (error) {
      setIsError(true);
      setErr(error?.message);
      setOpenToast(true);
    }
  }, [error]);

  const responseFacebook = (response) => {
    if (response?.accessToken) {
      faceBookLoginHandler(response?.accessToken);
    }
  };

  const responseGoogle1 = (resp) => {
    if (resp?.accessToken) {
      googleLoginHandler(resp?.accessToken);
    }
  };

  const forgetPasswordHandler = () => {
    userForgetPasswordHandler(email);
  };

  const loginHandler = () => {
    let emailDetails = validationHandler(email, "email");
    setEmailError(emailDetails);
    if (!password) {
      setPassError(false);
    }

    if (email && password) {
      eventTracker("webengage", "login", {
        email: email,
      });
      sendSignInData(email, password);
    } else {
      setErr("Please Fill Every Field");
      setOpenToast(true);
    }
  };

  return (
    <div className='flex guestLogin'>
      <div className='right_left_container bg-primary'>
        <div className=' p-4 xs:hidden sm:hidden'>
          <p className='text-xl'>
            <q>
              Like all great travellers, I have seen
              <br /> more than I remember and remember
              <br /> more than I have seen.
            </q>
          </p>
          <p className='text-xl mt-2'>~ Benjamin Disraeli</p>
        </div>
      </div>
      <div className='right_container p-4'>
        <div className='text-right relative'>
          <img
            className='pointer-cursor'
            onClick={handleClose}
            src={remove}
            alt='remove'
          />
        </div>
        <h4 className='text-soil font-bold text-2xl'>
          The Hosteller : India's only branded chain of backpacker hostels
        </h4>
        {step === 0 ? (
          <div>
            <h6 className='my-3  text-lg'>
              Welcome back! Please login to your account.
            </h6>
            <div className='mt-6'>
              <Input
                value={email}
                handleClick={""}
                label={"Email "}
                type='email'
                use={"login"}
                labelAlign={"left"}
                width='100%'
                onChange={(value) => setEmail(value)}
                isLabel={true}
                variant='outlined'
                isError={!emailError}
                isRequired={true}
              />
            </div>
            <div className='mt-4'>
              <PasswordInput
                email={email}
                password={password}
                onChange={(val) => setPassword(val)}
                isSignIn={true}
                label='Password'
                forgetPasswordHandler={forgetPasswordHandler}
              />
            </div>
            <div className='text-center'>
              <div className='my-4'>
                <Button
                  bgColor={!(email && password) ? Grey : Primary}
                  color={Black}
                  padding={"1.2rem 3rem"}
                  fontWeight={600}
                  borderRadius={6}
                  label='Continue'
                  isDisable={!(email && password)}
                  onClick={() => {
                    loginHandler();
                  }}
                  width='220px'
                />
              </div>
              <p className='text-center'>Or</p>
              <div className='my-3 cursor-pointer'>
                <FacebookLogin
                  appId={process.env.REACT_APP_FACEBOOK_ID}
                  autoLoad={false}
                  fields='name,email,picture'
                  cssClass='facebook_button'
                  icon={<FacebookHandler />}
                  // onClick={componentClicked}
                  callback={responseFacebook}
                />
              </div>
              <div className='mt-2 flex justify-center'>
                <GoogleLogin
                  clientId={process.env.REACT_APP_GOOGLE_ID}
                  buttonText='Login with Google'
                  onSuccess={responseGoogle1}
                  onFailure={responseGoogle1}
                  className='google_button'
                  cookiePolicy={"single_host_origin"}
                />
              </div>
              <p className='mt-6 text-grey text-center'>
                New to Hosteller?
                <span
                  onClick={() => {
                    showGuestLogin();
                    handleClose();
                  }}
                  className='text-soil font-semibold cursor-pointer'
                >
                  {" "}
                  Please Sign Up
                </span>
              </p>
            </div>
          </div>
        ) : (
          <ForgetPassword
            setStep={(val) => setStep(val)}
            step={step}
            email={email}
            errorForgetPassword={errorForgetPassword}
          />
        )}
      </div>
      <div className='absolute'>
        <Toast
          handleClose={() => setOpenToast(false)}
          open={openToast}
          severity={isError ? "error" : "success"}
          message={err}
        />
      </div>
    </div>
  );
}

export default SignIn;

// insert on line 196
