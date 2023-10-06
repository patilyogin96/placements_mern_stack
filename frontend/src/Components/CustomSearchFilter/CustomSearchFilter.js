import React from "react";
import { TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
const CustomSearchFilter = ({ onChange }) => {
  return (
    <TextField
      variant="outlined"
      placeholder="Search"
      size="small"
      onChange={(e) => {
        onChange(e.target.value);
      }}
      InputProps={{
        startAdornment: <SearchIcon />,
      }}
    />
  );
};

export default CustomSearchFilter;
