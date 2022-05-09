import {
  FormControl,
  InputAdornment,
  InputLabel,
  makeStyles,
  OutlinedInput,
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import IconButton from "@material-ui/core/IconButton";
import React from "react";
import Toast from "../Toast/Toast";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  label: {
    color: "black",
    marginBottom: "8px",
  },
}));

function Input({
  email,
  label,
  onChange,
  password,
  isSignIn,
  forgetPasswordHandler,
}) {
  const classes = useStyles();
  const [openToast, setOpenToast] = React.useState(false);
  const [values, setValues] = React.useState({
    password: "",
    showPassword: false,
  });

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div>
      <div className='flex justify-between'>
        <label className={classes.label}>
          {label}
          <span className='text-danger'> *</span>
        </label>
        {isSignIn ? (
          <label
            onClick={() => {
              if (email) forgetPasswordHandler();
              else {
                setOpenToast(true);
              }
            }}
            className={`${classes.label} `}
          >
            <span className='text-soil font-semibold cursor-pointer'>
              Forgot Password?
            </span>
          </label>
        ) : (
          ""
        )}
      </div>
      <FormControl className={classes.root} variant='outlined'>
        <OutlinedInput
          id='outlined-adornment-password'
          type={values.showPassword ? "text" : "password"}
          placeholder='Password'
          onChange={(e) => onChange(e.target.value)}
          // error={!password?.length}
          endAdornment={
            <InputAdornment position='end'>
              <IconButton
                aria-label='toggle password visibility'
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge='end'
              >
                {values.showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
      <div className='absolute'>
        <Toast
          handleClose={() => setOpenToast(false)}
          open={openToast}
          severity='error'
          message={"Please Fill Email "}
        />
      </div>
    </div>
  );
}

export default Input;
