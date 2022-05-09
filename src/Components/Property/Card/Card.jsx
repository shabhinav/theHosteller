import React, { useState, useEffect } from "react";
import "./Card.scss";
import Card from "../../Common/Card/Card";
import Button from "../../Common/Button/Button";
import { colorPallete } from "../../../Resources/theme";
import Grid from "@material-ui/core/Grid";
import { useDispatch } from "react-redux";
import { cartDataHandler, roomData } from "../../../Redux/cart/cart.action";
import RoomServiceOutlinedIcon from "@material-ui/icons/RoomServiceOutlined";
import CustomDrawer from "../../Common/Drawer/Drawer";
import MobileDrawer from "../MobileModal/MobileDrawer";
import { useSelector } from "react-redux";
import Dropdown from "../../Common/DropDown/Dropdown";
import placeholder from "../../../Assets/images/placeholder.svg";
import {
  numberalAbbreviations,
  numOfGuest,
  pluralHandler,
  useWindowSize,
} from "../../../Utils/utils";
import { useSearchBySessionId } from "../../../Services/datasource";
import { CardShimmer } from "../../Common/Shimmer/Shimmer";

function PropertyCard({ data, clearCart }) {
  const [innerWidth] = useWindowSize();
  const isMobile = innerWidth < 650;
  const dispatch = useDispatch();
  const sessionId = sessionStorage.getItem("sessionId");

  const [
    searchBySessionHandler,
    { loading, error, data: searchData, refetch },
  ] = useSearchBySessionId();
  const { Primary, Black } = colorPallete;
  const state = useSelector((state) => state);
  const [cardData, setCardData] = useState(
    searchData?.SearchBySession?.searchResults
  );
  const [numbOfAdults, setNumberOfAdults] = useState(1);
  const [roomsData, setRoomsData] = useState(state?.cart?.roomData);
  const [drawer, setDrawer] = useState({
    bottom: false,
  });

  useEffect(() => {
    if (sessionId) searchBySessionHandler(sessionId);
  }, [sessionId]);

  useEffect(() => {
    if (searchData?.SearchBySession?.searchResults?.length) {
      setCardData(searchData?.SearchBySession?.searchResults);
    }
  }, [searchData?.SearchBySession?.searchResults]);

  useEffect(() => {
    let tableDataClone;
    if (cardData?.length) {
      tableDataClone = JSON.parse(JSON.stringify(cardData));
    }
    if (state?.cart?.roomData?.length) {
      state?.cart?.roomData?.map((item) => {
        tableDataClone?.forEach((val) => {
          if (item?.roomUniqueId === val?.roomUniqueId) {
            val.quantity = item.quantity;
          }
        });
      });
      setCardData(tableDataClone);
    }
    setRoomsData(state?.cart?.roomData);
  }, [state?.cart?.roomData]);

  const AddToCart = (index, item, adults) => {
    let tableDataClone = JSON.parse(JSON.stringify(cardData));
    if (
      tableDataClone[index]?.quantity &&
      tableDataClone[index]?.quantity ===
        Number(tableDataClone[index]?.roomAvailable)
    ) {
      tableDataClone[index].quantity = Number(
        tableDataClone[index]?.roomAvailable
      );
    } else if (tableDataClone[index]?.quantity) {
      tableDataClone[index].quantity += 1;
    } else {
      tableDataClone[index].quantity = 1;
    }
    setCardData(JSON.parse(JSON.stringify(tableDataClone)));
    dispatch(cartDataHandler(tableDataClone));
    let rooms = [...roomsData];
    if (state.search.searchType === "Hostels") {
      rooms.push({
        name: item.roomName,
        quantity: item.quantity ? item.quantity + 1 : 1,
        price: item?.roomPricWithTax,
        meal: item.numMeal,
        image: item.roomMainImage,
        roomUniqueId: item.roomUniqueId,
        tax: item.tax,
        maxAdultOccupancy: item?.maxAdultOccupancy,
        adults: adults,
      });
    } else if (state.search.searchType === "Workations") {
      rooms.push({
        name: item.roomName,
        quantity: item.quantity ? item.quantity + 1 : 1,
        price: item?.totalAmount,
        meal: item.numMeal,
        image: item.roomMainImage,
        roomUniqueId: item.roomUniqueId,
        tax: item.tax,
        workationId: item.workationId,
        maxAdultOccupancy: item?.maxAdultOccupancy,
        adults: adults,
      });
    }
    setRoomsData(rooms);
    setNumberOfAdults(1);
    dispatch(roomData(rooms));
  };

  if (error) {
    return (
      <div className='flex xs:flex-col items-center my-8 pb-16 xl:hidden md:hidden lg:hidden 2xl:hidden'>
        <img src={placeholder} alt='' />
        <h5 className='text-center text-danger ml-4 xs:mt-6'>
          Ohh Sorry! There are no available Rooms for this date. Please choose
          another day Or give us a call for booking: +91 9810187717
        </h5>
      </div>
    );
  }

  if(loading){
    return <CardShimmer />
  }

  return (
    <div
      id={`${isMobile ? "room" : ""}`}
      className='xl:hidden md:hidden lg:hidden 2xl:hidden'
    >
      <h4 className='py-2 ml-4 text-black font-bold'>Rooms and Prices</h4>
      {cardData?.length &&
        cardData?.map((item, index) => (
          <div className='mt-6'>
            <Card>
              <div className='p-1'>
                <Grid container>
                  <Grid item xs={12}>
                    <div>
                      <img
                        className='w-full h-full property_card'
                        src={item?.roomMainImage}
                        alt='room type'
                      />
                    </div>
                    <div className='mx-2 mt-2'>
                      <h6 className='font-semibold mt-2 text-xl '>
                        {item?.roomTypeName}
                      </h6>
                      <p className='mt-3 text-author'>
                        Room Capacity: {item?.baseAdultOccupancy}{" "}
                        {pluralHandler(item?.baseAdultOccupancy, "Adult")} |{" "}
                        {item?.baseChildOccupancy} Children
                      </p>
                      <p className='text-author'>
                        Room Rates Includes All Taxes
                      </p>
                      <div className='pt-4 pb-2 card_price_details'>
                        <span className='text-lg block'>
                          {Number(item?.originalPrice) >
                          Number(item?.pricePerNight) ? (
                            <del>₹ {item?.originalPrice}</del>
                          ) : (
                            ""
                          )}
                        </span>{" "}
                        <p className='font-bold text-xl  flex justify-center items-center'>
                          <span
                            className={`${
                              Number(item?.originalPrice) >
                              Number(item?.pricePerNight)
                                ? "text-danger"
                                : ""
                            }`}
                          >
                            ₹{" "}
                            {state.search.searchType === "Workations"
                              ? item?.totalAmount
                              : item?.pricePerNight}
                          </span>{" "}
                          {state.search.searchType !== "Workations" ? (
                            <span className='text-sm font-thin ml-1'>
                              <i>(Price Per Night)</i>
                            </span>
                          ) : (
                            ""
                          )}
                        </p>
                      </div>
                      <div className='grid grid-cols-2 card_price_info py-2'>
                        <p className='text-center font-semibold text-link flex items-center mobile_room_info'>
                          <RoomServiceOutlinedIcon className='mr-2' />
                          <CustomDrawer
                            position={"bottom"}
                            state={drawer}
                            setState={(val) => setDrawer(val)}
                            label={"Room Info"}
                          >
                            <MobileDrawer
                              item={item}
                              setState={(val) => setDrawer(val)}
                            />
                          </CustomDrawer>
                        </p>
                        <p className='text-center font-semibold text-danger'>
                          {item?.roomAvailable}{" "}
                          {item?.maxAdultOccupancy > 1
                            ? pluralHandler(item?.roomAvailable, "Room")
                            : pluralHandler(item?.roomAvailable, "Bed")}{" "}
                          Left
                        </p>
                      </div>
                      <div>
                        {item?.maxAdultOccupancy > 1 ? (
                          <Dropdown
                            handleChange={(e) => {
                              setNumberOfAdults(e.target.value);
                            }}
                            data={numOfGuest(item?.maxAdultOccupancy)}
                            type='outlined'
                            value={numbOfAdults}
                            margin={""}
                            use='payment'
                            isRequired={false}
                            width='95%'
                          />
                        ) : (
                          ""
                        )}
                      </div>
                      <div className='mb-3 mt-1'>
                        <Button
                          bgColor={
                            !(item?.quantity === +item?.roomAvailable)
                              ? Primary
                              : "grey"
                          }
                          color={
                            !(item?.quantity === +item?.roomAvailable)
                              ? Black
                              : Black
                          }
                          padding={"1.2rem 1rem"}
                          fontWeight={600}
                          borderRadius={100}
                          label={`Add ${
                            roomsData.length + 1
                          }${numberalAbbreviations(roomsData?.length + 1)} ${
                            item?.maxAdultOccupancy > 1 ? "Room" : "Bed"
                          }`}
                          onClick={() =>
                            !(item?.quantity === +item?.roomAvailable) &&
                            AddToCart(index, item, numbOfAdults)
                          }
                          width='100%'
                        />
                      </div>
                    </div>
                  </Grid>
                </Grid>
              </div>
            </Card>
          </div>
        ))}
    </div>
  );
}

export default PropertyCard;
