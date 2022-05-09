import { Avatar } from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router";
import { colorPallete } from "../../../Resources/theme";
import Button from "../../Common/Button/Button";
import "./index.scss";

function BlogsCard({ data }) {
  const history = useHistory();
  const { Primary, Black } = colorPallete;
  const {
    name,
    id,
    heroImage: { image },
    summary,
    authorName,
    authorImage,
    createdAt,
    tag,
  } = data;


  return (
    <div
      onClick={() => history.push("/blog/" + id)}
      className='p-4 cursor-pointer'
    >
      <div>
        <img alt='Blog hero Img' className='w-full card_image' src={image} />
      </div>
      <div className=' flex flex-wrap'>
        {tag?.map((item) => (
          <div className='mr-2 pt-2'>
            <Button
              bgColor={Primary}
              color={Black}
              padding={"0.8rem 1rem"}
              fontWeight={500}
              borderRadius={10}
              label={item}
              onClick={() => console.log()}
              width={"auto"}
              height='20px'
              opacity='0.8'
            />
          </div>
        ))}
      </div>
      <div className='mt-3'>
        <h6 className='font-semibold  text-blogHeading'>{name}</h6>
        <p className='mt-3 text-blogPara'>{summary}</p>
      </div>
      <div className='flex items-center mt-3'>
        <Avatar src={authorImage} />
        <div className='ml-3'>
          <p className='text-author'>{authorName}</p>
          <p className='text-author'>{createdAt}</p>
        </div>
      </div>
    </div>
  );
}

export default BlogsCard;
