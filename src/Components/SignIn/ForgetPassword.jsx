import React, { useEffect, useState } from "react";
import Input from "../Common/Input/Input";
import Button from "../Common/Button/Button";
import { colorPallete } from "../../Resources/theme";
import PasswordInput from "../Common/passwordInput/Input";
import Toast from "../Common/Toast/Toast";
import {
  useResetPasswordHandler,
  useVerifyOtp,
} from "../../Services/datasource";

function ForgetPassword({ email, step, setStep, errorForgetPassword }) {
  const { Black, Grey, Primary } = colorPallete;
  const [verificationCode, setVerificationCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [openToast, setOpenToast] = useState(false);
  const [severity, setSeverity] = useState("");
  const [err, setErr] = useState("password and confirm Password are not same");
  const [verifyOtpHandler, { loading, error, data }] = useVerifyOtp();
  const [
    userResetPasswordHandler,
    { data: resetPassData, refetch, error: errorPassword },
  ] = useResetPasswordHandler();

  const resetPasswordHandler = () => {
    if (password !== confirmPassword) {
      setOpenToast(true);
      setSeverity(true)
      setErr("Password and Confirm Password are not same");
    } else {
      userResetPasswordHandler(
        email,
        +verificationCode,
        password,
        confirmPassword
      );
    }
  };

  const verificationHandler = () => {
    verifyOtpHandler(email, +verificationCode);
  };

  useEffect(() => {
    if (data?.verifyOtp) {
      if (data?.verifyOtp?.error) {
        setErr(data?.verifyOtp?.message);
        setOpenToast(true);
        setSeverity(true);
      } else {
        setErr(data?.verifyOtp?.message);
        setOpenToast(true);
        setSeverity(false);
        setTimeout(() => {
          setStep(2);
        }, 2000);
      }
    }
  }, [data]);

  useEffect(() => {
    if (resetPassData) {
      setOpenToast(true);
      setErr(resetPassData?.resetPassword?.message);
      setSeverity(resetPassData?.resetPassword?.error);
      setTimeout(() => {
        setStep(0);
      }, 3000);
    }
  }, [resetPassData]);

  return (
    <div className='mt-8'>
      {step === 1 ? (
        <div>
          <Input
            value={email}
            handleClick={""}
            label={"Email "}
            type='email'
            onChange={(value) => console.log(value)}
            use={"login"}
            labelAlign={"left"}
            width='100%'
            isLabel={true}
            variant='outlined'
            isRequired={true}
          />
          <div className='mt-4'>
            <Input
              value={verificationCode}
              handleClick={""}
              label={"Verification Code "}
              type='number'
              use={"login"}
              onChange={(value) => setVerificationCode(value)}
              labelAlign={"left"}
              width='100%'
              isLabel={true}
              variant='outlined'
              isRequired={true}
            />
          </div>
          <div className='mt-8 text-center'>
            <Button
              bgColor={!verificationCode ? Grey : Primary}
              color={Black}
              padding={"1.2rem 3rem"}
              fontWeight={600}
              borderRadius={6}
              label='Continue'
              isDisable={!verificationCode}
              onClick={() => {
                verificationHandler();
              }}
              width='220px'
            />
          </div>
        </div>
      ) : (
        <div>
          <PasswordInput
            password={password}
            onChange={(val) => setPassword(val)}
            label='Password'
          />
          <div className='mt-4'>
            <PasswordInput
              password={confirmPassword}
              onChange={(val) => setConfirmPassword(val)}
              label='Confirm Password'
            />
          </div>
          <div className='mt-8 text-center'>
            <Button
              bgColor={!(password && confirmPassword) ? Grey : Primary}
              color={Black}
              padding={"1.2rem 3rem"}
              fontWeight={600}
              borderRadius={6}
              label='Reset'
              isDisable={!(password && confirmPassword)}
              onClick={() => {
                resetPasswordHandler();
              }}
              width='220px'
            />
          </div>
        </div>
      )}
      <div className='absolute'>
        <Toast
          handleClose={() => setOpenToast(false)}
          open={openToast}
          severity={severity ? "error" : "success"}
          message={err}
        />
      </div>
    </div>
  );
}

export default ForgetPassword;
