import React from "react";
import "./MobileDrawer.scss";
import ArrowBackOutlinedIcon from "@material-ui/icons/ArrowBackOutlined";
import { useSelector } from "react-redux";
import LightBox from "../../Common/LightBox/LightBox";
import { pluralHandler } from "../../../Utils/utils";

function MobileDrawer({ item, setState }) {
  const state = useSelector((state) => state);

  return (
    <div className='bg-backgroundGrey'>
      <header className='mobile_drawer_header bg-white sticky top-0'>
        <div className='flex items-center py-5 ml-2 '>
          <ArrowBackOutlinedIcon
            onClick={() =>
              setState({
                bottom: false,
              })
            }
          />
          <h5 className='ml-4'>Details</h5>
        </div>
      </header>
      <div className='mb-3 bg-white p-3 font-semibold'>
        <h4>{item?.roomName}</h4>
        <p className='text-author mt-3 text-base'>
          {pluralHandler(item?.maxAdultOccupancy, "Max Adult")} :
          {item?.maxAdultOccupancy}
        </p>
        <p className='text-author text-base'>
          Max Children: {item?.maxChildOccupancy}
        </p>
      </div>
      <div className='px-2 py-4 bg-white mb-3'>
        <h5 className='mb-3 text-2xl'>Room Photos</h5>
        <LightBox
          data={
            state?.search?.searchedHostelDetails?.getHostel?.hostelDetail
              ?.hostelImages
          }
        />
      </div>

      <div className='  bg-white py-3'>
        <h5 className='mb-3 text-2xl ml-3'>Room Amenities</h5>
        <ul className='grid grid-cols-2'>
          {item?.roomAmenities.map((item) => (
            <li className='p-1'>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default MobileDrawer;
