import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import "./Dropdown.scss";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: ({ margin }) => (margin ? margin : theme.spacing(1)),
    [theme.breakpoints.up("xs")]: {
      // minWidth: ({ pathName }: any) =>
      // pathName === "/payment" ? "50%" : "100%",
      minWidth: ({ width }) => (width ? width : "100%"),
    },
    [theme.breakpoints.up("sm")]: {
      minWidth: ({ width }) => (width ? width : "180px"),
    },
    [theme.breakpoints.up("md")]: {
      minWidth: ({ width }) => (width ? width : "180px"),
    },
    [theme.breakpoints.up("lg")]: {
      minWidth: ({ width }) => (width ? width : "80px"),
    },
    [theme.breakpoints.up("xl")]: {
      minWidth: ({ width }) => (width ? width : "180px"),
    },
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  label: {
    color: ({ use }) => (use ? "black" : ""),
    margin: "0px 8px",
  },
}));

function Dropdown({
  data,
  placeholder,
  label,
  handleChange,
  value,
  type,
  isLabel,
  margin,
  use,
  width,
  isRequired,
  defaultValue,
  isDisable,
}) {
  const pathName = window.location.pathname;

  const classes = useStyles({ margin, use, pathName, width });
  return (
    <div className=' xs:w-full sm:w-full'>
      <label className={`${classes.label} `}>
        {isLabel && label}{" "}
        {isRequired ? <span className='text-danger'> *</span> : ""}
      </label>
      <FormControl variant={type} className={`${classes.formControl}`}>
        {pathName.includes("hostels") ||
        pathName.includes("workations") ||
        pathName.includes("book") ? (
          <InputLabel id='demo-simple-select-outlined-label'>
            {placeholder}
          </InputLabel>
        ) : (
          ""
        )}
        {pathName === "/" ||
        pathName === "/workations" ||
        pathName === "/trips" ||
        pathName === "/hostels" ? (
          <Select
            labelId='demo-simple-select-outlined-label'
            id='demo-simple-select-outlined'
            value={value}
            onChange={handleChange}
          >
            {data?.map((item, index) => (
              <MenuItem key={index} value={item?._id}>
                {item.name}
              </MenuItem>
            ))}
          </Select>
        ) : (
          <Select
            labelId='demo-simple-select-outlined-label'
            id='demo-simple-select-outlined'
            value={value}
            onChange={handleChange}
            label={placeholder}
            disabled={isDisable ? isDisable : false}
          >
            {data?.map((item, index) => (
              <MenuItem key={index} value={item?._id}>
                {item.name}
              </MenuItem>
            ))}
          </Select>
        )}
      </FormControl>
    </div>
  );
}

export default Dropdown;
