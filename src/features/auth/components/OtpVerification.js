/* eslint-disable react-hooks/exhaustive-deps */
import {
  Button,
  FormHelperText,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  clearOtpVerificationError,
  clearResendOtpError,
  clearResendOtpSuccessMessage,
  resendOtpAsync,
  resetOtpVerificationStatus,
  resetResendOtpStatus,
  selectLoggedInUser,
  selectOtpVerificationError,
  selectOtpVerificationStatus,
  selectResendOtpError,
  selectResendOtpStatus,
  selectResendOtpSuccessMessage,
  verifyOtpAsync,
} from "../AuthSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const OtpVerification = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const loggedInUser = useSelector(selectLoggedInUser);
  const userId = loggedInUser?._id;
  const navigate = useNavigate();
  const resendOtpStatus = useSelector(selectResendOtpStatus);
  const resendOtpError = useSelector(selectResendOtpError);
  const resendOtpSuccessMessage = useSelector(selectResendOtpSuccessMessage);
  const otpVerificationStatus = useSelector(selectOtpVerificationStatus);
  const otpVerificationError = useSelector(selectOtpVerificationError);

  useEffect(() => {
    if (otpVerificationStatus === "fulfilled") {
      toast.success("Email verified! Redirecting to login...");
      navigate("/login");
      dispatch(resetResendOtpStatus());
    }

    return () => {
      dispatch(resetOtpVerificationStatus());
    };
  }, [otpVerificationStatus, navigate, dispatch]);

  //   handles the redirection
  // useEffect(() => {
  //   if (!loggedInUser) {
  //     navigate("/login");
  //   } else if (loggedInUser && loggedInUser?.isVerified) {
  //     navigate("/");
  //   }
  // }, [loggedInUser]);

  const handleSendOtp = () => {
    const data = { user: userId };
    dispatch(resendOtpAsync(data));
  };

  const handleVerifyOtp = (data) => {
    const cred = { ...data, userId };
    dispatch(verifyOtpAsync(cred));
  };

  //   handles resend otp error
  useEffect(() => {
    if (resendOtpError) {
      toast.error(resendOtpError.message);
    }

    return () => {
      dispatch(clearResendOtpError());
    };
  }, [resendOtpError]);

  //   handles resend otp success message
  useEffect(() => {
    if (resendOtpSuccessMessage) {
      toast.success(resendOtpSuccessMessage.message);
    }

    return () => {
      dispatch(clearResendOtpSuccessMessage());
    };
  }, [resendOtpSuccessMessage]);

  //   handles error while verifying otp
  useEffect(() => {
    if (otpVerificationError) {
      toast.error(otpVerificationError.message);
    }

    return () => {
      dispatch(clearOtpVerificationError());
    };
  }, [otpVerificationError]);

  useEffect(() => {
    if (otpVerificationStatus === "fulfilled") {
      toast.success("Email verified! We are happy to have you here.");
      dispatch(resetResendOtpStatus());
    }

    return () => {
      dispatch(resetOtpVerificationStatus());
    };
  }, [otpVerificationStatus]);

  return (
    <Stack
      width={"100vw"}
      height={"100vh"}
      noValidate
      flexDirection={"column"}
      rowGap={3}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Stack
        component={Paper}
        elevation={1}
        position={"relative"}
        justifyContent={"center"}
        alignItems={"center"}
        p={"2rem"}
        rowGap={"2rem"}
      >
        <Typography mt={4} variant="h5" fontWeight={500}>
          Verify Your Email Address
        </Typography>

        {resendOtpStatus === "fulfilled" ? (
          <Stack
            width={"100%"}
            rowGap={"1rem"}
            component={"form"}
            noValidate
            onSubmit={handleSubmit(handleVerifyOtp)}
          >
            <Stack rowGap={"1rem"}>
              <Stack>
                <Typography color={"GrayText"}>
                  Enter the 4 digit OTP sent on
                </Typography>
                <Typography fontWeight={600} color={"GrayText"}>
                  {loggedInUser?.email}
                </Typography>
              </Stack>

              <Stack>
                <TextField
                  {...register("otp", {
                    required: "OTP is required",
                    minLength: {
                      value: 4,
                      message: "Please enter a 4 digit OTP",
                    },
                  })}
                  fullWidth
                  type="number"
                />
                {errors?.otp && (
                  <FormHelperText sx={{ color: "red" }}>
                    {errors.otp.message}
                  </FormHelperText>
                )}
              </Stack>
            </Stack>
            <Button fullWidth variant="contained" type="submit">
              Verify
            </Button>
          </Stack>
        ) : (
          <>
            <Stack>
              <Typography color={"GrayText"}>
                We will send you OTP on
              </Typography>
              <Typography fontWeight={600} color={"GrayText"}>
                {loggedInUser?.email}
              </Typography>
            </Stack>

            <Button onClick={handleSendOtp} fullWidth variant="contained">
              Get OTP
            </Button>
          </>
        )}
      </Stack>
    </Stack>
  );
};
