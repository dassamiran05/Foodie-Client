// authActions.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../utils/axios";

export const registerUser = createAsyncThunk(
  "auth/register",
  async (userdata, thunkAPI) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axiosInstance.post(
        `/api/v1/auth/register`,
        userdata,
        config
      );
      return data;
    } catch (error) {
      // return custom error message from backend if present
      if (error.response && error.response.data.message) {
        return thunkAPI.rejectWithValue(error.response.data.message);
      } else {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (userdata, thunkAPI) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axiosInstance.post(
        `/api/v1/auth/login`,
        userdata,
        config
      );
      const user = {
        details: data?.user,
        token: data?.token,
      };
      localStorage.setItem("userInfo", JSON.stringify(user));
      return data;
    } catch (error) {
      // return custom error message from backend if present
      if (error.response && error.response.data.message) {
        return thunkAPI.rejectWithValue(error.response.data.message);
      } else {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  }
);

export const handleUpdateProfile = createAsyncThunk(
  "auth/updateprofile",
  async ({ token, udata }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token,
        },
      };
      const { data } = await axiosInstance.patch(
        `/api/v1/auth/updateprofile`,
        udata,
        config
      );
      // const user = {
      //   details:data?.user,
      //   token:data?.token
      // }
      // localStorage.setItem("userInfo", JSON.stringify(user));
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const handleAllUsers = createAsyncThunk(
  "auth/getallusers",
  async (token, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      };
      const { data } = await axiosInstance.get(
        `/api/v1/auth/getallusers`,
        config
      );
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
export const changePassword = createAsyncThunk(
  "auth/changePassword",
  async ({ token, passwordData }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      };
      const { data } = await axiosInstance.patch(
        `/api/v1/auth/changepassword`,
        passwordData,
        config
      );
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
export const handleSendEmail = createAsyncThunk(
  "auth/sendemail",
  async ({ contactData }, { rejectWithValue }) => {
    try {
      // const config = {
      //   headers: {
      //     "Content-Type": "application/json",
      //     Authorization: token,
      //   },
      // };
      const { data } = await axiosInstance.post(
        `/api/v1/auth/sendemail`,
        contactData
      );
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

// export const handleMakeAdmin = createAsyncThunk(
//   "auth/madmin",
//   async ({ token, email }, { rejectWithValue }) => {

//     try {
//       const config = {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: token,
//         },
//       };

//       console.log(email, token, config);
//       const { data } = await axiosInstance.patch(
//         `/api/v1/auth/makeadmin/${email}`,
//         config
//       );
//       return data;
//     } catch (error) {
//       if (error.response && error.response.data.message) {
//         return rejectWithValue(error.response.data.message);
//       } else {
//         return rejectWithValue(error.message);
//       }
//     }
//   }
// );
