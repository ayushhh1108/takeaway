import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import LoginPage from "./Pages/LoginPage";
import { createTheme, ThemeProvider } from "@mui/material";
import MainPage from "./Pages/MainPage";
import "react-toastify/dist/ReactToastify.css";
import TermsConditions from "./Pages/TermsConditionsPage";
import { useDispatch } from "react-redux";
import { getUserDetails } from "./Pages/action";
import MenuPage from "./Pages/Menu";
import OrderStatus from "./Pages/TrackPage";
import HomePage from "./Pages/LandingPage";
import PrivacyPolicy from "./Pages/AboutUsPage";
import { ProtectedRoute, RedirectToLink } from "./utils/auth";
import HistoryPage from "./Pages/OrderHistory";

const theme = createTheme({
  palette: {
    primary: {
      main: "#000000",
    },
    secondary: {
      main: "#eee3cf",
    },
  },
});

function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <div className="App">
          <Routes>
            <Route path="/" element={<RedirectToLink />} />
            <Route path="/Terms-Conditions" element={<RedirectToLink />} />
            <Route path="/Privacy-Policy" element={<RedirectToLink />} />
            <Route
              path="/menu"
              element={
                <ProtectedRoute>
                  <MenuPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/track/:id"
              element={
                <ProtectedRoute>
                  <OrderStatus />
                </ProtectedRoute>
              }
            />
            <Route
              path="/order-history"
              element={
                <ProtectedRoute>
                  <HistoryPage />
                </ProtectedRoute>
              }
            />
            <Route path="/login" exact element={<LoginPage />} />
          </Routes>
        </div>
      </ThemeProvider>
      <ToastContainer
        position="top-right"
        autoClose={4000}
        rtl={false}
        draggable
      />
    </Router>
  );
}

export default App;
