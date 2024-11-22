/* eslint-disable react-hooks/exhaustive-deps */
import { motion, MotionConfig } from "framer-motion";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  clearResetPasswordError,
  clearResetPasswordSuccessMessage,
  resetPasswordAsync,
  resetResetPasswordStatus,
  selectResetPasswordError,
  selectResetPasswordStatus,
  selectResetPasswordSuccessMessage,
} from "../AuthSlice";
import { useNavigate, useParams } from "react-router-dom";
import {
  Button,
  FormHelperText,
  Paper,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useEffect } from "react";
import { toast } from "react-toastify";

export const ResetPassword = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const status = useSelector(selectResetPasswordStatus);
  const error = useSelector(selectResetPasswordError);
  const successMessage = useSelector(selectResetPasswordSuccessMessage);
  const { userId, passwordResetToken } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const is500 = useMediaQuery(theme.breakpoints.down(500));

  useEffect(() => {
    if (error) {
      toast.error(error.message);
    }

    return () => {
      dispatch(clearResetPasswordError());
    };
  }, [error]);

  useEffect(() => {
    if (status === "fulfilled") {
      toast.success(successMessage?.message);
      navigate("/login");
    }

    return () => {
      dispatch(clearResetPasswordSuccessMessage());
    };
  }, [status]);

  useEffect(() => {
    return () => {
      dispatch(resetResetPasswordStatus());
    };
  }, []);

  const handleResetPassword = async (data) => {
    const cred = { ...data, userId: userId, token: passwordResetToken };
    delete cred.confirmPassword;
    dispatch(resetPasswordAsync(cred));
    reset();
  };

  return (
    <Stack
      width={"100vw"}
      height={"100vh"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Stack component={Paper} elevation={2}>
        <Stack
          component={"form"}
          width={is500 ? "95vw" : "30rem"}
          p={"1rem"}
          rowGap={"1rem"}
          noValidate
          onSubmit={handleSubmit(handleResetPassword)}
        >
          <Stack rowGap={".3rem"}>
            <Typography variant="h4" fontWeight={600}>
              Reset Password
            </Typography>
            <Typography color={"GrayText"}>
              Please enter and confirm new password
            </Typography>
          </Stack>

          <Stack rowGap={".5rem"}>
            <MotionConfig whileHover={{ y: -2 }}>
              <motion.div>
                <TextField
                  type="password"
                  fullWidth
                  sx={{ mt: 1 }}
                  {...register("password", {
                    required: "Please enter a new password",
                    pattern: {
                      value:
                        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
                      message: `at least 8 characters, must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number, Can contain special characters`,
                    },
                  })}
                  placeholder="New Password"
                />
                {errors.password && (
                  <FormHelperText sx={{ mt: 1 }} error>
                    {errors.password.message}
                  </FormHelperText>
                )}
              </motion.div>

              <motion.div>
                <TextField
                  type="password"
                  fullWidth
                  sx={{ mt: 1 }}
                  {...register("confirmPassword", {
                    required: "Please Confirm the password",
                    validate: (value, formValues) =>
                      value === formValues.password ||
                      "Passwords dose not match",
                  })}
                  placeholder="Confirm New Password"
                />
                {errors.confirmPassword && (
                  <FormHelperText sx={{ mt: 1 }} error>
                    {errors.confirmPassword.message}
                  </FormHelperText>
                )}
              </motion.div>
            </MotionConfig>
          </Stack>

          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 1 }}>
            <Button
              sx={{ height: "2.5rem" }}
              fullWidth
              type="submit"
              variant="contained"
            >
              Reset Password
            </Button>
          </motion.div>
        </Stack>
      </Stack>
    </Stack>
  );
};
