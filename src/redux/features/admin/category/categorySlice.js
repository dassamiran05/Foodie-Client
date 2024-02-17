// features/auth/authSlice.js
import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import {
  getCategories,
  handleCreateCategory,
  handleDeleteCategory,
  handleSingleCategory,
  handleUpdateCategory,
} from "./categoryActions";

const initialState = {
  loading: false,
  error: null,
  singlecategory: {},
  category: [], // for monitoring the registration process.
  success: false,
  message: "", //For Success message
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    resetSinglecategory: (state) => {
      state.singlecategory = {};
    },
  },
  extraReducers: (builder) => {
    builder
      //Create
      .addCase(handleCreateCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(handleCreateCategory.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
        state.message = payload.message;
        toast.success(payload.message);
      })
      .addCase(handleCreateCategory.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
        state.success = false;
      })
      //Get category
      .addCase(getCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCategories.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
        state.category = payload?.categories;
        state.message = payload?.message;
        // toast.success(payload?.message);
      })
      .addCase(getCategories.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
        state.success = false;
      })
      //Edit category
      .addCase(handleUpdateCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(handleUpdateCategory.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
        state.message = payload?.message;
        toast.success(payload?.message);
      })
      .addCase(handleUpdateCategory.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
        state.success = false;
      })
      //Single category
      .addCase(handleSingleCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(handleSingleCategory.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
        state.singlecategory = payload.singleCategory;
        state.message = payload?.message;
      })
      .addCase(handleSingleCategory.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
        state.success = false;
      })
      //Delete category
      .addCase(handleDeleteCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(handleDeleteCategory.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
        state.category = state.category.filter(
          (item) => item._id !== payload?.deletedID
        );
        state.message = payload?.message;
        toast.success(payload?.message);
      })
      .addCase(handleDeleteCategory.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
        state.success = false;
      });
  },
});

export const { resetSinglecategory } = categorySlice.actions;
export default categorySlice.reducer;
