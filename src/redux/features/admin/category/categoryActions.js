// features/auth/authSlice.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../../utils/axios";
// import toast from "react-hot-toast";

export const handleCreateCategory = createAsyncThunk(
  "category/create",
  async (cdata, thunkAPI) => {
    try {
      const { value, accessToken } = cdata;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken,
        },
      };
      const { data } = await axiosInstance.post(
        `/api/v1/category/create-category`,
        value,
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
export const getCategories = createAsyncThunk(
  "categories/get",
  async (_, thunkAPI) => {
    try {
      const { data } = await axiosInstance.get(
        `/api/v1/category/allcategories`
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

export const handleUpdateCategory = createAsyncThunk(
  "category/update",
  async (cdata, { rejectWithValue }) => {
    try {
      const { value, accessToken, id } = cdata;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken,
        },
      };
      const { data } = await axiosInstance.put(
        `/api/v1/category/update-category/${id}`,
        value,
        config
      );
      return data;
    } catch (error) {
      // return custom error message from backend if present
      if (error?.response && error?.response?.data?.message) {
        return rejectWithValue(error?.response?.data?.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const handleSingleCategory = createAsyncThunk(
  "category/single",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(
        `/api/v1/category/single-category/${id}`
      );
      // console.log(data);
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
export const handleDeleteCategory = createAsyncThunk(
  "category/delete",
  async ({ id, token }, { rejectWithValue }) => {
    try {
      console.log(id, token);
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      };
      const { data } = await axiosInstance.delete(
        `/api/v1/category/delete-category/${id}`,
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
