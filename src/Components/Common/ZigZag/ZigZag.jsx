import React from "react";
import { colorPallete } from "../../../Resources/theme";
import "./style.scss";
import Button from "../Button/Button";
import { Izigzagcontent } from "./types";
import Grid from "@material-ui/core/Grid";
import { useHistory } from "react-router";

function ZigZag({ heading, subHeading, para, type, redirectUrl }) {
  const pathname = window.location.pathname;
  const history = useHistory();
  const { Primary, Black } = colorPallete;

  return (
    <div className='mt-14 mb-16 ml-2'>
      <Grid container spacing={3}>
        <Grid item xs={12} lg={5}>
          <p className=' text-tiny text-soil font-bold		'>{subHeading}</p>
          <h1 className='xs:text-5xl'>{heading}</h1>
        </Grid>
        <Grid item xs={12} lg={7}>
          <p className='font-Mulish text-base text-grey mt-1 zig_zag_content'>{para}</p>{" "}
        </Grid>
      </Grid>
    </div>
  );
}

export default ZigZag;
