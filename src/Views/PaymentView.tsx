import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Meta from "../Components/Common/Meta/Meta";
import Payment from "../Components/Payment/index";

function PaymentView() {
  const data = useSelector((state: any) => state);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  return (
    <div className='2xl:container 2xl:mx-auto'>
      <Meta
        title={"Hosteller Payment Page"}
        description={"Pay and book your hosteller"}
      />
      <Payment />
    </div>
  );
}

export default PaymentView;
