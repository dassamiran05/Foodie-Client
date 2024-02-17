
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import reserveTableReducer from "./features/reservationTable/reserveSlice";
import categoryReducer from "./features/admin/category/categorySlice";
import productReducer from "./features/admin/product/productSlice";
import cartReducer from "./features/cart/cartSlice";
import couponReducer from "./features/admin/coupon/couponSlice";
import orderReducer from "./features/admin/orders/orderSlice";
import reviewReducer from "./features/review/reviewSlice";
import salesReducer from "./features/admin/sales/salesSlice";
import loaderReducer from "./features/globalLoader/loaderSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    reserveTable: reserveTableReducer,
    category: categoryReducer,
    product: productReducer,
    cart: cartReducer,
    coupon: couponReducer,
    order: orderReducer,
    review: reviewReducer,
    sales:salesReducer,
    loader:loaderReducer
  },
});
export default store;
