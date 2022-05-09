import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import { colorPallete } from "../../../Resources/theme";
import { useIsAuth, useSucessInvoice } from "../../../Services/datasource";
import SimpleModal from "../../Common/Modal/Modal";
import GuestLogin from "../../GuestLogin/GuestLogin";
import SignIn from "../../SignIn/SignIn";
import Button from "../../Common/Button/Button";
import { eventTracker } from "../../../Utils/utils";
let counter = true;

function Amount() {
  const path = window.location.pathname;
  const { id } = useParams();
  const state = useSelector((state) => state);
  const data = useSelector((state) => state.cart.cart);
  let tripId = sessionStorage.getItem("tripId");
  let bookingId = sessionStorage.getItem("bookingId");
  const sessionId = sessionStorage.getItem("sessionId");
  const triptotalTax = sessionStorage.getItem("triptotalTax");
  const tripPayableAmount = sessionStorage.getItem("tripPayableAmount");
  const location = window.location.href;
  const discountAmount = sessionStorage.getItem("discountAmount");
  const [cartTotal, setCartTotal] = useState(0);
  const [totalTax, setTotalTax] = useState(0);
  const [showSignUp, setShowSignUp] = useState(false);
  const [guestLogin, setGuestLogin] = useState(false);
  const history = useHistory();
  const { loading, error, data: isAuth, refetch } = useIsAuth();
  const [
    onSuccessHandler,
    {
      loading: invoiceLoading,
      error: invoiceError,
      data: invoiceData,
      refetch: invoiceRefetch,
    },
  ] = useSucessInvoice();

  const { Black, Primary } = colorPallete;

  useEffect(() => {
    let total = 0;
    let totalTax = 0;

    if (state) {
      if (state?.search?.searchType !== "Trips") {
        state?.cart?.cart?.map((item) => {
          if (item?.name) {
            total += +item?.price;
            totalTax += +item?.tax;
          }
        });
        setTotalTax(totalTax);
        setCartTotal(total);
      } else {
        setTotalTax(Number(triptotalTax));
        setCartTotal(Number(tripPayableAmount));
      }
    }
  }, [state]);

  useEffect(() => {
    if (counter) {
      (async () => {
        if (path.includes("/orders")) {
          if (state?.search?.searchType === "Trips") {
            onSuccessHandler("", "Download", tripId);
          } else {
            onSuccessHandler(bookingId, "Download", "");
          }
        }
        counter = false;
      })();
    }
  }, [state?.search?.searchType, path, counter]);

  const submitHandler = () => {
    history.push("/payment");
    eventTracker("webengage", "continue", {
      ProductName: state.search?.searchedHostelDetails?.getHostelDetails?.name,
      ProductType: state.search.searchType,
      Price: cartTotal - totalTax,
      Tax: totalTax,
      RoomData: state?.cart?.cartData,
    });
  };

  return (
    <div className='xl:sticky 2xl:sticky  top-24'>
      <div className='bg-primary hostel_price_inner_container '>
        <h6 className='font-semibold '>Price Breakup</h6>
        <div className='flex justify-between py-2 price_container_content'>
          <p>
            {state?.search?.searchType === "Trips"
              ? "Total Price"
              : "Total Room Charges"}
          </p>
          <h6 className='font-semibold '>
            ₹{" "}
            {state?.search?.searchType === "Hostels"
              ? Number(cartTotal - totalTax).toLocaleString("en-IN")
              : state?.search?.searchType === "Trips"
              ? state?.search?.searchDetails?.Search?.searchResults?.amount *
                state?.search?.numOfGuest
              : Number(cartTotal - totalTax).toLocaleString("en-IN")}
          </h6>
        </div>
        <div className='flex justify-between py-1 price_container_content'>
          <p>Total Taxes</p>
          <h6 className='font-semibold '>
            ₹{" "}
            {Number(totalTax) ? totalTax.toFixed(1).toLocaleString("en-IN") : 0}
          </h6>
        </div>
        {discountAmount &&
        discountAmount !== "null" &&
        discountAmount !== "undefined" ? (
          <div className='grid grid-cols-2 mt-2'>
            <p>Discounted Amount</p>
            <p className='font-bold text-right'>
              {(
                Number(cartTotal).toFixed(1) - Number(discountAmount).toFixed(1)
              ).toFixed(1)}
            </p>
          </div>
        ) : (
          ""
        )}
        <div className='flex justify-between py-1 price_container_content'>
          <p className='text-xl font-semibold '>Total Price</p>
          {discountAmount &&
          discountAmount !== "null" &&
          discountAmount !== "undefined" ? (
            <h6 className='text-xl font-semibold '>
              ₹ {Number(discountAmount).toFixed(1).toLocaleString("en-IN")}
            </h6>
          ) : state?.search?.searchType === "Hostels" ? (
            <h6 className='text-xl font-semibold '>
              ₹ {Number(cartTotal).toFixed(1).toLocaleString("en-IN")}
            </h6>
          ) : (
            <h6 className='text-xl font-semibold '>
              ₹ {Number(cartTotal).toFixed(1).toLocaleString("en-IN")}
            </h6>
          )}
        </div>
      </div>

      {path !== "/orders" && (
        <div className=' my-5 xs:text-center sm:ml-2'>
          {!isAuth?.isAuth ? (
            <div className='flex sm:ml-2 xs:flex-col justify-center xs:items-center'>
              <div className='2xl:ml-4 xl:ml-4 xs:mt-4'>
                <Button
                  bgColor={Primary}
                  color={Black}
                  padding={"1.2rem 2rem"}
                  fontWeight={600}
                  borderRadius={6}
                  label='Login to Continue'
                  onClick={() => {
                    eventTracker("webengage", "login_to_continue", {
                      ProductName:
                        state.search?.searchedHostelDetails?.getHostelDetails
                          ?.name,
                      ProductType: state.search.searchType,
                      Price: cartTotal - totalTax,
                      Tax: totalTax,
                      RoomData: state?.cart?.cartData,
                    });
                    setShowSignUp(true);
                  }}
                  width={"220px"}
                />
              </div>{" "}
            </div>
          ) : (
            <Button
              bgColor={Primary}
              color={Black}
              padding={"1.2rem 2rem"}
              fontWeight={600}
              borderRadius={6}
              label='Continue'
              onClick={() => submitHandler()}
              width='200px'
            />
          )}
        </div>
      )}
      <SimpleModal
        open={guestLogin}
        handleOpen={() => setGuestLogin(true)}
        handleClose={() => setGuestLogin(false)}
      >
        <GuestLogin
          refetch={refetch}
          handleClose={() => setGuestLogin(false)}
          showSignIn={() => setShowSignUp(true)}
        />
      </SimpleModal>
      <SimpleModal
        open={showSignUp}
        handleOpen={() => setShowSignUp(true)}
        handleClose={() => setShowSignUp(false)}
      >
        <SignIn
          refetch={refetch}
          handleClose={() => setShowSignUp(false)}
          showGuestLogin={() => setGuestLogin(true)}
        />
      </SimpleModal>
    </div>
  );
}

export default Amount;

// <div className='text-center mt-4'>
//         {path === "/orders" ? (
//           <a
//             href={invoiceData?.getInvoiceOnSuccess?.invoiceUrl}
//             className='mt-6 text-link text-center cursor-pointer text-xl font-semibold'
//             target='_blank'
//             rel='noreferrer'
//             download
//           >
//             Download PDF
//           </a>
//         ) : (
//           ""
//         )}
//       </div>
