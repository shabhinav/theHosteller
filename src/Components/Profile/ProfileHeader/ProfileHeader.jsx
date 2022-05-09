import React, { useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Verified from "../../../Assets/Icons/verified.png";
import LinearProgress from "@material-ui/core/LinearProgress";
import { useGetProfilePercentage } from "../../../Services/datasource";
import "./styles.scss";
import { verfiedText } from "../../../Resources/constants/common";

function ProfileHeader({ data: profileData }) {
  const {  data, refetch } = useGetProfilePercentage();

  useEffect(() => {
    refetch();
  }, [profileData]);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={8}>
        <div className='p-3 progress_container'>
          <div className='flex justify-between'>
            <p className='font-semibold'>Your Profile Status</p>
            <p className='font-semibold'>
              {data?.profilePercentage?.Percentage}%
            </p>
          </div>

          <div className='mt-2'>
            <LinearProgress
              variant='determinate'
              value={data?.profilePercentage?.Percentage}
            />
            {data?.profilePercentage?.Percentage === 100 ? (
              <p className='mt-1'>
                Congrats! Your profile details is up to date!
              </p>
            ) : (
              ""
            )}
          </div>
        </div>
      </Grid>
      <Grid item xs={12} sm={4}>
        <div className='flex flex-col items-end xs:items-start'>
          {verfiedText.map((item) => (
            <div className='flex items-center mt-1'>
              <p className='mr-3'>{item?.name}</p>
              <img
                className='h-4'
                src={item?.isVerified ? Verified : ""}
                alt='verified'
              />
            </div>
          ))}
        </div>
      </Grid>
    </Grid>
  );
}

export default ProfileHeader;
