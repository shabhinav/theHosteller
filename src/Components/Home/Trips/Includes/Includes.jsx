import { Grid } from "@material-ui/core";
import React from "react";
import "./Includes.scss";

function Includes({ tripData }) {
  return (
    <div className='mt-14 trip_includes'>
      <div className='include_container pb-12'>
        <Grid container spacing={5}>
          {tripData?.getTrip?.otherInfo.map((info) => (
            <Grid items lg={6}>
              <div className='trip_includes_container'>
                <div className='flex items-center'>
                  <img
                    className='inc_list_icon mr-1'
                    src={info?.icon}
                    alt={`Trip ${info?.heading}`}
                  />
                  <h4 className='font-bold capitalize'>{info?.heading}</h4>
                </div>
                <ul>
                  {info?.textlist?.map((list) => (
                    <li className='capitalize	'>{list}</li>
                  ))}
                </ul>
              </div>
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
}

export default Includes;
