import React, { useEffect, useState } from "react";
import share from "../../../Assets/Icons/share.svg";
import { useWindowSize } from "../../../Utils/utils";
import "./style.scss";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { RWebShare } from "react-web-share";
import Toast from "../Toast/Toast";

const Share = ({ url, type, name }) => {
  const [innerWidth] = useWindowSize();
  const [copy, setCopy] = useState(false);


  useEffect(() => {
    setCopy(false);
  }, []);

  const mobile = innerWidth < 640;
  return (
    <>
      {mobile ? (
        <div>
          <RWebShare
            data={{
              text: name,
              url: url,
              // title: data?.getByUrl?.keywords,
            }}
            onClick={() => console.log("shared successfully!")}
          >
            <img className='share' src={share} alt='share' />
          </RWebShare>
        </div>
      ) : (
        <div>
          <CopyToClipboard text={url} onCopy={() => setCopy(true)}>
            <img className='share' src={share} alt='share' />
          </CopyToClipboard>
        </div>
      )}
      <Toast
        handleClose={() => setCopy(false)}
        open={copy}
        severity={"success"}
        message={"Copied link"}
      />
    </>
  );
};

export default Share;
