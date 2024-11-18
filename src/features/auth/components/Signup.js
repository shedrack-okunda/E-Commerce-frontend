/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch, useSelector } from "react-redux";
import {
  clearSignupError,
  resetSignupStatus,
  selectLoggedInUser,
  selectSignupError,
  selectSignupStatus,
  signupAsync,
} from "../AuthSlice";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
  FormHelperText,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useEffect } from "react";
import { toast } from "react-toastify";
import Lottie from "lottie-react";
import { ecommerceOutlookAnimation } from "../../../assets";
import { MotionConfig, motion } from "framer-motion";

export const Signup = () => {
  const dispatch = useDispatch();
  const status = useSelector(selectSignupStatus);
  const error = useSelector(selectSignupError);
  const loggedInUser = useSelector(selectLoggedInUser);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate;
  const theme = useTheme;
  const is900 = useMediaQuery(theme.breakpoints.down(900));
  const is480 = useMediaQuery(theme.breakpoints.down(480));

  //   handle user redirection
  //   useEffect(() => {
  //     if (loggedInUser && !loggedInUser?.isVerified) {
  //       navigate("/verify-otp");
  //     } else if (loggedInUser) {
  //       navigate("/");
  //     }
  //   }, [loggedInUser]);

  //   handle signup error and toast them
  //   useEffect(() => {
  //     if (error) {
  //       toast.error(error.message);
  //     }
  //   }, [error]);

  //   useEffect(() => {
  //     if (status === "fulfilled") {
  //       toast.success("Welcome! Verify your email to start shopping.");
  //       reset();
  //     }

  //     return () => {
  //       dispatch(clearSignupError());
  //       dispatch(resetSignupStatus());
  //     };
  //   }, [status]);

  //   handles signup and dispatches the signup action with credentials that api requires
  const handleSignup = (data) => {
    // const cred = { ...data };
    // delete cred.confirmPassword;
    // dispatch(signupAsync(cred));
  };

  return (
    <Stack
      width={"100vw"}
      height={"100vh"}
      flexDirection={"row"}
      sx={{ overflowY: "hidden" }}
    >
      {!is900 && (
        <Stack bgcolor={"black"} flex={1} justifyContent={"center"}>
          <Lottie animationData={ecommerceOutlookAnimation} />
        </Stack>
      )}

      <Stack flex={1} justifyContent={"center"} alignItems={"center"}>
        <Stack
          flexDirection={"row"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Stack rowGap={".4rem"}>
            <Typography
              variant="h2"
              sx={{ wordBreak: "break-word" }}
              fontWeight={600}
            >
              E-Commerce
            </Typography>
            <Typography
              alignSelf={"flex-end"}
              color={"GrayText"}
              variant="body2"
            >
              - Shop Anything
            </Typography>
          </Stack>
        </Stack>

        <Stack
          mt={4}
          spacing={2}
          width={is480 ? "95vw" : "28rem"}
          component={"form"}
          noValidate
          onSubmit={handleSubmit(handleSignup)}
        >
          <MotionConfig whileHover={{ y: -5 }}>
            <motion.div>
              <TextField
                fullWidth
                {...register("name", { required: "Username is required" })}
                placeholder="Username"
              />
              {errors.name && (
                <FormHelperText error>{errors.name}</FormHelperText>
              )}
            </motion.div>
          </MotionConfig>
        </Stack>
      </Stack>
    </Stack>
  );
};
