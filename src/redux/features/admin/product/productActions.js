import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../../utils/axios";
// import toast from "react-hot-toast";

export const handleCreateProduct = createAsyncThunk(
  "product/create",
  async ({ payload, userToken }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: userToken,
        },
      };
      const { data } = await axiosInstance.post(
        `/api/v1/product/createproduct`,
        payload,
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

export const handleUpdateProduct = createAsyncThunk(
  "product/update",
  async ({ value, accessToken, id }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: accessToken,
        },
      };
      const { data } = await axiosInstance.patch(
        `/api/v1/product/update/${id}`,
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

export const getAllproducts = createAsyncThunk(
  "product/get",
  async ({ page, limit }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(
        `/api/v1/product/getproducts?page=${page}&limit=${limit}`
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
export const getAllproductsByCategory = createAsyncThunk(
  "product/getAllbycategory",
  async ({category}, { rejectWithValue }) => {
    try {
      const url = `/api/v1/product/getproductsbycategory/${category}`;
      const { data } = await axiosInstance.get(url);
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

export const getAllFeaturedProducts = createAsyncThunk(
  "product/featured",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(
        `/api/v1/product/featuredproducts`
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

export const handleSingleProduct = createAsyncThunk(
  "product/single",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(
        `/api/v1/product/singleproduct/${id}`
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

export const handleDeleteProduct = createAsyncThunk(
  "product/delete",
  async ({ id, token }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      };
      const { data } = await axiosInstance.delete(
        `/api/v1/product/delproduct/${id}`,
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
