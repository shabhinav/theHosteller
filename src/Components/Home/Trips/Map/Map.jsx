import React from "react";
import Location from "../../../../Assets/images/location.png";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

function Map({ tripData }) {
  return (
    <div>
      <div className='mt-14'>
        <h4 className='font-bold capitalize'>FAQs</h4>
      </div>
      <div className='mt-8'>
        {tripData?.getTrip?.frequentQuestions.map((item) => (
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls='panel1a-content'
              id='panel1a-header'
            >
              <Typography>
                <span className='faq_question'>{item?.question}</span>
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography className='faq_answer'>{item?.answer}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    </div>
  );
}

export default Map;

// <div className='text-center w-3/4 mx-auto'>
//   <img
//     className='mt-10  w-full rounded-2xl	'
//     src={tripData?.getTrip?.tripMap}
//     alt='location'
//   />
// </div>;

// <h4 className='mt-10'>Location Map</h4>;
