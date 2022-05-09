import React from "react";

function Cancellation({ tripData }) {
  return (
    <div className='mt-12'>
      <div className='xs:bg-white xs:p-4'>
        <p className='text-center text-base'>
          To see our trip policies{" "}
          <a
            target='_blank'
            href={`${process.env.REACT_APP_FRONTEND_URL}/policies`}
          >
            <span className='text-link font-bold'>click here</span>
          </a>
        </p>

        <h4>{tripData?.getTrip?.cancellationPolicy?.heading}</h4>
        <ul>
          {tripData?.getTrip?.cancellationPolicy?.textlist?.map((policy) => (
            <li className='mt-2 text-sm text-blogPara'>{policy}</li>
          ))}
        </ul>
      </div>
      <div className='xs:bg-white xs:p-4'>
        <h4>{tripData?.getTrip?.guestPolicy?.heading}</h4>
        <ul>
          {tripData?.getTrip?.guestPolicy?.textlist?.map((policy) => (
            <li className='mt-2 text-sm text-blogPara'>{policy}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Cancellation;
