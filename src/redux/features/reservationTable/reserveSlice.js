// features/auth/authSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosInstance from "../../../utils/axios";

export const handlereserveTable = createAsyncThunk(
  "reserve/table",
  async (tabledata, thunkAPI) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axiosInstance.post(
        `/api/v1/auth/rtable`,
        tabledata,
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

const initialState = {
  loading: false,
  error: null,
  success: false, // for monitoring the registration process.
  message: "", //For Success message
  tableToken: "",
};

const reserveTableSlice = createSlice({
  name: "reserveTable",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(handlereserveTable.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(handlereserveTable.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true; 
        state.message = payload.message;
        state.tableToken = payload.token;
        toast.success(payload.message);
      })
      .addCase(handlereserveTable.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
        toast.error(payload);
      });
  },
});

// export const { reset, logout } = authSlice.actions;
export default reserveTableSlice.reducer;
