import React from "react";
import { Card, CardContent, Typography, Box, Grid } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const OrderConfirmation = ({ handleTrack }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#ffffff", // Light green background
      }}
    >
      <Card
        sx={{
          width: "100%",
          borderRadius: "16px",
          boxShadow: 3,
          padding: "16px",
          backgroundColor: "#e0f7fa", // Customize color if needed
        }}
      >
        <CardContent>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: "16px",
            }}
          >
            <CheckCircleIcon
              sx={{ color: "#4caf50", fontSize: "40px" }} // Green check icon
            />
          </Box>
          <Typography
            variant="h6"
            component="div"
            sx={{ textAlign: "center", fontWeight: "bold", marginBottom: 2 }}
          >
            Your Perfect Brew is On Its Way!
          </Typography>
          <Typography
            variant="body2"
            sx={{ textAlign: "center", marginBottom: 3 }}
          >
            We’ve sent your order confirmation to your email. Get ready to sip
            happiness soon!
          </Typography>
          <Grid container spacing={2} sx={{ marginBottom: 3 }}>
            <Grid item xs={4}>
              <Typography variant="body2" sx={{ textAlign: "center" }}>
                <strong style={{ fontSize: "16px" }}>251.00</strong>
              </Typography>
              <Typography variant="body2" sx={{ textAlign: "center" }}>
                Total Damage
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="body2" sx={{ textAlign: "center" }}>
                <strong>
                  x <span style={{ fontSize: "16px" }}> 5</span>
                </strong>
              </Typography>
              <Typography variant="body2" sx={{ textAlign: "center" }}>
                Coffee Count
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="body2" sx={{ textAlign: "center" }}>
                <strong style={{ fontSize: "16px" }}>10 - 15Min</strong>
              </Typography>
              <Typography variant="body2" sx={{ textAlign: "center" }}>
                Arrival Window
              </Typography>
            </Grid>
          </Grid>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#4caf50",
              borderRadius: "8px",
              padding: "8px",
              cursor: "pointer",
            }}
          >
            <Typography
              variant="body2"
              sx={{
                fontSize: "15px",
                textAlign: "center",
                color: "white",
                fontWeight: 500,
              }}
              onClick={handleTrack}
            >
              Your brew is on the way – Track Your Order.
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default OrderConfirmation;
