import React, { useEffect, useState } from "react";
import { api_token } from "../../Utils/Networks";
import { Button, TextField, Box } from "@mui/material";
import { setLogout } from "../../State";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setStudents } from "../../State";

const PlaceDashboard = () => {
  let students = useSelector((state) => state.students);
  const [filterData , setFilterData] = useState("")
  let navigate = useNavigate();
  let dispatch = useDispatch();

  console.log("StateStudents", students);

  const handlechange = (e)=>{
    const {value} = e.target
    setFilterData(value)
  }
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

  return (
    <>
      <Box>
        <TextField label="search"  onChange={handlechange}   />
        
        <ul>
          {students.map((s, i)=>{
            return(
              <li>{s.first_name}</li>
            )
          })}
        </ul>

        <Button onClick={handleLogout}>Logout</Button>
      </Box>
    </>
  );
};

export default PlaceDashboard;
