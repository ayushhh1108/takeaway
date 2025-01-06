import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import LoginPage from "./Pages/LoginPage";
import { createTheme, ThemeProvider } from "@mui/material";
import "react-toastify/dist/ReactToastify.css";
import { ProtectedRoute, RedirectToLink } from "./utils/auth";
import OrderStatus from "./Pages/TrackPage";
import MenuPage from "./Pages/Menu";
import HistoryPage from "./Pages/OrderHistory";
import TermsConditions from "./Pages/TermsConditionsPage";
import PrivacyPolicy from "./Pages/AboutUsPage";
import HomePage from "./Pages/LandingPage";
import TimeRestrictionDialog from "./components/TimeRestriction";

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
      <TimeRestrictionDialog />
      <ThemeProvider theme={theme}>
        <div className="App">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/Terms-Conditions" element={<TermsConditions />} />
            <Route path="/Privacy-Policy" element={<PrivacyPolicy />} />
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
