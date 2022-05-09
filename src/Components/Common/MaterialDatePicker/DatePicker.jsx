import React from "react";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { addDays } from "date-fns";


function DatePicker() {
  const [selectedDate, setSelectedDate] = React.useState(
    new Date("2014-08-18T21:11:54")
  );

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <div>
      <MuiPickersUtilsProvider utils={addDays}>
        <KeyboardDatePicker
          margin="normal"
          id="date-picker-dialog"
          placeholder="Date picker dialog"
          format="MM/dd/yyyy"
          variant="outlined"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            "aria-label": "change date",
          }}
        />
      </MuiPickersUtilsProvider>
    </div>
  );
}

export default DatePicker;
