import React, { useState } from "react";
import SimpleReactLightbox, { SRLWrapper } from "simple-react-lightbox";

const options = {
  showThumbnails: false,
  settings: {
    autoplaySpeed: 1500,
    transitionSpeed: 900,
  },
  buttons: {
    showDownloadButton: false,
    showAutoplayButton: false,
  },
  thumbnails: {
    showThumbnails: false,
  },
  caption: {
    captionFontFamily: "Raleway, sans-serif",
    captionFontWeight: "300",
    captionTextTransform: "uppercase",
  },
};

function LightBox({ data }) {
  return (
    <SimpleReactLightbox>
      <SRLWrapper className='h-full' options={options}>
        {data?.map((item, index) => (
          <div
            className={`${index === 0 ? "h-full  first_img" : "remaining_img"}`}
          >
            <img
              className={`gallery_main_img `}
              src={item}
              alt={(index + 1) + "/" + data?.length}
            />
          </div>
        ))}
      </SRLWrapper>
    </SimpleReactLightbox>
  );
}

export default LightBox;
