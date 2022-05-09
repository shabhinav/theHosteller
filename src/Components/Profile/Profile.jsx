import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";
import "./Profile.scss";
import TravellerDetails from "./TravellerDetails/TravellerDetails";
import ProfileHeader from "./ProfileHeader/ProfileHeader";
import LoginDetails from "./LoginDetails/LoginDetails";
import ProfileDetails from "./ProfileDetails/ProfileDetails";
import {
  useGetProfileDetails,
  useImageUpload,
  useIsAuth,
} from "../../Services/datasource";
import Logout from "../../Assets/Icons/logout.png";
import User from "../../Assets/Icons/user.png";
import Traveller from "../../Assets/Icons/traveller.png";
import Login from "../../Assets/Icons/profilelogin.png";
import { profileNameFormatter } from "../../Utils/utils";
import { Link } from "react-scroll";
import { useHistory } from "react-router";
import camera from "../../Assets/Icons/profilecamera.png";

const useStyles = makeStyles((theme) => ({
  large: {
    width: "100px",
    height: "100px",
    color: "white",
    backgroundColor: "black",
  },
}));

function Profile() {
  const history = useHistory();
  const { loading, error, data, refetch } = useGetProfileDetails();
  const { error: authError, data: isAuth, refetch: authRefetch } = useIsAuth();
  const [prefix, setPrefix] = useState("");
  const [sideBar, setSideBar] = useState("Profile");
  const [imageUploadHandler, { data: userData }] = useImageUpload();

  const handleFileChange = (e) => {
    if (!e.target.files[0]) return;
    imageUploadHandler(e.target.files[0]);
  };

  const classes = useStyles();

  useEffect(() => {
    if (!isAuth?.isAuth && !data && !loading) {
      // history.push("/");
    }
  }, [isAuth, history, data, loading]);

  const logoutHandler = () => {
    window.localStorage.clear();
    authRefetch();
    history.push('/')
  };

  useEffect(() => {
    if (userData) {
      refetch();
    }
  }, [userData]);

  useEffect(() => {
    if (data?.profile?.fullName && isAuth?.isAuth) {
      let prefix = profileNameFormatter(data?.profile?.fullName);
      setPrefix(prefix);
      localStorage.setItem("prefix", prefix);
      localStorage.setItem("userName", data?.profile?.fullName);
    }
  }, [data?.profile?.fullName, isAuth?.isAuth]);

  return (
    <div className='profile_page'>
      <div>
        <h4 className='mb-8 font-bold'>My Profile</h4>
      </div>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12} sm={12} lg={3}>
          <div className='profile_containers sticky top-24'>
            <div className='py-4 bg-primary'>
              <div className='flex justify-center relative'>
                {data?.profile?.profilePhoto ? (
                  <Avatar
                    src={data?.profile?.profilePhoto}
                    alt='Remy Sharp'
                    className={classes.large}
                  />
                ) : (
                  <Avatar alt='Remy Sharp' className={classes.large}>
                    {prefix}
                  </Avatar>
                )}

                <div className='absolute top-1/3 cursor-pointer left-1/3'>
                  <label
                    className='text-opacity-0 -mt-6 ml-2 text-7xl'
                    for='myFile'
                  >
                    ab
                    <div className='absolute  camera_icon'>
                      <img className='cursor-pointer' src={camera} alt='' />
                    </div>
                  </label>
                  <input
                    className='hidden'
                    type='file'
                    name='myFile'
                    id='myFile'
                    onChange={handleFileChange}
                  />
                </div>
              </div>

              <p className='mt-4 font-semibold text-center'>
                {data?.profile?.fullName}
              </p>
            </div>
            <div >
              <Link
                spy={true}
                smooth={true}
                className='profile_links '
                to='profile'
                offset={-100}
              >
                <div
                  onClick={() => setSideBar("Profile")}
                  className={`py-3 px-2 flex items-center ${
                    sideBar === "Profile" ? "active_link" : ""
                  }`}
                >
                  <img src={User} alt='profile' />
                  <p className='ml-2 cursor-pointer'>Profile</p>
                </div>
              </Link>
              <Link
                spy={true}
                smooth={true}
                className='profile_links'
                to='login'
                offset={-100}
              >
                <div
                  onClick={() => setSideBar("Login")}
                  className={`py-3 px-2 flex items-center profile_container ${
                    sideBar === "Login" ? "active_link" : ""
                  }`}
                >
                  <img src={Login} alt='profile' />
                  <p className='ml-2 cursor-pointer'> Login Details</p>
                </div>
              </Link>
              <Link
                spy={true}
                smooth={true}
                className='profile_links'
                to='traveller'
                offset={-100}
              >
                <div
                  onClick={() => setSideBar("Save")}
                  className={`py-3 px-2 flex items-center profile_container ${
                    sideBar === "Save" ? "active_link" : ""
                  }`}
                >
                  <img src={Traveller} alt='traveller'/>
                  <p className='ml-2 cursor-pointer'> Saved Traveller(s)</p>
                </div>
              </Link>
              <Link
                spy={true}
                smooth={true}
                onClick={() => logoutHandler()}
                className='profile_links'
                to='logout'
                offset={-100}
              >
                <div className='py-3 px-2 flex items-center profile_container'>
                  <img src={Logout} alt='Logout' />
                  <p className='ml-2 cursor-pointer'>Logout</p>
                </div>
              </Link>
            </div>
          </div>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={9}>
          <div className='profile_containers p-4'>
            <ProfileHeader data={data} />
            <ProfileDetails data={data?.profile} refetch={refetch} />
            <LoginDetails data={data?.profile} />
            <div className='w-full mt-10 mr-4 mb-4'>
              <TravellerDetails data={data?.profile} refetch={refetch} />
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default Profile;
