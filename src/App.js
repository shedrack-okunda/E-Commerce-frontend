import { useSelector } from "react-redux";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import {
  selectIsAuthChecked,
  selectLoggedInUser,
} from "./features/auth/AuthSlice";
import { useAuthCheck } from "./hooks/useAuthCheck";
import { useFetchLoggedInUserDetails } from "./hooks/useFetchLoggedInUserDetails";
import {
  ForgotPasswordPage,
  LoginPage,
  OtpVerificationPage,
  ResetPasswordPage,
  SignupPage,
} from "./pages";
import { Protected } from "./features/auth/components/Protected";
import { Logout } from "./features/auth/components/Logout";

function App() {
  const isAuthChecked = useSelector(selectIsAuthChecked);
  const loggedInUser = useSelector(selectLoggedInUser);

  // triggers auth check
  useAuthCheck();
  useFetchLoggedInUserDetails(loggedInUser);

  const routes = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/verify-otp" element={<OtpVerificationPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route
          path="/reset-password/:userId/:passwordResetToken"
          element={<ResetPasswordPage />}
        />
        <Route
          exact
          path="/logout"
          element={
            <Protected>
              <Logout />
            </Protected>
          }
        />
      </>,
    ),
  );

  return <RouterProvider router={routes} />;
}

export default App;
