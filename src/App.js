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
  HomePage,
  LoginPage,
  OtpVerificationPage,
  ProductDetailsPage,
  ResetPasswordPage,
  SignupPage,
  UserProfilePage,
} from "./pages";
import { Protected } from "./features/auth/components/Protected";
import { Logout } from "./features/auth/components/Logout";
import { NotFoundPage } from "./pages/NotFoundPage";

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
        <Route
          exact
          path="/product-details/:id"
          element={
            <Protected>
              <ProductDetailsPage />
            </Protected>
          }
        />
        {
          <>
            <Route
              path="/"
              element={
                <Protected>
                  <HomePage />
                </Protected>
              }
            />
            <Route
              path="/profile"
              element={
                <Protected>
                  <UserProfilePage />
                </Protected>
              }
            />
          </>
        }
        <Route path="*" element={<NotFoundPage />} />
      </>,
    ),
  );

  return isAuthChecked ? <RouterProvider router={routes} /> : "";
}

export default App;
