import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../../utils/axios";

export const getrevenueData = createAsyncThunk(
  "sales/revenueData",
  async ({ token, filterTag }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      };
      const { data } = await axiosInstance.get(
        `/api/v1/sales/revenuedata?tag=${filterTag}`,
        config
      );
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

export const getSalesData = createAsyncThunk(
  "sales/salesData",
  async ({ token, filterTag }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      };
      const { data } = await axiosInstance.get(
        `/api/v1/sales/salesdata?tag=${filterTag}`,
        config
      );
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

export const getcustomerData = createAsyncThunk(
  "sales/customerData",
  async ({ token, filterTag }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      };
      const { data } = await axiosInstance.get(
        `/api/v1/sales/customerdata?tag=${filterTag}`,
        config
      );
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
export const getSoldProductsData = createAsyncThunk(
  "sales/getSoldproducts",
  async ({ token, filterTag }, { rejectWithValue }) => {
    // console.log(token, filterTag);
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      };
      const url = `/api/v1/sales/getAllSoldproducts?tag=${filterTag}`;
      const { data } = await axiosInstance.get(url, config);
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
