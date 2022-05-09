import React from "react";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import "./Faq.scss";

function Faq({ data }) {
  return (
    <div id='faq'>
      <h4 className='mt-20 mb-12 font-bold xs:mx-3'>FAQs</h4>
      {data?.map((item) => (
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
            <Typography>
              <span className='text-sm faq_answer'>{item?.answer}</span>
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}

export default Faq;
