import { Carousel as SimpleCarousel } from "react-responsive-carousel";
import React, { useEffect, useState } from "react";
import "./style.scss";
import BannerImg from "../../../Assets/images/banner.png";
import Slider from "react-slick";

const settings = {
  dots: true,
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  showArrows: false,
  autoplay: false,
  speed: 2000,
  autoplaySpeed: 5000,
  cssEase: "linear",
};

function Carousel({ bannerImage, autoplay }) {
  const pathname = window.location.pathname;
  const [setting, setSetting] = useState({ ...settings });

  useEffect(() => {
    setSetting({ ...setting, autoplay: autoplay ? autoplay : false });
  }, [autoplay]);

  return (
    <div className='simple_carousel'>
      <Slider {...setting}>
        {bannerImage?.map((url) => (
          <img
            className={`carouselImage xs:h-full`}
            src={url}
            alt='img'
            onerror={`this.onerror=null; this.src=${BannerImg}`}
          />
        ))}
      </Slider>
    </div>
  );
}

export default Carousel;
