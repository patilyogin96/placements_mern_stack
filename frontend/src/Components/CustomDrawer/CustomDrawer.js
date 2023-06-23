import React from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import { Typography } from "@mui/material";

const DrawerComponent = styled(Drawer)(({ drawerWidth }) => ({
  width: drawerWidth,
  flexShrink: 0,
  "& .MuiDrawer-paper": {
    width: drawerWidth,
  },
}));

const StyledToolbar = styled(Toolbar)({
  minHeight: 64, // Adjust the height as per your requirements
});

const CustomDrawer = ({ open, onClose, drawerWidth, children, title }) => {
  return (
    <DrawerComponent
      open={open}
      onClose={onClose}
      drawerWidth={drawerWidth}
      anchor="right"
    >
      <StyledToolbar>
        <Typography variant="h5">{title}</Typography>
      </StyledToolbar>
      <Typography sx={{ paddingLeft: "24px", paddingRight: "24px" }}>
        {children}
      </Typography>
    </DrawerComponent>
  );
};

CustomDrawer.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  drawerWidth: PropTypes.number.isRequired,
  children: PropTypes.node.isRequired,
};

export default CustomDrawer;
