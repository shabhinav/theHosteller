import { useMutation, useQuery } from "@apollo/client";
import {
  POST_BOOKING_DATA,
  POST_SEARCHED_DATA,
  SIGN_UP_USER,
  LOGIN_USER,
  BOOKING_INIT,
  TRIP_BOOKING_INIT,
  TRIP_POST_BOOKING_DATA,
  GOOGLE_LOGIN,
  FACEBOOK_LOGIN,
  POST_COUPON_DATA,
  CUSTOM_COUPON_DATA,
  TRIP_COUPON,
  TRIP_CUSTOM_COUPON,
  WORKATION_CUSTOM_COUPON,
  WORKATION_COUPON,
  GET_SUCCESS_INVOICE,
  BOOKING_SUCCESS,
  BOOKING_SUCCESS_DATA,
  BOOKING_STATUS_HANDLER,
  SEO_URL,
  SEND_OTP_MAIL,
  SEARCH_BY_SESSIONID,
  GET_BY_URL,
  GETHOSTELDETAILS,
} from "./Home/Mutation";
import {
  GET_COUPON_LIST,
  GET_HOME_PAGE_BANNER,
  GET_HOSTEL_DATA,
  GET_HOSTEL_DETAILS,
  IS_AUTH,
  GET_RECOMMENDATIONS_BY_TYPE,
  GET_ALL_RECOMMENDATIONS,
  GET_RECOMMENDATIONS_BY_PRODUCT_TYPE,
  GET_LANDING_PAGE_IMAGES,
  GET_SIMILAR_DATA,
} from "./Home/Queries";
import {
  EDIT_PROFILE,
  ADD_TRAVELLER,
  EDIT_TRAVELLER,
  IMAGE_UPLOAD,
} from "./Profile/Mutation";
import {
  POST_CANCEL_BOOKING,
  BOOKING_DATA,
  CREATE_REVIEW,
  CREATE_GROUP_BOOKING,
  CREATE_NEWS_LETTER,
} from "./Booking/Mutation";
import { GET_PROFILE, GET_PROFILE_COMPLETION } from "./Profile/Queries";
import { TRIPS_DETAILS, TRIPS_SEARCH_LIST } from "./Trips/Queries";
import {
  TRIPS_BOOKING,
  TRIP_SEARCH_BOOKING,
  TRIP_ENQUIRY_FORM,
} from "./Trips/Mutation";
import { GET_PROPERTY_LIST } from "./Partner/Queries";
import { POST_PARTNER_DATA } from "./Partner/Mutation";
import { GET_ALL_BLOGS, GET_BLOGS } from "./Blog/Queries";
import { FILTER_BLOG } from "./Blog/Mutation";
import { FORGET_PASSWORD, VERIFY_OTP, RESET_PASSWORD } from "./Login/Mutation";

export function useGetFaqs() {
  const { loading, error, data, refetch } = useQuery(GET_HOME_PAGE_BANNER);

  return { loading, error, data, refetch };
}

export function useGetHostelsList() {
  const { loading, error, data, refetch } = useQuery(GET_HOSTEL_DATA);

  return { loading, error, data, refetch };
}

export function usePostSearchedData() {
  const [searchedData, { loading, error, data, refetch }] = useMutation(
    POST_SEARCHED_DATA,
    { errorPolicy: "all" }
  );
  const sendSearchedData = (
    hostelId,
    checkinDate,
    checkoutDate,
    numberOfPax,
    searchType,
    tripPackageId
  ) =>
    searchedData({
      variables: {
        hostelId,
        checkinDate,
        checkoutDate,
        numberOfPax: parseInt(numberOfPax),
        searchType: searchType,
        tripPackageId,
      },
    });

  return [sendSearchedData, { loading, error, data, refetch }];
}

export const useSignInUser = () => {
  const [signIn, { loading, error, data, refetch }] = useMutation(LOGIN_USER, {
    errorPolicy: "all",
  });

  const sendSignInData = (email, password) =>
    signIn({
      variables: {
        email,
        password,
      },
    });
  return [sendSignInData, { loading, error, data, refetch }];
};

export const useGetHostelDetails = (hostelId) => {
  const { loading, error, data, refetch } = useQuery(GET_HOSTEL_DETAILS, {
    variables: { hostelId },
  });

  return { loading, error, data, refetch };
};

export const useGetProfileDetails = () => {
  const { loading, error, data, refetch } = useQuery(GET_PROFILE);

  return { loading, error, data, refetch };
};

