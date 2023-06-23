import { TextField } from "@mui/material";
import React from "react";

const CustomInput = ({ label, onChange, size, style }) => {
  return (
    <TextField label={label} size={size} onChange={onChange} style={style} />
  );
};

export default CustomInput;
