import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Carousel from "../Components/Common/Carousel/Carousel";
import PropertyContent from "../Components/Property/Description";
import DescriptionLinks from "../Components/Property/DescriptionLinks/DescriptionLinks";
import Gallery from "../Components/Property/Gallery/Gallery";
import Search from "../Components/Search/Search";
import {
  cityNameHandler,
  searchedHostelDetails,
} from "../Redux/search/search.action";
import {
  useGetByUrl,
  useGetSimilarProduct,
  useHostelDetails,
  usePostSearchedData,
} from "../Services/datasource";
import MobileSearch from "../Components/Property/Description/MobileSearch/MobileSearch";
import MobileCart from "../Components/Property/MobileCart/MobileCart";
import Location from "../Components/Property/Description/Location/Location";
import Reviews from "../Components/Home/Trips/Reviews/Reviews";
import Card from "../Components/Common/Card/Card";
import Faq from "../Components/Property/Faq/Faq";
import CircularLoader from "../Components/Common/CircularLoader/CircularLoader";
import { useWindowSize } from "../Utils/utils";
import { useHistory, useParams } from "react-router";
import Meta from "../Components/Common/Meta/Meta";
import Cancellation from "../Components/Property/Description/Cancellation/Cancellation";
import Share from "../Components/Common/Share";
import { dateConverter, seoUrlHandler } from "../Utils/utils";
import { addDays } from "date-fns";
import {
  checkInDateHandler,
  checkOutDateHandler,
  searchDetailsHandler,
} from "../Redux/search/search.action";