export const usePostBookingDetails = () => {
  const [bookingDetails, { loading, error, data, refetch }] = useMutation(
    POST_BOOKING_DATA,
    { errorPolicy: "all" }
  );

  const sendBookingData = (bookingData) =>
    bookingDetails({ variables: { bookingInput: bookingData } });

  return [sendBookingData, { loading, error, data, refetch }];
};

export const usePostTripBookingDetails = () => {
  const [bookingDetails, { loading, error, data, refetch }] = useMutation(
    TRIP_POST_BOOKING_DATA,
    { errorPolicy: "all" }
  );

  const sendTripBookingData = (bookingData) =>
    bookingDetails({ variables: { bookingInput: bookingData } });

  return [sendTripBookingData, { loading, error, data, refetch }];
};

export const useSignUpUser = () => {
  const [signUp, { loading, error, data, refetch }] = useMutation(
    SIGN_UP_USER,
    { errorPolicy: "all" }
  );

  const sendSignUpData = (fullName, email, mobile, password, otp) =>
    signUp({
      variables: {
        fullName,
        email,
        mobile,
        password,
        otp: Number(otp),
      },
    });
  return [sendSignUpData, { loading, error, data, refetch }];
};

export const useIsAuth = () => {
  const { loading, error, data, refetch } = useQuery(IS_AUTH);

  return { loading, error, data, refetch };
};

export const useRazorPayInit = () => {
  const [bookingData, { loading, error, data, refetch }] = useMutation(
    BOOKING_INIT,
    { errorPolicy: "all" }
  );

  const sendBookedData = (bookingId) =>
    bookingData({
      variables: { bookingId },
    });

  return [sendBookedData, { loading, error, data, refetch }];
};

export const useTripRazorPayInit = () => {
  const [bookingData, { loading, error, data, refetch }] = useMutation(
    TRIP_BOOKING_INIT,
    { errorPolicy: "all" }
  );

  const sendTripBookedData = (tripId) =>
    bookingData({
      variables: { tripId },
    });

  return [sendTripBookedData, { loading, error, data, refetch }];
};

export const useEditProfile = () => {
  const [editData, { loading, error, data, refetch }] = useMutation(
    EDIT_PROFILE,
    { errorPolicy: "all" }
  );

  const updateData = (name, birthday, gender, location, phone) =>
    editData({
      variables: {
        fullName: name,
        dateOfBirth: birthday,
        gender: gender,
        city: location,
        mobile: phone,
      },
    });

  return [updateData, { loading, error, data, refetch }];
  //
};

export const useAddTraveller = () => {
  const [addTraveller, { loading, error, data, refetch }] = useMutation(
    ADD_TRAVELLER,
    { errorPolicy: "all" }
  );

  const addTravellerHandler = (name, gender, age) =>
    addTraveller({
      variables: {
        fullName: name,
        gender: gender,
        age: age,
      },
    });

  return [addTravellerHandler, { loading, error, data, refetch }];
};

export const useEditTravel = () => {
  const [editProfile, { loading, error, data, refetch }] = useMutation(
    EDIT_TRAVELLER,
    { errorPolicy: "all" }
  );
  const editProfileHandler = (fullName, gender, age, travellerId) =>
    editProfile({ variables: { fullName, gender, age, travellerId } });

  return [editProfileHandler, { loading, error, data, refetch }];
};

export const useTripsSearchList = () => {
  const { loading, error, data, refetch } = useQuery(TRIPS_SEARCH_LIST);

  return { loading, error, data, refetch };
};

export const useGetTripsDetails = (tripId) => {
  const { loading, error, data, refetch } = useQuery(TRIPS_DETAILS, {
    variables: { id: tripId },
  });

  return { loading, error, data, refetch };
};

export function usePostTripSearchedData() {
  const [searchedData, { loading, error, data, refetch }] = useMutation(
    POST_SEARCHED_DATA,
    { errorPolicy: "all" }
  );
  const sendTripSearchedData = (
    tripId,
    checkinDate,
    checkoutDate,
    numberOfPax,
    searchType
  ) =>
    searchedData({
      variables: {
        tripId,
        checkinDate,
        checkoutDate,
        numberOfPax: parseInt(numberOfPax),
        searchType: searchType.toUpperCase(),
      },
    });

  return [sendTripSearchedData, { loading, error, data, refetch }];
}

