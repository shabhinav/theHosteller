import React from "react";
import Lottie from "react-lottie";
import Loading from "../../../Assets/Lottie/hotel.json";
import CircularProgress from '@material-ui/core/CircularProgress';

//#TODO Remove this component

function PageLoader() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: Loading,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div className="flex justify-center items-center h-full">
      <Lottie options={defaultOptions} height={200} width={200} />
    </div>
  );
}

export default PageLoader;
