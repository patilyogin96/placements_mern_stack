import React, { useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import { api_open } from "../../Utils/Networks";
import { useDispatch } from "react-redux";
import { setLogin } from "../../State";
import { setToken } from "../../Utils/Networks";
import { useNavigate } from "react-router-dom";

const Login = () => {
  let navigate = useNavigate();
  let dispatch = useDispatch();
  let initialVal = {
    email: "",
    password: "",
  };
  const [loginval, setLoginVal] = useState(initialVal);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginVal({
      ...loginval,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("LoginVal", loginval);

    api_open
      .post(`api/v1/users/login`, loginval)
      .then((response) => {
        console.log("Response", response);
        if (response.status === 200) {
          const { token, user_state } = response?.data?.data;
          setToken(token);

          dispatch(
            setLogin({
              user: user_state,
              token: token,
            })
          );

          navigate("/dashboard");
        }
      })
      .catch((err) => {});
  };
  return (
    <>
      <Box>
        <form onSubmit={handleSubmit}>
          <Box>
            <Box>
              <TextField onChange={handleChange} name="email" />
            </Box>
            <Box>
              <TextField onChange={handleChange} name="password" />
            </Box>
            <Box>
              <Button type="submit" variant="contained">
                Login
              </Button>
            </Box>
          </Box>
        </form>
      </Box>
    </>
  );
};

export default Login;
