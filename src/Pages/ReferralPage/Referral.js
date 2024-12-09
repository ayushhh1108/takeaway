import * as React from "react";
import "./index.css";
import { Button, Typography, useMediaQuery } from "@mui/material";
import { HiUserGroup } from "react-icons/hi2";
import Sidebar from "../../components/SIdeBaar/index";
import DashboardMobile from "../mobileUserDashboard";
import {useSelector} from 'react-redux';
import { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";

function ReferralPage() {
  const matches = useMediaQuery("(max-width:600px)");
  const selector = useSelector(state=> state.Reducer.AccountData);
  const [user,setUser] = useState();

  useEffect(()=>{
    if(selector.name){
      setUser(selector)
    }
  },[selector])
  return matches ? (
    <DashboardMobile>
      <div className="flex my-5 w-full flex-wrap justify-between">
        <div className=" bg-[#c6d0bc] user-card">
          <span className="sign">₹</span>
          <Typography className="box-heading">Referral Balance</Typography>
          <Typography className="price-title">{user?.referral * 50}</Typography>
        </div>
        <div className=" bg-[#f6d78b] user-card">
          <div className="flex items-center justify-center">
            <HiUserGroup />
            <Typography className="box-heading">Sign Ups</Typography>
          </div>
          <Typography className="price-title">{user?.referral}</Typography>
        </div>
      </div>
      <div className="bg-[#cdc8d7] mb-4 w-full link-box mt-0">
        <h3>Earn ₹50 for every friend that sign up</h3>
        <p>You can earn by referring others to register</p>
        <span className="link cursor-pointer" onClick={()=> {
          toast.info("copy text successful")
          navigator.clipboard.writeText(`http://videocashcraft.com/${user?._id}`)}}>http://videocashcraft.com/{user?._id}</span>
        <Button onClick={()=> {
          toast.info("copy text successful")
          navigator.clipboard.writeText(`http://videocashcraft.com/${user?._id}`)}}>Copy Link</Button>
      </div>
    </DashboardMobile>
  ) : (
    <div className="main-div">
      <Sidebar />
      <div className="main-component">
        <div className="w-full">
          <div className="flex mx-10 my-5 card-boxs flex-wrap justify-start">
            <div className=" bg-[#c6d0bc] user-card">
              <span className="sign">₹</span>
              <Typography className="box-heading">Referral Balance</Typography>
              <Typography className="price-title">{user?.referral * 50}</Typography>
            </div>
            <div className=" bg-[#f6d78b] user-card">
              <div className="flex items-center justify-center">
                <HiUserGroup />
                <Typography className="box-heading">Sign Ups</Typography>
              </div>
              <Typography className="price-title">{user?.referral}</Typography>
            </div>
          </div>
          <div className="bg-[#cdc8d7] link-box m-10 mt-0">
            <h3>Earn ₹50 for every friend that sign up</h3>
            <p>You can earn by referring others to register</p>
            <span className="link cursor-pointer" onClick={()=> {
          toast.info("copy text successful")
          navigator.clipboard.writeText(`http://videocashcraft.com/${user?._id}`)}}>http://videocashcraft.com/{user?._id}</span>
            <Button onClick={()=> {
          toast.info("copy text successful")
          navigator.clipboard.writeText(`http://videocashcraft.com/${user?._id}`)}}>Copy Link</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ReferralPage;
