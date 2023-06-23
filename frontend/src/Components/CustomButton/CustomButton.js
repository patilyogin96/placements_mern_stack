import React from "react";
import { Button } from "@mui/material";

const CustomButton = ({ text, color, onClick, type }) => {
  return (
    <Button variant="contained" color={color} type={type} onClick={onClick}>
      {text}
    </Button>
  );
};

export default CustomButton;
