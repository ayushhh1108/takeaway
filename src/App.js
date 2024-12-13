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

const theme = createTheme({
  palette: {
    primary: {
      main: "#9f8e7c",
    },
    secondary: {
      main: "#eee3cf",
    },
  },
});

function App() {
  const dispatch = useDispatch();
  React.useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(getUserDetails());
    }
  }, []);
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <div className="App">
          <Routes>
            <Route path="/" element={<LoginPage />}>
              <Route path="/Terms-Conditions" element={<TermsConditions />} />
            </Route>
            <Route path="/menu" element={<MenuPage />} />
            <Route path="/track/:id" element={<OrderStatus />} />
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
