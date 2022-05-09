import React, { useEffect, useState } from "react";
import Carousel from "../Components/Common/Carousel/Carousel";
import bannerImage from "../Assets/images/banner.png";
import Button from "../Components/Common/Button/Button";
import { colorPallete } from "../Resources/theme";
import { Grid } from "@material-ui/core";
import Dropdown from "../Components/Common/DropDown/Dropdown";
import Input from "../Components/Common/Input/Input";
import { useGetPropertyList, usePostPartnerData } from "../Services/datasource";
import logo from "../Assets/Icons/coffee.png";
import SimpleModal from "../Components/Common/Modal/Modal";
import { makeStyles } from "@material-ui/styles";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import { mobileScreen, parnerWithUsData } from "../Resources/constants/common";
import { emailHandler, nameHandler, validationErrorMsg } from "../Utils/utils";
import Toast from "../Components/Common/Toast/Toast";
import { useHistory } from "react-router";
import Meta from "../Components/Common/Meta/Meta";

const { Black } = colorPallete;

const title = [
  { name: "Mr", _id: "Mr" },
  { name: "Ms", _id: "Ms" },
  { name: "Mrs", _id: "Mrs" },
];

const condition = [{ name: "Yes" }, { name: "No" }];

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  group: {
    justifyContent: "space-around",
    width: "100%",
  },
  label: {
    color: Black,
  },
});

