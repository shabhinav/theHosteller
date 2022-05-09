import React, { useEffect, useState } from "react";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import Collapse from "@material-ui/core/Collapse";
import AddIcon from "@material-ui/icons/Add";
import {
  useGetHostelsList,
  usePostSearchedData,
  useSeoUrl,
  useTripSearch,
  useTripsSearchList,
} from "../../../Services/datasource";
import { NAVLINKS } from "../../../Resources/constants/navlinks";
import { useHistory } from "react-router";
import Logo from "../../../Assets/images/logo.png";
import "./SideDraw.scss";
import MenuIcon from "@material-ui/icons/Menu";
import cancel from "../../../Assets/Icons/close.png";
import SimpleModal from "../../Common/Modal/Modal";
import GuestLogin from "../../GuestLogin/GuestLogin";
import SignIn from "../../SignIn/SignIn";
import { useIsAuth } from "../../../Services/datasource";
import {
  checkInDateHandler,
  checkOutDateHandler,
  cityNameHandler,
  numOfGuestHandlers,
  searchDetailsHandler,
  searchTypeHandler,
} from "../../../Redux/search/search.action";
import { useDispatch } from "react-redux";
import {
  dateConverter,
  eventTracker,
  seoUrlHandler,
} from "../../../Utils/utils";
import { addDays } from "date-fns/esm";
import { hoverType, productType } from "../../../Resources/constants/common";
import { useSelector } from "react-redux";
import { roomData } from "../../../Redux/cart/cart.action";

const profile = [
  { name: "My Profile", url: "/profile" },
  { name: "Bookings", url: "/booking" },
  { name: "Logout", url: "/" },
];

