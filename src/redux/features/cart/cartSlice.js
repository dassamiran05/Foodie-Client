// features/auth/authSlice.js
import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { handleCouponverify } from "./cartActions";
// import { activeCoupon } from "../admin/coupon/couponSlice";
// import { couponInitialState } from "../admin/coupon/couponSlice";

const initialState = {
  loading: false,
  error: null,
  success: false,
  message: "",
  cart: JSON.parse(localStorage.getItem("cartItems"))
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
  totalprice: JSON.parse(localStorage.getItem("totalprice"))
    ? JSON.parse(localStorage.getItem("totalprice"))
    : null,
  iscouponApplied: JSON.parse(localStorage.getItem("iscouponApplied"))
    ? JSON.parse(localStorage.getItem("iscouponApplied"))
    : false,
  shipping: null,
  final: null,
  sessionid: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, { payload }) => {
      console.log(payload);
      const exists = state.cart.find((item) => item?._id === payload?._id);
      if (exists) {
        state.cart = state.cart.map((item) =>
          item?._id === payload?._id
            ? {
                ...item,
                cartQuantity: payload.cartQuantity
                  ? payload.cartQuantity
                  : exists.cartQuantity + 1,
              }
            : item
        );
      } else {
        state.cart = [
          ...state.cart,
          {
            ...payload,
            cartQuantity: payload.cartQuantity ? payload.cartQuantity : 1,
          },
        ];
      }

      localStorage.setItem("cartItems", JSON.stringify(state.cart));
      toast.success(`${payload.name} added to cart!!`);
    },
    removeItemfromCart: (state, { payload }) => {
      const confirm = window.confirm(
        "Are you sure to delete this item from cart?"
      );
      if (confirm) {
        const newcart = state.cart.filter((item) => item._id !== payload);
        state.cart = newcart;

        if (localStorage.getItem("cartItems")) {
          localStorage.setItem("cartItems", JSON.stringify(state.cart));
        }
      }
    },
    calculateTotalprice: (state) => {
      const carts = [...state.cart];
      const total = carts.reduce((sum, item) => {
        return (sum += item.cartQuantity * item.price);
      }, 0);
      state.totalprice = parseFloat(total.toFixed(2));
      localStorage.setItem("totalprice", JSON.stringify(state.totalprice));
    },

    updateCart: (state, { payload }) => {
      let newcarts = [...state.cart];

      newcarts = newcarts.map((item) => {
        const item2 = payload.find(
          (payloadItem) => payloadItem._id === item._id
        );
        return item2 ? { ...item, ...item2 } : item;
      });
      state.cart = newcarts;

      if (localStorage.getItem("cartItems")) {
        localStorage.setItem("cartItems", JSON.stringify(state.cart));
      }

      toast.success("cart updated");
    },
    addshipping: (state, { payload }) => {
      const { amount, type } = payload;
      if (type === "cod") {
        state.shipping = amount;
        state.final = state.totalprice + state.shipping;
        if (localStorage.getItem("totalprice")) {
          localStorage.setItem("totalprice", JSON.stringify(state.final));
        }
      } else {
        state.shipping = null;
        state.final = null;
        if (localStorage.getItem("totalprice")) {
          localStorage.setItem("totalprice", JSON.stringify(state.totalprice));
        }
      }
    },
    resetCouponApplied: (state) => {
      state.iscouponApplied = false;
      if (localStorage.getItem("iscouponApplied")) {
        localStorage.removeItem("iscouponApplied");
      }
    },
    resetCart: (state) => {
      state.cart = [];
      state.totalprice = null;
      if (localStorage.getItem("cartItems")) {
        localStorage.removeItem("cartItems");
      }

      if (localStorage.getItem("totalprice")) {
        localStorage.removeItem("totalprice");
      }
    },

    addPaymentSessionid: (state, { payload }) => {
      state.sessionid = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(handleCouponverify.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(handleCouponverify.fulfilled, (state, { payload }) => {
        console.log(
          payload,
          typeof state.totalprice,
          typeof payload.totalprice,
          state.totalprice,
          payload.totalprice
        );
        state.loading = false;
        state.success = true;
        state.message = payload.message;
        state.totalprice = parseFloat(payload.totalprice);
        state.iscouponApplied = true;
        toast.success(payload.message);
        localStorage.setItem("totalprice", JSON.stringify(state.totalprice));
        localStorage.setItem(
          "iscouponApplied",
          JSON.stringify(state.iscouponApplied)
        );
      })
      .addCase(handleCouponverify.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
        state.success = false;
        toast.error(payload);
        state.iscouponApplied = false;
      });
  },
});

export const {
  addToCart,
  removeItemfromCart,
  calculateTotalprice,
  updateCart,
  addshipping,
  resetCouponApplied,
  resetCart,
  addPaymentSessionid,
} = cartSlice.actions;
export default cartSlice.reducer;
