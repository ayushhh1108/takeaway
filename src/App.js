import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import RegisterPage from './Pages/RegistrationPage';
import LoginPage from './Pages/LoginPage';
import { createTheme, ThemeProvider } from "@mui/material";
import HomePage from "./Pages/LandingPage";
import MainPage from "./Pages/MainPage";
import 'react-toastify/dist/ReactToastify.css';
import PrivacyPolicy from './Pages/AboutUsPage';
import TermsConditions from './Pages/TermsConditionsPage';
import UserDashboard from './components/UserDashboard/UserDashboard';
import ProfilePage from './Pages/Profile';
import ReferralPage from './Pages/ReferralPage/Referral';
import Withdraw from './Pages/WithdrawPage';
import Surveys from './Pages/Surveys';
import { useDispatch } from "react-redux";
import { getUserDetails } from './Pages/action';

const theme = createTheme({
  palette: {
    primary: {
      main: '#8885a2'
    },
    secondary: {
      main: '#eee3cf'
    }
  }
});

function App() {
  const dispatch = useDispatch();
  React.useEffect(()=>{
    if(localStorage.getItem('token')){
        dispatch(getUserDetails())
    }
  },[])
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <div className="App">
          <Routes>
            <Route path="/" element={<MainPage />} >
              <Route index element={<HomePage />} />
              <Route path='/:id' element={<HomePage />} />
              <Route path='/Privacy-Policy' element={<PrivacyPolicy />} />
              <Route path='/Terms-Conditions' element={<TermsConditions />} />
            </Route>
            <Route path="/register" exact element={<RegisterPage />} />
            <Route path="/login" exact element={<LoginPage />} />
            <Route path="/dashboard" exact element={<UserDashboard />} />
            <Route path="/withdraw" exact element={<Withdraw />} />
            <Route path="/referrals" exact element={<ReferralPage />} />
            <Route path="/surveys" exact element={<Surveys />} />
            <Route path="/profile" exact element={<ProfilePage />} />
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
