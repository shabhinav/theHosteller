import { cartActionType } from "./cart.actionType";

const {
  CART_DATA,
  CART_USERS_DETAILS,
  CART_USERS_ADDRESS,
  CART_ROOM_DATA,
  CONFIRM_PASSWORD,
  COUPON_ID,
  CARTDATA,
} = cartActionType;

const initialState = {
  cart: [],
  userDetails: {},
  userAddress: {},
  roomData: [],
  confirmEmail: "",
  couponId: "",
  cartData: [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case CART_DATA:
      return {
        ...state,
        cart: action.payload,
      };
    case CART_USERS_DETAILS:
      return {
        ...state,
        userDetails: action.payload,
      };
    case CART_USERS_ADDRESS:
      return {
        ...state,
        userAddress: action.payload,
      };
    case CART_ROOM_DATA:
      return {
        ...state,
        roomData: action.payload,
      };
    case CONFIRM_PASSWORD:
      return {
        ...state,
        confirmEmail: action.payload,
      };
    case COUPON_ID:
      return {
        ...state,
        couponId: action.payload,
      };
    case CARTDATA:
      return {
        ...state,
        cartData: action.payload,
      };
    default:
      return state;
  }
};

export default cartReducer;
