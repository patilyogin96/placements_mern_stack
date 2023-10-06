import { TextField } from "@mui/material";
import React from "react";

const CustomInput = ({ label, onChange, size, style , name }) => {
  return (
    <TextField name={name} label={label} size={size} onChange={onChange} style={style} />
  );
};

export default CustomInput;
