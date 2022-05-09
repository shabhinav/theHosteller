import React, { useState } from "react";
import "./DescriptionLinks.scss";
import { Link } from "react-scroll";
import { links } from "../../../Resources/constants/common";
import { useWindowSize } from "../../../Utils/utils";

function DescriptionLinks() {
  const [innerWidth] = useWindowSize();
  const isMobile = innerWidth < 650;

  const [selectedLink, setSelectedLink] = useState("Overview");

  return (
    <div className='DescriptionLinks sm:hidden md:hidden lg:hidden'>
      <div className=' flex overflow-auto py-3'>
        {links.map((item) => (
          <div
            className='xs:min-w-max	;
          '
          >
            <p
              onClick={() => setSelectedLink(item.name)}
              className={`mx-3 text-black xs:text-sm xs:w-auto font-extrabold  text-lg cursor-pointer`}
            >
              <Link
                activeClass='active_link'
                onClick={() => setSelectedLink(item.name)}
                offset={isMobile ? item?.mobileScrollOffset : item.scrollOffset}
                to={item.href}
                spy={true}
                smooth={true}
              >
                {item.name}
              </Link>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DescriptionLinks;
