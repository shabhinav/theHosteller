import { searchActionType } from "./search.actionType";

const {
  CITY_NAME,
  SEARCH_DETAILS,
  SEARCHED_HOSTEL_DETAILS,
  HOSTEL_CHECKIN_DATE,
  HOSTEL_CHECKOUT_DATE,
  NUM_OF_GUEST,
  SEARCH_TYPE,
  GROUP_BOOKING,
  LOADER,
} = searchActionType;

export const cityNameHandler = (name,location) => {
  return {
    type: CITY_NAME,
    payload: name,
  };
};

export const checkInDateHandler = (date) => {
  return {
    type: HOSTEL_CHECKIN_DATE,
    payload: date,
  };
};

export const checkOutDateHandler = (date) => {
  return {
    type: HOSTEL_CHECKOUT_DATE,
    payload: date,
  };
};

export const numOfGuestHandlers = (numOfGuest) => {
  return {
    type: NUM_OF_GUEST,
    payload: numOfGuest,
  };
};

export const searchDetailsHandler = (data) => {
  return {
    type: SEARCH_DETAILS,
    payload: data,
  };
};

export const searchedHostelDetails = (data) => {
  return {
    type: SEARCHED_HOSTEL_DETAILS,
    payload: data,
  };
};

export const searchTypeHandler = (data) => {
  return {
    type: SEARCH_TYPE,
    payload: data,
  };
};

export const groupBookingHandler = (data) => {
  return {
    type: GROUP_BOOKING,
    payload: data,
  };
};

export const searchLoader = (data) => {
  return {
    type: LOADER,
    payload: data,
  };
};
