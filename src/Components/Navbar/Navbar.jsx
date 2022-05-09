import React, { useEffect, useState } from "react";
import { NAVLINKS } from "../../Resources/constants/navlinks";
import "./Navbar.scss";
import { NavLink } from "react-router-dom";
import { Badge, makeStyles } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import SimpleModal from "../Common/Modal/Modal";
import SignIn from "../SignIn/SignIn";
import {
  useGetHostelsList,
  useGetProfileDetails,
  useIsAuth,
  useTripSearch,
  useTripsSearchList,
} from "../../Services/datasource";
import Avatar from "@material-ui/core/Avatar";
import LoginIcon from "../../Assets/Icons/login.svg";
import GuestLogin from "../GuestLogin/GuestLogin";
import SideDraw from "./Sidedraw/SideDraw";
import HoverDropdown from "../Common/HoverDropdown/HoverDropdown";
import { profileNameFormatter } from "../../Utils/utils";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const profileList = [
  { name: "Profile" },
  { name: "Bookings" },
  { name: "Logout" },
];

const useStyles = makeStyles((theme) => ({
  large: {
    color: "white",
    backgroundColor: "black",
  },
}));

function Navbar({ setLoading }) {
  const history = useHistory();
  const pathname = window.location.pathname;
  const { loading, data: isAuth, refetch } = useIsAuth();
  const [showSignUp, setShowSignUp] = useState(false);
  const [guestLogin, setGuestLogin] = useState(false);
  const [prefix, setPrefix] = useState("");
  const { data: hostelListData } = useGetHostelsList();
  const { data: tripsListData } = useTripsSearchList();
  const { data: userData, refetch: profileRefetch } =
    useGetProfileDetails();

  const classes = useStyles();


  useEffect(() => {
    if (userData?.profile?.fullName && isAuth?.isAuth) {
      let prefix = profileNameFormatter(userData?.profile?.fullName);
      setPrefix(prefix);
      localStorage.setItem("prefix", prefix);
      localStorage.setItem("userName", userData?.profile?.fullName);
    } else if (!isAuth?.isAuth && pathname === "/payment" && !loading) {
      history.push("/");
      setShowSignUp(true);
    }
  }, [userData?.profile?.fullName, isAuth?.isAuth, history, pathname, loading]);

  useEffect(() => {
    if (isAuth?.isAuth) {
      profileRefetch();
    }
  }, [isAuth?.isAuth]);

  const {
    leftLinks,
    rightLink: { name },
  } = NAVLINKS;



  return (
    <div className='navbar_container 2xl:sticky sticky top-0 z-20'>
      <div className='navbar_left_container'>
        <div
          className='navbar_brand cursor-pointer'
          onClick={() => history.push("/")}
        >
          <div className='image'></div>
        </div>
        <div className='xs:hidden sm:hidden flex'>
          {leftLinks.map((link) =>
            link.isHover ? (
              <HoverDropdown
                profileDropwdown={false}
                refetch={refetch}
                data={
                  link.name === "TRIPS"
                    ? tripsListData?.getTripList
                    : hostelListData?.getHostelList
                }
                type={link.name}
                setLoading={setLoading}
              >
                {!link.isNew ? (
                  <NavLink className='navlinks flex items-center' to={link.url}>
                    <p className='text-base'>{link.name}</p>
                    <ExpandMoreIcon className='-mt-1' />
                  </NavLink>
                ) : (
                  <Badge
                    className='workation_badge'
                    badgeContent={"New"}
                    color='secondary'
                  >
                    <NavLink
                      className='navlinks flex items-center'
                      to={link.url}
                    >
                      <p className='text-base'>{link.name}</p>
                      <ExpandMoreIcon className='-mt-1' />
                    </NavLink>
                  </Badge>
                )}
              </HoverDropdown>
            ) : !link.isNew ? (
              <div className='flex items-center'>
                <NavLink className='navlinks' to={link.url}>
                  {link.name}
                </NavLink>
              </div>
            ) : (
              <div className='flex items-center'>
                <Badge badgeContent={"New"} color='secondary'>
                  <NavLink className='navlinks' to={link.url}>
                    {link.name}
                  </NavLink>
                </Badge>
              </div>
            )
          )}
        </div>
      </div>
      <div>
        {!isAuth?.isAuth ? (
          <p
            className='navlinks xs:hidden sm:hidden cursor-pointer'
            onClick={() => setShowSignUp(true)}
          >
            <div className='flex items-center '>
              <img className='mr-2 LoginIcon' src={LoginIcon} alt='user' />
              <p className='mr-2 text-base'> {name}</p>
            </div>
          </p>
        ) : (
          <div className='mr-12 xs:hidden sm:hidden'>
            <HoverDropdown
              profileDropwdown={true}
              refetch={refetch}
              type={""}
              data={profileList}
              setLoading={setLoading}
            >
              {userData?.profile?.profilePhoto ? (
                <Avatar
                  src={userData?.profile?.profilePhoto}
                  className={classes.large}
                  alt='Remy Sharp'
                />
              ) : (
                <Avatar className={classes.large} alt='Remy Sharp'>
                  {prefix}
                </Avatar>
              )}
            </HoverDropdown>
          </div>
        )}

        <div className='xl:hidden lg:hidden 2xl:hidden p-3 mobile_sideDraw'>
          <SideDraw />
        </div>
      </div>

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
    </div>
  );
}

export default Navbar;
