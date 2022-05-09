import { Avatar, Grid } from "@material-ui/core";
import React from "react";
import { useParams } from "react-router";
import Card from "../Components/Common/Card/Card";
import { useGetBlog } from "../Services/datasource";
import "../App.scss";
import Meta from "../Components/Common/Meta/Meta";

function BlogView() {
  const { id } = useParams();
  const { loading, error, data } = useGetBlog(id);


  return (
    <>
      <Meta
        title={"The Hosteller"}
        description={data?.getBlog?.body?.blocks?.[0]?.data?.text}
      />
      <div className='view_container mt-32'>
        <Grid container spacing={4}>
          <Grid lg={8} xs={12}>
            <div>
              <h3>Markdown Language Sample Blog</h3>
              <div className='mt-8 flex items-center'>
                <Avatar src='https://images.unsplash.com/photo-1636757597996-8443d99f0956?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' />
                <div className='ml-3'>
                  <p className='text-author'>Etiam non turpis dui</p>
                  <p className='text-author'>May 28, 2021 </p>
                </div>
              </div>
              <div className='mt-8'>
                {data?.getBlog?.body?.blocks?.map((item) => (
                  <div>
                    {(() => {
                      switch (item.type) {
                        case "paragraph":
                          return <Para data={item} />;
                        case "image":
                          return <Image data={item} />;
                        default:
                          return <Heading data={item} />;
                      }
                    })()}
                  </div>
                ))}
              </div>
            </div>
          </Grid>
          <Grid lg={4} xs={12}>
            <div className='ml-4 sticky top-0'>
              <Card>
                <div className='p-4'>
                  <h6 className=' font-semibold'>Featured Articles</h6>
                  <ul className='pl-6'>
                    <li className='mt-2 text-tiny'>
                      A Marketer’s Guide to Price Comparison Websites
                    </li>
                    <li className='mt-2 text-tiny'>
                      A Marketer’s Guide to Price Comparison Websites
                    </li>
                    <li className='mt-2 text-tiny'>
                      A Marketer’s Guide to Price Comparison Websites
                    </li>
                    <li className='mt-2 text-tiny'>
                      A Marketer’s Guide to Price Comparison Websites
                    </li>
                  </ul>
                </div>
              </Card>
            </div>
          </Grid>
        </Grid>
      </div>
    </>
  );
}

const Para = ({
  data: {
    data: { text },
  },
}) => {
  return <p className='my-6 text-blogPara'>{text}</p>;
};

const Image = ({
  data: {
    data: {
      file: { url },
    },
  },
}) => {
  return <img className='w-full' src={url} alt='banner' />;
};

const Heading = ({
  data: {
    data: { text },
  },
}) => {
  return <h5>{text}</h5>;
};

export default BlogView;
