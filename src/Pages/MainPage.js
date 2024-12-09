import React from "react";
import Header from "../components/header";
import { Outlet } from "react-router-dom";
const MainPage = () => {
    return (
        <div className="!bg-[#eee3cf]">
            <Header />
            <Outlet />
        </div>
    )
}
export default MainPage;