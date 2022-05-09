import React from "react";
import Select from "react-select";
import "./react-select.scss";

export const ReactSelect = ({ selectedOption, handleChange, options }) => {
  return (
    <div className='react_select'>
      <Select
        value={selectedOption}
        onChange={(val) => handleChange(val)}
        options={options}
        
      />
    </div>
  );
};
