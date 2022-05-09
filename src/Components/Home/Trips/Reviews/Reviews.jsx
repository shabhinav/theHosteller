import { Grid } from "@material-ui/core";
import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import MultiCarousel from "../../../Common/Multi-Carousel/Multi-Carousel";
import Card from "../../../Common/Card/Card";
import "./Review.scss";
import CustomRating from "../../../Common/Rating/Rating";
import moment from "moment";

let url =
  "https://images.unsplash.com/photo-1634726383175-4af931b68565?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMnx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60";

const demoReview = [
  {
    img: "https://images.unsplash.com/photo-1634726383175-4af931b68565?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMnx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    name: "Kedar Sharma",
    date: "May 2021",
    rating: "4",
    review:
      "voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui. voluptatem sequi nesciunt.",
  },
  {
    img: "https://images.unsplash.com/photo-1634726383175-4af931b68565?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMnx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    name: "Kedar Sharma",
    date: "May 2021",
    rating: "3",
    review:
      "voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui. voluptatem sequi nesciunt.",
  },
  {
    img: "https://images.unsplash.com/photo-1634726383175-4af931b68565?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMnx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    name: "Kedar Sharma",
    date: "May 2021",
    rating: "5",
    review:
      "voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui. voluptatem sequi nesciunt.",
  },
  {
    img: "https://images.unsplash.com/photo-1634726383175-4af931b68565?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMnx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    name: "Kedar Sharma",
    date: "May 2021",
    rating: "4.5",
    review:
      "voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui. voluptatem sequi nesciunt.",
  },
];

const useStyles = makeStyles((theme) => ({
  large: {
    width: "100px",
    height: "100px",
  },
}));

function Reviews({ data }) {
  const [review, setReview] = React.useState([]);
  const classes = useStyles();

  React.useEffect(() => {
    if (data) {
      let reviewClone = data.map((item) => {
        return {
          img: item?.avatar || url,
          name: item?.userName,
          date: moment(item?.dateTime / 1000).format("DD MMM YYYY "),
          review: item?.content,
          rating: "4.5",
        };
      });
      setReview(reviewClone);
    }
  }, [data]);

  return (
    <div id='reviews'>
      <h4 className='mt-12 font-bold xs:mx-3'>Customer Reviews</h4>
      <div className='xs:hidden '>
        <Grid container spacing={3}>
          {review.map((item) => (
            <Grid item lg={6} sm={12}>
              <div className='xs:bg-white xs:p-4 mt-12 mr-8'>
                <div className='flex items-center '>
                  <Avatar
                    alt='Remy Sharp'
                    src={item?.img}
                    className={classes.large}
                  />
                  <div className='ml-12'>
                    <h6 className='font-semibold  text-base'>{item?.name}</h6>
                    <CustomRating rating={item?.rating} />
                  </div>
                </div>
                <Grid container spacing={3}>
                  <Grid lg={3}>
                  </Grid>
                  <Grid lg={9}>
                    <p className=' text-lightgrey ml-8'>{item?.review}</p>
                  </Grid>
                </Grid>
              </div>
            </Grid>
          ))}
        </Grid>
      </div>
      <div className='xl:hidden 2xl:hidden review_container'>
        <MultiCarousel>
          {review.map((item) => (
            <Card>
              <div className='p-4 '>
                <div className='flex items-center '>
                  <Avatar
                    alt='Remy Sharp'
                    src={item?.img}
                    className={classes.large}
                  />
                  <div className='ml-12'>
                    <h6 className='font-semibold  text-base mb-2'>{item?.name}</h6>
                    <CustomRating rating={item?.rating} />{" "}
                  </div>
                </div>
                <div className='mt-5'>{item?.review}</div>
              </div>
            </Card>
          ))}
        </MultiCarousel>
      </div>
    </div>
  );
}

export default Reviews;

// <p className='text-base text-lightgrey'>{item?.date}</p>;
