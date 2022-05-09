import React from "react";
import close from "../../Assets/Icons/x.png";
import CustomRating from "../Common/Rating/Rating";
import Button from "../Common/Button/Button";
import { colorPallete } from "../../Resources/theme";
import Rating from "@material-ui/lab/Rating";
import { usePostReview } from "../../Services/datasource";
import { useSelector } from "react-redux";
import Toast from "../Common/Toast/Toast";

const AddReview = ({ handleClose, id, item }) => {
  const { Primary, Black, clear } = colorPallete;
  const state = useSelector((state) => state.search.searchType);
  const [rating, setRating] = React.useState(1);
  const [review, setReview] = React.useState("");
  const [isError, setError] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [openToast, setOpenToast] = React.useState("");
  const [sendReviewHandler, { loading, error, data, refetch }] =
    usePostReview();

  const submitHandler = () => {
    let obj = { review: review, rating: rating };
    if (state === "trips") {
      obj.tripId = id;
    } else {
      obj.bookingId = id;
    }
    sendReviewHandler(obj);
  };

  React.useEffect(() => {
    if (data?.createReview) {
      setMessage(data?.createReview?.message);
      setError(data?.createReview?.status);
      setOpenToast(true);
      setTimeout(() => {
        handleClose();
        setMessage("");
        setError("");
      }, 2000);
    }
  }, [data]);

  return (
    <div className='xs:w-screen add_review_container'>
      <div className='bg-lightPrimary p-4 flex justify-between'>
        <p className='text-base font-bold'>Add Review</p>
        <img
          onClick={handleClose}
          className='cursor-pointer'
          src={close}
          alt='Close'
        />
      </div>
      <div className='pl-2 pr-4 mt-4'>
        <textarea
          onChange={(e) => setReview(e.target.value)}
          className='w-full review_text_area'
          placeholder='Describe your experience '
          rows={10}
        />
      </div>
      <div className='pl-2 pr-4 mt-1 flex items-center'>
        <span className='mr-1'>Rate Us</span>
        <CustomRating
          name='simple-controlled'
          rating={rating}
          setRating={setRating}
        />
      </div>
      <div className='flex justify-center py-4'>
        <div className='mr-2'>
          <Button
            bgColor={clear}
            color={Black}
            padding={"1.2rem 2rem"}
            fontWeight={600}
            borderRadius={6}
            label={"Cancel"}
            onClick={() => {
              handleClose();
            }}
            width={"100px"}
          />
        </div>
        <Button
          bgColor={Primary}
          color={Black}
          padding={"1.2rem 2rem"}
          fontWeight={600}
          borderRadius={6}
          label={"Confirm"}
          onClick={() => submitHandler()}
          width={"100px"}
        />
      </div>
      <div className='absolute'>
        <Toast
          handleClose={() => setOpenToast(false)}
          open={openToast}
          severity={isError === "success" ? "success" : "error"}
          message={message}
        />
      </div>
    </div>
  );
};

export default AddReview;
