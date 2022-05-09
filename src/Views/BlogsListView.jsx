import { Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import BlogsCard from "../Components/Blogs/BlogsCard/BlogsCard";
import Card from "../Components/Common/Card/Card";
import { colorPallete } from "../Resources/theme";
import Carousel from "../Components/Common/Carousel/Carousel";
import bannerImage from "../Assets/images/banner.png";
import { useGetAllBlogs, useFilterBlog } from "../Services/datasource";
import Slider from "react-slick";
import { useWindowSize } from "../Utils/utils";
import Meta from "../Components/Common/Meta/Meta";

function BlogsListView() {
  const { Primary, Black } = colorPallete;
  const [innerWidth] = useWindowSize();
  const isMobile = innerWidth < 640;
  const [tag, setTag] = useState([]);
  const [selectedTag, setSelectedTag] = useState("");
  const [blogData, setBlogData] = useState([]);
  const { data } = useGetAllBlogs();
  const [filterBlogHandler, { data: filterData }] = useFilterBlog();
  const [settings, setSettings] = useState({
    dots: false,
    infinite: true,
    slidesToShow: 7,
    slidesToScroll: 1,
    showArrows: false,
    autoplay: false,
    speed: 2000,
    autoplaySpeed: 5000,
    cssEase: "linear",
  });

  useEffect(() => {
    if (isMobile) {
      setSettings({ ...settings, slidesToShow: 1, slidesToScroll: 1 });
    } else {
      setSettings({ ...settings, slidesToShow: 7, slidesToScroll: 3 });
    }
  }, [isMobile]);

  useEffect(() => {
    if (data) {
      let tagsData = [];
      let tags = new Set([]);
      data?.getAllBlog.forEach((item) =>
        item?.tag?.map((item) => tags.add(item))
      );
      for (let tag of tags) {
        tagsData.push({ _id: tag, name: tag });
      }
      setTag(tagsData);
      setBlogData(data?.getAllBlog);
    }
  }, [data]);

  useEffect(() => {
    if (filterData) {
      setBlogData(filterData?.filterBlogs);
    }
  }, [filterData]);

  const onChangeHandler = (value) => {
    filterBlogHandler(value);
    setSelectedTag(value);
  };

  return (
    <>
      <Meta title={"Blogs"} description={"Read Blogs here"} />
      <div>
        <div className='relative '>
          <div className='bg_mask absolute h-full w-full z-10 -mt-1'></div>
          <Carousel bannerImage={[bannerImage]} />
        </div>
        <div className=' absolute w-full bottom-1/2 z-10'>
          <div className='view_container text-center'>
            <h4 className='text-white text-6xl '>
              List your hotels, apartments, villas, holiday homes, homestays and
              more!
            </h4>
          </div>
        </div>
      </div>
      <div className='blog_list_carousel_container -mt-1 xs:-mt-3'>
        <div className='view_container'>
          <div className='blog_list_carousel'>
            <Slider {...settings}>
              {tag?.map((value) => (
                <p
                  className='cursor-pointer text-center bg-primary py-1 rounded-full'
                  onClick={() => onChangeHandler(value?.name)}
                >
                  {value.name}
                </p>
              ))}
            </Slider>
          </div>
        </div>
      </div>
      <div className='view_container'>
        <div className='mt-8'>
          <Grid container spacing={3}>
            {blogData?.map((data, index) => (
              <Grid key={data?.id} lg={4} xs={12}>
                <div className='mb-12'>
                  <Card>
                    <BlogsCard data={data} />
                  </Card>
                </div>
              </Grid>
            ))}
          </Grid>
        </div>
      </div>
    </>
  );
}

export default BlogsListView;
