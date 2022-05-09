import moment from "moment";
import { useLayoutEffect, useState } from "react";
import { Months, productType } from "../Resources/constants/common";
import ReactPixel from "react-facebook-pixel";
import ReactHtmlParser from "react-html-parser";

export const isLogin = () => {
  const token = localStorage.getItem("token") || false;
  return token;
};

export const dateConverter = (value, type, location) => {
  let month = new Date(value).getMonth() + 1;
  let date = new Date(value).getDate();
  let year = new Date(value).getFullYear();
  if (location) {
    if (month.toString().length < 2) {
      month = "0" + month;
    }
    if (date.toString().length < 2) {
      date = "0" + date;
    }
    return `${year}-${month}-${date}`;
  }
  if (type) {
    return `${year}-${month}-${date}`;
  }
  return `${date}/${month}/${year}`;
};

export const getDate = (value) => {
  return Months[value];
};

export function useWindowSize() {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return size;
}

export const razorPayInit = (bookedData, profile) => {
  return {
    key: process.env.REACT_APP_RAZOR_PAY, //rzor pay key move it to env
    currency: bookedData.razorpayInit.currency,
    amount: bookedData.razorpayInit.amount,
    order_id: bookedData.razorpayInit.orderId,
    name: "Make Payment",
    description: "",
    callback_url:
      process.env.REACT_APP_RAZOR_PAY_REDIRECT + "/rest/v1/payment/success",
    redirect: true,
    prefill: {
      email: profile?.email, // user email
      contact: profile?.mobile, // user number
    },
    modal: {
      onDismiss: function () {
        // setLoader(false);
        // setOpen(true);
      },
    },
  };
};

export const nameHandler = (value) => {
  if (value) {
    let validationCondition = /^[A-Za-z ]+$/;
    let isValid = validationCondition.test(value);
    return isValid;
  }
  return false;
};

export const emailHandler = (value) => {
  if (value) {
    let validationCondition =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let isValid = validationCondition.test(String(value).toLowerCase());
    return isValid;
  }
  return false;
};

const phoneHandler = (value) => {
  if (value.length < 10) {
    return false;
  }
  return true;
};

export const validationHandler = (value, type) => {
  if (type === "name") {
    return nameHandler(value);
  } else if (type === "email") {
    return emailHandler(value);
  } else if (type === "phone") {
    return phoneHandler(value);
  }
};

export const validationErrorMsg = (email, validName) => {
  let msg = "Please Enter Valid";
  if (!validName) {
    msg += " Name";
  }
  if (email) {
    let emailValid = emailHandler(email);
    if (!emailValid) {
      msg += " Email";
    }
  }
  return msg;
};

export const nameErrorMsg = (fName, lName, salutation) => {
  let msg = "";
  if (!lName) {
    msg += "First Name";
  }
  if (!fName) {
    msg += "Last Name";
  }
  if (!salutation) {
    msg += "salutation";
  }
  return msg;
};

export const numOfGuest = (val) => {
  let array = [];
  for (let i = 0; i < Number(val); i++) {
    array.push({
      name: `${i + 1} ${i === 0 ? " Adult" : " Adults"}`,
      _id: i + 1,
    });
  }
  return array;
};

export const numberalAbbreviations = (val) => {
  switch (val) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
};

export const profileNameFormatter = (name) => {
  let nameString = name.trim().split(" ");
  let subString = "";
  if (nameString.length === 1) {
    subString = nameString[0].substring(0, 1);
  } else {
    subString = nameString[0].substring(0, 1);
    subString += nameString[nameString.length - 1].substring(0, 1);
  }
  return subString;
};

export const extractUrl = (trackUrl) => {
  let url = new URL(trackUrl);
  let params = new URLSearchParams(url.search);
  let mode = params.get("payment");
  return mode;
};

export const dateDiffHandler = (date) => {
  if (date) {
    let myDate = date.split("-");
    let mutatedDate = moment(myDate.join(","));
    myDate[1] = Months[Number(myDate[1]) - 1];
    myDate = myDate.reverse().join(" ");

    return { mutatedDate, myDate };
  }
};

export const userRedirectHandler = (type, redirectionFunc) => {
  switch (type) {
    case "Hostels":
      return redirectionFunc("/hostel");
    case "Workations":
      return redirectionFunc("/workation");
    default:
      return redirectionFunc("/trip");
  }
};

