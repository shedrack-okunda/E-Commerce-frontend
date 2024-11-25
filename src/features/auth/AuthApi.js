import { axio } from "../../config/axios";

export const signup = async (cred) => {
  const res = await axio.post("auth/signup", cred);
  return res.data;
};

export const login = async (cred) => {
  const res = await axio.post("auth/login", cred);
  return res.data;
};

export const verifyOtp = async (cred) => {
  const res = await axio.post("auth/verify-otp", cred);
  return res.data;
};

export const resendOtp = async (cred) => {
  const res = await axio.post("auth/resend-otp", cred);
  return res.data;
};

export const forgotPassword = async (cred) => {
  const res = await axio.post("auth/forgot-password", cred);
  return res.data;
};

export const resetPassword = async (cred) => {
  const res = await axio.post("auth/reset-password", cred);
  return res.data;
};

export const checkAuth = async () => {
  const res = await axio.get("auth/check-auth");
  return res.data;
};

export const logout = async () => {
  const res = await axio.get("auth/logout");
  return res.data;
};
