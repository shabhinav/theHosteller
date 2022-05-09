import React from "react";
import CustomTabPanel from "../../../Common/TabPanel/TabPanel";
import "./Cancellation.scss";

const panel = [
  {
    name: "General Policies",
    description: [
      "Visitor (Non-resident guests) timings: 10 AM to 10 PM only. In case the guest wants to meet the visitor, they can do so in our waiting area or common spaces. Note, visitors are not allowed inside any of the rooms, at any time.",
      "Hostel management shall not be held responsible for any loss of luggage or personal belongings. Guests shall make sure not to leave their belongings unattended at all times.",
      "If the guest’s behavior is deemed unfit at the property, at any time during the stay, the hostel management reserves all rights, upon subjective evaluation, to ask the guest to vacate the premises and no refund shall be processed in these circumstances.",
      "Breakfast timings (at all our hostels): 8 AM to 10 AM. However, at times, breakfast timings may change and the same shall be informed prior to all guests staying in our hostels. Also, note, breakfast isn’t included in the room tariffs and is charged on an extra basis at the hostels themselves. ",
      "Drugs/Substance abuse is STRICTLY prohibited at all our hostels. In case anyone is found possessing or consuming drugs during their stay, strict action shall be taken against him/her and the person would be asked to vacate the hostel immediately and would be blacklisted from staying at our hostels forever.",
      "All our hostels have dedicated smoking areas.",
      "All our hostels are CCTV enabled for safety, security, and checks/audits reasons.",
      "Certain policies shall be location, season, or time-specific and shall be communicated exclusively at the time of booking or check-in.",
      "The Hosteller may reach out to the guest for offers, discounts, feedback, and other promotional matters via emails or calls.",
      "Guests shall be liable for any damage except normal wear and tear to hostel assets. Guest shall keep the hostel room in a good condition, maintaining hygiene and cleanliness.",
      "Extra mattresses shall be provided, at an extra cost, at all our hostels.",
      "The guest shall be deemed unfit to continue any further at any of our hostels in case of drug abuse, non-adherence of guest and booking policies, misbehavior (Physical/mental/verbal or in any kind), theft, personal hygiene, vandalism, trespassing, non-payment/delay in payment of dues, other guest inconveniences or any such unwarranted actions. In all such cases, the guest shall be asked to vacate the premises immediately without any refunds.",
      "Power backup is available only at select locations and not at all The Hosteller properties.",
      "All amendments, if informed 7 days prior to the check-in date, shall be eligible for a free amendment. Amendments cannot be done within 7 days of the check-in date. The reservation amendment can only be done once.",
      "The reservations made for hostel stays cannot be shifted from one location to another. If the reservation is eligible for free cancellation, then we'll assist in cancelling the reservation and initiate a refund for the same from our end. The guest can then proceed to make the reservation for the desired location. ",
    ],
  },
  {
    name: "Pet Policies",
    description: [
      "We are a pet-friendly hostel.",
      "With the exception of Mcleodganj Max and Jodhpur, pets are allowed at all hostels provided the guest books a private room. Pets are not allowed inside the dorm rooms.",
      "Care and upkeep of the pet is solely the guest’s responsibility and any damage to property or other’s belongings is to be borne by the guest themselves",
    ],
  },
  {
    name: "Covid Guidelines & Policies",
    description: [
      "We shall accommodate people as per guidelines issued by the state or the central government and all guests are advised to adhere to it strictly.",
      "We advise our guests to do a pre-arrival check-in to ensure contactless service. We shall be sending pre-arrival check-in emails to all guests.",
      "Thermal checks, travel history, Aarogya Setu app download, luggage & footwear sanitization shall be done on arrival.",
      "Our staff is trained specially for post Covid-19 hygiene & cleanliness measures to ensure your safety.",
      "Cleanliness policy: 3 times per day (Clean, sanitize, repeat).",
      "Timings of common spaces, kitchen, common area, etc. may be restricted to ensure 100% cleaning & social distancing measures as per management’s discretion.",
      "Our cafes are also sanitized 3 times a day to ensure servicing our guests with freshly prepared food.",
      "Emergency measures: All our hostels shall have the provision of 1 dedicated emergency isolation room, oxygen supply & doctor on call.",
      "Covid-19 sanitization kits are available at all hostels at an additional cost. It comprises of N95 mask, use & throw items like a mask (blue color), sanitizer sachet, head cap, foot cap, and gloves.",
      "All guests are advised to be 100% compliant with GoI or state guidelines & documentation.",
      "Rights to admission are reserved with the hostel management without any refund liability.",
      "Guests are advised to strictly follow management guidelines & ensure social distancing at all costs.",
    ],
  },
];

const Cancellation = () => {
  return (
    <div className='cancellation_container mt-10'>
      <CustomTabPanel tabPanel={panel} />
    </div>
  );
};

export default Cancellation;
