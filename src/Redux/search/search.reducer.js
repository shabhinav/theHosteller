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

const initailState = {
  cityName: "",
  searchDetails: [],
  searchedHostelDetails: [],
  checkInDate: "",
  checkOutDate: "",
  numOfGuest: "1",
  searchType: "Hostels",
  grpBooking: false,
  loader: false,
};

const searchReducer = (state = initailState, action) => {
  switch (action.type) {
    case CITY_NAME:
      return {
        ...state,
        cityName: action.payload,
      };
    case SEARCH_DETAILS:
      return {
        ...state,
        searchDetails: action.payload,
      };
    case SEARCHED_HOSTEL_DETAILS:
      return {
        ...state,
        searchedHostelDetails: action.payload,
      };
    case HOSTEL_CHECKIN_DATE:
      return {
        ...state,
        checkInDate: action.payload,
      };
    case HOSTEL_CHECKOUT_DATE:
      return {
        ...state,
        checkOutDate: action.payload,
      };
    case NUM_OF_GUEST:
      return {
        ...state,
        numOfGuest: action.payload,
      };
    case SEARCH_TYPE:
      return {
        ...state,
        searchType: action.payload,
      };
    case GROUP_BOOKING:
      return {
        ...state,
        grpBooking: action.payload,
      };
    case LOADER:
      return {
        ...state,
        loader: action.payload,
      };
    default:
      return state;
  }
};

export default searchReducer;
