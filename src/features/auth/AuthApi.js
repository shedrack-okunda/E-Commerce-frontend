import { axio } from "../../config/axios";

export const signupApi = async (cred) => {
  try {
    const res = await axio.post("auth/signup", cred);
    return res.data;
  } catch (error) {
    const message = error.response ? error.response.data : error.message;
    throw new Error(message);
  }
};

export const login = async (cred) => {
  try {
    const res = await axio.post("auth/login", cred);
    return res.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const verifyOtp = async (cred) => {
  try {
    const res = await axio.post("auth/verify-otp", cred);
    return res.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const resendOtp = async (cred) => {
  try {
    const res = await axio.post("auth/resend-otp", cred);
    return res.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const forgotPassword = async (cred) => {
  try {
    const res = await axio.post("auth/forgot-password", cred);
    return res.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const resetPassword = async (cred) => {
  try {
    const res = await axio.post("auth/reset-password", cred);
    return res.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const checkAuth = async () => {
  try {
    const res = await axio.get("auth/check-auth");
    return res.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const logout = async () => {
  try {
    const res = await axio.get("auth/logout");
    return res.data;
  } catch (error) {
    throw error.response.data;
  }
};
