import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addToCart,
  fetchCartByUserId,
  updateCartItemById,
  deleteCartItemById,
  resetCartByUserId,
} from "./CartApi";

const initialState = {
  status: "idle",
  items: [],
  cartItemAddStatus: "idle",
  cartItemRemoveStatus: "idle",
  errors: null,
  successMessage: null,
};

export const addToCartAsync = createAsyncThunk(
  "cart/addToCartAsync",
  async (item) => {
    try {
      const addedItem = await addToCart(item);
      return addedItem;
    } catch (error) {
      throw error.response.data;
    }
  },
);

export const fetchCartByUserIdAsync = createAsyncThunk(
  "cart/fetchCartByUserIdAsync",
  async (id) => {
    try {
      const items = await fetchCartByUserId(id);
      return items;
    } catch (error) {
      throw error.response.data;
    }
  },
);

export const updateCartItemByIdAsync = createAsyncThunk(
  "cart/updateCartItemByIdAsync",
  async (update) => {
    try {
      const updatedItem = await updateCartItemById(update);
      return updatedItem;
    } catch (error) {
      throw error.response.data;
    }
  },
);

export const deleteCartItemByIdAsync = createAsyncThunk(
  "cart/deleteCartItemByIdAsync",
  async (id) => {
    try {
      const deletedItem = await deleteCartItemById(id);
      return deletedItem;
    } catch (error) {
      throw error.response.data;
    }
  },
);

export const resetCartByUserIdAsync = createAsyncThunk(
  "cart/resetCartByUserIdAsync",
  async (userId) => {
    try {
      const updatedCart = await resetCartByUserId(userId);
      return updatedCart;
    } catch (error) {
      throw error.response.data;
    }
  },
);

const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    resetCartItemAddStatus: (state) => {
      state.cartItemAddStatus = "idle";
    },

    resetCartItemRemoveStatus: (state) => {
      state.cartItemRemoveStatus = "idle";
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(addToCartAsync.pending, (state) => {
        state.cartItemAddStatus = "pending";
      })
      .addCase(addToCartAsync.fulfilled, (state, action) => {
        state.cartItemAddStatus = "fulfilled";
        state.items.push(action.payload);
      })
      .addCase(addToCartAsync.rejected, (state, action) => {
        state.cartItemAddStatus = "rejected";
        state.errors = action.error;
      })

      .addCase(fetchCartByUserIdAsync.pending, (state) => {
        state.status = "pending";
      })
      .addCase(fetchCartByUserIdAsync.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.items = action.payload;
      })
      .addCase(fetchCartByUserIdAsync.rejected, (state, action) => {
        state.status = "rejected";
        state.errors = action.error;
      })

      .addCase(updateCartItemByIdAsync.pending, (state) => {
        state.status = "pending";
      })
      .addCase(updateCartItemByIdAsync.fulfilled, (state, action) => {
        state.status = "fulfilled";
        const index = state.items.findIndex(
          (item) => item._id === action.payload._id,
        );
        state.items[index] = action.payload;
      })
      .addCase(updateCartItemByIdAsync.rejected, (state, action) => {
        state.status = "rejected";
        state.errors = action.error;
      })

      .addCase(deleteCartItemByIdAsync.pending, (state) => {
        state.cartItemRemoveStatus = "pending";
      })
      .addCase(deleteCartItemByIdAsync.fulfilled, (state, action) => {
        state.cartItemRemoveStatus = "fulfilled";
        state.items = state.items.filter(
          (item) => item._id !== action.payload._id,
        );
      })
      .addCase(deleteCartItemByIdAsync.rejected, (state, action) => {
        state.cartItemRemoveStatus = "rejected";
        state.errors = action.error;
      })

      .addCase(resetCartByUserIdAsync.pending, (state) => {
        state.status = "pending";
      })
      .addCase(resetCartByUserIdAsync.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.items = [];
      })
      .addCase(resetCartByUserIdAsync.rejected, (state, action) => {
        state.status = "rejected";
        state.errors = action.error;
      });
  },
});

// exporting selectors
export const selectCartStatus = (state) => state.cart.status;
export const selectCartItems = (state) => state.cart.items;
export const selectCartErrors = (state) => state.cart.errors;
export const selectCartSuccessMessage = (state) => state.cart.successMessage;
export const selectCartItemAddStatus = (state) => state.cart.cartItemAddStatus;
export const selectCartItemRemoveStatus = (state) =>
  state.cart.cartItemRemoveStatus;

// exporting reducers
export const { resetCartItemAddStatus, resetCartItemRemoveStatus } =
  cartSlice.actions;

export default cartSlice.reducer;
