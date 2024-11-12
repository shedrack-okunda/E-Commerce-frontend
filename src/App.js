import { useSelector } from "react-redux";
import {
  Navigate,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

function App() {
  const isAuthChecked = useSelector();
  const loggedInUser = useSelector();

  const routes = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/signup" />
        <Route path="/login" />

        {loggedInUser?.isAdmin ? (
          <>
            <Route path="*" element={<Navigate to={"/"} />} />
          </>
        ) : (
          <>
            <Route path="/" element={""} />
          </>
        )}
      </>,
    ),
  );

  return isAuthChecked ? <RouterProvider router={routes} /> : "";
}

export default App;
