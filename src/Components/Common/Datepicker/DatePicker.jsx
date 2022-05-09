import * as React from "react";
import "./style.css";
import { DateRangePicker } from "react-date-range";
import { addDays } from "date-fns";
import { colorPallete } from "../../../Resources/theme";
import { useSelector } from "react-redux";
import { dateCalculation } from "../../../Utils/utils";

const SimpleDatePicker = ({ tourDate, onChange, isMobile }) => {
  const { Primary } = colorPallete;
  const state = useSelector((state) => state.search);
  const [disableDate, setDisableDate] = React.useState([]);

  React.useEffect(() => {
    let date = dateCalculation();
    setDisableDate(date);
  }, []);

  return (
    <div>
      <DateRangePicker
        onChange={(item) => onChange([item.selection])}
        showSelectionPreview={false}
        showMonthAndYearPickers={false}
        showDateDisplay={false}
        moveRangeOnFirstSelection={false}
        months={state.searchType === "Trips" ? 1 : 2}
        rangeColors={[Primary]}
        color='yellow'
        disabledDates={state.searchType === "Trips" ? disableDate : []}
        minDate={addDays(new Date(), 0)}
        scroll={{ enabled: isMobile ? true : false }}
        ranges={tourDate}
        direction={"vertical"}
      />
    </div>
  );
};

export default SimpleDatePicker;
