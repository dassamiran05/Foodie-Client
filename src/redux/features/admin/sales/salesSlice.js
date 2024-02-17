import { createSlice } from "@reduxjs/toolkit";
import {
  getSalesData,
  getSoldProductsData,
  getcustomerData,
  getrevenueData,
} from "./salesActions";
import toast from "react-hot-toast";

const initialState = {
  loading: false,
  error: null,
  success: false,
  message: "",
  salesData: null,
  revenueData: null,
  customerData: null,
  soldProducts: [],
};

const salesSlice = createSlice({
  name: "sales",
  initialState: initialState,
  // reducers: {
  //   resetcoupon: (state) => {
  //     state.activatecoupon = {};
  //     if (localStorage.getItem("activateCoupon")) {
  //       localStorage.removeItem("activateCoupon");
  //     }
  //   },
  //   setActivatecoupon: (state, { payload }) => {
  //     state.activatecoupon = payload;
  //     localStorage.setItem(
  //       "activateCoupon",
  //       JSON.stringify(state.activatecoupon)
  //     );
  //   },
  // },
  extraReducers: (builder) => {
    builder
      .addCase(getrevenueData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getrevenueData.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
        state.message = payload.message;
        state.revenueData = payload.total;
      })
      .addCase(getrevenueData.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
        state.success = false;
        toast.error(payload);
      })
      .addCase(getSalesData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSalesData.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
        state.message = payload.message;
        state.salesData = payload.total;
      })
      .addCase(getSalesData.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
        state.success = false;
        toast.error(payload);
      })
      .addCase(getcustomerData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getcustomerData.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
        state.message = payload.message;
        state.customerData = payload.total;
      })
      .addCase(getcustomerData.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
        state.success = false;
        // toast.error(payload);
      })
      .addCase(getSoldProductsData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSoldProductsData.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
        state.soldProducts = payload.soldproducts;
        // state.message = payload.message;
        // toast.success(payload.message);
      })
      .addCase(getSoldProductsData.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
        state.success = false;
        // toast.error(payload);
      });
  },
});

export const { resetcoupon, setActivatecoupon } = salesSlice.actions;
export default salesSlice.reducer;

export const activeCoupon = (state) => state.coupon.activatecoupon;
