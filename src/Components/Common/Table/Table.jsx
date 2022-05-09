import React, { useEffect, useState } from "react";
import Dropdown from "../DropDown/Dropdown";
import "./Table.scss";
import Button from "../Button/Button";
import { colorPallete } from "../../../Resources/theme";
import { useDispatch, useSelector } from "react-redux";
import {
  saveCartDataHandler,
  cartDataHandler,
  roomData as roomsData,
} from "../../../Redux/cart/cart.action";
import { useHistory, useParams } from "react-router";
import remove from "../../../Assets/images/remove.png";
import { workationTableData } from "../../../Resources/constants/common";
import { v4 as uuidv4 } from "uuid";
import {
  usePostSearchedData,
  useSearchBySessionId,
} from "../../../Services/datasource";
import { addDays } from "date-fns";
import {
  dateConverter,
  numberalAbbreviations,
  numOfGuest,
  pluralHandler,
  eventTracker,
} from "../../../Utils/utils";
import { searchDetailsHandler } from "../../../Redux/search/search.action";
import SimpleModal from "../Modal/Modal";
import RoomInfo from "../../Property/Modal/Roominfo";
import TableShimmer from "../Shimmer/Shimmer";
import tick from "../../../Assets/Icons/verified.png";
import Toast from "../Toast/Toast";
import placeholder from "../../../Assets/images/placeholder.svg";
import broken from "../../../Assets/images/broken.png";

