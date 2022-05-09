import React from "react";
import Rating from "@material-ui/lab/Rating";

function CustomRating({ rating, name, setRating }) {
  return (
    <div>
      <Rating
        onChange={(e, value) => {
          setRating(value);
        }}
        value={rating}
        precision={0.5}
        readOnly={name ? false : true}
      />
    </div>
  );
}

export default CustomRating;
