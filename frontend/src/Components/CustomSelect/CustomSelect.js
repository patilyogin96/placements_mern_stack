import React from "react";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  "Oliver Hansen",
  "Van Henry",
  "April Tucker",
  "Ralph Hubbard",
  "Omar Alexander",
  "Carlos Abbott",
  "Miriam Wagner",
  "Bradley Wilkerson",
  "Virginia Andrews",
  "Kelly Snyder",
];

const CustomSelect = ({ title, selectList, onChange, listName, name }) => {
  const theme = useTheme();

  return (
    <>
      <div>
        <FormControl sx={{ width: 300 }}>
          <InputLabel id="demo-multiple-name-label">{title}</InputLabel>
          <Select
            labelId="demo-multiple-name-label"
            id="demo-multiple-name"
            name={name}
            // multiple
            value={listName}
            onChange={onChange}
            input={<OutlinedInput label={title} />}
            MenuProps={MenuProps}
          >
            {selectList.map((singleItem) => (
              <MenuItem key={singleItem?._id} value={singleItem?._id}>
                {singleItem?.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    </>
  );
};

export default CustomSelect;
