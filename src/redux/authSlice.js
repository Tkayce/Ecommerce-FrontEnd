import { createSlice } from "@reduxjs/toolkit";

const storedUser = JSON.parse(localStorage.getItem("user"));

const initialState = {
  user: storedUser || null, // Ensure user is properly loaded
  isAuthenticated: !!storedUser, // User is authenticated if data exists
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload; // Ensure full user data is stored
      state.isAuthenticated = true;
      localStorage.setItem("user", JSON.stringify(action.payload)); // Save user data
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem("user"); // Clear user from storage
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
