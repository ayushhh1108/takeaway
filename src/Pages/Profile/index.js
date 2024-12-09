import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";
import {
    Box,
  Button,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useState } from "react";
import Sidebar from "../../components/SIdeBaar";
import DashboardMobile from "../mobileUserDashboard";
import { BiMoneyWithdraw } from 'react-icons/bi';
import {useSelector} from 'react-redux'

const ProfilePage = () => {
  const [userData, setUserData] = useState();
  const navigate = useNavigate();
  const matches = useMediaQuery("(max-width:600px)");
  const selector = useSelector(state=> state.Reducer.AccountData);
  useEffect(()=>{
    if(selector.name){
      setUserData(selector)
    }
  },[selector])
  return matches ? (
    <DashboardMobile />
  ) : (
    <div className="main-div">
      <Sidebar />
      <div className="main-component">
        <Box className="profile-box">
        <Box className="box">
            <h4 className="main-heading">Hey {userData?.name}!</h4>
            <Box className="details-box">
                <Typography className="title">Name</Typography>
                <Typography className="values">{userData?.name}</Typography>
            </Box>
            <Box className="details-box">
                <Typography className="title">Email Address</Typography>
                <Typography className="values">{userData?.email}</Typography>
            </Box>
            <Box className="details-box">
                <Typography className="title">Payment Frequency</Typography>
                <Typography className="values">Weekly</Typography>
            </Box>
            <Box className="details-box">
                <Typography className="title">PAN/TAX ID Number</Typography>
                <Typography className="values">Not Found / Bq9834r34</Typography>
            </Box>
            <Box className="details-box">
                <Typography className="title">Account Balance</Typography>
                <Typography className="values">₹ {userData?.earnings}</Typography>
            </Box>
            <Box className="details-box">
                <Typography className="title">UID</Typography>
                <Typography className="values">{userData?._id}</Typography>
            </Box>
            <Button className="widraw-btn" variant="contained" onClick={()=>navigate("/withdraw")}><BiMoneyWithdraw className="money-png"/> Withdraw Earning</Button>
        </Box>
        </Box>
      </div>
    </div>
  );
};
export default ProfilePage;
