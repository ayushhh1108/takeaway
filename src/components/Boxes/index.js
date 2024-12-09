import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { CircularProgress } from "@mui/material";
import viewsIcon from "../../assets/views-icon.png";
import { useLocation, useNavigate } from "react-router-dom";
import "./index.css";
import ReactPlayer from 'react-player/youtube';
import { styled } from '@mui/material/styles';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10
}));

function TaskBox() {
  return (
    <div className="todays-task-box">
      <div className="box-heading-div">
        <Typography className="box-heading">Todays Task</Typography>
      </div>
      <Box sx={{ position: "relative", display: "inline-flex" }}>
        <CircularProgress
          variant="determinate"
          value={90}
          size={95}
          thickness={6}
          color="primary"
        />
        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            zIndex: 99,
            height: "95px",
            position: "absolute",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            variant="caption"
            component="div"
            color="text.secondary"
            className="progress-bar-value"
          >{`10/20`}</Typography>
        </Box>
      </Box>
    </div>
  );
}

function BallanceBox() {
  return (
    <div className="account-ballance-box">
      <div className="box-heading-div">
        <span className="sign">₹</span>
        <Typography className="box-heading">Account balance</Typography>
      </div>
      <Typography className="value-of-box">₹1000</Typography>
    </div>
  );
}

function ViewBox() {
  return (
    <div className="total-view-box">
      <div className="box-heading-div">
        <img
          src={viewsIcon}
          alt="viewsIcon"
          style={{ width: "24px", display: "inline-block" }}
        />
        <Typography className="box-heading">Total Views</Typography>
      </div>
      <Typography className="value-of-box">10</Typography>
    </div>
  );
}

function YoutubeBox({ handlePlayVideo, video, playing, handlePlay, handlePause, time }) {
  return (
    <div className="youtube-box">
      {video?.url? <div
        id="iframe-video"
        className="iframe-container"
        >
        <ReactPlayer playing={playing} onPlay={handlePlay} width='100%' url={video?.url} onPause={handlePause} />
      </div>:null}
      <div className="mt-8">
        <BorderLinearProgress variant="determinate" value={100 - time/35*100} />
      </div>
      <Button
        variant="contained"
        className="watch-button"
        onClick={handlePlayVideo}
      >{playing ? 'Pause Video': 'Watch Video'}
      </Button>
    </div>
  );
}

function MenuScrollBox() {
  const params = useLocation();
  const navigate = useNavigate();
  const options = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Referrals', path: '/referrals' },
    { name: 'Surveys', path: '/surveys' },
    { name: 'Withdraw', path: '/withdraw' }
  ];
  return (
    <Box className="menu-box">
      {options.map((item) => (
        <Typography
          className={item.path === params.pathname ? "menu active" : "menu"}
          onClick={()=>{navigate(item.path)}}
        >
          {item.name}
        </Typography>
      ))}
    </Box>
  );
}

export { TaskBox, BallanceBox, ViewBox, YoutubeBox, MenuScrollBox };
