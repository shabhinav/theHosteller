import { gql } from "apollo-boost";

export const FORGET_PASSWORD = gql`
  mutation forgotPassword($email: String) {
    forgotPassword(email: $email) {
      message
      error
    }
  }
`;

export const VERIFY_OTP = gql`
  mutation verifyOtp($email: String, $otp: Int) {
    verifyOtp(email: $email, otp: $otp) {
      message
      error
    }
  }
`;

export const RESET_PASSWORD = gql`
  mutation resetPassword(
    $email: String
    $otp: Int
    $newPassword: String
    $confirmNewPassword: String
  ) {
    resetPassword(
      email: $email
      otp: $otp
      newPassword: $newPassword
      confirmNewPassword: $confirmNewPassword
    ) {
      message
      error
    }
  }
`;
