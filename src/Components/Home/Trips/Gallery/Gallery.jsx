import React, { useEffect, useState } from "react";
import GalleryImg from "../../../../Assets/images/gallery.png";
import "./Gallery.scss";
import ReactPlayer from "react-player";
import { useWindowSize } from "../../../../Utils/utils";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

const galleryImgs = [GalleryImg, GalleryImg, GalleryImg];

function Gallery({ tripData }) {
  const [innerWidth] = useWindowSize();
  const isMobile = innerWidth < 600;
  const [videoPlayerHeight, setVideoPlayerWidth] = useState("500px");
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (isMobile) {
      setVideoPlayerWidth("200px");
    } else {
      setVideoPlayerWidth("500px");
    }
  }, [isMobile]);

  useEffect(() => {
    if (tripData?.getTrip?.images?.length) {
      let images = tripData?.getTrip?.images?.map((item) => item?.url);
      setImages(images);
    }
  }, [tripData?.getTrip?.images]);
  return (
    <div className='trips_carousel'>
      <div className=''>
        <h4 className='py-8 font-bold capitalize'>Photo Gallery</h4>
        <Carousel showStatus={false}>
          {images.map((item) => (
            <div>
              <img src={item} alt='gallery' />
            </div>
          ))}
        </Carousel>
      </div>
      <div className='grid grid-cols-6 gap-4 mt-5'></div>
      <div>
        <h4 className='my-8 font-bold capitalize'>Video Gallery</h4>
        <ReactPlayer
          width='100%'
          height={videoPlayerHeight}
          url={
            tripData?.getTrip?.videos?.[0] ||
            "https://www.youtube.com/watch?v=p87J4lhCbbs"
          }
        />
      </div>
    </div>
  );
}

export default Gallery;
