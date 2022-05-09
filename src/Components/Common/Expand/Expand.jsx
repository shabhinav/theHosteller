import React, { useState } from "react";
import Expand from "react-expand-animated";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { htmlParserChecker } from "../../../Utils/utils";

function SimpleExpand({ data }) {
  const { heading, content } = data;
  const [toggle, setToggle] = useState(false);
  return (
    <div className=''>
      <main>
        <div
          onClick={() => setToggle(!toggle)}
          className='flex justify-between trip_activity items-center'
        >
          <h5 className='py-4 '>{data?.name || data?.heading}</h5>
          <ExpandMoreIcon />
        </div>
        <Expand open={toggle} duration={1000}>
          {Array.isArray(data?.description) || Array.isArray(data?.content) ? (
            <ul>
              {data?.description?.map((item) => (
                <li>{item}</li>
              ))}
            </ul>
          ) : (
            <p className='my-4'>{htmlParserChecker(data?.content)}</p>
          )}
        </Expand>
      </main>
    </div>
  );
}

export default SimpleExpand;
