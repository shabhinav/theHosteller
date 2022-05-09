import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import { InputAdornment, InputLabel, OutlinedInput } from "@material-ui/core";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import "./Input.scss";
import SimpleInput from "@material-ui/core/Input";

const useStyles = makeStyles((theme) => ({
  formControl: {
    [theme.breakpoints.up("xs")]: {
      margin: ({ use }) => (use ? "8px 8px 8px 0px" : "8px"),
      width: "100%",
    },
    [theme.breakpoints.up("lg")]: {
      width: ({ width }) => (width ? width : "200px"),
    },
  },
  label: {
    margin: ({ use }) => (use ? "0px 0px 2px 0px" : "0px 8px"),
    color: ({ use }) => (use ? "black" : ""),
  },

  input_box: {
    padding: "0px",
    ".MuiOutlinedInput-input": {
      padding: ({ use }) => (use ? "0px" : ""),
    },
  },
  outlineLabel: {
    marginLeft: "-13px",
    marginTop: "5px",
  },
}));

function Input({
  handleClick,
  label,
  value,
  type,
  use,
  labelAlign,
  width,
  onChange,
  variant,
  isLabel,
  marginBottom,
  placeholder,
  isError,
  isRequired,
}) {
  const classes = useStyles({
    align: labelAlign,
    width: width,
    use: use,
    marginBottom,
  });

  return (
    <div className='xs:w-full sm:w-full'>
      <label className={`${classes.label} `}>
        {isLabel && label}
        {isRequired ? <span className='text-danger'> *</span> : ""}
      </label>
      <div>
        <FormControl variant='outlined' className={classes.formControl}>
          {!variant ? (
            <div>
              <InputLabel
                className={classes.outlineLabel}
                htmlFor='standard-adornment-password '
              >
                {label}
              </InputLabel>
              <SimpleInput
                error={isError}
                id='standard-adornment-password'
                placeholder={placeholder || label}
                value={value}
                autoComplete='off'
                defaultValue={value}
                type={type}
                onChange={(e) => onChange(e.target.value)}
                onClick={handleClick}
                className={use}
                InputProps={{
                  inputProps: { min: 0 },
                }}
                endAdornment={
                  <InputAdornment position='end'>
                    <CalendarTodayIcon />
                  </InputAdornment>
                }
              />
            </div>
          ) : (
            <OutlinedInput
              error={isError}
              placeholder={placeholder || label}
              defaultValue={value}
              value={value}
              autoComplete='kskbckjabdvkjdsbvdsv'
              type={type}
              InputProps={{
                inputProps: { min: 0 },
              }}
              onChange={(e) => onChange(e.target.value)}
              onClick={handleClick}
              className={use}
              endAdornment={
                !use && (
                  <InputAdornment position='end'>
                    <CalendarTodayIcon />
                  </InputAdornment>
                )
              }
            />
          )}
        </FormControl>
      </div>
    </div>
  );
}

export default Input;
