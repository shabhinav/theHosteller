import { gql } from "apollo-boost";

export const POST_SEARCHED_DATA = gql`
  mutation postSearchedData(
    $hostelId: ID
    $checkinDate: String!
    $checkoutDate: String!
    $numberOfPax: Int!
    $searchType: searchType!
    $tripPackageId: ID
  ) {
    Search(
      hostelId: $hostelId
      checkinDate: $checkinDate
      checkoutDate: $checkoutDate
      numberOfPax: $numberOfPax
      searchType: $searchType
      tripPackageId: $tripPackageId
    ) {
      _id
      checkinDate
      checkoutDate
      numberOfPax
      sessionId
      hostelId
      tripPackageId
      searchType
      url
      metaDesc
      keywords
      h1Tags
    }
  }
`;

export const TRIP_POST_BOOKING_DATA = gql`
  mutation bookingInit($bookingInput: BookingInput) {
    bookingInit(bookingInput: $bookingInput) {
      tripId
    }
  }
`;

export const POST_BOOKING_DATA = gql`
  mutation bookingInit($bookingInput: BookingInput) {
    bookingInit(bookingInput: $bookingInput) {
      bookingId
    }
  }
`;

export const SIGN_UP_USER = gql`
  mutation signupUser(
    $fullName: String!
    $email: String!
    $mobile: String!
    $password: String!
    $otp: Int!
  ) {
    signupUser(
      fullName: $fullName
      email: $email
      mobile: $mobile
      password: $password
      otp: $otp
    ) {
      fullName
      mobile
      email
      token
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      tokenExpiration
    }
  }
`;

export const BOOKING_INIT = gql`
  mutation razorpayInit($bookingId: String!) {
    razorpayInit(bookingId: $bookingId) {
      amount
      currency
      orderId
    }
  }
`;

export const TRIP_BOOKING_INIT = gql`
  mutation razorpayInit($tripId: String!) {
    razorpayInit(tripId: $tripId) {
      amount
      currency
      orderId
    }
  }
`;

export const GOOGLE_LOGIN = gql`
  mutation GoogleSignup($accessToken: String!) {
    GoogleSignup(accessToken: $accessToken) {
      token
      tokenExpiration
    }
  }
`;

export const FACEBOOK_LOGIN = gql`
  mutation facebookSignup($accessToken: String!) {
    facebookSignup(accessToken: $accessToken) {
      token
      tokenExpiration
    }
  }
`;

export const POST_COUPON_DATA = gql`
  mutation addCouponDiscount($couponDiscounInput: CouponDiscounInput) {
    addCouponCodeDiscount(couponDiscounInput: $couponDiscounInput) {
      discountAmount
      couponStatus
      couponError
    }
  }
`;

export const CUSTOM_COUPON_DATA = gql`
  mutation applyCouponByPromoCode($couponDiscounInput: CouponDiscounInput) {
    applyCouponByPromoCode(couponDiscounInput: $couponDiscounInput) {
      discountAmount
      couponStatus
      couponError
      couponId
    }
  }
`;

export const TRIP_CUSTOM_COUPON = gql`
  mutation applyCouponByPromoCodeForTrips($promoCode: String, $tripId: ID) {
    applyCouponByPromoCodeForTrips(promoCode: $promoCode, tripId: $tripId) {
      discountAmount
      couponError
      couponStatus
      couponId
    }
  }
`;

export const TRIP_COUPON = gql`
  mutation addCouponCodeDiscountToTrip($couponId: ID, $tripId: ID) {
    addCouponCodeDiscountToTrip(couponId: $couponId, tripId: $tripId) {
      discountAmount
      couponError
      couponStatus
    }
  }
`;

export const WORKATION_COUPON = gql`
  mutation addCouponCodeDiscountForWorkation(
    $couponDiscounInput: CouponDiscounInput
  ) {
    addCouponCodeDiscountForWorkation(couponDiscounInput: $couponDiscounInput) {
      discountAmount
      couponStatus
      couponError
    }
  }
`;

