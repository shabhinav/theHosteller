import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { searchTypeHandler } from "../../../Redux/search/search.action";
import { searchType } from "../../../Resources/constants/Home";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";

function SearchType({ search }) {
  const history = useHistory();
  const pathname = window.location.pathname;
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const [selectedType, setSelectedType] = useState("Hostels");
  const [searchTypeClone, setSearchTypeClone] = useState(searchType);

  const changeSearchType = useCallback(
    (name) => {
      setSelectedType(name);
      search(name);
      dispatch(searchTypeHandler(name));
    },
    [selectedType]
  );

  useEffect(() => {
    if (pathname === "/workations") {
      setSearchTypeClone([{ name: "Workations", url: "/workations" }]);
      setSelectedType("Workations");
      // search("Workations");
    } else if (pathname === "/trips") {
      setSelectedType("Trips");
      setSearchTypeClone([{ name: "Trips", url: "/trips" }]);
      // search("Trips");
    } else if (pathname === "/hostels") {
      setSelectedType("Hostels");
      setSearchTypeClone([{ name: "Hostels", url: "/hostels" }]);
      // search("Hostels");
    }
  }, [pathname]);

  return (
    <div
      className={`${
        pathname === "/trips" ||
        pathname === "/workations" ||
        pathname === "/hostels"
          ? "w-2/12"
          : "w-5/12"
      } bg-black z-10 text-white  searchType_container xs:hidden sm:hidden `}
    >
      <div
        className={`grid grid-cols-${
          pathname === "/trips" ||
          pathname === "/workations" ||
          pathname === "/hostels"
            ? 1
            : 3
        }`}
      >
        {searchTypeClone?.map((item, index) => (
          <div
            className={`text-center font-base font-semibold py-3 ${
              selectedType === item.name ? "bg-primary text-black" : ""
            } ${index === 0 && "first_searchType"} ${
              index === 2 && "last_searchType"
            } ${index === 1 && "middle_searchType"}
              ${pathname === "/trip" && "trips_search_styling"}
            cursor-pointer`}
            onClick={() => {
              changeSearchType(item.name);
              // history.push(item.url);
            }}
          >
            {item.name}
          </div>
        ))}
      </div>
    </div>
  );
}

export default React.memo(SearchType);
