import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addAddress,
  deleteAddressById,
  fetchAddressByUserId,
  updateAddressById,
} from "./AddressApi";

const initialState = {
  status: "idle",
  addressAddStatus: "idle",
  addressDeleteStatus: "idle",
  addressUpdateStatus: "idle",
  addresses: [],
  errors: null,
  successMessage: null,
};

export const addAddressAsync = createAsyncThunk(
  "address/addAddressAsync",
  async (address) => {
    try {
      const createdAddress = await addAddress(address);
      return createdAddress;
    } catch (error) {
      throw error.response.data;
    }
  },
);

export const fetchAddressByUserIdAsync = createAsyncThunk(
  "address/fetchAddressByUserIdAsync",
  async (id) => {
    try {
      const addresses = await fetchAddressByUserId(id);
      return addresses;
    } catch (error) {
      throw error.response.data;
    }
  },
);

export const updateAddressByIdAsync = createAsyncThunk(
  "address/updateAddressByIdAsync",
  async (id) => {
    try {
      const updatedAddress = await updateAddressById(id);
      return updatedAddress;
    } catch (error) {
      throw error.response.data;
    }
  },
);

export const deleteAddressByIdAsync = createAsyncThunk(
  "address/deleteAddressByIdAsync",
  async (id) => {
    try {
      const deletedAddress = await deleteAddressById(id);
      return deletedAddress;
    } catch (error) {
      throw error.response.data;
    }
  },
);

const addressSlice = createSlice({
  name: "address",
  initialState: initialState,
  reducers: {
    resetAddressStatus: (state) => {
      state.status = "idle";
    },

    resetAddressAddStatus: (state) => {
      state.addressAddStatus = "idle";
    },

    resetAddressDeleteStatus: (state) => {
      state.addressDeleteStatus = "idle";
    },

    resetAddressUpdateStatus: (state) => {
      state.addressUpdateStatus = "idle";
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(addAddressAsync.pending, (state) => {
        state.addressAddStatus = "pending";
      })
      .addCase(addAddressAsync.fulfilled, (state, action) => {
        state.addressAddStatus = "fulfilled";
        state.addresses.push(action.payload);
      })
      .addCase(addAddressAsync.rejected, (state, action) => {
        state.addressAddStatus = "rejected";
        state.errors = action.error;
      })

      .addCase(fetchAddressByUserIdAsync.pending, (state) => {
        state.status = "pending";
      })
      .addCase(fetchAddressByUserIdAsync.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.addresses = action.payload;
      })
      .addCase(fetchAddressByUserIdAsync.rejected, (state, action) => {
        state.status = "rejected";
        state.errors = action.error;
      })

      .addCase(updateAddressByIdAsync.pending, (state) => {
        state.addressUpdateStatus = "pending";
      })
      .addCase(updateAddressByIdAsync.fulfilled, (state, action) => {
        state.addressUpdateStatus = "fulfilled";
        const index = state.addresses.findIndex(
          (address) => address._id === action.payload._id,
        );
        state.addresses[index] = action.payload;
      })
      .addCase(updateAddressByIdAsync.rejected, (state, action) => {
        state.addressUpdateStatus = "rejected";
        state.errors = action.error;
      })

      .addCase(deleteAddressByIdAsync.pending, (state) => {
        state.addressDeleteStatus = "pending";
      })
      .addCase(deleteAddressByIdAsync.fulfilled, (state, action) => {
        state.addressDeleteStatus = "fulfilled";
        state.addresses = state.addresses.filter(
          (address) => address._id !== action.payload._id,
        );
      })
      .addCase(deleteAddressByIdAsync.rejected, (state, action) => {
        state.addressDeleteStatus = "rejected";
        state.errors = action.error;
      });
  },
});

// exporting selectors
export const selectAddressStatus = (state) => state.address.status;
export const selectAddresses = (state) => state.address.addresses;
export const selectAddressErrors = (state) => state.address.errors;
export const selectAddressSuccessMessage = (state) =>
  state.address.successMessage;
export const selectAddressAddStatus = (state) => state.address.addressAddStatus;
export const selectAddressDeleteStatus = (state) =>
  state.address.addressDeleteStatus;
export const selectAddressUpdateStatus = (state) =>
  state.address.addressUpdateStatus;

// exporting reducers
export const {
  resetAddressStatus,
  resetAddressAddStatus,
  resetAddressDeleteStatus,
  resetAddressUpdateStatus,
} = addressSlice.actions;

export default addressSlice.reducer;
