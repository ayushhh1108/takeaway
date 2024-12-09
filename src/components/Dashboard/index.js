import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import "./index.css";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { useState } from "react";
import viewsIcon from "../../assets/views-icon.png";
import Sidebar from "../SIdeBaar";

const Dashboard = () => {
    const [userData, setUserData] = useState();
    const navigate = useNavigate();
    useEffect(() => {
        const user = localStorage.getItem("token");
        if (!user) {
            navigate("/login");
        }
        setUserData(JSON.parse(user));
    }, []);

    const handlePlayVideo = () => {
        const iFrame = document.getElementById("iframe-video");
        iFrame.src += "&autoplay=1";
    };

    return (
        <div className="main-div">
            <Sidebar />
            <div className="main-component">
                <Outlet />
            </div>
        </div>
    );
};
export default Dashboard;