export const WORKATION_CUSTOM_COUPON = gql`
  mutation applyCouponByPromoCodeForWorkation(
    $couponDiscounInput: CouponDiscounInput
  ) {
    applyCouponByPromoCodeForWorkation(
      couponDiscounInput: $couponDiscounInput
    ) {
      discountAmount
      couponStatus
      couponError
      couponId
    }
  }
`;

export const GET_SUCCESS_INVOICE = gql`
  mutation getInvoiceOnSuccess(
    $bookingId: ID
    $invoiceAction: InvoiceAction
    $tripId: ID
  ) {
    getInvoiceOnSuccess(
      bookingId: $bookingId
      invoiceAction: $invoiceAction
      tripId: $tripId
    ) {
      invoiceUrl
    }
  }
`;

export const BOOKING_SUCCESS_DATA = gql`
  mutation getTripOnSuccess($tripId: ID) {
    getTripOnSuccess(tripId: $tripId) {
      tripName
      roomsBooking
      checkinDate
      checkoutDay
      tripRefId
    }
  }
`;

export const BOOKING_SUCCESS = gql`
  mutation getBookingOnSuccess($bookingId: ID) {
    getBookingOnSuccess(bookingId: $bookingId) {
      providerRefId
    }
  }
`;

export const BOOKING_STATUS_HANDLER = gql`
  mutation getBookingStatusById($bookingId: ID, $tripId: ID) {
    getBookingStatusById(bookingId: $bookingId, tripId: $tripId) {
      status
      message
    }
  }
`;

export const SEO_URL = gql`
  mutation getSEOByProductType($id: ID, $productType: productTypeEnum) {
    getSEOByProductType(id: $id, productType: $productType) {
      url
      h1Tags
      metaDesc
      keywords
    }
  }
`;

export const SEND_OTP_MAIL = gql`
  mutation sendOtpMail($email: String!) {
    sendOtpMail(email: $email) {
      email
    }
  }
`;

export const SEARCH_BY_SESSIONID = gql`
  mutation SearchBySession($sessionId: String!) {
    SearchBySession(sessionId: $sessionId) {
      checkinDate
      checkoutDate
      searchResults
      roomAvailableMessage
    }
  }
`;

export const GET_BY_URL = gql`
  mutation getByUrl($url: String) {
    getByUrl(url: $url) {
      id
      productType
      h1Tags
      metaDesc
      keywords
    }
  }
`;

export const GETHOSTELDETAILS = gql`
  mutation getHostelDetails($hostelId: ID!) {
    getHostelDetails(hostelId: $hostelId) {
      _id
      name
      shortDesc
      heroImage {
        image
        key
      }
      basePrice
      totalRooms
      totalBeds
      description {
        heading
        content
      }
      otherInfo {
        heading
        content
        icon
        key
      }
      amenities {
        amenity {
          name
          icon
          key
        }
        status
      }
      images {
        image
        key
        type
      }
      bookingPolicy {
        heading
        textlist
      }
      hostelPolicy {
        heading
        textlist
      }
      cancellationPolicy {
        heading
        textlist
      }
      workationFaqs {
        question
        answer
      }
      hostelFaqs {
        question
        answer
      }
      phone
      email
      location {
        latitude
        longitude
      }
      locationUrl
      deleted
      status
      reviews {
        userName
        dateTime
        avatar
        content
      }
      rating
      totalReviews
      checkinTime
      checkoutTime
      thingsToKnow {
        heading
        textlist
      }
      howToReach {
        heading
        textlist
      }
      address {
        addressLine
        city
        state
        country
        pincode
        addressLine1
        addressLine2
      }
      cityInfo
      ezeeConfig {
        authCode
        hotelCode
      }
      hostelDetail
    }
  }
`;
