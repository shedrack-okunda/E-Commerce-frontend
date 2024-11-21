import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchLoggedInUserById, updateUserById } from "./UserApi";

const initialState = {
  status: "idle",
  userInfo: null,
  errors: null,
  successMessage: null,
};

export const fetchLoggedInUserByIdAsync = createAsyncThunk(
  "user/fetchLoggedInUserByIdAsync",
  async (id) => {
    try {
      const userInfo = await fetchLoggedInUserById(id);
      return userInfo;
    } catch (error) {
      throw error.response.data;
    }
  },
);

export const updateUserByIdAsync = createAsyncThunk(
  "user/updateUserByIdAsync",
  async (update) => {
    try {
      const updatedUser = await updateUserById(update);
      return updatedUser;
    } catch (error) {
      throw error.response.data;
    }
  },
);

const userSlice = createSlice({
  name: "userSlice",
  initialState: initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchLoggedInUserByIdAsync.pending, (state) => {
        state.status = "pending";
      })
      .addCase(fetchLoggedInUserByIdAsync.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.userInfo = action.payload;
      })
      .addCase(fetchLoggedInUserByIdAsync.rejected, (state, action) => {
        state.status = "rejected";
        state.errors = action.error;
      })

      .addCase(updateUserByIdAsync.pending, (state) => {
        state.status = "pending";
      })
      .addCase(updateUserByIdAsync.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.userInfo = action.payload;
      })
      .addCase(updateUserByIdAsync.rejected, (state, action) => {
        state.status = "rejected";
        state.errors = action.error;
      });
  },
});

// exporting selectors
export const selectUserStatus = (state) => state.status;
export const selectUserInfo = (state) => state.userInfo;
export const selectUserErrors = (state) => state.errors;
export const selectUserSuccessMessage = (state) => state.successMessage;

export default userSlice.reducer;
