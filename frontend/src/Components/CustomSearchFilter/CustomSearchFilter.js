import React from "react";
import { TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
const CustomSearchFilter = ({ onChange , value }) => {
  return (
    <TextField
      variant="outlined"
      placeholder="Search"
      size="small"
      value={value}
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
