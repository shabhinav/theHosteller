import React from "react";
import Meta from "../Components/Common/Meta/Meta";
import Profile from "../Components/Profile/Profile";

function ProfileView() {
  return (
    <div className='2xl:container 2xl:mx-auto'>
      <Meta
        title={"User Profile"}
        description={"Check your Profile here"}
      />
      <div className='view_container mt-10'>
        <Profile />
      </div>
    </div>
  );
}

export default ProfileView;
