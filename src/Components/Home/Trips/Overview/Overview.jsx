import { Grid } from "@material-ui/core";
import React from "react";
import "./Overview.scss";
import { htmlParserChecker } from "../../../../Utils/utils";

function Overview({ tripData }) {
  return (
    <div className='mt-5'>
      <Grid container spacing={5}>
        <Grid item lg={8}>
          {tripData?.getTrip?.overview?.map((item) => (
            <div className='mt-8 trips_card'>
              <h4 className='font-bold capitalize'>{item?.heading}</h4>
              <p className='mt-3 text-blogPara whitespace-pre-line'>
                {htmlParserChecker(item?.content)}
              </p>
            </div>
          ))}
        </Grid>
        <Grid item lg={4}>
          <div className='sticky top-36'>
            <div className='trip_overview_container mt-6'>
              <div>
                <h6 className='bg-primary700 py-5 px-3 text-xl font-semibold'>
                  Why Us
                </h6>
              </div>
              <div className='mt-3 mx-3'>
                <p className='font-bold'>1. Over 2000 4 Star Reviews</p>
                <p className='text-blogPara'>
                  We have hosted over 20,000 trekkers and made more memories
                  than we can remember. Lets make the next ones with you :){" "}
                </p>
              </div>
              <div className='mt-3 mx-3'>
                <p className='font-bold'>2. Sociable Hostels</p>
                <p className='text-blogPara'>
                  If staying in hostels is new for you, let us show you how
                  welcoming, sociable, and travel game-changing they can be.{" "}
                </p>
              </div>
              <div className='mt-3 mx-3 mb-3'>
                <p className='font-bold'>3. Budget Friendly</p>
                <p className='text-blogPara'>
                  We wish travel was free too! Why can’t everything be free?
                  We’ve kept costs as low as they can go, all while ensuring you
                  have the best activities and amenities.
                </p>
              </div>
            </div>{" "}
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default Overview;
