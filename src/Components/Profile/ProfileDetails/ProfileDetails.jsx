import React, { useEffect, useState } from "react";
import SimpleTable from "../Table/Table";
import Button from "../../Common/Button/Button";
import { colorPallete } from "../../../Resources/theme";
import SimpleModal from "../../Common/Modal/Modal";
import ProfileForm from "../Form/ProfileForm/ProfileForm";
import "./profiledetails.scss";
import Toast from "../../Common/Toast/Toast";

function ProfileDetails({ data, refetch }) {
  const { Primary, Black } = colorPallete;
  const [open, setOpen] = useState(false);
  const [profileData, setProfileData] = useState([]);


  useEffect(() => {
    if (data) {
      const profileRows = [
        { name: "NAME", value: data.fullName },
        { name: "BIRTHDAY", value: data.dateOfBirth },
        { name: "GENDER", value: data.gender },
        { name: "CURRENT LOCATION", value: data.city },
      ];
      setProfileData(profileRows);
    }
  }, [data]);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="mt-10 user_profile_container">
      <div className="w-full pr-4">
        <div className="w-full flex justify-between items-center">
          <div>
            <h5
              id="profile"
              className="font-semibold text-blackShade "
            >
              Profile
            </h5>
            <p className="text-lightgrey mt-1">
              Basic info  for a faster booking experience
            </p>
          </div>
          <Button
            bgColor={Primary}
            color={Black}
            padding={"1.2rem 2rem"}
            fontWeight={600}
            borderRadius={6}
            label={"Edit"}
            onClick={() => setOpen(true)}
            width={"100px"}
          />
        </div>
      </div>
      <div className="mt-5">
        <SimpleTable rows={profileData} />
      </div>
      <SimpleModal handleClose={handleClose} open={open}>
        <ProfileForm data={data} handleClose={handleClose} refetch={refetch} />
      </SimpleModal>

    </div>
  );
}

export default ProfileDetails;
