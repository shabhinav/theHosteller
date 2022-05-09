import React from "react";
import { useWindowSize } from "../../../../Utils/utils";
import Table from "../../../Common/Table/Table";

const Heading = ["ROOM TYPE", "PRICE/NIGHT (+ taxes)", "CART"];

function RoomDetails({ data, clearCart }) {
  const [innerWidth] = useWindowSize();
  const isMobile = innerWidth < 650;
  return (
    <div id={isMobile ? "" : "room"} className='xs:hidden sm:hidden xs:mx-3'>
      <h4  className='pt-9 pb-10 text-black font-bold'>
        Rooms and Prices
      </h4>
      <div>
        <Table clearCart={clearCart} Heading={Heading} data={data} />
      </div>
    </div>
  );
}

export default RoomDetails;
