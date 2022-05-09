import React, { useEffect, useState } from "react";
import "./Cancellation.scss";

const hostel_policy = [
  "Any and all cancellation requests are attended to by the central reservations team. To cancel your booking, kindly write to them at booking@thehosteller.com. Please make sure to mention your reservation ID and all relevant details in the same e-mail.",
  "All cancellations, if informed 7 days prior to the check-in date, shall be eligible for a 100% refund. In case cancellations happen within 7 days of the check-in date, there wouldn’t be ANY refund and will attract 100% cancellation charges. If the guest doesn’t show up they will be charged the total price of the reservation. Reservations made within the cancellation period are not eligible for any refund against cancellation anytime before the arrival date.",
  "The reservations made at the hostel are non-transferable. Therefore, it is mandatory for the guest in whose name the booking has been made to show up.",
  "For all communications related to cancellations, write to us on booking@thehosteller.com with details such as Booking ID and Guest name.",
];

const workation_policy = [
  "All workation cancellations if informed 10 days prior to the check-in date, shall be eligible for a refund to the source account of booking. Cancellations informed 7 days prior to the check-in date will be eligible for a refund in the amount of The Hosteller Credits. These credits can be used at any of The Hosteller properties and up to 12 months from the cancellation date.",
  "To cancel/reschedule, kindly write to us at booking@thehosteller.com.",
];

const trip_policy = [
  "All trip cancellations, if informed 15 days prior to the departure or check-in date, shall be eligible for a 100% refund in the form of TH credits with lifetime validity. In case any trip cancellations happen within 15 days of departure or check-in date, there wouldn’t be ANY refund and will attract 100% cancellation charges.",
  "To cancel/reschedule, kindly write to us at outdoor@thehosteller.com.",
];

function Cancellations({ checkOutDate: date, hostelDetails }) {
  const [checkOutDate, setCheckOutDate] = useState("");
  const [policy, setPolicy] = useState([]);

  useEffect(() => {
    if (hostelDetails?.searchType === "Hostels") {
      setPolicy(hostel_policy);
    } else if (hostelDetails?.searchType === "Workations") {
      setPolicy(workation_policy);
    } else {
      setPolicy(trip_policy);
    }
  }, [hostelDetails]);

  useEffect(() => {
    if (date) {
      let checkInDate = date.split("-");
      checkInDate[2] = +checkInDate[2] - 1;
      setCheckOutDate(checkInDate.join("-"));
    }
  }, [date]);

  return (
    <div className='cancellation_container'>
      <h6 className='font-semibold text-base '>Cancellation Policy </h6>
      <ul className='pl-5'>
        {policy?.map((item) => (
          <li className='text-tiny'>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default Cancellations;
