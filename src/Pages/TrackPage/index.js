import React, { useEffect, useState } from "react";
import "./index.css";
import { Box, Typography, Grid, Avatar } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DeliveryDiningIcon from "@mui/icons-material/DeliveryDining";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getOrderData } from "../action";

const OrderStatus = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const [orderStatus, setStatus] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const orderData = await dispatch(getOrderData(params?.id));
        setStatus(orderData?.status);
      } catch (error) {
        console.error("Error fetching order data:", error);
      }
    };

    fetchData();
  }, [dispatch, params?.id]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "16px",
        minHeight: "100vh",
        backgroundColor: "#f9f9f9",
        justifyItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Timer Icon */}
      <Avatar
        sx={{
          width: 64,
          height: 64,
          marginBottom: 2,
          backgroundColor: "#ffecb3", // Light orange background
        }}
      >
        <AccessTimeIcon sx={{ color: "#ff9800", fontSize: "36px" }} />
      </Avatar>

      {/* Header Text */}
      <Typography
        variant="h6"
        className="main-tracktitle"
        sx={{ textAlign: "center" }}
      >
        Your Brew is on the Move!
      </Typography>
      <Typography
        variant="body2"
        className="main-subtitle"
        sx={{
          textAlign: "center",
          color: "#757575", // Grey text
          marginBottom: 4,
        }}
      >
        Keep an eye on your order as it progresses through these steps:
      </Typography>

      {/* Status Steps */}
      <Grid container spacing={2} sx={{ maxWidth: 400 }}>
        {/* Step 1 */}
        <Grid
          item
          xs={12}
          className={orderStatus === "Preparing" ? "" : "incomplete-step"}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "#e8f5e9", // Light green background
              borderRadius: "8px",
              padding: "8px",
            }}
          >
            <Avatar
              sx={{
                backgroundColor: "#4caf50", // Green background
                marginRight: "12px",
              }}
            >
              <CheckCircleIcon sx={{ color: "white" }} />
            </Avatar>
            <Box className="text-align-left">
              <Typography
                className="track-title"
                variant="body1"
                sx={{ fontWeight: "bold" }}
              >
                Order accepted
              </Typography>
              <Typography
                className="track-decription"
                variant="body2"
                color="textSecondary"
              >
                Sit tight! We’ve got your order
              </Typography>
            </Box>
          </Box>
        </Grid>

        {/* Step 2 */}
        <Grid
          item
          xs={12}
          className={orderStatus === "Preparing" ? "" : "incomplete-step"}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "#fff8e1", // Light yellow background
              borderRadius: "8px",
              padding: "8px",
            }}
          >
            <Avatar
              sx={{
                backgroundColor: "#ffb74d", // Orange background
                marginRight: "12px",
              }}
            >
              <DeliveryDiningIcon sx={{ color: "white" }} />
            </Avatar>
            <Box className="text-align-left">
              <Typography
                variant="body1"
                className="track-title"
                sx={{ fontWeight: "bold" }}
              >
                In Preparing
              </Typography>
              <Typography
                className="track-decription"
                variant="body2"
                color="textSecondary"
              >
                Our baristas are working their magic to perfect your order.
                It’ll be ready for pickup shortly.
              </Typography>
            </Box>
          </Box>
        </Grid>

        {/* Step 3 */}
        <Grid item xs={12} className={orderStatus === "Completed" ? "" : "incomplete-step"}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "#e3f2fd", // Light blue background
              borderRadius: "8px",
              padding: "8px",
            }}
          >
            <Avatar
              sx={{
                backgroundColor: "#90caf9", // Blue background
                marginRight: "12px",
              }}
            >
              <LocalShippingIcon sx={{ color: "white" }} />
            </Avatar>
            <Box className="text-align-left">
              <Typography
                variant="body1"
                className="track-title"
                sx={{ fontWeight: "bold" }}
              >
                Pick Up Your Perfect Brew!
              </Typography>
              <Typography
                className="track-decription"
                variant="body2"
                color="textSecondary"
              >
                Your order is ready and waiting! Swing by the shop to collect
                your coffee and enjoy.
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default OrderStatus;
