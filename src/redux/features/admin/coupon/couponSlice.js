// features/auth/authSlice.js
import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import {
  getActivateCoupon,
  getCoupons,
  handleCreateCoupon,
  handleDeleteCoupon,
} from "./couponActions";

export const couponInitialState = {
  loading: false,
  error: null,
  coupon: {},
  coupons: [],
  success: false,
  message: "",
  activatecoupon: JSON.parse(localStorage.getItem("activateCoupon"))
    ? JSON.parse(localStorage.getItem("activateCoupon"))
    : {},
};

const couponSlice = createSlice({
  name: "coupon",
  initialState: couponInitialState,
  reducers: {
    resetcoupon: (state) => {
      state.activatecoupon = {};
      if (localStorage.getItem("activateCoupon")) {
        localStorage.removeItem("activateCoupon");
      }
    },
    setActivatecoupon: (state, { payload }) => {
      state.activatecoupon = payload;
      localStorage.setItem(
        "activateCoupon",
        JSON.stringify(state.activatecoupon)
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(handleCreateCoupon.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(handleCreateCoupon.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
        state.message = payload.message;
        toast.success(payload.message);
      })
      .addCase(handleCreateCoupon.rejected, (state, { payload }) => {
        console.log(payload);
        state.loading = false;
        state.error = payload;
        state.success = false;
        toast.error(payload);
      })
      .addCase(getCoupons.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCoupons.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
        state.coupons = payload?.coupons;
        state.message = payload?.message;
      })
      .addCase(getCoupons.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
        state.success = false;
        toast.error(payload);
      })
      .addCase(getActivateCoupon.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getActivateCoupon.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
        // state.activatecoupon = payload.active;
        state.coupon = payload.active;
        // localStorage.setItem(
        //   "activateCoupon",
        //   JSON.stringify(state.activatecoupon)
        // );
      })
      .addCase(getActivateCoupon.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
        state.success = false;
        toast.error(payload);
      })
      .addCase(handleDeleteCoupon.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(handleDeleteCoupon.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
        state.message = payload?.message;
        state.coupons = payload.remaining;
        toast.success(payload?.message);
      })
      .addCase(handleDeleteCoupon.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
        state.success = false;
        toast.error(payload);
      });
    // .addCase(handleCouponverify.pending, (state) => {
    //   state.loading = true;
    //   state.error = null;
    // })
    // .addCase(handleCouponverify.fulfilled, (state, { payload }) => {
    //   state.loading = false;
    //   state.success = true;
    //   state.message = payload?.message;
    //   state.coupons = payload.remaining;
    //   toast.success(payload?.message);
    // })
    // .addCase(handleCouponverify.rejected, (state, { payload }) => {
    //   state.loading = false;
    //   state.error = payload;
    //   state.success = false;
    //   toast.error(payload);
    // });
  },
});

export const { resetcoupon, setActivatecoupon } = couponSlice.actions;
export default couponSlice.reducer;

export const activeCoupon = (state) => state.coupon.activatecoupon;
