import * as React from "react";
import "./index.css";
import { Box, Typography } from "@mui/material";
import profilePng from "../../assets/user.png";
import moneyPng from "../../assets/Credit card-rafiki.png";
import { MenuScrollBox, TaskBox, ViewBox, YoutubeBox } from "../../components/Boxes";
import { useLocation, useNavigate } from 'react-router-dom';

function DashboardMobile({ children }) {
  const navigate = useNavigate();
  const params = useLocation();
  React.useEffect(() => {
    const user = localStorage.getItem("token");
    if (!user) {
      navigate("/login");
    }
  }, []);
  return (
    <Box className="main-container">
      <Box className="upper-side">
        <Box className="top-bar">
          <Typography className="dashboard-text">Hey, AK</Typography>
          <img src={profilePng} alt="profilePng" className="profile-img" />
        </Box>
        <Box className="total-erning">
          <Box className="earnings-text">
            <Typography variant="p" className="earning-label">
              Total Earning
            </Typography>
            <Typography variant="h5" className="earning-value">
              ₹1000
            </Typography>
          </Box>
          <img
            src={moneyPng}
            alt="money-vector"
            style={{ width: "100px", borderRadius: "0px 20px 13px 0px" }}
          />
        </Box>
        <MenuScrollBox />
      </Box>
      <Box className="all-box">
        {children}
      </Box>
    </Box>
  );
}
export default DashboardMobile;
