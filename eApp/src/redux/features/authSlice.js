import { createSlice } from "@reduxjs/toolkit";





let authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: localStorage.getItem("atoken") ? true : false,
    // user: localStorage.getItem("user"),
    user:  JSON.parse(localStorage.getItem("user")),
    token: localStorage.getItem("atoken"),
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    login: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
      state.token = null;

      // localStorage.clear();
    },
  },
});

export default authSlice.reducer;
export let { setUser, login, logout } = authSlice.actions;
