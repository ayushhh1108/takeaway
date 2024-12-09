import { useSelector } from 'react-redux'
import "./index.css";
import {
  Box,
  Typography,
  useMediaQuery,
} from "@mui/material";
import Sidebar from "../SIdeBaar";
import DashboardMobile from "../../Pages/mobileUserDashboard";
import { TaskBox, ViewBox, YoutubeBox } from "../Boxes";
import moneyPng from "../../assets/Credit card-rafiki.png";
import view from "../../assets/Image viewer-pana.png";
import { CircularProgress } from "@mui/material";
import { useEffect, useState } from 'react';
import { api, apiEndPoints } from '../../api';

const UserDashboard = () => {
  const matches = useMediaQuery("(max-width:600px)");
  const selector = useSelector(state=> state.Reducer.AccountData);
  const [user,setUser] = useState();
  const [video,setVideo] = useState({});
  const [playing, setPlaying] = useState(false);
  const [time,setTime] = useState(35);
  let inter = null;

  useEffect(()=>{
    if(selector.name){
      setUser(selector)
    }
  },[selector])
  useEffect(()=>{
    getVideos()
  },[]);

  const getVideos = () => {
    api.get(apiEndPoints.getVideos()).then((res)=>  setVideo(res.data.data[0]))
  }
  const handlePlayVideo = () => {
    setPlaying(!playing);
  };

  const handlePlay = () => {
    setPlaying(true);
    inter = setInterval(() => {
      setTime(time-1)
    }, 1000);
  }

  const handlePause = () =>{
    setPlaying(false);
    inter = null;
    setTime(35)
  }

  return matches ? (
    <DashboardMobile>
        <TaskBox />
        <ViewBox />
        <YoutubeBox handlePlayVideo={handlePlayVideo} video={video} playing={playing} handlePause={handlePause} handlePlay={handlePlay} time={time} />
    </DashboardMobile>
  ) : (
    <div className="main-div">
      <Sidebar />
      <div className="main-component !block">
        <div className="text-start flex flex-wrap w-full px-12">
          <Box className="total-erning1 mb-3 me-5">
            <Box className="earnings-text1">
              <Typography variant="p" className="earning-label1">
                Total Earning
              </Typography>
              <Typography variant="h5" className="earning-value1">
                ₹{user?.earnings}
              </Typography>
            </Box>
            <img
              src={moneyPng}
              alt="money-vector"
              style={{ width: "100px", borderRadius: "0px 20px 13px 0px" }}
            />
          </Box>
          <Box className="total-erning1 mb-3 me-5">
            <Box className="earnings-text1">
              <Typography variant="p" className="earning-label1">
              Reaming Task
              </Typography>
              <Typography variant="h5" className="earning-value1">
                {user?.todaycount} / 20
              </Typography>
            </Box>
            <CircularProgress
              variant="determinate"
              value={100 - user?.todaycount/20*100}
              size={80}
              thickness={6}
              color="secondary"
            />
          </Box>
          <Box className="total-erning1 mb-3">
            <Box className="earnings-text1">
              <Typography variant="p" className="earning-label1">
              Total Views
              </Typography>
              <Typography variant="h5" className="earning-value1">
                {user?.views}
              </Typography>
            </Box>
            <img
              src={view}
              alt="money-vector"
              style={{ width: "100px", borderRadius: "0px 20px 13px 0px" }}
            />
          </Box>
        </div>
        <div className="px-12">
          {console.log('time', time)}
          <YoutubeBox handlePlayVideo={handlePlayVideo} video={video} playing={playing} handlePause={handlePause} handlePlay={handlePlay} time={time}/>
        </div>
      </div>
    </div>
  );
};
export default UserDashboard;
