import { gql } from "apollo-boost";

export const GET_PROFILE = gql`
  query getProfile {
    profile {
      fullName
      email
      mobile
      password
      gender
      dateOfBirth
      profilePhoto
      city
      travellerRes
    }
  }
`;

export const GET_PROFILE_COMPLETION = gql`
  query profilePercentage {
    profilePercentage {
      Percentage
    }
  }
`;
