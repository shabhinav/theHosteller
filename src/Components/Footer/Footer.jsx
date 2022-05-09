import React from "react";
import {
  footerHeadingArray,
  footerLinks,
  tel_Number,
} from "../../Resources/constants/footer";
import { colorPallete } from "../../Resources/theme";
import logo from "../../Assets/images/logo.png";
import youtube from "../../Assets/Icons/youtube.png";
import facebook from "../../Assets/Icons/facebook.png";
import linkedIn from "../../Assets/Icons/linkedIn.png";
import instagram from "../../Assets/Icons/instagram.png";
import twitter from "../../Assets/Icons/twitter.png";
import "./Footer.scss";
import { NavLink } from "react-router-dom";
import { useCreateNewsLetter } from "../../Services/datasource";
import Button from "../Common/Button/Button";
import SimpleModal from "../Common/Modal/Modal";
import GroupModalForms from "./GroupModalForms";
import { useSelector, useDispatch } from "react-redux";
import { groupBookingHandler } from "../../Redux/search/search.action";
import Toast from "../Common/Toast/Toast";
import { emailHandler } from "../../Utils/utils";

const socialMedia = [
  {
    0: youtube,
    name: "youtube",
    url: "https://www.youtube.com/channel/UCt2wLLGyDNtUGvQBI20hk1g",
  },
  {
    1: facebook,
    name: "facebook",
    url: "https://www.facebook.com/TheHosteller",
  },
  {
    2: linkedIn,
    name: "linkedIn",
    url: "https://www.linkedin.com/company/the-hosteller-hospitality",
  },
  {
    3: instagram,
    name: "instagram",
    url: "https://www.instagram.com/thehosteller",
  },
  { 4: twitter, name: "twitter", url: "https://www.twitter.com/thehosteller" },
];

function Footer() {
  const [email, setEmail] = React.useState("");
  const state = useSelector((state) => state);
  const [createLetterHandler, { data, error }] = useCreateNewsLetter();
  const [grpDetails, setGrpDetails] = React.useState(false);
  const dispatch = useDispatch();
  const [toolbar, setToolbar] = React.useState("");
  const [msg, setMsg] = React.useState("");
  const [isError, setIsError] = React.useState(false);

  const { Black, Primary } = colorPallete;

  React.useEffect(() => {
    if (data?.createNewsletter) {
      setIsError(false);
      setToolbar(true);
      setMsg("Successfully Registered");
      setEmail("");
    }
    if (error) {
      setMsg(error.message);
    }
  }, [data]);

  const submitHandler = () => {
    let isValid = emailHandler(email);
    if (isValid) {
      createLetterHandler(email);
    } else {
      setIsError(true);
      setToolbar(true);
      setMsg("Please enter valid email");
      setTimeout(() => {
        setToolbar(false);
        setIsError(false);
      }, 2000);
    }
  };

  return (
    <div className='bottom-0'>
      <div className='bg-jetBlack border-dotted border-4 border-red-500 mt-20 py-2 px-2'>
        <div className='2xl:container 2xl:mx-auto flex justify-between items-center xs:flex-col	'>
          <img src={logo} alt={logo} />
          <div className='xs:pt-2'>
            <input
              placeholder='hosteller@newsletter.com'
              className='emailInput'
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button
              bgColor={Primary}
              color={Black}
              padding={"1.2rem 1rem"}
              fontWeight={800}
              borderRadius={6}
              label='Subscribe'
              onClick={() => submitHandler()}
              width={"100px"}
            />
          </div>
        </div>
      </div>
      <div className='bg-jetBlack py-3 main_footer_links_container'>
        <div className='2xl:container 2xl:mx-auto'>
          <div className=' flex justify-between  px-3 py-2 xs:grid grid-cols-2 gap-4 view_container'>
            {footerHeadingArray.map((name) => (
              <div className='text-white '>
                <h6 className='font-bold mb-3 text-primary '>{name}</h6>
                {footerLinks[name].map((footerLinks, index) =>
                  footerLinks.name === "Group Booking" ? (
                    <p
                      onClick={
                        footerLinks?.name === "Group Booking"
                          ? () => dispatch(groupBookingHandler(true))
                          : ""
                      }
                      key={index}
                      className='xs:text-xs mt-1 cursor-pointer'
                    >
                      {footerLinks.name}
                    </p>
                  ) : footerLinks.type === "tel" ? (
                    <a
                      className='xs:text-xs mt-1 text-sm text-white'
                      href={`tel:${tel_Number}`}
                    >
                      {footerLinks.name}
                    </a>
                  ) : footerLinks.type === "link" ? (
                    <a
                      href={`mailto:${footerLinks.name}`}
                      target='_blank'
                      rel='noreferrer'
                      key={index}
                      className='xs:text-xs mt-1 text-sm text-white'
                    >
                      {footerLinks.name}
                    </a>
                  ) : (
                    <p
                      onClick={
                        footerLinks?.name === "Group Booking"
                          ? () => dispatch(groupBookingHandler(true))
                          : ""
                      }
                      key={index}
                      className='xs:text-xs mt-1'
                    >

                      <a
                        className='text-white'
                        target='_blank'
                        href={
                          process.env.REACT_APP_FRONTEND_URL + footerLinks.url
                        }
                      >
                        {footerLinks.name}
                      </a>
                    </p>
                  )
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className='bg-jetBlack text-white py-3 px-2'>
        <div className='2xl:container 2xl:mx-auto'>
          <div className='view_container flex justify-between items-center xs:block  xs:center'>
            <p className='xs:text-center pb-4'>
              The Hosteller Hospitality Private Limited © 2020 All Rights
              Reserved
            </p>
            <p></p>
            <div className='xs:flex xs:justify-center pb-4'>
              {socialMedia.map((item, index) => (
                <a href={item?.url} target='_blank' rel='noreferrer'>
                  <img
                    key='index'
                    className='ml-4 socialIcons'
                    src={item[index]}
                    alt={item.name}
                  />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
      <SimpleModal
        open={state?.search?.grpBooking}
        handleOpen={() => dispatch(groupBookingHandler(true))}
        handleClos={() => dispatch(groupBookingHandler(false))}
      >
        <GroupModalForms setGrpDetails={setGrpDetails} />
      </SimpleModal>
      <div className='absolute'>
        <Toast
          handleClose={() => setToolbar(false)}
          open={toolbar}
          severity={isError ? "error" : "success"}
          message={msg}
        />
      </div>
    </div>
  );
}

export default Footer;
