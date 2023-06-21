import React, { useEffect, useState } from "react";
import { api_token } from "../../Utils/Networks";
import { Button, TextField, Box } from "@mui/material";
import { setLogout } from "../../State";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setStudents } from "../../State";
import styles from "./index.module.css";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { Route, Routes } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Companies from "../Companies/Companies";
import Students from "../Students/Students";
import Interviews from "../Interviews/Interview";

const drawerWidth = 240;

const PlaceDashboard = () => {
  let location = useLocation();
  let students = useSelector((state) => state.students);
  const [filterData, setFilterData] = useState("");
  let navigate = useNavigate();
  let dispatch = useDispatch();

  console.log("StateStudents", students);

  const handlechange = (e) => {
    const { value } = e.target;
    setFilterData(value);
  };
  useEffect(() => {
    api_token
      .get(`api/v1/student/?q=${filterData}`)
      .then((response) => {
        console.log("getstu", response);
        dispatch(
          setStudents({
            students: response.data,
          })
        );
      })
      .catch((err) => {});
  }, [filterData]);

  const handleLogout = () => {
    dispatch(setLogout());

    navigate("/login");
  };

  const handleRoute = (route) => {
    navigate(`/dashboard/${route}`);
  };

  useEffect(() => {
    let pathCheck = location.pathname;

    if (pathCheck === "/dashboard" || pathCheck === "/dashboard/") {
      navigate(`/dashboard/companies`);
    }
  }, [location]);

  return (
    <>
      <div className={styles.container}>
        {/* sidebar */}
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          <AppBar
            position="fixed"
            sx={{
              width: `calc(100% - ${drawerWidth}px)`,
              ml: `${drawerWidth}px`,
            }}
          >
            <Toolbar>
              <Typography variant="h6" noWrap component="div">
                Permanent drawer
              </Typography>
            </Toolbar>
          </AppBar>
          <Drawer
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              "& .MuiDrawer-paper": {
                width: drawerWidth,
                boxSizing: "border-box",
              },
            }}
            variant="permanent"
            anchor="left"
          >
            <Toolbar />
            <Divider />
            <List>
              {["Companies", "Interviews", "Students"].map((text, index) => (
                <ListItem
                  key={text}
                  disablePadding
                  onClick={() => handleRoute(text.toLowerCase())}
                >
                  <ListItemButton>
                    <ListItemIcon>
                      {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                    </ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
            <Divider />
          </Drawer>
          <Box
            component="main"
            sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
          >
            <Toolbar />
            {/* Mains ROutes For mains content */}
            <Routes>
              <Route strict exact path="/companies" element={<Companies />} />
              <Route strict exact path="/interviews" element={<Interviews />} />
              <Route path="/students" element={<Students />} />
            </Routes>
          </Box>
        </Box>
      </div>
    </>
  );
};

export default PlaceDashboard;
