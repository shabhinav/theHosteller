import React, { useEffect, useState } from "react";
import "./Blog.css";
import Banner from "../../../Assets/images/banner.png";
import Button from "../../Common/Button/Button";
import { colorPallete } from "../../../Resources/theme";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import { useHistory } from "react-router";
import { useGetAllBlogs } from "../../../Services/datasource";

function Blog() {
  const history = useHistory();
  const { Primary, Black } = colorPallete;
  const { data } = useGetAllBlogs();
  const [mainBlog, setMainBlog] = useState("");
  const [remainingBlogs, setRemainingBlogs] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (data?.getAllBlog?.length) {
      let blogsClone = JSON.parse(JSON.stringify(data?.getAllBlog));
      let a = blogsClone?.splice(0, 1);
      setMainBlog(a[0]);
      setRemainingBlogs([...blogsClone]);
    }
  }, [data]);

  return (
    <>
      <h1 className='  my-16'>Blogs</h1>
      <div className='flex xs:flex-col sm:flex-col'>
        <div className='main_blog relative'>
          <img
            className='blog_bg_img'
            src={mainBlog?.heroImage?.image}
            alt='banner'
          />
          <div className='main_blog_feature_data'>
            <div className='w-11/12	xs:mt-3'>
              {mainBlog?.tag?.map((item) => (
                <span className='mr-2'>
                  <Button
                    bgColor={Primary}
                    color={Black}
                    padding={"0.8rem 1rem"}
                    fontWeight={500}
                    borderRadius={10}
                    label={item}
                    onClick={() => console.log()}
                    width='max-content'
                    height='20px'
                    opacity='0.8'
                  />
                </span>
              ))}
              <h1 className='text-5xl mt-3 xs:text-4xl'>{mainBlog?.name}</h1>
              <p className='mt-2 xs:text-xs'>{mainBlog?.summary}</p>
              <div
                onClick={() => history.push("/blogs")}
                className='flex align-center mt-2'
              >
                <p className='text-danger font-semibold cursor-pointer'>
                  Read Me
                </p>
                <ArrowForwardIcon className='text-danger' />
              </div>
            </div>
          </div>
        </div>
        <div className='featured_blog xs:hidden'>
          {remainingBlogs?.map((item) => (
            <div
              onClick={() => history.push("/blogs")}
              className='flex pl-4 xs:hidden sm:mt-10'
            >
              <img
                src={item?.heroImage?.image}
                alt='features Blogs'
                className='featured_blog_thumbnail'
              />
              <div className='flex flex-col justify-between pl-2'>
                <Button
                  bgColor={Primary}
                  color={Black}
                  padding={"0.8rem 1rem"}
                  fontWeight={500}
                  borderRadius={10}
                  label={item?.tag[0]}
                  onClick={() => console.log()}
                  width='max-content'
                  height='20px'
                  opacity='0.8'
                />
                <h5 className='text-lg '>{item?.name}</h5>
                <p>
                  {item?.createdBy} {item?.createdAt}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Blog;
