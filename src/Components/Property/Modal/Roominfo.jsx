import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import "./Roominfo.scss";
import close from "../../../Assets/Icons/close.png";
import tick from "../../../Assets/Icons/verified.png";
import broken from "../../../Assets/images/broken.png";

function RoomInfo({ tableData, handleClose }) {
  return (
    <div className='room_info_modal p-4 '>
      <div className='flex'>
        <div className='hostel_room_image'>
          <Carousel showStatus={false}>
            {tableData?.roomImages?.length ? (
              tableData?.roomImages?.map((item) => (
                <div>
                  <img
                    className='room_carousel_img'
                    src={item?.image}
                    alt='gallery'
                  />
                </div>
              ))
            ) : (
              <img className='room_carousel_img' src={broken} />
            )}
          </Carousel>
        </div>
        <div className='ml-4 w-full'>
          <div className='flex items-center justify-between'>
            <h5 className='font-bold'>{tableData?.roomName}</h5>
            <img
              className='cursor-pointer '
              onClick={() => handleClose()}
              src={close}
              alt='close'
            />
          </div>
          <h5 className='font-bold mt-6 mb-2'>Room Amenities</h5>
          <div className='grid grid-cols-3 '>
            {tableData?.roomAmenities?.map((item, index) =>
              item === "Outdoor trekking (extra fees)" ? (
                ""
              ) : (
                <div className='flex items-center pr-2 m-0 mt-2'>
                  <p className='ml-2 capitalize'>{item}</p>
                </div>
              )
            )}
          </div>
          <h5 className='font-bold mt-6 mb-2'>Hostel Amenities</h5>
          <div className='grid grid-cols-3 '>
            {tableData?.hostelAmenities?.map((item) => (
              <p className='pr-4 capitalize'>{item?.amenity}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RoomInfo;
