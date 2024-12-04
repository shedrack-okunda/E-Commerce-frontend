import React from "react";
import {createRoot} from "react-dom/client";
import App from "./App";
import { ThemeProvider } from "@mui/material";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import theme from "./theme/theme";
import { store } from "./app/store";

const root = createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <App />
        <ToastContainer position="top-right" autoClose={1500} closeOnClick />
      </Provider>
    </ThemeProvider>
  </React.StrictMode>,
);
