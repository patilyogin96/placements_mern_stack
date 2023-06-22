import React from "react";
import { Button } from '@mui/material';

const CustomButton = ({ text, color, onClick }) => {
  return (
    <Button variant="contained" color={color} onClick={onClick}>
      {text}
    </Button>
  );
};

export default CustomButton;
