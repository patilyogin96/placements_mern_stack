import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  user: null,
  token: null,
  students: [],
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      console.log("dispatch");
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    setStudents: (state, action) => {

      console.log("Payload" , action.payload.students);
      state.students = action.payload.students;
    },
  },
});
export const { setLogin, setLogout, setStudents } = authSlice.actions;

export default authSlice.reducer;