function Table({ Heading, data, clearCart }) {
  const dispatch = useDispatch();
  const { id } = useParams();
  const sessionId = sessionStorage.getItem("sessionId");
  let isDisabled = false;
  const [
    searchBySessionHandler,
    { loading, error, data: searchData, refetch },
  ] = useSearchBySessionId();
  const state = useSelector((state) => state);
  const history = useHistory();
  const [tableData, setTableData] = useState(
    searchData?.SearchBySession?.searchResults
  );
  const [roomData, setRoomData] = useState([]);
  const [numbOfAdults, setNumberOfAdults] = useState(1);
  const [openToast, setOpenToast] = React.useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [roomInfo, setRoomInfo] = useState({});
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (sessionId) searchBySessionHandler(sessionId);
  }, [sessionId]);

  useEffect(() => {
    let tableDataClone;
    if (searchData?.SearchBySession?.searchResults) {
      tableDataClone = JSON.parse(
        JSON.stringify(searchData?.SearchBySession?.searchResults)
      );
    }
    if (state?.cart?.roomData?.length) {
      state?.cart?.roomData?.map((item) => {
        tableDataClone?.forEach((val) => {
          if (item?.roomUniqueId === val?.roomUniqueId) {
            val.quantity = item.quantity;
          }
        });
      });
    }
    if (tableDataClone?.length) {
      if (state?.search?.searchType === "Hostels") {
        tableDataClone = tableDataClone.sort(
          (a, b) => a?.pricePerNight - b?.pricePerNight
        );
      } else {
        tableDataClone = tableDataClone.sort(
          (a, b) => a?.totalAmount - b?.totalAmount
        );
      }
    }
    if (data?.length && data[0]?.roomAmenities?.length) {
      data?.map((item, upperIndex) => {
        let roomAmenities = [];
        item?.roomAmenities?.map((val, index) => {
          if (index < 8) {
            roomAmenities.push({
              name: val,
              icon: index === 3 || index === 1 ? remove : tick,
            });
          }
        });
        tableDataClone[upperIndex].customRoomAmenities = roomAmenities;
      });
    }
    setTableData(tableDataClone);
    setRoomData(state?.cart?.roomData);
  }, [
    state?.cart?.roomData,
    searchData?.SearchBySession?.searchResults,
    data?.roomAmenities,
  ]);

  // useEffect(() => {
  //   let tableDataClone;
  //   if (state?.search?.searchDetails?.Search?.searchResults) {
  //     tableDataClone = JSON.parse(
  //       JSON.stringify(state?.search?.searchDetails?.Search?.searchResults)
  //     );
  //     if (tableDataClone?.length) {
  //       if (state?.search?.searchType === "Hostels") {
  //         tableDataClone = tableDataClone.sort(
  //           (a, b) => a?.pricePerNight - b?.pricePerNight
  //         );
  //       } else {
  //         tableDataClone = tableDataClone.sort(
  //           (a, b) => a?.totalAmount - b?.totalAmount
  //         );
  //       }
  //     }
  //   }

  //   if (data?.length && data[0]?.roomAmenities?.length) {
  //     data?.map((item, upperIndex) => {
  //       let roomAmenities = [];
  //       item?.roomAmenities?.map((val, index) => {
  //         if (index < 8) {
  //           roomAmenities.push({
  //             name: val,
  //             icon: index === 3 || index === 1 ? remove : tick,
  //           });
  //         }
  //       });
  //       tableDataClone[upperIndex].customRoomAmenities = roomAmenities;
  //     });
  //     setTableData(tableDataClone);
  //   }
  // }, [data?.roomAmenities]);

  // useEffect(() => {
  //   if (error) {
  //     setErrorMsg(error?.message);
  //     setOpenToast(true);
  //   }
  // }, [error]);

  // useEffect(() => {
  //   if (searchData && !error) {
  //     dispatch(searchDetailsHandler(searchData));
  //   }
  // }, [searchData]);

  const disableButton = () => {
    isDisabled = true;
  };

  const AddToCart = (index, item, adults) => {
    let tableDataClone = JSON.parse(JSON.stringify(tableData));
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
    setTableData(JSON.parse(JSON.stringify(tableDataClone)));
    dispatch(cartDataHandler(tableDataClone));
    let rooms = [...roomData];
    if (state.search.searchType === "Hostels") {
      rooms.push({
        name: item.roomName,
        quantity: item.quantity ? item.quantity + 1 : 1,
        price: item?.roomPricWithTax,
        pricePerNight: item?.roomPriceWithoutTax,
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
        pricePerNight: item?.totalAmount,
        meal: item.numMeal,
        image: item.roomMainImage,
        roomUniqueId: item.roomUniqueId,
        tax: item.tax,
        workationId: item.workationId,
        maxAdultOccupancy: item?.maxAdultOccupancy,
        adults: adults,
      });
    }
    dispatch(roomsData(rooms));
    setRoomData(rooms);
    setNumberOfAdults(1);
  };

  useEffect(() => {
    if (clearCart) {
      setRoomData([]);
    }
  }, [clearCart]);

  const submitDataToCartHandler = () => {
    dispatch(saveCartDataHandler(roomData));
    eventTracker("webengage", "review_booking", {
      ProductName: state.search?.searchedHostelDetails?.getHostelDetails?.name,
      ProductType: state.search.searchType,
      Rooms: roomData,
    });
    history.push("/review");
  };

  const removeRoomDataHandler = (index, item) => {
    const tableDataClone = JSON.parse(JSON.stringify(tableData));
    let roomDataClone = JSON.parse(JSON.stringify(roomData));
    roomDataClone.splice(index, 1);
    let removedIndex = tableDataClone.findIndex(
      (rank) => rank.roomName === item.name
    );
    if (removedIndex >= 0) {
      tableDataClone[removedIndex].quantity =
        tableDataClone[removedIndex].quantity - 1;
    }
    let qty = 0;
    roomDataClone = roomDataClone.map((roomData) => {
      if (roomData.name === item.name) {
        qty += 1;
        return { ...roomData, quantity: qty };
      } else {
        return roomData;
      }
    });
    setTableData(JSON.parse(JSON.stringify(tableDataClone)));
    dispatch(cartDataHandler(tableDataClone));
    dispatch(roomsData(roomDataClone));
    setRoomData(roomDataClone);
  };

  const { Primary, Black, Grey } = colorPallete;

  if (error) {
    return (
      <div className='flex flex-col	 items-center my-8 pb-16'>
        <img src={placeholder} alt='' />
        <h5 className='text-center text-danger ml-4'>
          Ohh Sorry! There are no available Rooms for this date. Please choose
          another day Or give us a call for booking: +91 9810187717
        </h5>
      </div>
    );
  }

  return loading ? (
    <div>
      <TableShimmer />
    </div>
  ) : (
    <div i className='table_details'>
      <table>
        <tr className='text-left'>
          {Heading?.map((item) => (
            <th className='text-base' key={uuidv4()}>
              {item}
            </th>
          ))}
        </tr>
        {tableData?.length &&
          tableData?.map((item, index) => (
            <tr key={uuidv4()} className='table_row'>
              <td className='table_room_desc'>
                <div className='table_hostel_rooms_details my-2'>
                  <div>
                    <img
                      className='room_img  rounded-md cursor-pointer'
                      src={item.roomMainImage ? item.roomMainImage : broken}
                      alt='Room Type'
                      onClick={() => {
                        setShow(true);
                        setRoomInfo(item);
                      }}
                    />
                  </div>
                  <div>
                    <h6
                      onClick={() => {
                        setShow(true);
                        setRoomInfo(item);
                      }}
                      className='text-base font-semibold hover:text-soil cursor-pointer leading-snug  mt-2 mb-2 '
                    >
                      {item?.roomName}
                    </h6>
                    <p className='text-danger text-xs font-semibold mb-2'>
                      {item?.roomAvailable}
                      {item?.maxAdultOccupancy > 1
                        ? pluralHandler(item?.roomAvailable, " Room")
                        : pluralHandler(item?.roomAvailable, " Bed")}{" "}
                      available
                    </p>
                  </div>
                </div>
              </td>
              <td className='price_container'>
                <div>
                  {item?.maxAdultOccupancy > 1 ? (
                    <Dropdown
                      handleChange={(e) => {
                        setNumberOfAdults(e.target.value);
                      }}
                      data={numOfGuest(item?.maxAdultOccupancy)}
                      type='outlined'
                      value={numbOfAdults}
                      margin={"0px 8px 8px 0px"}
                      use='payment'
                      isRequired={false}
                      width='160px'
                    />
                  ) : (
                    ""
                  )}

                  <div className='flex items-center mb-4'>
                    <p className='font-bold text-xl	'>
                      <span className='text-lg'>
                        {Number(item?.originalPrice) >
                          Number(item?.pricePerNight) ||
                        Number(item?.originalPrice) >
                          Number(item?.roomPriceWithoutTax) ? (
                          <del>₹ {item?.originalPrice}</del>
                        ) : (
                          ""
                        )}
                      </span>{" "}
                      <span
                        className={`${
                          Number(item?.originalPrice) >
                            Number(item?.pricePerNight) ||
                          Number(item?.originalPrice) >
                            Number(item?.roomPriceWithoutTax)
                            ? "text-danger"
                            : ""
                        }`}
                      >
                        {"₹ "}
                        {state.search.searchType === "Hostels"
                          ? Number(item?.pricePerNight).toLocaleString("en-IN")
                          : Number(item?.roomPriceWithoutTax).toLocaleString(
                              "en-IN"
                            )}
                      </span>
                    </p>
                  </div>
                  <Button
                    bgColor={
                      !(item?.quantity === +item?.roomAvailable)
                        ? Primary
                        : "grey"
                    }
                    color={
                      !(item?.quantity === +item?.roomAvailable) ? Black : Black
                    }
                    padding={"1.2rem 1rem"}
                    fontWeight={800}
                    borderRadius={6}
                    label={
                      item?.maxAdultOccupancy > 1
                        ? `Add ${roomData?.length + 1}${numberalAbbreviations(
                            roomData?.length + 1
                          )} Room `
                        : `Add ${roomData?.length + 1}${numberalAbbreviations(
                            roomData?.length + 1
                          )} Bed `
                    }
                    onClick={() =>
                      !(item?.quantity === +item?.roomAvailable) &&
                      AddToCart(index, item, numbOfAdults)
                    }
                    width='160px'
                  />
                </div>
              </td>
              <td rowspan='100' id={`cart_row_${index}`} className='cart_rows '>
                <div
                  className='review_cart_row '
                  id={`review_cart_row${index}`}
                >
                  {roomData.map((value, index) => (
                    <div className='py-2 cart_data_container' key={uuidv4()}>
                      {value?.name && disableButton(true)}
                      <div className='flex justify-between items-center'>
                        <p className='font-extrabold '>{value?.name}</p>
                        {
                          <img
                            className='close_img'
                            onClick={() => removeRoomDataHandler(index, value)}
                            src={remove}
                            alt='remove'
                          />
                        }
                      </div>
                      <p>{value?.adults + " Adult"}</p>
                      <div className='flex items-center'>
                        <h6
                          className={`font-semibold ${
                            value?.quantity ? "my-2" : ""
                          } `}
                        >
                          {value?.maxAdultOccupancy > 1
                            ? "₹ " +
                              Number(value?.pricePerNight).toLocaleString(
                                "en-IN"
                              )
                            : "₹ " +
                              Number(value?.pricePerNight).toLocaleString(
                                "en-IN"
                              )}
                        </h6>
                        <span className='text-sm ml-1'>
                          <i>+ taxes (where applicable)</i>
                        </span>
                      </div>
                    </div>
                  ))}
                  <div className='mt-3'>
                    <Button
                      bgColor={!roomData?.length ? Grey : Primary}
                      color={Black}
                      padding={"1.2rem 1rem"}
                      fontWeight={800}
                      borderRadius={6}
                      label='Review Booking'
                      isDisable={!roomData?.length}
                      onClick={() => isDisabled && submitDataToCartHandler()}
                      width={"170px"}
                    />
                  </div>
                </div>
              </td>
            </tr>
          ))}
      </table>
      <div className='absolute'>
        <Toast
          handleClose={() => setOpenToast(false)}
          open={openToast}
          severity='error'
          message={errorMsg}
        />
      </div>
      <SimpleModal
        open={show}
        handleOpen={() => setShow(true)}
        handleClose={() => setShow(false)}
      >
        <RoomInfo handleClose={() => setShow(false)} tableData={roomInfo} />
      </SimpleModal>
    </div>
  );
}

export default Table;

// <div>
//   <p
//     onClick={() => setShow(true)}
//     className='text-soil font-bold mt-2 cursor-pointer'
//   >
//     Know More
//   </p>
// </div>;
