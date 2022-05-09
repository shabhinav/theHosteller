import { gql } from "apollo-boost";

export const POST_CANCEL_BOOKING = gql`
  mutation cancelBooking($bookingId: ID, $tripId: ID) {
    cancelBooking(bookingId: $bookingId, tripId: $tripId) {
      bookingId
    }
  }
`;

export const BOOKING_DATA = gql`
  mutation userBookings(
    $bookingType: searchType
    $bookingRequestType: bookingRequestType
  ) {
    userBookings(
      bookingType: $bookingType
      bookingRequestType: $bookingRequestType
    ) {
      bookingDetails
    }
  }
`;

export const CREATE_REVIEW = gql`
  mutation createReview($reviewInput: ReviewInput) {
    createReview(reviewInput: $reviewInput) {
      reviewId
      status
      message
    }
  }
`;

export const CREATE_GROUP_BOOKING = gql`
  mutation createGroupBooking($bookingInput: GroupBookingInput) {
    createGroupBooking(bookingInput: $bookingInput) {
      bookingId
    }
  }
`;

export const CREATE_NEWS_LETTER = gql`
  mutation createNewsletter($email: String) {
    createNewsletter(email: $email) {
      email
    }
  }
`;

// createNewsletter
