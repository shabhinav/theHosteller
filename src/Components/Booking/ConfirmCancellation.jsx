import { Grid } from "@material-ui/core";
import React from "react";
import { colorPallete } from "../../Resources/theme";
import Button from "../Common/Button/Button";
import close from "../../Assets/Icons/x.png";
import "./Booking.scss";

function ConfirmCancellation({
  handleClose,
  cancel,
  id,
  item,
  checkInDate,
  checkOutDate,
  bookingType,
}) {
  const { Black, Primary } = colorPallete;

  return (
    <div className='booking_container'>
      <div className='p-4'>
        <div className='flex justify-between items-center pb-4'>
          <h4>Cancel Booking</h4>
          <img
            className='cursor-pointer'
            onClick={handleClose}
            src={close}
            alt='Close'
          />
        </div>
        <div>
          <p>
            To amend or cancel your existing booking, email us on
            <a
              href={`mailto:booking@thehosteller.com`}
              target='_blank'
              rel='noreferrer'
            >
              booking@thehosteller.com
            </a>
            {" "}and our Reservation Team will resolve this for you. To check our
            Cancellation Policies, please click here.
          </p>
        </div>
        <div className='mt-4 text-center'>
          <Button
            bgColor={Primary}
            color={Black}
            padding={"1.2rem 2rem"}
            fontWeight={800}
            borderRadius={6}
            label={"Ok"}
            onClick={() => {
              handleClose();
            }}
            width={"100px"}
          />
        </div>
      </div>
    </div>
  );
}

export default ConfirmCancellation;

// <Grid container>
//   <Grid item xl={9} xs={9}>
//     <div className='p-4'>
//       <div className='canceledBookingContainer'>
//         <h4 className='pb-4'>Cancel Booking</h4>
//       </div>
//       <div className='mt-4 canceledBookingContainer'>
//         <p>{item?.hostelName}</p>
//         <div className='flex'>
//           <div className='my-5 xs:mx-0 xs:mr-5 mr-10 ml-4  text-right check_in_container pr-8 lg:pr-8 2xl:pr-8	'>
//             <h6 className='font-extrabold  text-xs xs:text-left'>
//               Check-In
//             </h6>
//             <h5 className='font-extrabold  my-2 text-lg xs:text-left xs:text-base'>
//               {checkInDate}
//             </h5>
//             <h6 className='text-soil  xs:text-left'>
//               Check In  1:00 PM
//             </h6>
//           </div>
//           <div className='interSection my-6 relative'>
//             <div
//               className={`absolute  ${
//                 item?.numberOfNights.length > 1
//                   ? "num_nights_double_heading"
//                   : "num_nights_heading"
//               }`}
//             >
//               {item?.numberOfNights + " Nights"}
//             </div>
//           </div>{" "}
//           <div className='my-5 xs:ml-5 xl:mx-10  pl-8 lg:pl-8 2xl:pl-16	'>
//             <h6 className='font-extrabold  text-xs'>Check-Out</h6>
//             <h5 className='font-extrabold  my-2 text-lg xs:text-base'>
//               {checkOutDate}
//             </h5>
//             <h6 className='text-soil '> Check Out 11:00 AM</h6>
//           </div>
//         </div>
//       </div>
//       <div className='mt-4'>
//         <div className='mr-2 text-right'>
//           <Button
//             bgColor={Primary}
//             color={Black}
//             padding={"1.2rem 2rem"}
//             fontWeight={800}
//             borderRadius={6}
//             label={"Cancel Booking"}
//             onClick={() => {
//               bookingType === "TRIP" ? cancel("", id) : cancel(id, "");

//               handleClose();
//             }}
//             width={"200px"}
//           />
//         </div>
//       </div>
//     </div>
//   </Grid>
//   <Grid item xl={3} xs={3}>
//     <div className='bg-primary h-full px-3'>
//       <div className='text-right pt-2'>
//         <img
//           className='cursor-pointer'
//           onClick={handleClose}
//           src={close}
//           alt='Close'
//         />
//       </div>
//       <div>
//         <h6 className='font-bold'>Note</h6>
//         <p className='text-xs'>
//           Lorem ipsum dolor sit amet, consectetur adipiscing elit.
//           Phasellus aliquet nibh id iaculis pharetra. Maecenas at leo non
//           ligula congue cursus. Integer rhoncus urna tellus, fermentum
//         </p>
//       </div>
//     </div>
//   </Grid>
// </Grid>
