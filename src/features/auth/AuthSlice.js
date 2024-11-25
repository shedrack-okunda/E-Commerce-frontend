import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  checkAuth,
  forgotPassword,
  login,
  logout,
  resendOtp,
  resetPassword,
  signup,
  verifyOtp,
} from "./AuthApi";

const initialState = {
  status: "idle",
  errors: "idle",
  resendOtpStatus: "idle",
  resendOtpSuccessMessage: null,
  resendOtpError: null,
  signupStatus: "idle",
  loginStatus: "idle",
  loginError: null,
  loggedInUser: null,
  otpVerificationStatus: "idle",
  otpVerificationError: null,
  forgotPasswordStatus: "idle",
  forgotPasswordSuccessMessage: null,
  forgotPasswordError: null,
  resetPasswordStatus: "idle",
  resetPasswordSuccessMessage: null,
  resetPasswordError: null,
  isAuthChecked: false,
  successMessage: null,
};

export const signupAsync = createAsyncThunk(
  "auth/signupAsync",
  async (cred, { rejectWithValue }) => {
    try {
      const res = await signup(cred);
      return res;
    } catch (error) {
      return rejectWithValue(
        error.message || error.response?.data || "An error occurred",
      );
    }
  },
);

export const loginAsync = createAsyncThunk("auth/loginAsync", async (cred) => {
  try {
    const res = await login(cred);
    return res;
  } catch (error) {
    throw error.response.data;
  }
});

export const verifyOtpAsync = createAsyncThunk(
  "auth/verifyOtpAsync",
  async (cred, { rejectWithValue }) => {
    try {
      const res = await verifyOtp(cred);
      return res;
    } catch (error) {
      return rejectWithValue(error.response?.data || "An error occurred");
    }
  },
);

export const resendOtpAsync = createAsyncThunk(
  "auth/resendOtpAsync",
  async (cred) => {
    try {
      const res = await resendOtp(cred);
      return res;
    } catch (error) {
      throw error.response.data;
    }
  },
);

export const forgotPasswordAsync = createAsyncThunk(
  "auth/forgotPasswordAsync",
  async (cred) => {
    try {
      const res = await forgotPassword(cred);
      return res;
    } catch (error) {
      throw error.response.data;
    }
  },
);

export const resetPasswordAsync = createAsyncThunk(
  "auth/resetPasswordAsync",
  async (cred) => {
    try {
      const res = await resetPassword(cred);
      return res;
    } catch (error) {
      throw error.response.data;
    }
  },
);

export const checkAuthAsync = createAsyncThunk(
  "auth/checkAuthAsync",
  async () => {
    try {
      const res = await checkAuth();
      return res;
    } catch (error) {
      throw error.response.data;
    }
  },
);