function PartnerView() {
  const history = useHistory();
  const [salutation, setSalutation] = useState("");
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [open, setOpen] = useState(false);
  const [partner, setPartner] = useState("No");
  const classes = useStyles();
  const [background, setBackground] = useState("");
  const [specify, setSpecify] = useState("");
  const [existing, setExisting] = useState("");
  const [link, setLink] = useState("");
  const [isValidName, setValidName] = useState(true);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [err, setErr] = useState("");
  const [myProperty, setMyProperty] = useState("");
  const [myProfession, setMyProfession] = useState("");

  const { loading, error, data } = useGetPropertyList();

  const [partnerDataHandler, { data: successData }] = usePostPartnerData();

  useEffect(() => {
    if (name) {
      let isValidName = nameHandler(name);
      setValidName(isValidName);
    }
  }, [name]);

  useEffect(() => {
    if (email) {
      let isValidEmail = emailHandler(email);
      setIsValidEmail(isValidEmail);
    }
  }, [email]);

  useEffect(() => {
    if (successData) {
      setErr("You Application is Registered Successfully");
      setOpen(true);
      setTimeout(() => {
        history.push("/");
      }, 3000);
    }
  }, [successData]);

  useEffect(() => {
    if (data?.propertyAndProfessionList?.propertyType?.length) {
      let property = data?.propertyAndProfessionList?.propertyType?.map(
        (item) => {
          return { _id: item, name: item };
        }
      );
      setMyProperty(property);
      let profession = data?.propertyAndProfessionList?.professionList?.map(
        (item) => {
          return { _id: item, name: item };
        }
      );
      setMyProfession(profession);
    }
  }, [data?.propertyAndProfessionList?.propertyType]);

  const submitData = () => {
    let errorMsg = validationErrorMsg(email, isValidName);
    if (email && !isValidEmail) {
      setErr(errorMsg);
      setOpen(true);
    } else if (name && !isValidName) {
      setErr(errorMsg);
      setOpen(true);
    } else if (mobile?.length < 10) {
      setErr("Invalid Mobile Number");
      setOpen(true);
    } else {
      partnerDataHandler(
        name,
        salutation,
        email,
        mobile,
        background,
        specify,
        existing,
        link
      );
    }
  };

  const { Primary, Black, Grey } = colorPallete;
  return (
    <div className=''>
      <Meta
        title={"Partner with Us"}
        description={"User wants to Partner with us"}
      />
      <div className='relative'>
        <div className='partner_banner'>
        <div className='bg_mask absolute h-full w-full z-10 -mt-1'></div>
          <Carousel bannerImage={[bannerImage]} autoPlay={false} />
        </div>
        <div className=' absolute w-full bottom-12 xs:hidden z-10'>
          <div className='view_container text-center'>
            <h4 className='text-white text-6xl text-center'>
              List your hotels, apartments, villas, holiday homes, homestays and
              more!
            </h4>
          </div>
        </div>
      </div>
      <div className='2xl:container mx-auto'>
        <div className='view_container'>
          <div className='text-center mt-20'>
            <h2>Its Free. Sign up now & get started!</h2>
            <p className='text-blogPara text-base mt-3 text-center'>
              Do you own any of the following property types, which can be
              rented out to guests for vacation? List with us now!
            </p>
          </div>
          <div className='mt-20 xl:w-3/6 2xl:w-3/6 xs:w-5/6	 mx-auto'>
            <Grid container spacing={3}>
              <Grid xs={3} lg={3}>
                <Dropdown
                  handleChange={(value) => {
                    setSalutation(value.target.value);
                  }}
                  data={title}
                  label={"Select *"}
                  type='outlined'
                  isLabel={true}
                  margin={"8px 8px 8px 0px"}
                  use='payment'
                  width={"100px"}
                />
              </Grid>
              <Grid xs={9} lg={9}>
                <div className='xs:ml-6'>
                  <Input
                    isLabel={true}
                    type={"text"}
                    onChange={(value) => setName(value)}
                    width='100%'
                    label={"Full Name *"}
                    use='payment'
                    variant='outlined'
                    marginBottom={"8px"}
                    isError={name && !isValidName}
                  />
                </div>
              </Grid>
              <Grid xs={12} lg={12}>
                <div className='mt-3'>
                  <Input
                    isLabel={true}
                    type={"number"}
                    onChange={(value) => {
                      if (value.length < 11) {
                        setMobile(value);
                      }
                    }}
                    value={mobile}
                    width='100%'
                    label={"Mobile Number *"}
                    use='payment'
                    variant='outlined'
                    marginBottom={"8px"}
                  />
                </div>
              </Grid>
              <Grid xs={12} lg={12}>
                <div className='mr-3 mt-3'>
                  <Input
                    isLabel={true}
                    type={"text"}
                    onChange={(value) => setEmail(value)}
                    width='100%'
                    label={"Email*"}
                    use='payment'
                    variant='outlined'
                    marginBottom={"8px"}
                    isError={email && !isValidEmail}
                  />
                </div>
              </Grid>
              <Grid xs={12} lg={7}>
                <div className='mr-5 mt-3'>
                  <Dropdown
                    handleChange={(value) => {
                      setBackground(value.target.value);
                    }}
                    data={myProfession ? myProfession : []}
                    label={"Your background *"}
                    type='outlined'
                    isLabel={true}
                    margin={"8px 8px 8px 0px"}
                    use='payment'
                    width={"100%"}
                  />
                </div>
              </Grid>
              <Grid xs={12} lg={5}>
                <div className='pt-3'>
                  <p className='text-base text-center'>
                    Do you have location to partner*
                  </p>

                  <div className='h-full flex items-center'>
                    <FormControl className={classes.root} component='fieldset'>
                      <FormLabel
                        className={classes.label}
                        component='legend'
                      ></FormLabel>
                      <RadioGroup
                        row
                        className={classes.group}
                        aria-label='gender'
                        name='gender1'
                        value={partner}
                        onChange={(e) => setPartner(e.target.value)}
                      >
                        {condition.map((item) => (
                          <FormControlLabel
                            value={item?.name}
                            control={<Radio />}
                            label={item?.name}
                          />
                        ))}
                      </RadioGroup>
                    </FormControl>
                  </div>
                </div>
              </Grid>

              {partner === "Yes" ? (
                <Grid xs={12} lg={12}>
                  <Input
                    isLabel={true}
                    type={"text"}
                    onChange={(value) => setSpecify(value)}
                    width='100%'
                    label={"Specify Location"}
                    use='payment'
                    variant='outlined'
                    marginBottom={"8px"}
                  />
                </Grid>
              ) : (
                ""
              )}
              <Grid xs={12} lg={12}>
                <Dropdown
                  handleChange={(value) => {
                    setExisting(value.target.value);
                  }}
                  data={myProperty ? myProperty : []}
                  label={"Do You have existing property to partner *"}
                  type='outlined'
                  isLabel={true}
                  margin={"8px 8px 8px 0px"}
                  use='payment'
                  width='100%'
                />
              </Grid>
              {partner === "Yes" ? (
                <Grid xs={12} lg={12}>
                  <Input
                    isLabel={true}
                    type={"url"}
                    onChange={(value) => setLink(value)}
                    width='100%'
                    label={"Google Link "}
                    use='payment'
                    variant='outlined'
                    marginBottom={"8px"}
                  />
                </Grid>
              ) : (
                ""
              )}
            </Grid>
            <div className='text-center mt-8'>
              <Button
                bgColor={
                  !(name && salutation && email && background && existing)
                    ? Grey
                    : Primary
                }
                color={Black}
                padding={"1.5rem 3rem"}
                fontWeight={600}
                borderRadius={6}
                label='Register Now'
                onClick={() => submitData()}
                width={"200px"}
                isDisable={
                  !(name && salutation && email && background && existing)
                }
              />
            </div>
          </div>
        </div>
      </div>
      <div className='absolute'>
        <Toast
          handleClose={() => setOpen(false)}
          open={open}
          severity={successData ? "success" : "error"}
          message={err}
        />
      </div>
    </div>
  );
}

export default PartnerView;
