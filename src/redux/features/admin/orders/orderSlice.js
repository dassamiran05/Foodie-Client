import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import {
  getOrderStatusUpdate,
  getOrders,
  getOrdersByOptions,
} from "./orderActions";

const initialState = {
  loading: false,
  error: null,
  orders: [],
  success: false,
  message: "",
  total: null,
  numberPage: null,
  count:null
};

const orderSlice = createSlice({
  name: "order",
  initialState: initialState,
  //   reducers: {
  //     resetcoupon: (state) => {
  //       state.activatecoupon = {};
  //       if (localStorage.getItem("activateCoupon")) {
  //         localStorage.removeItem("activateCoupon");
  //       }
  //     },
  //     setActivatecoupon: (state, { payload }) => {
  //       state.activatecoupon = payload;
  //       localStorage.setItem(
  //         "activateCoupon",
  //         JSON.stringify(state.activatecoupon)
  //       );
  //     },
  //   },
  extraReducers: (builder) => {
    builder

      .addCase(getOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrders.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
        state.orders = payload?.orders;
        // state.numberPage = payload.pagecount;
        state.numberPage = payload.pagination.pageCount;
        state.count = payload.pagination.count;
        state.message = payload?.message;
        // toast.success(payload?.message);
      })
      .addCase(getOrders.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
        state.success = false;
        // toast.error(payload);
      })
      .addCase(getOrdersByOptions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrdersByOptions.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
        state.orders = payload?.orders;
        state.total = payload.total;
        state.message = payload?.message;
      })
      .addCase(getOrdersByOptions.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
        state.success = false;
        // toast.error(payload);
      })
      .addCase(getOrderStatusUpdate.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrderStatusUpdate.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
        const orders = [...state.orders];
        const updatedOrders = orders.map((order) => {
          if (order._id === payload.order._id) {
            return {
              ...order,
              delivery_status: payload.order.delivery_status,
            };
          } else {
            return order;
          }
        });
        state.orders = updatedOrders;
        state.message = payload?.message;
        toast.success(payload?.message);
      })
      .addCase(getOrderStatusUpdate.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
        state.success = false;
        toast.error(payload);
      });
  },
});

// export const { resetcoupon, setActivatecoupon } = orderSlice.actions;
export default orderSlice.reducer;
