import Carousel from "../Components/Common/Carousel/Carousel";
import HeroDescription from "../Components/Home/Trips/HeroDescription/HeroDescription";
import DescriptionLinks from "../Components/Home/Trips/DescriptionLinks/DescriptionLinks";
import HeroDescMobile from "../Components/Home/Trips/HeroDescription/HeroDescMobile/HeroDescMobile";
import React from "react";
import {
  useGetByUrl,
  useGetSimilarProduct,
  useGetTripsDetails,
} from "../Services/datasource";
import { useDispatch, useSelector } from "react-redux";
import MultiCarousel from "../Components/Common/Multi-Carousel/Multi-Carousel";
import Card from "../Components/Common/Card/Card";
import RecommendationCard from "../Components/Property/RecommendationCard/Card";
import Meta from "../Components/Common/Meta/Meta";
import { useEffect } from "react";
import Share from "../Components/Common/Share";
import { useParams } from "react-router-dom";
import { cityNameHandler } from "../Redux/search/search.action";
import CircularLoader from "../Components/Common/CircularLoader/CircularLoader";

function TripView() {
  const { type, name } = useParams();
  const dispatch = useDispatch();
  const pathname = window.location.pathname;
  const state = useSelector((state) => state);
  const [tripImage, setTripImage] = React.useState([]);
  const [id, setId] = React.useState(state?.search?.cityName);
  const { loading, data, refetch } = useGetTripsDetails(id);
  const [
    sendUrlHandler,
    {
      loading: searchByUrlLoading,
      error: searchByUrlError,
      data: searchByUrlData,
      refetch: searchByUrlRefetch,
    },
  ] = useGetByUrl();

  // const {
  //   loading: searchByUrlLoading,
  //   error: searchByUrlError,
  //   data: searchByUrlData,
  //   refetch: searchByUrlRefetch,
  // } = useGetByUrl(pathname);

  useEffect(() => {
    refetch();
    window.scroll(0, 0);
  }, []);

  useEffect(() => {
    if (pathname && pathname !== "/") {
      sendUrlHandler(pathname);
    }
  }, [pathname]);

  useEffect(() => {
    if (searchByUrlData?.getByUrl?.id) {
      setId(searchByUrlData?.getByUrl?.id);
      refetch();
      dispatch(cityNameHandler(searchByUrlData?.getByUrl?.id));
    }
  }, [state?.search?.cityName, searchByUrlData?.getByUrl?.id]);

  useEffect(() => {
    if (data?.getTrip?.images?.length) {
      let imagesArray = data?.getTrip?.images?.map((item) => item?.url);
      setTripImage(imagesArray);
    }
  }, [data]);

  return loading || searchByUrlLoading ? (
    <CircularLoader size={50} />
  ) : (
    <div className=''>
      <Meta
        title={data?.getTrip?.name}
        description={`Check ${data?.getTrip?.name} Trip Here`}
      />
      <div>
        <div className='relative '>
          <Carousel bannerImage={tripImage} autoPlay={false} />
          <div className='xl:absolute 2xl:absolute xs:hidden image_mask bottom-0 left-0'></div>
        </div>
        <div className='2xl:hidden xl:hidden lg:hidden md:hidden view_container mt-4 '>
          <HeroDescMobile tripData={data} />
        </div>
        <div className='relative xs:hidden 2xl:container mx-auto'>
          <div className='absolute w-full -mt-56	'>
            <div className='view_container'>
              <HeroDescription tripData={data} />
            </div>
          </div>
        </div>
        <div className='xl:mt-24 2xl:mt-24  2xl:container mx-auto'>
          <DescriptionLinks tripData={data} />
        </div>
      </div>
      <Share
        url={
          process.env.REACT_APP_FRONTEND_URL + `/${type}/${name}`
        }
        type={type}
        name={name}
      />
    </div>
  );
}

export default TripView;

// <div className='property_View_container '>
//   <h3 className='font-bold mt-14 mb-8'>People Also Take</h3>
//   <div className='xs:hidden grid xl:grid-cols-4 2xl:grid-cols-4 xs:grid-cols-1 gap-4'>
//     {tripsData?.getSimilarProductByProductType?.map((data) => (
//       <Card>
//         <RecommendationCard data={data} type='Trip' />
//       </Card>
//     ))}
//   </div>
//   <div className='xl:hidden 2xl:hidden recommended_property'>
//     <MultiCarousel>
//       {tripsData?.getSimilarProductByProductType?.map((data) => (
//         <Card>
//           <RecommendationCard data={data} type='Trip' />
//         </Card>
//       ))}
//     </MultiCarousel>
//   </div>
// </div>;
