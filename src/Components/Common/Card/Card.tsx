import { makeStyles } from "@material-ui/core";
import React from "react";
import { Icard } from "./types";

const useStyles = makeStyles({
  root: {
    borderRadius: 6,
    boxShadow: "0 4px 15px rgb(0 0 0 / 15%)",
    height: ({ height }: any) => height,
    width: ({ width }: any) => width,
    background: "white",
    overflowY: ({ overflow }: any) => (overflow ? overflow : "visible"),
  },
});

function Card({ width, height, overflow, children }: any) {
  const classes = useStyles({ width: width, height: height, overflow });
  return <div className={`${classes.root} mx-3 xs:ml-4`}>{children}</div>;
}

export default Card;
