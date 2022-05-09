import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./MobileCart.scss";
import Button from "../../Common/Button/Button";
import { colorPallete } from "../../../Resources/theme";
import { useHistory } from "react-router";
import { saveCartDataHandler } from "../../../Redux/cart/cart.action";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import CustomDrawer from "../../Common/Drawer/Drawer";
import MobileCartDetails from "./MobileCartDetails";
import { useParams } from "react-router-dom";
import { eventTracker } from "../../../Utils/utils";

function MobileCart() {
  const { id } = useParams();
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalTax, setTotalTax] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [drawer, setDrawer] = useState({
    bottom: false,
  });
  const state= useSelector((state) => state)
  const State = useSelector((state) => state?.cart?.roomData);
  const [roomsData, setRoomsData] = useState(State);
  const dispatch = useDispatch();
  const { Primary, Black } = colorPallete;
  const history = useHistory();

  useEffect(() => {
    setRoomsData(State);
  }, [State]);

  useEffect(() => {
    if (roomsData.length) {
      let total = 0;
      let totalTax = 0;
      let quantity = 0;
      roomsData?.forEach((val) => {
        if (val?.name) {
          total += Number(val.price);
          totalTax += Number(val.tax);
          quantity += Number(val.adults);
        }
      });
      setTotalPrice(total);
      setTotalTax(totalTax);
      setQuantity(quantity);
    } else {
      setTotalPrice(0);
      setTotalTax(0);
      setQuantity(0);
    }
  }, [roomsData, State]);

  const submitDataToCartHandler = () => {
    eventTracker("webengage", "review_booking", {
      ProductName: state.search?.searchedHostelDetails?.getHostelDetails?.name,
      ProductType: state.search.searchType,
      Rooms: roomsData,
    });

    dispatch(saveCartDataHandler(roomsData));
    history.push("/review");
  };

  return (
    <div
      className={`mobile_cart_view z-10 ${
        totalPrice > 0 ? "animate-up" : ""
      } xl:hidden 2xl:hidden`}
    >
      <div className='flex justify-between items-center pt-4'>
        <div>
          <h6 className='font-semibold '>₹ {Number(totalPrice).toFixed(1)}</h6>
          <p className='font-semibold'>
            <i>{"including taxes*"}</i>
          </p>
          <p className='font-semibold'> {quantity} Adult</p>
        </div>
        <div>
          <CustomDrawer
            position={"bottom"}
            state={drawer}
            setState={(val) => setDrawer(val)}
            label={""}
          >
            <MobileCartDetails
              state={roomsData}
              submitDataToCartHandler={submitDataToCartHandler}
              totalPrice={totalPrice}
              setState={(val) => setDrawer(val)}
            />
          </CustomDrawer>
        </div>
        <div className='mr-8'>
          <Button
            bgColor={Primary}
            color={Black}
            padding={"1.4rem 2rem"}
            fontWeight={600}
            borderRadius={50}
            label='Review'
            onClick={() => setDrawer({ ...drawer, bottom: true })}
            width='140px'
          />
        </div>
      </div>
    </div>
  );
}

export default MobileCart;

// <MobileDrawer item={item} setState={(val) => setDrawer(val)} />