export const useTripBooking = () => {
  const [tripBooking, { loading, error, data, refetch }] = useMutation(
    TRIPS_BOOKING,
    { errorPolicy: "all" }
  );

  const tripBookingHandler = (
    checkinDate,
    tripPackageId,
    numberOfPax,
    startingPoint
  ) =>
    tripBooking({
      variables: {
        checkinDate,
        tripPackageId,
        numberOfPax,
        startingPoint,
      },
    });

  return [tripBookingHandler, { loading, error, data, refetch }];
};

export const useTripSearch = () => {
  const [tripSearch, { loading, error, data, refetch }] = useMutation(
    TRIP_SEARCH_BOOKING,
    { errorPolicy: "all" }
  );

  const tripSearchHandler = (tripPackageId, checkinDate, searchType) =>
    tripSearch({
      variables: {
        tripPackageId,
        checkinDate,
        searchType: searchType.toUpperCase(),
      },
    });

  return [tripSearchHandler, { loading, error, data, refetch }];
};

export const useCancelBooking = () => {
  const [cancelBooking, { loading, error, data, refetch }] = useMutation(
    POST_CANCEL_BOOKING,
    { errorPolicy: "all" }
  );

  const cancelBookingUserHandler = (bookingId, tripId) =>
    cancelBooking({ variables: { bookingId, tripId } });

  return [cancelBookingUserHandler, { loading, error, data, refetch }];
};

export const useGetPropertyList = () => {
  const { loading, error, data, refetch } = useQuery(GET_PROPERTY_LIST);

  return { loading, error, data, refetch };
};

export const usePostPartnerData = () => {
  const [partnerData, { loading, error, data, refetch }] =
    useMutation(POST_PARTNER_DATA);

  const partnerDataHandler = (
    name,
    salutation,
    email,
    mobile,
    background,
    specify,
    existing,
    link
  ) => {
    partnerData({
      variables: {
        partnerInput: {
          fullName: name,
          salutation,
          email: email,
          mobile: mobile,
          profession: background,
          location: specify,
          propertyType: existing,
          link,
        },
      },
    });
  };

  return [partnerDataHandler, { loading, error, data, refetch }];
};

export const useGoogleLogin = () => {
  const [googleLogin, { loading, error, data, refetch }] =
    useMutation(GOOGLE_LOGIN);

  const googleLoginHandler = (accessToken) => {
    googleLogin({ variables: { accessToken } });
  };
  return [googleLoginHandler, { loading, error, data, refetch }];
};

export const useFacebookLogin = () => {
  const [faceBookLogin, { loading, error, data, refetch }] =
    useMutation(FACEBOOK_LOGIN);

  const faceBookLoginHandler = (accessToken) => {
    faceBookLogin({ variables: { accessToken } });
  };
  return [faceBookLoginHandler, { loading, error, data, refetch }];
};

export const useGetProfilePercentage = () => {
  const { loading, error, data, refetch } = useQuery(GET_PROFILE_COMPLETION);

  return { loading, error, data, refetch };
};

export const useImageUpload = () => {
  const [imageUploader, { loading, error, data, refetch }] =
    useMutation(IMAGE_UPLOAD);

  const imageUploadHandler = (file) => {
    imageUploader({ variables: { file } });
  };

  return [imageUploadHandler, { loading, error, data, refetch }];
};

export const useGetCoupon = (searchType) => {
  const { loading, error, data, refetch } = useQuery(GET_COUPON_LIST, {
    variables: {
      searchType,
    },
    fetchPolicy: "network-only",
  });
  return { loading, error, data, refetch };
};

export const usePostCoupon = () => {
  const [couponsData, { loading, error, data, refetch }] =
    useMutation(POST_COUPON_DATA);

  const couponHandler = (couponDiscounInput) => {
    couponsData({
      variables: {
        couponDiscounInput,
      },
      fetchPolicy: "network-only",
    });
  };

  return [couponHandler, { loading, error, data, refetch }];
};

export const useTripCustomCoupon = () => {
  const [tripCouponsData, { loading, error, data, refetch }] =
    useMutation(TRIP_CUSTOM_COUPON);

  const tripCustomCouponHandler = (tripId, promoCode) => {
    tripCouponsData({
      variables: {
        tripId,
        promoCode,
      },
      fetchPolicy: "network-only",
    });
  };

  return [tripCustomCouponHandler, { loading, error, data, refetch }];
};

export const useTripCoupon = () => {
  const [tripCouponsData, { loading, error, data, refetch }] =
    useMutation(TRIP_COUPON);

  const tripCouponHandler = (couponId, tripId) => {
    tripCouponsData({
      variables: {
        couponId: couponId,
        tripId: tripId,
      },
      fetchPolicy: "network-only",
    });
  };

  return [tripCouponHandler, { loading, error, data, refetch }];
};

