import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../../utils/axios";

export const handleCreateCoupon = createAsyncThunk(
  "coupon/create",
  async ({ values, accessToken }, thunkAPI) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken,
        },
      };
      const { data } = await axiosInstance.post(
        `/api/v1/coupon/create-coupon`,
        values,
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

export const getCoupons = createAsyncThunk(
  "coupon/get",
  async ({ accessToken }, thunkAPI) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken,
        },
      };
      const { data } = await axiosInstance.get(
        `/api/v1/coupon/getAllcoupon`,
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

export const handleDeleteCoupon = createAsyncThunk(
  "coupon/delete",
  async ({ id, token }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      };
      const { data } = await axiosInstance.delete(
        `/api/v1/coupon/deletecoupon/${id}`,
        config
      );
      console.log(data);
      return data;
    } catch (error) {
      // return custom error message from backend if present
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const getActivateCoupon = createAsyncThunk(
  "coupon/getactivate",
  async ({ totalprice }, thunkAPI) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axiosInstance.get(
        `/api/v1/coupon/getactivate?totalprice=${totalprice}`,
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