function SideDraw() {
  const history = useHistory();
  const dispatch = useDispatch();
  const savedData = useSelector((state) => state);
  const { data: hostelListData } = useGetHostelsList();
  const { data: tripsListData } = useTripsSearchList();
  const [navlinks, setNavlinks] = useState([]);
  const { data: isAuth, refetch } = useIsAuth();
  const [showSignUp, setShowSignUp] = useState(false);
  const [guestLogin, setGuestLogin] = useState(false);
  const [bookingType, setBookingType] = useState("");
  const [openToast, setOpenToast] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [id, setId] = useState("");
  const [seoHandler] = useSeoUrl();

  const [
    tripSearchHandler,
    { data: tripData, loading: tripLoading, tripError },
  ] = useTripSearch();
  const [sendSearchedData, { data: myData, error, loading }] =
    usePostSearchedData();

  const [state, setState] = React.useState({
    right: false,
  });

  const { leftLinks, rightLink } = NAVLINKS;
  const [expand, setExpand] = useState({
    hostels: false,
    trips: false,
    workations: false,
    profile: false,
  });

  useEffect(() => {
    let navlinks = JSON.parse(JSON.stringify(leftLinks));
    const login = [
      { name: "PROFILE", url: "/", isNew: false },
      // { name: "BOOKING", url: "/bookings", isNew: false },
    ];
    navlinks = [...navlinks, ...login];
    navlinks.push(rightLink);
    setNavlinks(navlinks);
  }, [leftLinks, rightLink]);

  const urlRedirectHandler = (url) => {
    seoUrlHandler(savedData?.search?.searchType, history, url);
  };

  useEffect(() => {
    if (bookingType === "TRIPS" && tripData) {
      sessionStorage.setItem("sessionId", tripData?.Search?.sessionId);
      dispatch(searchDetailsHandler(tripData));
      urlRedirectHandler(tripData?.Search?.sessionId);
    } else {
      if (myData?.Search) {
        urlRedirectHandler(myData?.Search?.url);
        sessionStorage.setItem("sessionId", myData?.Search?.sessionId);
        dispatch(searchDetailsHandler(myData));
      } else if (error || tripError) {
        dispatch(searchDetailsHandler([]));
        sessionStorage.setItem(
          "sessionId",
          error?.message || tripError?.message
        );
        urlRedirectHandler(error?.message || tripError?.message);

        // setOpenToast(true);
        // setErrorMessage(error?.message);
      }
    }
  }, [bookingType, myData, tripData]);

  const collapseHandler = (val) => {
    let prevState = { ...expand };
    switch (val) {
      case "HOSTELS":
        return setExpand({ ...prevState, hostels: !prevState.hostels });
      case "TRIPS":
        return setExpand({ ...prevState, trips: !prevState.trips });
      case "WORKATIONS":
        return setExpand({ ...prevState, workations: !prevState.workations });
      default:
        return setExpand({ ...prevState, profile: !prevState.profile });
    }
  };

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  useEffect(() => {
    dispatch(numOfGuestHandlers(1));
  }, []);

  const closeToggleHandler = (type, id, name) => {
    setBookingType(type);
    setId(id);
    let checkindate = dateConverter(new Date(), "dd-mm-yyyy");
    setCheckInDate(dateConverter(new Date()));

    eventTracker("webengage", "Product_dropdown_click", {
      ProductName: name,
      ProductType: type.toLowerCase(),
    });
    dispatch(checkInDateHandler(dateConverter(new Date(), "dd-mm-yyyy")));
    if (type === "TRIPS") {
      sendSearchedData(undefined, checkindate, "", 1, hoverType[type], id);
      dispatch(searchTypeHandler("Trips"));
    } else if (type === "WORKATIONS") {
      setState({ ...state, right: false });
      let checkoutdate = dateConverter(addDays(new Date(), 7), "dd-mm-yyyy");
      setCheckOutDate(dateConverter(addDays(new Date(), 7)));
      dispatch(
        checkOutDateHandler(dateConverter(addDays(new Date(), 7), "dd-mm-yyyy"))
      );
      dispatch(searchTypeHandler("Workations"));
      sendSearchedData(id, checkindate, checkoutdate, 1, hoverType[type]);
    } else if (type === "HOSTELS") {
      setState({ ...state, right: false });
      dispatch(searchTypeHandler("Hostels"));
      let checkoutdate = dateConverter(addDays(new Date(), 1), "dd-mm-yyyy");
      dispatch(
        checkOutDateHandler(dateConverter(addDays(new Date(), 1), "dd-mm-yyyy"))
      );
      setCheckOutDate(dateConverter(addDays(new Date(), 1)));
      sendSearchedData(id, checkindate, checkoutdate, 1, hoverType[type]);
    }
    dispatch(cityNameHandler(id));
  };

  const loginHandler = (name, url) => {
    if (name === "LOGIN / SIGN UP" && !isAuth?.isAuth) {
      setShowSignUp(true);
    } else if (name === "LOGIN / SIGN UP" && isAuth?.isAuth) {
      localStorage.clear();
      refetch();
      history.push("/");
    } else {
      history.push(url);
    }
  };

  return (
    <div>
      {["right"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>
            <MenuIcon />
          </Button>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            <div className='side-drawer_inner h-full'>
              <div className='bg-jetBlack px-9 py-4 flex items-center justify-between'>
                <img src={Logo} className='' alt='logo' />
                <img
                  onClick={() => setState({ ...state, right: false })}
                  src={cancel}
                  alt='close'
                />
              </div>
              {navlinks?.map((link) =>
                link.name === "HOSTELS" ||
                link.name === "TRIPS" ||
                link.name === "WORKATIONS" ||
                link.name === "PROFILE" ? (
                  <div>
                    <div
                      className={`${
                        link.name === "PROFILE"
                          ? isAuth?.isAuth
                            ? "mt-12"
                            : ""
                          : "mt-12"
                      }  px-4 flex items-center justify-between`}
                    >
                      <h6
                        onClick={() => {
                          history.push(link.url);
                          setState({ ...state, right: false });
                        }}
                        className=' text-xl font-semibold'
                      >
                        {link.name === "PROFILE"
                          ? isAuth?.isAuth
                            ? link.name
                            : ""
                          : link.name}
                      </h6>
                      {link.name === "PROFILE" ? (
                        isAuth?.isAuth ? (
                          <AddIcon onClick={() => collapseHandler(link.name)} />
                        ) : (
                          ""
                        )
                      ) : (
                        <AddIcon onClick={() => collapseHandler(link.name)} />
                      )}
                    </div>
                    <div>
                      <Collapse
                        in={expand[link.name.toLowerCase()]}
                        timeout='auto'
                        unmountOnExit
                      >
                        <div className='mx-4'>
                          {link.name === "PROFILE" && isAuth?.isAuth ? (
                            <div>
                              {profile?.map((item) => (
                                <p
                                  onClick={() => {
                                    setState({
                                      ...state,
                                      right: false,
                                    });

                                    if (item?.name === "Logout") {
                                      localStorage.clear();
                                      history.push("/");
                                      refetch();
                                    } else {
                                      history.push(item?.url);
                                    }
                                  }}
                                  className='mt-3 text-xl'
                                >
                                  {item?.name}
                                </p>
                              ))}
                            </div>
                          ) : link.name === "HOSTELS" ||
                            link.name === "WORKATIONS" ? (
                            <div>
                              {hostelListData?.getHostelList?.map((item) => (
                                <p
                                  onClick={() => {
                                    dispatch(roomData([]));
                                    closeToggleHandler(
                                      link.name,
                                      item._id,
                                      item?.name
                                    );
                                  }}
                                  className='mt-3 text-xl'
                                >
                                  {item?.name}
                                </p>
                              ))}
                            </div>
                          ) : (
                            link.name === "TRIPS" && (
                              <div
                                onClick={() => {
                                  dispatch(roomData([]));

                                  setState({
                                    ...state,
                                    right: false,
                                  });
                                }}
                                className='mt-6'
                              >
                                {tripsListData?.getTripList.map((item) => (
                                  <p
                                    onClick={() => {
                                      closeToggleHandler(
                                        link.name,
                                        item._id,
                                        item?.name
                                      );
                                    }}
                                    className='mt-3 text-xl'
                                  >
                                    {item?.name}
                                  </p>
                                ))}
                              </div>
                            )
                          )}
                        </div>
                      </Collapse>
                    </div>
                  </div>
                ) : (
                  <div>
                    <h6
                      onClick={() => {
                        loginHandler(link.name, link.url);
                        setState({
                          ...state,
                          right: false,
                        });
                      }}
                      className='mt-12 ml-4 text-xl font-semibold'
                    >
                      {link.name === "LOGIN / SIGN UP"
                        ? isAuth?.isAuth
                          ? ""
                          : link.name
                        : link.name === "PROFILE" || link.name === "BOOKING"
                        ? isAuth?.isAuth
                          ? link.name
                          : ""
                        : link.name}
                    </h6>
                  </div>
                )
              )}
            </div>
          </Drawer>
          <div className='absolute'>
            <SimpleModal
              open={guestLogin}
              handleOpen={() => setGuestLogin(true)}
              handleClose={() => setGuestLogin(false)}
            >
              <GuestLogin
                refetch={refetch}
                handleClose={() => setGuestLogin(false)}
                showSignIn={() => setShowSignUp(true)}
              />
            </SimpleModal>
            <SimpleModal
              open={showSignUp}
              handleOpen={() => setShowSignUp(true)}
              handleClose={() => setShowSignUp(false)}
            >
              <SignIn
                refetch={refetch}
                handleClose={() => setShowSignUp(false)}
                showGuestLogin={() => setGuestLogin(true)}
              />
            </SimpleModal>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
}

export default SideDraw;
