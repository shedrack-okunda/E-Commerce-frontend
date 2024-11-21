import { useSelector } from "react-redux";
import {
  Navigate,
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
import { LoginPage, OtpVerificationPage, SignupPage } from "./pages";

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
        <Route path="/" element={<Navigate to="/login" />} />
      </>,
    ),
  );

  return <RouterProvider router={routes} />;
}

export default App;
