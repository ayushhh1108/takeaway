import * as React from "react";
import "./index.css";
import {
  useMediaQuery,
} from "@mui/material";
import Sidebar from "../../components/SIdeBaar";
import DashboardMobile from "../mobileUserDashboard";

function Surveys() {
  const matches = useMediaQuery("(max-width:600px)");
  return matches ? ( 
    <DashboardMobile>
        <h1 className="text-2xl">Cooming Soon!</h1>
    </DashboardMobile>
  ) : (
     <div className="main-div">
      <Sidebar />
      <div className="main-component">
       <h1 className="text-2xl">Cooming Soon!</h1>
      </div>
    </div>
  )
}
export default Surveys;
