import Avatar from "@material-ui/core/Avatar";
import React from "react";
import userImg from "../../../../Assets/Icons/carduser.png";

function BlogCard({ data }) {
  const { title, thumbnail, author, shortDesc, publishedDate, authorImage } =
    data;
  return (
    <div >
      <div>
        <img className="card_img" src={thumbnail} alt="Blog banner" />
      </div>
      <div className="mt-2 py-3 px-8  xs:px-6 relative ">
        <h6 className="font-extrabold text-lg ">{title}</h6>
        <p className="mt-2 text-lightgrey">{shortDesc}</p>
        <div className="flex justify-between items-center mt-6">
          <div className="flex items-center">
            <Avatar src={authorImage} />
            <div>
              <p className="text-lightgrey text-base ml-2">{author}</p>
              <p className="text-lightgrey text-base ml-2">{publishedDate}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogCard;
