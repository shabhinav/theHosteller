import React from "react";
import { BlogData } from "../../../Resources/constants/Home";
import Card from "../../Common/Card/Card";
import MultiCarousel from "../../Common/Multi-Carousel/Multi-Carousel";
import HomeCard from "../Card/Card";
import BlogCard from "./Card/BlogCard";

function MobileBlog() {
  return (
    <div>
      <div>
        <h1 className="text-center mt-32 mb-16">Blogs</h1>
      </div>
      <MultiCarousel>
        {BlogData.map((item, index) => (
          <Card height={'100%'}>
            <BlogCard index={index} data={item} />
          </Card>
        ))}
      </MultiCarousel>
    </div>
  );
}

export default MobileBlog;
