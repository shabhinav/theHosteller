import React, { useEffect, useState } from "react";
import Button from "../../Common/Button/Button";
import { colorPallete } from "../../../Resources/theme";
import SimpleModal from "../../Common/Modal/Modal";
import TravelForm from "../Form/TravelForm/TravelForm";
import EditIcon from "../../../Assets/images/edit.png";

function TravellerDetails({ data, refetch }) {
  const { Primary, Black } = colorPallete;
  const [open, setOpen] = useState(false);
  const [travellerData, setTravellerData] = useState([]);
  const [type, setType] = useState("");
  const [travellerId, setTravellerId] = useState("");
  const [item, setItem] = useState(null);

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (data?.travellerRes?.length > 0) {
      setTravellerData(data.travellerRes);
    }
  }, [data?.travellerRes]);

  return (
    <div>
      <div
        id='traveller'
        className='flex items-center xs:flex-col xs:my-10 justify-between mt-16'
      >
        <div className='mb-5'>
          <h5 className='font-semibold text-blackShade '>Saved Traveller(s)</h5>
          <p className='text-grey'>
            You have {travellerData.length} Traveller(s)
          </p>
        </div>
        <Button
          bgColor={Primary}
          color={Black}
          padding={"1.2rem 2rem"}
          fontWeight={600}
          borderRadius={6}
          label={"Add Traveller(s)"}
          onClick={() => {
            setOpen(true);
            setType("add");
          }}
          width={"200px"}
        />
      </div>
      {travellerData.map((item) => (
        <div className='mt-3 flex items-center'>
          <p className='font-semibold mr-2'>{item?.guestFullName}</p>
          <p>({item?.guestGender + " , " + item?.guestAge + " years"})</p>
          <p
            className='ml-2'
            onClick={() => {
              setType("edit");
              setOpen(true);
              setTravellerId(item?._id);
              setItem(item);
            }}
          >
            <img
              className='w-3	h-3 mt-2 cursor-pointer'
              src={EditIcon}
              alt='editIcon'
            />
          </p>
        </div>
      ))}
      <SimpleModal handleClose={handleClose} open={open}>
        <TravelForm
          type={type}
          travellerId={travellerId}
          handleClose={handleClose}
          refetch={refetch}
          data={item}
        />
      </SimpleModal>
    </div>
  );
}

export default TravellerDetails;
