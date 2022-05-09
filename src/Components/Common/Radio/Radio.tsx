import React from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import { makeStyles } from "@material-ui/core";
import "./Radio.scss";
import { searchTypeHandler } from "../../../Redux/search/search.action";
import { useDispatch } from "react-redux";
import { colorPallete } from "../../../Resources/theme";

const { Black } = colorPallete;

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  group: {
    justifyContent: "space-between",
    width: "100%",
  },
  label: {
    color: Black,
  },
});

function RadioButton({ label, data, defaultValue, search }: any) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [value, setValue] = React.useState(defaultValue);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(searchTypeHandler((event.target as HTMLInputElement).value));
    setValue((event.target as HTMLInputElement).value);
    // search((event.target as HTMLInputElement).value);
  };

  return (
    <div>
      <FormControl className={classes.root} component='fieldset'>
        <FormLabel className={classes.label} component='legend'>
          {label}
        </FormLabel>
        <RadioGroup
          row
          className={classes.group}
          aria-label='gender'
          name='gender1'
          value={value}
          onChange={handleChange}
        >
          {data.map((item: any) => (
            <FormControlLabel
              value={item?.name}
              control={<Radio />}
              label={item?.name}
            />
          ))}
        </RadioGroup>
      </FormControl>
    </div>
  );
}

export default RadioButton;
