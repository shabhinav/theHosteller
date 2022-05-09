import React from "react";
import "./Amenties.css";

function Amenties({ primaryAmenties, secondaryAmenties, amenities }: any) {
  return (
    <div id='amenities' className='pt-6 pb-10 amenties_container xs:mx-3'>
      <h4 className='text-black font-bold mb-9 capitalize'>
        What this place offers
      </h4>
      <div className='primaryAmenties grid grid-cols-5  2xl:gap-3 xl:gap-3 xs:flex xs:flex-nowrap xs:overflow-x-auto'>
        {amenities?.map((item: any, index: number) => (
          <div className=' flex xl:items-center xs:items-stretch  xs:block xs:text-center xl:mr-5 2xl:mr-5 mt-5 xs:px-3'>
            <img
              className='hostel_amenities'
              src={item?.amenity?.icon}
              alt='amenties'
            />
            {item?.status ? (
              <p className='ml-1 text-xs text-blogPara text-center'>
                {item?.amenity?.name}
              </p>
            ) : (
              <del>
                <p className='ml-1 text-xs text-blogPara text-center'>
                  {item?.amenity?.name}
                </p>
              </del>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Amenties;
