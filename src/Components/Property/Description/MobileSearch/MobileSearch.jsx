import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { Months } from "../../../../Resources/constants/common";
import "./MobileSearch.scss";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Collapse from "@material-ui/core/Collapse";
import CardContent from "@material-ui/core/CardContent";
import Search from "../../../Search/Search";
import { addDays } from "date-fns";
import {
  dateConverter,
  dateDiff,
  pluralHandler,
} from "../../../../Utils/utils";
import {
  checkInDateHandler,
  checkOutDateHandler,
} from "../../../../Redux/search/search.action";

function MobileSearch() {
  const pathname = window.location.pathname;
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const [checkInDate, setCheckInDate] = useState(state.search?.checkInDate);
  const [checkOutDate, setCheckOutDate] = useState(state.search?.checkOutDate);
  const [numOfNights, setNumOfNights] = useState(0);
  const [expanded, setExpanded] = React.useState(false);
  const [initialCheckInDate, setInitialCheckInDate] = useState(new Date());
  const [initialCheckOutDate, setInitialCheckOutDate] = useState(
    addDays(new Date(), 1)
  );

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    let checkinDate = state?.search?.checkInDate?.split("-");
    let checkInDate = moment(checkinDate.join(","));
    checkinDate[1] = Months[Number(checkinDate[1] - 1)];
    checkinDate[0] = "";
    checkinDate = checkinDate.reverse().join(" ");
    setCheckInDate(checkinDate);

    if (state?.search?.checkOutDate) {
      let checkoutDate = state?.search?.checkOutDate?.split("-");
      let checkOutDate = moment(checkoutDate.join(","));
      checkoutDate[1] = Months[Number(checkoutDate[1] - 1)];
      checkoutDate[0] = " ";
      checkoutDate = checkoutDate.reverse().join(" ");
      setCheckOutDate(checkoutDate);

      let dateDifference = dateDiff(
        state?.search?.checkInDate,
        state?.search?.checkOutDate
      );
      setNumOfNights(dateDifference);
    }
  }, [state?.search]);


  return (
    <div className='mobile_search_container mt-4 mx-2'>
      <div
        className={`flex ${
          state?.search?.checkOutDate ? "justify-between" : "justify-end"
        } px-3 items-center text-link`}
      >
        {state?.search?.checkOutDate ? (
          <div className='font-semibold flex items-center text-link'>
            {checkInDate} - {checkOutDate}
            <ul className='p-0 pl-6'>
              <li>{numOfNights + pluralHandler(numOfNights, " Night")} </li>
            </ul>
          </div>
        ) : (
          ""
        )}
        <div
          onClick={handleExpandClick}
          className='flex items-center font-semibold text-link'
        >
          {pathname === "/" ? "BOOK NOW" : "Modify"} <ExpandMoreIcon />
        </div>
      </div>
      <div>
        <Collapse in={expanded} timeout='auto' unmountOnExit>
          <CardContent>
            <Search
              boxShadow={"0"}
              borderRadius={"0"}
              zIndex={"0"}
              backgroundColor={"0"}
              marginTop={"0"}
              type=''
              buttonText='Search'
              isLabel={null}
              variant=''
              search={state?.search?.searchType}
              initialCheckInDate={initialCheckInDate}
              initialCheckOutDate={initialCheckOutDate}
            />
          </CardContent>
        </Collapse>
      </div>
    </div>
  );
}

export default MobileSearch;
