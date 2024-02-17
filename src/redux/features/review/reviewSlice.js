import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null,
  success: false,
  message: "",
  review: [],
};

const reviewSlice = createSlice({
  name: "review",
  initialState,
  reducers: {
    initializeReviewsFromProduct(state, { payload }) {
      state.review = payload;
    },
  },
});

export const { initializeReviewsFromProduct } = reviewSlice.actions;
export default reviewSlice.reducer;
