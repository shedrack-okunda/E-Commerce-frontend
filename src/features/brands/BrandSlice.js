import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchAllBrands } from "./BrandApi";

const initialState = {
  status: "idle",
  brands: [],
  errors: null,
};

export const fetchAllBrandsAsync = createAsyncThunk(
  "brands/fetchAllBrandsAsync",
  async () => {
    try {
      const brands = await fetchAllBrands();
      return brands;
    } catch (error) {
      throw error.response.data;
    }
  },
);

const brandSlice = createSlice({
  name: "brand",
  initialState: initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchAllBrandsAsync.pending, (state) => {
        state.status = "pending";
      })
      .addCase(fetchAllBrandsAsync.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.brands = action.payload;
      })
      .addCase(fetchAllBrandsAsync.rejected, (state, action) => {
        state.status = "rejected";
        state.errors = action.error;
      });
  },
});

// exporting selectors
export const selectBrandStatus = (state) => state.brand.status;
export const selectBrands = (state) => state.brand.brands;
export const selectBrandErrors = (state) => state.brand.errors;

export default brandSlice.reducer;
