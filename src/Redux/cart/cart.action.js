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

export const saveCartDataHandler = (data) => {
  return {
    type: CART_DATA,
    payload: data,
  };
};

export const travelerDetails = (data) => {
  return {
    type: CART_USERS_DETAILS,
    payload: data,
  };
};

export const roomData = (data) => {
  return {
    type: CART_ROOM_DATA,
    payload: data,
  };
};

export const userAddress = (data) => {
  return {
    type: CART_USERS_ADDRESS,
    payload: data,
  };
};

export const confirmPasswordHandler = (data) => {
  return {
    type: CONFIRM_PASSWORD,
    payload: data,
  };
};

export const cartDataHandler = (data) => {
  return {
    type: CARTDATA,
    payload: data,
  };
};

export const couponIdHandler = (data) => {
  return {
    type: COUPON_ID,
    payload: data,
  };
};
