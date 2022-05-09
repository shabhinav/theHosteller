import { gql } from "apollo-boost";

export const TRIPS_SEARCH = gql`
  mutation tripsSearch(
    $checkinDate: String
    $checkoutDate: String
    $numberOfPax: Int
    $searchType: searchType
    $tripId: String
  ) {
    Search(
      checkinDate: $checkinDate
      checkoutDate: $checkoutDate
      numberOfPax: $numberOfPax
      searchType: $searchType
      tripId: $tripId
    ) {
      searchResults
      checkoutDate
    }
  }
`;

export const TRIPS_BOOKING = gql`
  mutation tripBooking(
    $checkinDate: String
    $tripPackageId: String
    $numberOfPax: Int
    $startingPoint: ID
  ) {
    tripBooking(
      checkinDate: $checkinDate
      tripPackageId: $tripPackageId
      numberOfPax: $numberOfPax
      startingPoint: $startingPoint
    ) {
      tripId
      tripPackageId
      tripResponse
    }
  }
`;

export const TRIP_SEARCH_BOOKING = gql`
  mutation Search(
    $tripPackageId: ID!
    $checkinDate: String!
    $searchType: searchType
  ) {
    Search(
      tripPackageId: $tripPackageId
      checkinDate: $checkinDate
      searchType: $searchType
    ) {
      checkinDate
      searchResults
      sessionId
      url
      h1Tags
      metaDesc
      keywords
    }
  }
`;

export const TRIP_ENQUIRY_FORM = gql`
  mutation createTripEnquiry($tripEnquiryInput: TripEnquiryData) {
    createTripEnquiry(tripEnquiryInput: $tripEnquiryInput) {
      _id
      name
    }
  }
`;
