import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../../utils/axios";

export const getOrders = createAsyncThunk(
  "orders/get",
  async ({ token }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      };
      const url = `/api/v1/order/allorders`;
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
export const getOrdersByOptions = createAsyncThunk(
  "orders/getOrdersbyfilter",
  async ({ token, filterOptions }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      };

      const queryStr = Object.entries(filterOptions).reduce(
        (queryString, [key, value], index) => {
          queryString += `${index === 0 ? "" : "&"}${key}=${value}`;
          return queryString;
        },
        ""
      );
      const url = `/api/v1/order/getOrdersByFilters?${queryStr}`;
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

export const getOrderStatusUpdate = createAsyncThunk(
  "orders/statusupdate",
  async ({ id, value, token }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      };
      const { data } = await axiosInstance.put(
        `/api/v1/order/statusupdate/${id}`,
        { value },
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
