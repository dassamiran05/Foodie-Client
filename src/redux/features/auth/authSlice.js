// features/auth/authSlice.js
import { createSlice } from "@reduxjs/toolkit";
import {
  changePassword,
  handleAllUsers,
  // handleMakeAdmin,
  handleSendEmail,
  handleUpdateProfile,
  loginUser,
  registerUser,
} from "./authActions";
import toast from "react-hot-toast";

// initialize userToken from local storage
const userToken = JSON.parse(localStorage.getItem("userInfo"))?.token
  ? JSON.parse(localStorage.getItem("userInfo"))?.token
  : null;

const initialState = {
  loading: false,
  userInfo: JSON.parse(localStorage.getItem("userInfo"))?.details
    ? JSON.parse(localStorage.getItem("userInfo"))?.details
    : {}, // for user object
  userToken, // for storing the JWT
  error: null,
  success: false, // for monitoring the registration process.
  message: "", //For Success message
  allusers: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: () => initialState,
    logout: (state) => {
      state.userInfo = {};
      state.userToken = null;
      localStorage.removeItem("userInfo");
      toast.success("Logout Succssfull");
    },
    emptyallusers: (state) => {
      state.allusers = null;
    },
  },
  extraReducers: (builder) => {
    builder
      //Register
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true; // registration successful
        state.message = payload.message;
        toast.success(payload.message);
      })
      .addCase(registerUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      //Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true; // registration successful
        state.message = payload.message;
        state.userInfo = payload.user;
        state.userToken = payload.token;
        state.error = null;
        toast.success("Login Succssfful");
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
        toast.error(payload);
      })
      //Update profile
      .addCase(handleUpdateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(handleUpdateProfile.fulfilled, (state, { payload }) => {
        const { phone, about, country, profile, name } = payload.updatedUser;
        state.loading = false;
        state.success = true; // registration succes sful
        state.message = payload.message;
        state.userInfo = {
          ...state.userInfo,
          phone: phone,
          about: about,
          country: country,
          profile: profile,
          name: name,
        };
        if (localStorage.getItem("userInfo")) {
          const user = JSON.parse(localStorage.getItem("userInfo"));
          user.details = state.userInfo;
          localStorage.setItem("userInfo", JSON.stringify(user));
        }
        // state.userInfo.country = payload.user;
        state.error = null;
        toast.success(payload.message);
      })
      .addCase(handleUpdateProfile.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
        toast.error(payload);
      })
      //Login
      .addCase(handleAllUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(handleAllUsers.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
        state.allusers = payload.users;
        state.error = null;
      })
      .addCase(handleAllUsers.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
        toast.error(payload);
      })
      .addCase(changePassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(changePassword.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        toast.success(payload.message);
      })
      .addCase(changePassword.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
        // toast.error(payload);
      })
      .addCase(handleSendEmail.pending, (state) => {
        state.loading = true;
      })
      .addCase(handleSendEmail.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        toast.success(payload.message);
      })
      .addCase(handleSendEmail.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
        // toast.error(payload);
      });
    // .addCase(handleMakeAdmin.pending, (state) => {
    //   state.loading = true;
    // })
    // .addCase(handleMakeAdmin.fulfilled, (state, { payload }) => {
    //   state.loading = false;
    //   state.success = true;
    //   console.log(payload);
    //   // state.allusers = payload.users;
    //   state.error = null;
    // })
    // .addCase(handleMakeAdmin.rejected, (state, { payload }) => {
    //   state.loading = false;
    //   state.error = payload;
    //   toast.error(payload);
    // });
  },
});

export const { reset, logout, emptyallusers } = authSlice.actions;
export default authSlice.reducer;