export const birthDayChecker = (value) => {
  if (value.includes("-")) {
    return value.split("-");
  } else if (value.includes("/")) {
    return value.split("/");
  }
};

export const getInnerHeight = () => {
  let elm = document.getElementById("paxInput");
  let elemRect = elm.getBoundingClientRect();
  let bodyRect = document.body.getBoundingClientRect();
  let offset = elemRect.top - bodyRect.top;
  return offset;
};

export const recommendationDataConverter = (arr) => {
  const type = new Set();
  arr?.forEach((item) => type.add(item?.type));
  let tabPanel = [];
  type?.forEach((item) => {
    let obj = {};
    obj.name = item;
    let filteredData = arr?.filter((val) => val.type === item);
    obj[item] = filteredData;
    tabPanel.push(obj);
  });

  return tabPanel;
};

export const dateCalculation = () => {
  let disabledDays = [];
  let year = Number(new Date().getFullYear());
  let disableYear = [year, year + 1, year + 2, year + 3];

  for (let i = 0; i < disableYear.length; i++) {
    for (let j = 0; j < 13; j++) {
      offDays(disableYear[i], j);
    }
  }

  function offDays(year, month) {
    let day, date;

    day = 1;
    date = new Date(year, month, day);
    while (date.getMonth() === month) {
      if (
        date.getDay() === 0 ||
        date.getDay() === 1 ||
        date.getDay() === 2 ||
        date.getDay() === 6
      ) {
        disabledDays.push(new Date(year, month, day));
      }
      day += 1;
      date = new Date(year, month, day);
    }
    return disabledDays;
  }
  return disabledDays;
};

export const numberRegex = (val) => {
  let reg = new RegExp("^[0-9]*$");
  let test = reg.test(reg);
  return test;
};

export const addressValidator = (val) => {
  let pattern = /[^a-z0-9 ]/gi;
  var isValid = pattern.test(val);

  return isValid;
};

export const numberValidator = (val) => {
  let pattern = /[^0-9]/gi;
  var isValid = pattern.test(val);
  return isValid;
};

export const dateReverse = (date) => {
  if (date) {
    let myDate = date.split("-").reverse().join("-");
    return myDate;
  }
};

export const dateInMonthCal = (date) => {
  if (date) {
    let myDate = date?.split("-").reverse();
    myDate[1] = Months[myDate[1] - 1];
    myDate = myDate.join(" ");
    return myDate;
  }
};

export const pluralHandler = (value, word) => {
  if (value > 1) {
    return word + "s";
  }
  return word;
};

export const urlBuilder = (productionType, property) => {
  let propertyName = "";
  if (productionType !== "Trips") {
    propertyName = property.replace("The Hosteller", "").trim();
  }
  propertyName = propertyName.split(" ").join("-");
};

export const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop);

export const seoUrlHandler = (type, history, url, location) => {
  if (type) {
    let customUrl =
      type?.toLowerCase() === "trips" ? "/trips" + tripUrlSplitter(url) : url;
    history.push(customUrl);
  }
};

const tripUrlSplitter = (url) => {
  if (url.includes("trips")) {
    let tripUrl = url.split("/trips");
    return tripUrl[1];
  }
  return url;
};

export const dateSplitter = (date) => {
  if (date) {
    if (date.toString().includes("-")) {
      return date.split("-").join("/");
    }
  }
  return date;
};

export const dateDiff = (date, otherDate) => {
  const date1 = new Date(dateFormatter(date.split("-").reverse()));
  const date2 = new Date(dateFormatter(otherDate.split("-").reverse()));
  const diffTime = Math.abs(date2 - date1);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

const dateFormatter = (arr) => {
  const [date, month, year] = arr;
  return `${month}/${date}/${year}`;
};

export const eventTracker = (type, name, data) => {
  if (type === "facebook") {
    ReactPixel.track(name, data);
  } else if (type === "webengage") {
    window.webengage.track(name, data);
  }
};

export const htmlParserChecker = (text) => {
  let isValid = false;
  let htmlText = ReactHtmlParser(text);
  htmlText.forEach((item) => {
    if (item?.type) {
      isValid = true;
    } else {
      isValid = false;
    }
  });

  if (isValid) {
    return htmlText;
  } else {
    return ReactHtmlParser(htmlText);
  }
};

export const sessionStorage = (name, data) => {
  if (data) {
    sessionStorage.setItem(name, data);
  }
};
