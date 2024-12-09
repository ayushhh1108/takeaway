import React, { useEffect } from 'react';
import main_logo from "../../assets/logopng.png";
import dashboardPng from "../../assets/dashboard.png";
import referalsPng from "../../assets/referals.png";
import surveysPng from "../../assets/surveyor.png";
import withdravalPage from "../../assets/withdraw.png";
import { Typography } from '@mui/material';
import profilePng from "../../assets/profile-user.png";
import "./index.css";
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {useSelector} from 'react-redux'

const Sidebar = () => {
    const [routes,setRoutes] = useState([
      { icon: dashboardPng, text: 'Dashboard',pathname:"/dashboard", active:false },
      { icon: referalsPng, text: 'Referrals',pathname:"/referrals", active:false },
      { icon: surveysPng, text: 'Surveys',pathname:"/surveys", active:false },
      { icon: withdravalPage, text: 'Withdraw',pathname:"/withdraw", active:false }
    ]);
    const navigate = useNavigate();
    const params = useLocation();
    const selector = useSelector(state=> state.Reducer.AccountData);
    console.log('selector====>',selector);
    const [user,setUser] = useState();
  
    useEffect(()=>{
      if(selector.name){
        setUser(selector)
      }
    },[selector])
    useEffect(() => {
      const user = localStorage.getItem("token");
      if (!user) {
        navigate("/login");
      }
      const activate = routes.map((route)=>({...route,active:params.pathname===route.pathname}))
      setRoutes(activate)
    }, []);

  const handleProfile = () => {
    navigate("/profile")
  }

  return (
    <div className="side-baar">
    <div>{console.log("params",params.pathname)}
      <div className="logo">
        <img src={main_logo} alt="main_logo" className="main-logo-img" />
      </div>
      <div className="side-baar-routes">
        {routes.map((route, index) => (
          <div key={index} className={route.active?"router-container active-side":"router-container"} onClick={()=>navigate(route.pathname)}>
            <img src={route.icon} alt={route.text} className="img" />
            <Typography className="sidebar-text">{route.text}</Typography>
          </div>
        ))}
      </div>
    </div>
    <div style={{ width: "100%" }}>
    <div className="profile-container" onClick={handleProfile}>
      <img src={profilePng} alt="profilePng" className="profile-img" />
      <Typography className="profile-text">
        {user?.name}
      </Typography>
    </div>
  </div>
  </div>
  );
};

export default Sidebar;
