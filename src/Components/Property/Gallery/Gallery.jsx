import React, { useEffect } from "react";
import "./Gallery.css";
import bannerImage from "../../../Assets/images/banner.png";
import { mapSrc } from "../../../Resources/constants/common";
import LightBox from "../../Common/LightBox/LightBox";
import map from "../../../Assets/images/googlemap.png";

function Gallery({ hostelImage, locationUrl }) {
  const [gallery, setGallery] = React.useState([]);
  const [totalImages, SetTotalImages] = React.useState([]);

  useEffect(() => {
    if (hostelImage?.length) {
      const galleryType = ["general", "room", "outdoor"];
      // new Set();
      // hostelImage.forEach((img) => {
      //   galleryType.add(img?.type);
      // });
     let obj = {};
      galleryType?.forEach((imgType) => {
        let filteredImg = hostelImage.filter((data) => {
          return imgType === data?.type;
        });
        const imagesArray = filteredImg?.map((item) => item?.image);
        obj[imgType] = imagesArray;
      });
      let totalImage = hostelImage?.map((item) => item?.image);
      SetTotalImages(totalImage);
      setGallery(obj);
    }
  }, [hostelImage]);

  return (
    <div className='flex justify-center xl:mt-11 2xl:mt-11 mb-6'>
      <div className='gallery_main_img_container relative cursor-pointer'>
        <LightBox data={totalImages} />
        <p className='absolute bottom-0 pl-2.5 pb-1		 text-white font-semibold  xs:hidden'>
          View All {hostelImage?.length} Photos
        </p>
      </div>
      <div className='other_img_container '>
        {Object.keys(gallery)?.map((item) => (
          <div className='relative cursor-pointer'>
            <LightBox data={gallery?.[item]} />
            <p className='absolute capitalize	 bottom-0 pb-1 text-white font-semibold pl-2.5 xs:hidden'>
              {item} Images
            </p>
          </div>
        ))}
        <div>
          <iframe
            className='gallery_iframe_map'
            src={locationUrl}
            title='map'
            loading='lazy'
            frameborder='0'
            allowfullscreen
          ></iframe>
        </div>
      </div>
    </div>
  );
}

export default Gallery;
