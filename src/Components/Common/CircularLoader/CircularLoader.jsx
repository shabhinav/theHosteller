import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

function CircularLoader({ size }) {
  return (
    <div className="h-screen flex justify-center items-center">
      <CircularProgress size={size} />
    </div>
  );
}

export default CircularLoader;
