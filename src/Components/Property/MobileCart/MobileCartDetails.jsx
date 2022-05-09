import { Grid } from "@material-ui/core";
import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import "./MobileCart.scss";
import Button from "../../Common/Button/Button";
import { colorPallete } from "../../../Resources/theme";
import { cartDataHandler, roomData } from "../../../Redux/cart/cart.action";
import { useDispatch, useSelector } from "react-redux";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { useParams } from "react-router-dom";

function MobileCartDetails({
  state,
  submitDataToCartHandler,
  totalPrice,
  setState,
}) {
  const { Primary, Black } = colorPallete;
  const cartData = useSelector((state) => state);
  const dispatch = useDispatch();
  const { id } = useParams();
  
  const removeRoomDataHandler = (index, item) => {
    let roomDataClone = JSON.parse(JSON.stringify(state));
    const cartDataClone = JSON.parse(JSON.stringify(cartData?.cart?.cartData));
    let removedIndex = cartDataClone.findIndex(
      (rank) => rank.roomName === item.name
    );
    if (removedIndex >= 0) {
      cartDataClone[removedIndex].quantity =
        cartDataClone[removedIndex].quantity - 1;
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
    dispatch(cartDataHandler(cartDataClone));
    roomDataClone.splice(index, 1);
    dispatch(roomData(roomDataClone));
    if (roomDataClone.length === 0) {
      setState({ right: false });
    }
  };

  return (
    <div>
      <header className='p-4 mobile_drawer_header flex items-center mb-3'>
        <ArrowBackIcon
          className='mr-2'
          onClick={() => setState({ right: false })}
        />
        <h5>Details</h5>
      </header>
      <Grid container>
        {state.map((item, index) => (
          <Grid xs={12}>
            <div className='p-4'>
              <Grid container>
                <Grid xs={4}>
                  <img
                    alt='user cart'
                    className='w-full mobile_cart_img'
                    src={item?.image}
                  />
                </Grid>
                <Grid xs={7}>
                  <div className='ml-3'>
                    <h5>{item?.name}</h5>
                    <p className='mt-2'>₹ {item?.price}</p>
                  </div>
                </Grid>
                <Grid xs={1}>
                  <div className='h-full flex items-center '>
                    <DeleteIcon
                      onClick={() => removeRoomDataHandler(index, item)}
                    />
                  </div>
                </Grid>
              </Grid>
            </div>
          </Grid>
        ))}
        <div className='mx-3 mb-4 review_details_container pt-3 w-full'>
          <Grid container>
            <Grid xs={6}>
              <p className='text-center font-semibold'>Total Price</p>
              <p className='text-center'>₹ {Number(totalPrice).toFixed(1)}</p>
            </Grid>
            <Grid xs={6}>
              <Button
                bgColor={Primary}
                color={Black}
                padding={"1.3rem 2rem"}
                fontWeight={600}
                borderRadius={6}
                label='Review'
                width='100%'
                onClick={submitDataToCartHandler}
              />
            </Grid>
          </Grid>
        </div>
      </Grid>
    </div>
  );
}

export default MobileCartDetails;
