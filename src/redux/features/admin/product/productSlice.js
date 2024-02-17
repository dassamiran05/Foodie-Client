// features/auth/authSlice.js
import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

import {
  getAllFeaturedProducts,
  getAllproducts,
  handleCreateProduct,
  handleDeleteProduct,
  handleSingleProduct,
  handleUpdateProduct,
} from "./productActions";
import { handleAddReview } from "../../review/reviewActions";

const initialState = {
  loading: false,
  error: null,
  productCount: "",
  numberPage: "",
  singleproduct: {},
  products: [],
  success: false,
  message: "",
  featuredProducts: [],
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    resetSingleproductState: (state) => {
      state.singleproduct = {};
    },
    handleSinglephotourl: (state, { payload }) => {
      let newArr = state.singleproduct.photourl.filter(
        (item) => item?.id !== payload
      );
      state.singleproduct.photourl = newArr;
    },
  },
  extraReducers: (builder) => {
    builder
      //Create
      .addCase(handleCreateProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(handleCreateProduct.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
        state.message = payload.message;
        toast.success(payload.message);
      })
      .addCase(handleCreateProduct.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
        state.success = false;
      })
      // Get all products
      .addCase(getAllproducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllproducts.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
        state.products = payload?.products;
        state.message = payload?.message;
        state.productCount = payload.count;
        state.numberPage = payload.numPage;
        state.products.length > 0 && toast.success(payload?.message);
      })
      .addCase(getAllproducts.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
        state.success = false;
      })
      //Edit product
      .addCase(handleUpdateProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(handleUpdateProduct.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
        state.message = payload?.message;
        toast.success(payload?.message);
      })
      .addCase(handleUpdateProduct.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
        state.success = false;
      })
      //Single category
      .addCase(handleSingleProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(handleSingleProduct.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
        state.singleproduct = payload.product;
        state.singleproduct.photourl = payload.product.photo.map(
          (item, index) => {
            return {
              url: item,
              id: index + 1,
            };
          }
        );
        state.message = payload?.message;
        toast.success(payload?.message);
      })
      .addCase(handleSingleProduct.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
        state.success = false;
      })
      // Delete Product
      .addCase(handleDeleteProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(handleDeleteProduct.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
        // state.products = state.products.filter(
        //   (item) => item._id !== payload?.deletedID
        // );
        state.message = payload?.message;
        toast.success(payload?.message);
      })
      .addCase(handleDeleteProduct.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
        state.success = false;
      })
      .addCase(getAllFeaturedProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllFeaturedProducts.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
        state.message = payload?.message;
        state.featuredProducts = payload.featured;
        // toast.success(payload?.message);
      })
      .addCase(getAllFeaturedProducts.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
        state.success = false;
      })
      .addCase(handleAddReview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(handleAddReview.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
        state.message = payload?.message;
        state.singleproduct.rating = payload.rating;
      })
      .addCase(handleAddReview.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
        state.success = false;
      });
  },
});

export const { resetSingleproductState, handleSinglephotourl } =
  productSlice.actions;
export default productSlice.reducer;

