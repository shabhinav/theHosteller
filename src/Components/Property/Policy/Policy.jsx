import React from "react";

function Policy({ policy }) {
  return (
    <div id='policies'>
      <h4 className='mt-12  font-bold xs:mx-3'>{policy?.heading}</h4>
      <p>{policy?.textlist}</p>
    </div>
  );
}

export default Policy;