export const logoutAsync = createAsyncThunk("auth/logoutAsync", async () => {
  try {
    const res = await logout();
    return res;
  } catch (error) {
    throw error.response.data;
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    clearAuthSuccessMessage: (state) => {
      state.successMessage = null;
    },

    clearAuthErrors: (state) => {
      state.errors = null;
    },

    resetAuthStatus: (state) => {
      state.status = "idle";
    },

    resetSignupStatus: (state) => {
      state.signupStatus = "idle";
    },

    clearSignupError: (state) => {
      state.signupError = null;
    },

    resetLoginStatus: (state) => {
      state.loginStatus = "idle";
    },

    clearLoginError: (state) => {
      state.loginError = null;
    },

    resetOtpVerificationStatus: (state) => {
      state.otpVerificationStatus = "idle";
    },

    clearOtpVerificationError: (state) => {
      state.otpVerificationError = null;
    },

    resetResendOtpStatus: (state) => {
      state.resendOtpStatus = "idle";
    },

    clearResendOtpError: (state) => {
      state.resendOtpError = null;
    },

    clearResendOtpSuccessMessage: (state) => {
      state.resendOtpSuccessMessage = null;
    },

    resetForgotPasswordStatus: (state) => {
      state.forgotPasswordStatus = "idle";
    },

    clearForgotPasswordSuccessMessage: (state) => {
      state.forgotPasswordSuccessMessage = null;
    },

    clearForgotPasswordError: (state) => {
      state.forgotPasswordError = null;
    },

    resetResetPasswordStatus: (state) => {
      state.resetPasswordStatus = "idle";
    },

    clearResetPasswordSuccessMessage: (state) => {
      state.resetPasswordSuccessMessage = null;
    },

    clearResetPasswordError: (state) => {
      state.resetPasswordError = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(signupAsync.pending, (state) => {
        state.signupStatus = "pending";
      })
      .addCase(signupAsync.fulfilled, (state, action) => {
        state.signupStatus = "fulfilled";
        state.loggedInUser = action.payload;
      })
      .addCase(signupAsync.rejected, (state, action) => {
        state.signupStatus = "rejected";
        state.signupError = action.error;
      })

      .addCase(loginAsync.pending, (state) => {
        state.loginStatus = "pending";
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.loginStatus = "fulfilled";
        state.loggedInUser = action.payload;
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.loginStatus = "rejected";
        state.loginError = action.error;
      })

      .addCase(verifyOtpAsync.pending, (state) => {
        state.otpVerificationStatus = "pending";
      })
      .addCase(verifyOtpAsync.fulfilled, (state, action) => {
        state.otpVerificationStatus = "fulfilled";
        state.loggedInUser = action.payload;
      })
      .addCase(verifyOtpAsync.rejected, (state, action) => {
        state.otpVerificationStatus = "rejected";
        state.otpVerificationError = action.error;
      })

      .addCase(resendOtpAsync.pending, (state) => {
        state.resendOtpStatus = "pending";
      })
      .addCase(resendOtpAsync.fulfilled, (state, action) => {
        state.resendOtpStatus = "fulfilled";
        state.resendOtpSuccessMessage = action.payload;
      })
      .addCase(resendOtpAsync.rejected, (state, action) => {
        state.resendOtpStatus = "rejected";
        state.resendOtpError = action.error;
      })

      .addCase(forgotPasswordAsync.pending, (state) => {
        state.forgotPasswordStatus = "pending";
      })
      .addCase(forgotPasswordAsync.fulfilled, (state, action) => {
        state.forgotPasswordStatus = "fulfilled";
        state.forgotPasswordSuccessMessage = action.payload;
      })
      .addCase(forgotPasswordAsync.rejected, (state, action) => {
        state.forgotPasswordStatus = "rejected";
        state.forgotPasswordError = action.error;
      })

      .addCase(resetPasswordAsync.pending, (state) => {
        state.resetPasswordStatus = "pending";
      })
      .addCase(resetPasswordAsync.fulfilled, (state, action) => {
        state.resetPasswordStatus = "fulfilled";
        state.resetPasswordSuccessMessage = action.payload;
      })
      .addCase(resetPasswordAsync.rejected, (state, action) => {
        state.resetPasswordStatus = "rejected";
        state.resetPasswordError = action.error;
      })

      .addCase(logoutAsync.pending, (state) => {
        state.status = "pending";
      })
      .addCase(logoutAsync.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.loggedInUser = null;
      })
      .addCase(logoutAsync.rejected, (state, action) => {
        state.status = "rejected";
        state.errors = action.error;
      })

      .addCase(checkAuthAsync.pending, (state) => {
        state.status = "pending";
      })
      .addCase(checkAuthAsync.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.loggedInUser = action.payload;
        state.isAuthChecked = true;
      })
      .addCase(checkAuthAsync.rejected, (state, action) => {
        state.status = "rejected";
        state.errors = action.error;
        state.isAuthChecked = true;
      });
  },
});

// exporting selectors
export const selectAuthStatus = (state) => state.auth.status;
export const selectAuthErrors = (state) => state.auth.errors;
export const selectLoggedInUser = (state) => state.auth.loggedInUser;
export const selectAuthSuccessMessage = (state) => state.auth.successMessage;
export const selectIsAuthChecked = (state) => state.auth.isAuthChecked;
export const selectResendOtpStatus = (state) => state.auth.resendOtpStatus;
export const selectResendOtpSuccessMessage = (state) =>
  state.auth.resendOtpSuccessMessage;
export const selectResendOtpError = (state) => state.auth.resendOtpError;
export const selectSignupStatus = (state) => state.auth.signupStatus;
export const selectSignupError = (state) => state.auth.signupError;
export const selectLoginStatus = (state) => state.auth.loginStatus;
export const selectLoginError = (state) => state.auth.loginError;
export const selectOtpVerificationStatus = (state) =>
  state.auth.otpVerificationStatus;
export const selectOtpVerificationError = (state) =>
  state.auth.otpVerificationError;
export const selectForgotPasswordStatus = (state) =>
  state.auth.forgotPasswordStatus;
export const selectForgotPasswordSuccessMessage = (state) =>
  state.auth.forgotPasswordSuccessMessage;
export const selectForgotPasswordError = (state) =>
  state.auth.forgotPasswordError;
export const selectResetPasswordStatus = (state) =>
  state.auth.resetPasswordStatus;
export const selectResetPasswordSuccessMessage = (state) =>
  state.auth.resetPasswordSuccessMessage;
export const selectResetPasswordError = (state) =>
  state.auth.resetPasswordError;

export const {
  clearAuthSuccessMessage,
  clearAuthErrors,
  resetAuthStatus,
  clearSignupError,
  resetSignupStatus,
  clearLoginError,
  resetLoginStatus,
  clearOtpVerificationError,
  resetOtpVerificationStatus,
  clearResendOtpError,
  clearResendOtpSuccessMessage,
  resetResendOtpStatus,
  clearForgotPasswordError,
  clearForgotPasswordSuccessMessage,
  resetForgotPasswordStatus,
  clearResetPasswordError,
  clearResetPasswordSuccessMessage,
  resetResetPasswordStatus,
} = authSlice.actions;

export default authSlice.reducer;
