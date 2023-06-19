import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../Pages/Login/Login";
import PlaceDashboard from "../Pages/PlaceDashboard/PlaceDashboard";
import { useSelector } from "react-redux";

const AppRouter = () => {
  const isAuth = Boolean(useSelector((state) => state.token));
  console.log("Boolean", isAuth);

  return (
    <Routes>
      <Route strict exact path="/" element={<Login />} />
      <Route strict exact path="/login" element={<Login />} />
      <Route path="/dashboard" element={<PlaceDashboard />} />
    </Routes>
  );
};

export default AppRouter;
