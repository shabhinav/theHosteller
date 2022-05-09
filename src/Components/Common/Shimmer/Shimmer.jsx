import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import React from "react";

function TableShimmer() {
  return (
    <div>
      <div className='flex mb-1'>
        <div className='mr-1'>
          <Skeleton height={350} width={350} />
        </div>
        <div className='mr-1'>
          <Skeleton height={350} width={350} />
        </div>
        <div className='mr-1'>
          <Skeleton height={350} width={350} />
        </div>
      </div>
      <div className='flex mb-1'>
        <div className='mr-1'>
          <Skeleton height={350} width={350} />
        </div>
        <div className='mr-1'>
          <Skeleton height={350} width={350} />
        </div>
        <div className='mr-1'>
          <Skeleton height={350} width={350} />
        </div>
      </div>
    </div>
  );
}

export default TableShimmer;

export function CardShimmer() {
  return (
    <div>
      <div>
        <div className='mt-2'>
          <Skeleton height={350} width={"100%"} />
        </div>
        <div className='mt-2'>
          <Skeleton height={350} width={"100%"} />
        </div>
        <div className='mt-2'>
          <Skeleton height={350} width={"100%"} />
        </div>
      </div>
    </div>
  );
}
