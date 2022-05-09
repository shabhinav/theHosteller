import React, { useState } from "react";
import "./Overview.scss";
import CustomDrawer from "../../../Common/Drawer/Drawer";
import { htmlParserChecker, useWindowSize } from "../../../../Utils/utils";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import star from '../../../../Assets/Icons/star.svg'

function Overview({ description, otherInfo, amenities, hostelData }) {
  let [innerWidth] = useWindowSize();

  const isMobile = innerWidth < 600;

  const [drawer, setDrawer] = useState({
    bottom: false,
  });

  return (
    <div id='overview' className='overview pb-6 pt-8 xs:mx-3'>
      <h4 className=' text-black font-bold capitalize'>
        All about {hostelData?.name}
      </h4>
      <div className='relative'>
        <p
          className={`mt-5 xl:text-base text-blogPara xl:pb-9 2xl:pb-9 xs:pb-1 ${
            isMobile ? "overview_description" : ""
          }`}
        >
          {htmlParserChecker(description?.content)}
        </p>
        {isMobile ? (
          <div className='absolute w-full bottom-2 bg-white '>
            <p
              onClick={() => isMobile && setDrawer({ ...drawer, bottom: true })}
              className='xl:text-base text-link'
            >
              see more..
            </p>
          </div>
        ) : (
          ""
        )}
      </div>
      <div className='hotel_amneties_container'>
        <h4 className='mt-6 mb-9 text-black font-bold capitalize '>
          Why you’ll love it here
        </h4>
        <div className='xs:grid grid-cols-2 gap-3'>
          {otherInfo?.map((item) => (
            <div
              onClick={() => isMobile && setDrawer({ ...drawer, bottom: true })}
              className='flex items-center xs:flex-col py-4 info_container'
            >
              <div>
                <img className='overview_points' src={star} alt='experience' />
              </div>
              <div className='mx-3'>
                <h5 className=' xs:text-center font-bold	'> {item?.heading}</h5>
                <p className='mt-1 text-blogPara overview_ex_info'>
                  {item?.content}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className='xl:hidden 2xl:hidden md:hidden sm:hidden'>
          <CustomDrawer
            state={drawer}
            setState={(val) => setDrawer(val)}
            position={"bottom"}
            label=''
          >
            <div>
              <header className='p-4 mobile_drawer_header flex items-center mb-3'>
                <ArrowBackIcon
                  className='mr-2'
                  onClick={() => setDrawer({ ...drawer, bottom: false })}
                />
                <h5>Details</h5>
              </header>
            </div>
            <div className='pb-6 '>
              <div className='p-4 '>
                <h4 className=' text-black font-bold capitalize'>
                  All about {hostelData?.name}
                </h4>
                <div className='relative'>
                  <p className='mt-5 xl:text-base text-blogPara xl:pb-9 2xl:pb-9 xs:pb-1 '>
                    {description?.content}
                  </p>
                </div>
              </div>
              <h4 className='p-4 pt-5 text-black font-bold capitalize'>
                Why you’ll love it here
              </h4>
              {otherInfo?.map((item) => (
                <div className='flex items-center py-4 px-2'>
                  <div>
                    <img
                      className='overview_points'
                      src={star}
                      alt='experience'
                    />
                  </div>
                  <div className='ml-3'>
                    <h5 className=''> {item?.heading}</h5>
                    <p className='mt-1 text-blogPara overview_ex_info'>
                      {item?.content}
                    </p>
                  </div>
                </div>
              ))}
              <h4 className='mt-8 mb-1 pl-4 text-black font-bold'>Amenities</h4>
              <div className='p-4 grid grid-cols-4 mb-14'>
                {amenities?.map((val) => (
                  <div className='mt-5 flex flex-col justify-center items-center'>
                    <img
                      className='mobile_amenities_icon'
                      src={val?.icon}
                      alt='Amenities'
                    />
                    <p className='text-xs text-blogPara text-center'>
                      {val?.name}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </CustomDrawer>
        </div>
      </div>
    </div>
  );
}

export default Overview;
