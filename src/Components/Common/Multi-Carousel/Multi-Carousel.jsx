import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import React, { useEffect, useLayoutEffect, useState } from "react";
import Card from "../Card/Card";
import HomeCard from "../../Home/Card/Card";
import Slider from "react-slick";
import { useWindowSize } from "../../../Utils/utils";
import "./Multi-Carousel.scss";

function MultiCarousel({children }) {
  //#TODO move it to single carousel
  
  const [innerWidth] = useWindowSize();
  const isMobile = innerWidth < 640;
  const isTablet = innerWidth > 640 && innerWidth < 770;

  const [settings, setSettings] = useState({
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 3,
    // autoplay: true,
    showArrows: true,
    // speed: 7000,
    // autoplaySpeed: 7000,
    cssEase: "linear",
  });

  useEffect(() => {
    if (isMobile) {
      setSettings({ ...settings, slidesToShow: 1, slidesToScroll: 1 });
    } else if (isTablet) {
      setSettings({ ...settings, slidesToShow: 2, slidesToScroll: 2 });
    } else {
      setSettings({ ...settings, slidesToShow: 3, slidesToScroll: 3 });
    }
  }, [isMobile, isTablet]);

  return (
    <div className="my-10 multi-carousel">
      <Slider {...settings}>{children}</Slider>
    </div>
  );
}

export default MultiCarousel;