export const useCustomCouponHandler = () => {
  const [couponsData, { loading, error, data, refetch }] =
    useMutation(CUSTOM_COUPON_DATA);

  const customCouponHandler = (couponDiscounInput) => {
    couponsData({
      variables: {
        couponDiscounInput,
      },
      fetchPolicy: "network-only",
    });
  };
  return [customCouponHandler, { loading, error, data, refetch }];
};

export const useHostelDetails = (hostelId) => {
  const [hostelDetails, { loading, error, data, refetch }] =
    useMutation(GETHOSTELDETAILS);

  const hostelDetailsHandler = (hostelId) => {
    hostelDetails({
      variables: { hostelId },
    });
  };

  return [hostelDetailsHandler, { loading, error, data, refetch }];
};

export const useBookingSuccessData = () => {
  const [tripSuccess, { loading, error, data, refetch }] =
    useMutation(BOOKING_SUCCESS_DATA);

  const tripSuccessHandler = (tripId) => {
    tripSuccess({
      variables: { tripId },
    });
  };

  return [tripSuccessHandler, { loading, error, data, refetch }];
};

export const useWorkationCoupon = () => {
  const [couponsData, { loading, error, data, refetch }] =
    useMutation(WORKATION_COUPON);

  const workationCoupon = (couponDiscounInput) => {
    couponsData({
      variables: {
        couponDiscounInput,
      },
      fetchPolicy: "network-only",
    });
  };
  return [workationCoupon, { loading, error, data, refetch }];
};

export const useWorkationCustomCoupon = () => {
  const [couponsData, { loading, error, data, refetch }] = useMutation(
    WORKATION_CUSTOM_COUPON
  );

  const workationCustomCoupon = (couponDiscounInput) => {
    couponsData({
      variables: {
        couponDiscounInput,
      },
      fetchPolicy: "network-only",
    });
  };
  return [workationCustomCoupon, { loading, error, data, refetch }];
};

export const useGetAllBlogs = () => {
  const { loading, error, data, refetch } = useQuery(GET_ALL_BLOGS);
  return { loading, error, data, refetch };
};

export const useGetBlog = (id) => {
  const { loading, error, data, refetch } = useQuery(GET_BLOGS, {
    variables: { id },
  });
  return { loading, error, data, refetch };
};

export const useForgetPassword = () => {
  const [forgetPassword, { loading, error, data, refetch }] =
    useMutation(FORGET_PASSWORD);

  const userForgetPasswordHandler = (email) => {
    forgetPassword({ variables: { email } });
  };

  return [userForgetPasswordHandler, { loading, error, data, refetch }];
};

export const useVerifyOtp = () => {
  const [verifyOtp, { loading, error, data, refetch }] =
    useMutation(VERIFY_OTP);

  const verifyOtpHandler = (email, otp) => {
    verifyOtp({ variables: { email, otp } });
  };

  return [verifyOtpHandler, { loading, error, data, refetch }];
};

export const useResetPasswordHandler = () => {
  const [resetPassword, { loading, error, data, refetch }] =
    useMutation(RESET_PASSWORD);

  const userResetPasswordHandler = (
    email,
    otp,
    newPassword,
    confirmNewPassword
  ) => {
    resetPassword({
      variables: { email, otp, newPassword, confirmNewPassword },
    });
  };

  return [userResetPasswordHandler, { loading, error, data, refetch }];
};

export const useFilterBlog = () => {
  const [filterBlog, { loading, error, data, refetch }] =
    useMutation(FILTER_BLOG);

  const filterBlogHandler = (category) => {
    filterBlog({ variables: { category } });
  };

  return [filterBlogHandler, { loading, error, data, refetch }];
};

export const useBookingData = () => {
  const [bookingData, { loading, error, data, refetch }] =
    useMutation(BOOKING_DATA);

  const bookingDataHandler = (bookingType, bookingRequestType) => {
    bookingData({ variables: { bookingType, bookingRequestType } });
  };

  return [bookingDataHandler, { loading, error, data, refetch }];
};

export const useSucessInvoice = () => {
  const [onSuccess, { loading, error, data, refetch }] =
    useMutation(GET_SUCCESS_INVOICE);

  const onSuccessHandler = (bookingId, invoiceAction, tripId) => {
    onSuccess({ variables: { bookingId, invoiceAction, tripId } });
  };
  return [onSuccessHandler, { loading, error, data, refetch }];
};

