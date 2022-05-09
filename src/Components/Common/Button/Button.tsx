import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { IButton } from "./type";
import CircularLoader from "../CircularLoader/CircularLoader";

function PrimaryButton({
  bgColor,
  color,
  padding,
  fontWeight,
  borderRadius,
  label,
  onClick,
  width,
  boxShadow,
  isLoading,
  height,
  opacity,
  isDisable,
}: any) {
  const StyledButton = withStyles({
    root: {
      cursor: isDisable ? "not-allowed" : "pointer",
      background: bgColor,
      borderRadius: borderRadius,
      border: 0,
      fontSize: "16px",
      color: color,
      height: ({ height }: any) => (height ? height : "33px"),
      padding: padding,
      boxShadow: boxShadow,
      width: ({ width }: any) => (width ? width : "100%"),
      opacity: ({ opacity }: any) => (opacity ? opacity : "0.8"),
      "&:hover": {
        background: bgColor,
      },
      "&:active": {
        transform: "scale(0.98)",
      },
    },
    label: {
      textTransform: "none",
      fontWeight: fontWeight,
    },
  })(Button);

  return (
    <StyledButton
      opacity={opacity}
      height={height}
      width={width}
      onClick={isDisable ? "" : onClick}
    >
      {isLoading ? <CircularLoader size={25} /> : label}
    </StyledButton>
  );
}

export default PrimaryButton;
