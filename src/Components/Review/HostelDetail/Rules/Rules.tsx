import React from "react";
import "./Rules.scss";

const checkin_policy = [
  "Check-in time: 1 PM IST (Check-in are allowed only till 11 PM) and Check-Out time: 11 AM IST",
  "It is mandatory for every guest to present a GoI approved valid Photo ID at the time of check-in. Valid IDs are Passport, Aadhar, Driving license, and Voter card. Every foreign guest at all our hostels must carry and present their passport and a valid visa (in originals) during the time of check-in. Every Pakistani guest at all our hostels must carry and present during the time of check-in: an additional residence permit letter from the Indian High Commission in Islamabad along with the passport and valid visa in originals",
  "In case the guest arrives earlier than the check-in time, they can hang out in the common area till the bed/room is ready. However, if the guests are arriving as early as 6 AM, it is highly recommended to book a bed for the previous night to ensure a good night’s sleep",
  "Check-Out time at all our hostels is up to 11 AM. Late check-out can be available on prior request and is subject to availability. The guests, however, can wait at the common areas until the time of departure",
  "The Hosteller, a chain of backpacker hostels, is well suited for young backpacking travellers. As a brand, we do not recommend families and all those below 18 years of age to stay with us.",
  "100% payment is a MUST at the time of check-in.",
  "Local IDs are allowed",
  "Right to ADMISSION is reserved",
];

function Rules() {
  return (
    <div className='p-3 rules_container'>
      <div className='flex justify-between items-center'>
        <p className='font-bold text-base'>
          Important Information for Check-in
        </p>
        {/* <p className="font-bold text-tiny">View All Rules</p> */}
      </div>
      <div className='rules'>
        <ul className='pl-5'>
          {checkin_policy?.map((item) => (
            <li className='text-tiny'>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Rules;
