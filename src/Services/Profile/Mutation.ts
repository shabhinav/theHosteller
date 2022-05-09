import { gql } from "apollo-boost";

export const EDIT_PROFILE = gql`
  mutation editProfile(
    $fullName: String
    $gender: String
    $dateOfBirth: String
    $city: String
    $mobile: String
  ) {
    editProfile(
      fullName: $fullName
      gender: $gender
      dateOfBirth: $dateOfBirth
      city: $city
      mobile: $mobile
    ) {
      fullName
      dateOfBirth
      gender
      city
    }
  }
`;

export const ADD_TRAVELLER = gql`
  mutation addTraveller(
    $fullName: String!
    $gender: String
    $age: String
  ) {
    addTraveller(
      fullName: $fullName
      gender: $gender
      age: $age
    ) {
      travellerRes
    }
  }
`;

export const EDIT_TRAVELLER = gql`
  mutation editTraveller(
    $fullName: String
    $gender: String
    $age: String
    $travellerId: ID
  ) {
    editTraveller(
      fullName: $fullName
      gender: $gender
      age: $age
      travellerId: $travellerId
    ) {
      fullName
      gender
      age
    }
  }
`;

export const IMAGE_UPLOAD = gql`
  mutation singleUpload($file: Upload!) {
    singleUpload(file: $file) {
      filename
      mimetype
      encoding
      uri
      key
    }
  }
`;