function PropertyDetails() {
  const { type, name } = useParams();
  const dispatch = useDispatch();
  const pathname = window.location.pathname;
  const history = useHistory();
  const id = useParams();
  const sessionId = sessionStorage.getItem("sessionId");
  const [innerWidth] = useWindowSize();
  const isMobile = innerWidth < 650;
  const state = useSelector((state) => state);
  const searchResult = useSelector((state) => state.search.searchDetails);
  const hostelId = useSelector((state) => state.search.cityName);
  const searchData = useSelector((state) => state);
  const [bannerImage, setBannerImage] = useState([]);
  const [clearCart, setClearCart] = useState(false);
  const [Id, setId] = useState("");
  const [hostelDetailsHandler, { data: hostelData, loading, refetch }] =
    useHostelDetails();
  const [
    sendUrlHandler,
    {
      loading: searchByUrlLoading,
      error: searchByUrlError,
      data: searchByUrlData,
      refetch: searchByUrlRefetch,
    },
  ] = useGetByUrl();
  const [sendSearchedData, { data, error }] = usePostSearchedData();

  useEffect(() => {
    if (pathname && pathname !== "/") {
      sendUrlHandler(pathname);
    }
  }, [pathname]);

  useEffect(() => {
    if (searchByUrlData?.getByUrl?.id) {
      setId(searchByUrlData?.getByUrl?.id);
      setDateHandler(
        searchByUrlData?.getByUrl?.productType,
        searchByUrlData?.getByUrl?.id
      );
      hostelDetailsHandler(searchByUrlData?.getByUrl?.id);
    }
  }, [state.search.cityName, searchByUrlData]);

  useEffect(() => {
    if (data) {
      sessionStorage.setItem("sessionId", data?.Search?.sessionId);
      dispatch(searchDetailsHandler(data));
    }
  }, [data]);

  const setDateHandler = (productType, hostelId) => {
    const checkInDate = dateConverter(new Date(), "dd-mm-yyyy", "home");
    dispatch(checkInDateHandler(checkInDate));
    if (productType === "Hostel") {
      const checkOutDate = dateConverter(
        addDays(new Date(), 1),
        "dd-mm-yyyy",
        "home"
      );
      dispatch(checkOutDateHandler(checkOutDate));
      searchHandler(hostelId, checkInDate, checkOutDate, 1, productType);
    } else if (productType === "Workation") {
      const checkOutDate = dateConverter(
        addDays(new Date(), 7),
        "dd-mm-yyyy",
        "home"
      );
      dispatch(checkOutDateHandler(checkOutDate));
      searchHandler(hostelId, checkInDate, checkOutDate, 1, productType);
      dispatch(cityNameHandler(hostelId));
    }
  };

  const searchHandler = (
    hostelId,
    checkInDate,
    checkOutDate,
    numOfPax,
    product
  ) => {
    sendSearchedData(
      hostelId,
      checkInDate,
      checkOutDate,
      numOfPax,
      product,
      undefined
    );
  };

  useEffect(() => {
    if (hostelData?.getHostelDetails?.images?.length) {
      let bannerImage = hostelData?.getHostelDetails?.images?.map(
        (item) => item.image
      );
      setBannerImage(bannerImage);
    } else {
      setBannerImage([]);
    }
  }, [hostelData?.getHostelDetails?.images]);

  useEffect(() => {
    if (hostelData) {
      dispatch(searchedHostelDetails(hostelData));
    }
  }, [hostelData]);

  useEffect(() => {
    if (clearCart) {
      setTimeout(() => {
        setClearCart(false);
      }, 2000);
    }
  }, [clearCart]);

  return loading || searchByUrlLoading ? (
    <CircularLoader size={50} />
  ) : (
    <div className='Property_view_container'>
      <Meta
        title={
          state.search?.searchDetails?.Search?.h1Tags ||
          hostelData?.getHostelDetails?.name
        }
        description={
          state.search?.searchDetails?.Search?.metaDesc ||
          "All About Hosteller" + hostelData?.getHostelDetails?.name
        }
      />
      <div className='relative '>
        {hostelData?.getHostelDetails?.images?.length ? (
          <Carousel bannerImage={bannerImage} autoplay={true} />
        ) : (
          ""
        )}
        <div className='xl:absolute 2xl:absolute xs:absolute image_mask bottom-0 xs:bottom-4 left-0'></div>
        {hostelData?.getHostelDetails?.images?.length ? (
          <div className='xl:absolute 2xl:absolute xs:absolute  bottom-10 left-20 xs:left-10'>
            <div className='view_container'>
              <h1 className='text-primary font-bold font-Mulish text-inherit xs:text-xl'>
                {hostelData?.getHostelDetails?.name}
              </h1>
              <p className='text-white font-bold  text-base xs:text-xs mt-2 hostel_address'>
                {hostelData?.getHostelDetails?.address?.addressLine1}
              </p>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
      <div className='search_container search_details_searchBar -mt-2  xs:hidden sm:hidden sticky top-20 z-10'>
        <div className='2xl:container 2xl:mx-auto'>
          <div className='view_container'>
            <Search
              boxShadow={"0"}
              borderRadius={"0"}
              zIndex={"0"}
              backgroundColor={"0"}
              marginTop={"0"}
              type=''
              buttonText='BOOK NOW'
              isLabel={null}
              variant=''
              search={searchData?.search?.searchType}
              setClearCart={setClearCart}
              setId={setId}
              Id={Id}
            />
          </div>
        </div>
      </div>
      <div className='2xl:container 2xl:mx-auto'>
        <div className='property_View_container xs:pb-0'>
          {bannerImage?.length ? (
            <Gallery
              hostelImage={hostelData?.getHostelDetails?.images}
              locationUrl={hostelData?.getHostelDetails?.locationUrl}
            />
          ) : (
            ""
          )}
        </div>
        <div className='xl:hidden 2xl:hidden'>
          <MobileSearch />
        </div>
        <DescriptionLinks />
        <div className='property_View_container'>
          <PropertyContent
            hostelData={hostelData?.getHostelDetails}
            content={searchResult?.Search?.searchResults}
            clearCart={clearCart}
          />
          <MobileCart />
        </div>
        <div className='property_View_container xs:hidden mt-20'>
          <h4 className='font-bold'>City and Location</h4>
          <Location locationUrl={hostelData?.getHostelDetails?.locationUrl} />
        </div>
        <div className='xl:hidden 2xl:hidden property_View_container'>
          <Card>
            <div id={`${isMobile ? "location" : ""}`} className='p-4'>
              <h4 className='mb-5'>Location</h4>
              <iframe
                src={hostelData?.getHostelDetails?.locationUrl}
                width='100%'
                height='150px'
                title='map'
                loading='lazy'
              ></iframe>
            </div>
          </Card>
        </div>
        <div id='policies' className='property_View_container xs:hidden mt-20'>
          <div>
            <h4 className='font-bold'>Policies</h4>
            <Cancellation />
          </div>
        </div>
        <div className='property_View_container mt-1'>
          <Reviews data={hostelData?.getHostelDetails?.reviews} />
        </div>
        <div className='property_faq property_View_container mt-24'>
          <Faq
            data={
              state?.search?.searchType === "Hostels"
                ? hostelData?.getHostelDetails?.hostelFaqs
                : hostelData?.getHostelDetails?.workationFaqs
            }
          />
        </div>
      </div>
      <Share
        url={process.env.REACT_APP_FRONTEND_URL + `/${type}/${name}`}
        type={type}
        name={name}
      />
    </div>
  );
}

export default React.memo(PropertyDetails);

// <div className='property_View_container '>
//   <h3 className='ml-2 my-16 font-bold'>Suggested Trips</h3>
//   <div className='xs:hidden grid xl:grid-cols-4 2xl:grid-cols-4 xs:grid-cols-1 gap-4'>
//     {commonData.map((data) => (
//       <Card>
//         <RecommendationCard data={data} />
//       </Card>
//     ))}
//   </div>
//   <div className='xl:hidden 2xl:hidden recommended_property'>
//     <MultiCarousel>
//       {commonData.map((data) => (
//         <Card>
//           <RecommendationCard data={data} />
//         </Card>
//       ))}
//     </MultiCarousel>
//   </div>
// </div>;

// <div className='property_View_container mt-32 mb-12'>
//   <h3 className='ml-2 mb-16 font-bold'>
//     Suggested {state?.search?.searchType}
//   </h3>
//   <div className='xs:hidden  grid xl:grid-cols-4 2xl:grid-cols-4 sm:grid-cols-2 xs:grid-cols-1  gap-4'>
//     {similarData?.map((data) => (
//       <Card>
//         <RecommendationCard
//           data={data}
//           type={state?.search?.searchType}
//         />
//       </Card>
//     ))}
//   </div>
//   <div className='xl:hidden 2xl:hidden recommended_property'>
//     <MultiCarousel>
//       {similarData?.map((data) => (
//         <Card>
//           <RecommendationCard
//             data={data}
//             type={state?.search?.searchType}
//           />
//         </Card>
//       ))}
//     </MultiCarousel>
//   </div>
// </div>;

// <div className='property_View_container  mb-12'>
//   <h3 className='ml-2 mb-16 font-bold'>
//     Suggested {state?.search?.searchType}
//   </h3>
//   <div className='xs:hidden  grid xl:grid-cols-4 2xl:grid-cols-4 sm:grid-cols-2 xs:grid-cols-1  gap-4'>
//     {similarData?.map((data) => (
//       <Card>
//         <RecommendationCard
//           data={data}
//           type={state?.search?.searchType}
//         />
//       </Card>
//     ))}
//   </div>
//   <div className='xl:hidden 2xl:hidden recommended_property'>
//     <MultiCarousel>
//       {similarData?.map((data) => (
//         <Card>
//           <RecommendationCard
//             data={data}
//             type={state?.search?.searchType}
//           />
//         </Card>
//       ))}
//     </MultiCarousel>
//   </div>
// </div>