export const useEnquiryHandler = () => {
  const [enquiryHandler, { loading, error, data, refetch }] =
    useMutation(TRIP_ENQUIRY_FORM);

  const enquiryDataHandler = (data) => {
    enquiryHandler({
      variables: {
        tripEnquiryInput: data,
      },
    });
  };
  return [enquiryDataHandler, { loading, error, data, refetch }];
};

export const useGetRecommendationByType = (type) => {
  const { loading, error, data, refetch } = useQuery(
    GET_RECOMMENDATIONS_BY_TYPE,
    { variables: { type } }
  );

  return { loading, error, data, refetch };
};

export const useGetAllRecommendation = (limit, page, type) => {
  const { loading, error, data, refetch } = useQuery(GET_ALL_RECOMMENDATIONS, {
    variables: { filter: { limit, page, type } },
  });

  return { loading, error, data, refetch };
};

export const useGetRecommendationByProductType = (productType) => {
  const { loading, error, data, refetch } = useQuery(
    GET_RECOMMENDATIONS_BY_PRODUCT_TYPE,
    {
      variables: { productType },
    }
  );

  return { loading, error, data, refetch };
};

export const usePostReview = () => {
  const [sendReview, { loading, error, data, refetch }] =
    useMutation(CREATE_REVIEW);

  const sendReviewHandler = (reviewInput) => {
    sendReview({ variables: { reviewInput } });
  };

  return [sendReviewHandler, { loading, error, data, refetch }];
};

export const useGroupBooking = () => {
  const [grpBooking, { loading, error, data, refetch }] =
    useMutation(CREATE_GROUP_BOOKING);

  const sendGrpBookingHandler = (bookingInput) => {
    grpBooking({ variables: { bookingInput } });
  };

  return [sendGrpBookingHandler, { loading, error, data, refetch }];
};

export const useCreateNewsLetter = () => {
  const [createLetter, { loading, error, data, refetch }] =
    useMutation(CREATE_NEWS_LETTER);

  const createLetterHandler = (email) => {
    createLetter({
      variables: { email },
    });
  };

  return [createLetterHandler, { loading, error, data, refetch }];
};

export const useGetLandingPage = (slug) => {
  const { loading, error, data, refetch } = useQuery(GET_LANDING_PAGE_IMAGES, {
    variables: { slug },
  });

  return { loading, error, data, refetch };
};

export const useBookingSuccess = () => {
  const [hostelbooking, { loading, error, data, refetch }] =
    useMutation(BOOKING_SUCCESS);

  const hostelBookingSuccess = (bookingId) =>
    hostelbooking({
      variables: { bookingId },
    });

  return [hostelBookingSuccess, { loading, error, data, refetch }];
};

export const useGetSimilarProduct = (productType) => {
  const { loading, error, data, refetch } = useQuery(GET_SIMILAR_DATA, {
    variables: { productType },
  });

  return { loading, error, data, refetch };
};

export const useBookingStatusHandler = () => {
  const [bookingStatus, { loading, error, data, refetch }] = useMutation(
    BOOKING_STATUS_HANDLER
  );

  const bookingStatusHandler = (bookingId, tripId) =>
    bookingStatus({
      variables: { bookingId, tripId },
    });

  return [bookingStatusHandler, { loading, error, data, refetch }];
};

export const useSeoUrl = () => {
  const [seoUrl, { loading, error, data, refetch }] = useMutation(SEO_URL);

  const seoHandler = (id, productType) =>
    seoUrl({
      variables: { id, productType },
    });
  return [seoHandler, { loading, error, data, refetch }];
};

export const useGetByUrl = (url) => {
  const [sendUrl, { loading, error, data, refetch }] = useMutation(GET_BY_URL);

  const sendUrlHandler = (url) => {
    sendUrl({
      variables: {
        url,
      },
    });
  };

  return [sendUrlHandler, { loading, error, data, refetch }];
};

export const useSendOtp = () => {
  const [sendOtp, { loading, error, data, refetch }] =
    useMutation(SEND_OTP_MAIL);

  const sendOtpHandler = (email) =>
    sendOtp({
      variables: {
        email,
      },
    });

  return [sendOtpHandler, { loading, error, data, refetch }];
};

export const useSearchBySessionId = () => {
  const [searchBySession, { loading, error, data, refetch }] =
    useMutation(SEARCH_BY_SESSIONID);

  const searchBySessionHandler = (sessionId) =>
    searchBySession({
      variables: {
        sessionId,
      },
    });

  return [searchBySessionHandler, { loading, error, data, refetch }];
};
